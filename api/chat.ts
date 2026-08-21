/* Vercel serverless function: POST /api/chat
   Bridges the portfolio chat widget to the Google Gemini API.

   Env vars (Vercel → Project → Settings → Environment Variables):
   - GEMINI_API_KEY   (required) free key from https://aistudio.google.com
   - Upstash Redis    (optional) connect an Upstash Redis database in
     Vercel → Storage; its URL/token env vars are injected automatically and
     the assistant's notes are stored there, readable at /api/admin. Without
     it, notes only appear in the Vercel function logs.
   - CALENDLY_URL     (optional) your Calendly booking page, e.g.
     https://calendly.com/your-name/30min — when set, "book a meeting"
     requests get a calendar button; otherwise they get the WhatsApp button.

   This file lives outside src/ on purpose — the site's `tsc --noEmit` step
   only checks src/, and Vercel compiles api/ functions independently.

   Shared pieces live in api/_lib/: the Redis helpers and the stored-chat
   schema in _lib/redis.ts, the system prompt and tool definitions in
   _lib/prompt.ts. The underscore keeps that folder out of the public routes.

   Abuse controls: requests carrying a foreign Origin are refused, and each
   IP gets 20 chat requests per minute. Both are deliberately lenient about
   infrastructure — a missing Origin header or an unreachable Redis lets the
   request through rather than breaking the widget. */

import { SYSTEM_PROMPT, TOOLS } from './_lib/prompt.js';
import { clientIp, saveChat, withinRateLimit } from './_lib/redis.js';

/* Model names tried in order. Google retires dated model names for new
   accounts (gemini-2.5-flash already 404s on new keys), so the "-latest"
   aliases go first; the index of the first working model sticks for the
   lifetime of the warm function, so fallback probing costs one request. */
const GEMINI_MODELS = [
  'gemini-flash-latest',
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gemini-flash-lite-latest'
];
let activeModelIndex = 0;

const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const WHATSAPP_NUMBER = '923116566318';

/* Served straight from public/, so the chat can hand over the same PDF as the
   hero's "Download CV" button instead of claiming it cannot share files. */
const CV_URL = '/Haroon-Sajid-CV.pdf';


type ChatMessage = { from?: unknown; text?: unknown };
type GeminiPart = {
  text?: string;
  functionCall?: { name: string; args: Record<string, string> };
};

/* Raised when Gemini says the free quota is exhausted (429) or the model is
   overloaded (503) — the widget shows a dedicated "try again soon" message. */
class QuotaError extends Error {}

async function callGemini(apiKey: string, contents: unknown[], systemText: string): Promise<GeminiPart[]> {
  let lastError = '';
  /* True when every failure so far was the kind that usually clears on its
     own (busy, upstream blip, dropped socket) rather than a real fault in
     the request. It decides whether the visitor is told "try again in a
     moment" or gets a hard error. */
  let allTransient = true;

  for (let i = activeModelIndex; i < GEMINI_MODELS.length; i++) {
    const model = GEMINI_MODELS[i];
    let response: Response;

    try {
      response = await fetch(geminiUrl(model), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemText }] },
          contents,
          tools: [TOOLS],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
        })
      });
    } catch (error) {
      /* The request never completed: DNS hiccup, dropped socket, timeout.
         Previously this escaped and killed the turn; now it just means this
         model did not answer, so move on to the next one. */
      lastError = `Gemini unreachable on ${model}: ${error instanceof Error ? error.message : error}`;
      continue;
    }

    if (response.status === 404) {
      /* Model retired/unknown for this key — remember and try the next one */
      lastError = `Gemini API error 404 on ${model}: ${await response.text()}`;
      activeModelIndex = Math.min(i + 1, GEMINI_MODELS.length - 1);
      continue;
    }

    /* 429 is an exhausted quota (each model has its own pool) and any 5xx is
       Google having a moment. Both are worth retrying on the next model, and
       neither is remembered, since they clear by themselves.

       This used to cover only 429 and 503, so a single transient 500 from
       the first model aborted the whole request and the widget showed its
       generic error. That is what made the chat die every few messages. */
    if (response.status === 429 || response.status >= 500) {
      lastError = `Gemini busy ${response.status} on ${model}`;
      continue;
    }

    if (!response.ok) {
      /* A 4xx is a genuine problem with the request or the key. Retrying
         other models would fail identically, so stop and surface it. */
      allTransient = false;
      lastError = `Gemini API error ${response.status} on ${model}: ${await response.text()}`;
      break;
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts ?? [];
  }

  /* Every model was busy or unreachable: treat it as a quota problem so the
     widget shows its friendly "try again in a moment" message rather than an
     error, which is what actually happened. */
  if (allTransient) throw new QuotaError(lastError);
  throw new Error(lastError || 'No Gemini model available');
}

/* Hosts allowed to call this endpoint from a browser. A request with no
   Origin header (server to server, curl, some older browsers on same-origin
   POSTs) is left alone; only a *foreign* Origin is refused, so this stops
   other sites embedding the widget without touching legitimate traffic. */
const ALLOWED_ORIGINS = [
  /* The live site today */
  'https://haroon-sajid.vercel.app',
  /* Added ahead of the custom domain purchase, so pointing haroonsajid.com
     at this project will just work with no code change needed */
  'https://haroonsajid.com',
  'https://www.haroonsajid.com'
];

function originAllowed(origin: string): boolean {
  if (ALLOWED_ORIGINS.indexOf(origin) >= 0) return true;
  /* Any port, http or https, for local development */
  return /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
         /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const origin = typeof req.headers?.origin === 'string' ? req.headers.origin : '';
  if (origin && !originAllowed(origin)) {
    res.status(403).json({ error: 'forbidden' });
    return;
  }

  /* 20 a minute per IP. Returns the same shape as an exhausted Gemini quota
     so the widget shows its existing "try again soon" message rather than a
     new error state. */
  if (!(await withinRateLimit(clientIp(req)))) {
    res.status(429).json({ error: 'quota' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  const incoming: ChatMessage[] = Array.isArray(req.body?.messages) ? req.body.messages : [];

  /* One id per visit, from the widget. Anything unexpected is replaced rather
     than trusted, since it becomes a Redis key. */
  const idShape = /^[A-Za-z0-9-]{6,64}$/;
  const rawSid = typeof req.body?.sid === 'string' ? req.body.sid : '';
  const sessionId = idShape.test(rawSid)
    ? rawSid
    : `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  /* The person behind the visit, stable across visits. Unlike the session id
     this is never invented server side: an unusable value just means the
     conversation is not linked to any other, which is the safe default. */
  const rawVid = typeof req.body?.vid === 'string' ? req.body.vid : '';
  const visitorId = idShape.test(rawVid) ? rawVid : '';

  /* Keep requests small and abuse-resistant: last 12 turns, 1500 chars each.
     Leading bot messages (the seeded welcome) are dropped because Gemini
     expects the conversation to start with a user turn. */
  const contents = incoming
    .filter((m) => (m.from === 'user' || m.from === 'bot') && typeof m.text === 'string')
    .slice(-12)
    .map((m) => ({
      role: m.from === 'user' ? 'user' : 'model',
      parts: [{ text: (m.text as string).slice(0, 1500) }]
    }));
  while (contents.length && contents[0].role !== 'user') contents.shift();

  if (!contents.length) {
    res.status(400).json({ error: 'No message provided' });
    return;
  }

  /* The widget sends which language the site is being browsed in, so short or
     ambiguous messages ("hlo", "hi") get answered in the visitor's language. */
  const siteLanguage = req.body?.lang === 'ar' ? 'Arabic' : 'English';
  const systemText =
    SYSTEM_PROMPT +
    `\n\n## Site language\nThe visitor is browsing this site in ${siteLanguage}. ` +
    `When their message is too short or unclear to tell its language, reply in ${siteLanguage}. ` +
    `Once they clearly write in some language, always follow their language.`;

  try {
    /* The model may need more than one tool before it can answer: saving the
       visitor's details AND attaching a button, say. So keep running tools
       and feeding the results back until it writes actual text, rather than
       stopping after one and falling back to a canned line. The cap is a
       runaway guard; two rounds is the realistic maximum. */
    const history: Array<Record<string, unknown>> = [...contents];
    let link: string | undefined;
    let linkKind: 'whatsapp' | 'calendly' | 'cv' | undefined;
    let reply = '';
    let fallbackReply = 'Sorry, I could not come up with a reply, please try again.';
    const alreadyCalled = new Set<string>();
    /* Whatever the assistant chose to flag about this visitor, merged onto
       the stored conversation once the turn is done */
    let noteArgs: Record<string, string> | null = null;

    for (let round = 0; round < 4; round++) {
      const parts = await callGemini(apiKey, history, systemText);
      const text = parts.map((p) => p.text ?? '').join('').trim();
      const call = parts.find((p) => p.functionCall)?.functionCall;

      if (!call) {
        reply = text;
        break;
      }

      /* The same tool with the same arguments twice means the model is stuck
         in a loop, so take whatever it has said and stop. */
      const signature = call.name + ':' + JSON.stringify(call.args ?? {});
      if (alreadyCalled.has(signature)) {
        reply = text;
        break;
      }
      alreadyCalled.add(signature);

      const outcome = runTool(call);
      const toolResult = { ...outcome.toolResult, status: outcome.status };
      if (outcome.link) {
        link = outcome.link;
        linkKind = outcome.linkKind;
      }
      if (outcome.noteArgs) noteArgs = { ...(noteArgs ?? {}), ...outcome.noteArgs };
      fallbackReply = outcome.fallbackReply;

      history.push({ role: 'model', parts: [{ functionCall: call }] });
      history.push({ role: 'user', parts: [{ functionResponse: { name: call.name, response: toolResult } }] });

      /* Some replies arrive as text and a tool call together, and that text
         is already the answer. */
      if (text) {
        reply = text;
        break;
      }
    }

    const finalReply = reply || fallbackReply;
    res.status(200).json({ reply: finalReply, link, linkKind });

    /* After the response, so storage latency never delays the visitor. The
       transcript sent up plus the answer just given is the whole visit. */
    const transcript = incoming
      .filter((m) => (m.from === 'user' || m.from === 'bot') && typeof m.text === 'string')
      .map((m) => ({ from: String(m.from), text: String(m.text) }));
    transcript.push({ from: 'bot', text: finalReply });
    /* Isolated from the try below: the visitor already has their reply, so a
       storage problem must not reach the catch and attempt a second
       response on an already-sent request. */
    try {
      await saveChat(sessionId, visitorId, siteLanguage, transcript, noteArgs);
    } catch (storageError) {
      console.error('Chat storage failed after reply was sent:', storageError);
    }
  } catch (error) {
    if (error instanceof QuotaError) {
      res.status(429).json({ error: 'quota' });
      return;
    }
    console.error(error);
    /* `detail` surfaces the upstream failure reason (bad key, wrong model, …)
       so it can be diagnosed without digging into the Vercel logs. It never
       contains the API key — only Gemini's error description. */
    res.status(502).json({
      error: 'AI service unavailable',
      detail: String(error instanceof Error ? error.message : error).slice(0, 300)
    });
  }
}

/* Runs one tool call and describes the outcome: what the model is told came
   back, which button to hang under the reply, and the line to send if the
   model somehow never writes one itself. */
type ToolOutcome = {
  status: string;
  toolResult: Record<string, string>;
  fallbackReply: string;
  link?: string;
  linkKind?: 'whatsapp' | 'calendly' | 'cv';
  /* What save_note flagged, merged onto the conversation record at the end
     of the turn so the whole visit is written once rather than piecemeal */
  noteArgs?: Record<string, string>;
};

function runTool(call: { name: string; args: Record<string, string> }): ToolOutcome {
    let link: string | undefined;
    let linkKind: 'whatsapp' | 'calendly' | 'cv' | undefined;
    let toolResult: Record<string, string>;
    let fallbackReply: string;

    if (call.name === 'share_link') {
      const calendly = process.env.CALENDLY_URL;
      if (call.args?.kind === 'cv') {
        link = CV_URL;
        linkKind = 'cv';
        toolResult = {
          status: 'attached',
          note:
            'A "Download CV" button now appears under your reply, so the CV is ' +
            'already shared. Never say you cannot share files. Say something ' +
            'short like "Here is his CV, tap the button below to download it", ' +
            'and offer to answer anything about his experience.'
        };
        fallbackReply = 'Here is Haroon\'s CV, just tap the button below to download it. Happy to answer anything about his experience too!';
      } else if (call.args?.kind === 'booking' && calendly) {
        link = calendly;
        linkKind = 'calendly';
        toolResult = {
          status: 'attached',
          note: "A booking button with Haroon's calendar now appears under your reply. Briefly tell the visitor to tap it and pick a time."
        };
        fallbackReply = 'You can book a meeting with Haroon here, just tap the button below and pick a time that suits you!';
      } else {
        link = `https://wa.me/${WHATSAPP_NUMBER}`;
        linkKind = 'whatsapp';
        toolResult = {
          status: 'attached',
          note:
            'A WhatsApp button now appears under your reply. Give the full ' +
            'contact details in the text as well, on their own lines: ' +
            '**WhatsApp** +92 311 6566318 and **Email** haroonsajid.ai@gmail.com, ' +
            'then tell them they can tap the button to open the chat.'
        };
        fallbackReply =
          "Here are Haroon's contact details:\n" +
          '- **WhatsApp** +92 311 6566318\n' +
          '- **Email** haroonsajid.ai@gmail.com\n\n' +
          'You can also tap the button below to message him right away!';
      }
      return { status: 'attached', toolResult, fallbackReply, link, linkKind };
    }

    toolResult = {
      note:
        'Saved. Never mention notes or saving, and never save the same thing ' +
        'twice. Now write the reply itself: thank them in a few words, and in ' +
        'the same message answer what they actually said. Ask only for what ' +
        'they have not already given you, and if they have said goodbye or ' +
        'that they will contact him themselves, simply say goodbye warmly ' +
        'and do not ask for anything. Use no dashes and no slashes.'
    };
    /* Deliberately says nothing about roles or emails: this line has to be
       safe whoever the visitor is and whatever they last said. */
    fallbackReply = 'Thank you, I have passed that on to Haroon and he will get back to you soon!';
    return { status: 'saved', toolResult, fallbackReply, noteArgs: call.args ?? {} };
}
