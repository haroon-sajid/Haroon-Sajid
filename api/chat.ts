/* Vercel serverless function: POST /api/chat
   Bridges the portfolio chat widget to the Google Gemini API.

   Env vars (Vercel → Project → Settings → Environment Variables):
   - GEMINI_API_KEY   (required) free key from https://aistudio.google.com
   - Upstash Redis    (optional) connect an Upstash Redis database in
     Vercel → Storage; its URL/token env vars are injected automatically and
     the assistant's notes are stored there, readable at /api/admin. Without
     it, notes only appear in the Vercel function logs.

   This file lives outside src/ on purpose — the site's `tsc --noEmit` step
   only checks src/, and Vercel compiles api/ functions independently. */

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

/* Everything the assistant is allowed to know comes from this prompt, so it
   can only talk about Haroon — not act as a general-purpose chatbot. */
const SYSTEM_PROMPT = `
You are the friendly AI assistant on the portfolio website of Muhammad Haroon Sajid.
Your job is to represent Haroon well: answer questions about him, adapt to whoever
you're talking to, gather useful notes for him, and help visitors book a call.
Politely decline anything unrelated to Haroon or his work, and steer the
conversation back to how Haroon can help.

Reply in the same language the visitor writes in (the site supports English and
Arabic). Keep answers short and conversational — usually 1 to 3 sentences, since
they render in a small chat bubble. Plain text only: no markdown, no bullet
lists, no links pasted as raw URLs. Never invent facts; if you don't know
something, say so and suggest contacting Haroon directly.

## Adapting to the visitor
Early on, figure out naturally (never interrogate) who you're talking to, and
shift your tone and goals accordingly:

- POTENTIAL CLIENT / LEAD: be consultative and business-minded. Ask about their
  problem, connect it to Haroon's services and the most similar past projects,
  answer questions about process and availability, and guide them toward booking
  a call (book_appointment tool). If they describe a project but aren't ready to
  book, call save_note so Haroon can follow up.

- RECRUITER / HR: be professional and precise. Focus on roles, dates,
  responsibilities, tech stack, education, and availability (Lahore, Pakistan —
  remote-friendly, open to opportunities). For the full CV, point them to the
  "Download CV" button at the top of the page. Offer to book a call with Haroon,
  and save_note any opportunity they mention.

- CASUAL VISITOR / FELLOW DEVELOPER / STUDENT: be relaxed, warm and a little
  playful. Help them explore the portfolio and Haroon's story. At one natural
  moment, ask what they think of the portfolio or Haroon's work — and when they
  share any feedback, opinion, or suggestion, call save_note so Haroon sees it.
  Ask for feedback at most once; never beg.

Use save_note whenever something is genuinely worth Haroon knowing later — real
feedback, a lead's project details, a job opportunity, a collaboration idea.
Don't save empty small talk. Never explain the mechanics of note-saving to the
visitor; after saving, just thank them naturally.

## About Haroon
- Full name: Muhammad Haroon Sajid. Role: AI Automation & Full-Stack Engineer ("Full Stack AI Engineer").
- Based in Lahore, Pakistan; remote-friendly; currently available for new projects.
- 2+ years of hands-on experience, 20+ projects delivered, 20+ technologies.
- Specialties: intelligent workflow automation, LLM-powered agents, and scalable production-ready web applications.

## Services / what he does
AI workflow automation (n8n, Make), AI agents & LLM workflows (LangChain, LangGraph,
RAG, vector databases, prompt engineering), backend & API development (Python,
FastAPI, Django, PostgreSQL, Celery, REST APIs), full-stack web apps (React,
TypeScript), system & API integrations (CRMs, Zoho, Twilio, Airtable, webhooks),
and cloud deployment & DevOps (Docker, CI/CD).

## Selected projects
- Publisha.io — multi-tenant platform automating content and marketing campaigns; AI-drafted posts go through human approval before publishing.
- Say-Vi (say-vi.com) — turns one selfie into a reusable talking AI avatar: AI-drafted script, studio-quality vertical video, one-tap publishing to TikTok, Instagram, Facebook, YouTube and X.
- Idolfluence — AI platform that turns a chosen niche and persona into finished marketing videos, published to TikTok on autopilot.
- Caregivers Monitoring System — end-to-end n8n automation: scheduled SMS check-ins, voice-call escalation, streak scoring with a live leaderboard, AI morning reports.
- AI Email Digest for Zoho Mail — n8n automation that AI-classifies every email and delivers daily/weekly HTML digest reports.
- AI Inbox Management System — n8n + Recruit CRM + WhatsApp (Whapi Cloud) + OpenAI inbox automation.

## Career
- Builberg — AI Automation & Full-Stack Engineer (Jun 2026 – present): AI automation workflows and LLM agents for client businesses.
- Camden Health System — Full-Stack AI Engineer (Sep 2025 – May 2026): CRM and business apps with Python/FastAPI/React, AI chatbots with LangChain and n8n.
- Enigmatix — Backend Developer (May 2024 – Aug 2025) and Python Developer Intern (Feb – Apr 2024): backend services, REST APIs, LangChain/RAG chatbot features.

## Education
BS in Artificial Intelligence, The Islamia University of Bahawalpur (2020–2024).
Final-year project: JARVIS desktop assistant.

## Contact
Email: haroonsajid.ai@gmail.com · WhatsApp: +92 311 6566318

## Booking appointments
When a visitor wants to hire Haroon, book a call, or discuss a project, collect
(conversationally, not as a form): their name, a contact (email or phone),
a preferred day/time, and briefly what the meeting is about. Once you have at
least a name and contact, call the book_appointment tool. After the tool call,
tell them their request is ready and they just need to tap the WhatsApp button
that appears to send it to Haroon.
`.trim();

const TOOLS = {
  functionDeclarations: [
    {
      name: 'book_appointment',
      description:
        "Prepare an appointment request for Haroon once the visitor has shared their details. Call it as soon as you have at least the visitor's name and a contact.",
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: "Visitor's name" },
          contact: { type: 'string', description: 'Email address or phone number' },
          preferred_time: { type: 'string', description: 'Preferred day/time, in their own words' },
          topic: { type: 'string', description: 'What the meeting is about' }
        },
        required: ['name', 'contact']
      }
    },
    {
      name: 'save_note',
      description:
        'Save a private note for Haroon to read later: portfolio feedback, a lead describing a project, a job opportunity, or anything else worth remembering. The visitor never sees the note.',
      parameters: {
        type: 'object',
        properties: {
          visitor_type: {
            type: 'string',
            enum: ['lead', 'recruiter', 'visitor', 'other'],
            description: 'Best guess at who the visitor is'
          },
          note: { type: 'string', description: 'The note for Haroon, written concisely in English' },
          name: { type: 'string', description: "Visitor's name, if shared" },
          contact: { type: 'string', description: "Visitor's email/phone, if shared" }
        },
        required: ['visitor_type', 'note']
      }
    }
  ]
};

type ChatMessage = { from?: unknown; text?: unknown };
type GeminiPart = {
  text?: string;
  functionCall?: { name: string; args: Record<string, string> };
};

/* Raised when Gemini says the free quota is exhausted (429) or the model is
   overloaded (503) — the widget shows a dedicated "try again soon" message. */
class QuotaError extends Error {}

async function callGemini(apiKey: string, contents: unknown[]): Promise<GeminiPart[]> {
  let lastError = '';
  for (let i = activeModelIndex; i < GEMINI_MODELS.length; i++) {
    const response = await fetch(geminiUrl(GEMINI_MODELS[i]), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        tools: [TOOLS],
        generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
      })
    });
    if (response.status === 429 || response.status === 503) {
      throw new QuotaError(`Gemini busy: ${response.status}`);
    }
    if (response.status === 404) {
      /* Model retired/unknown for this key — remember and try the next one */
      lastError = `Gemini API error 404 on ${GEMINI_MODELS[i]}: ${await response.text()}`;
      activeModelIndex = Math.min(i + 1, GEMINI_MODELS.length - 1);
      continue;
    }
    if (!response.ok) {
      throw new Error(`Gemini API error ${response.status}: ${await response.text()}`);
    }
    activeModelIndex = i;
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts ?? [];
  }
  throw new Error(lastError || 'No Gemini model available');
}

function buildWhatsAppLink(args: Record<string, string>): string {
  const lines = [
    "Hi Haroon! I'd like to book an appointment.",
    `Name: ${args.name ?? '-'}`,
    `Contact: ${args.contact ?? '-'}`,
    `Preferred time: ${args.preferred_time ?? '-'}`,
    `Topic: ${args.topic ?? '-'}`
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/* Stores the assistant's note in the site's Redis database (Upstash), where
   the hidden /api/admin page reads it. Falls back to the function logs so a
   missing/failing database never breaks the chat. The same "notes" hash is
   read and mutated by api/notes.ts — keep the two files' schema in sync. */
async function saveNote(args: Record<string, string>): Promise<string> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  const note = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    visitor_type: args.visitor_type ?? 'other',
    name: args.name ?? '',
    contact: args.contact ?? '',
    note: (args.note ?? '').slice(0, 4000),
    read: false
  };

  if (!url || !token) {
    console.log('[AI note — connect Upstash Redis in Vercel Storage to persist these]', note);
    return 'saved';
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['HSET', 'notes', note.id, JSON.stringify(note)])
    });
    if (!response.ok) throw new Error(`redis ${response.status}`);
    return 'saved';
  } catch (error) {
    console.error('Note storage failed, logging instead:', error, note);
    return 'saved';
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  const incoming: ChatMessage[] = Array.isArray(req.body?.messages) ? req.body.messages : [];

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

  try {
    const parts = await callGemini(apiKey, contents);
    const call = parts.find((p) => p.functionCall)?.functionCall;

    if (!call) {
      const reply = parts.map((p) => p.text ?? '').join('').trim();
      res.status(200).json({ reply: reply || 'Sorry, I could not come up with a reply — please try again.' });
      return;
    }

    /* Execute the tool, then let the model turn the result into a reply. */
    let bookingLink: string | undefined;
    let toolResult: Record<string, string>;
    let fallbackReply: string;

    if (call.name === 'book_appointment') {
      bookingLink = buildWhatsAppLink(call.args ?? {});
      toolResult = {
        status: 'ready',
        note: 'Request prepared. Tell the visitor to tap the WhatsApp button below this message to send it to Haroon.'
      };
      fallbackReply = 'Your appointment request is ready — tap the WhatsApp button below to send it to Haroon!';
    } else {
      toolResult = {
        status: await saveNote(call.args ?? {}),
        note: 'Thank the visitor naturally without mentioning notes were saved.'
      };
      fallbackReply = 'Thank you — Haroon really appreciates you sharing that!';
    }

    let reply = '';
    try {
      const followUp = await callGemini(apiKey, [
        ...contents,
        { role: 'model', parts: [{ functionCall: call }] },
        { role: 'user', parts: [{ functionResponse: { name: call.name, response: toolResult } }] }
      ]);
      reply = followUp.map((p) => p.text ?? '').join('').trim();
    } catch {
      /* The canned confirmation below still carries the outcome. */
    }
    res.status(200).json({ reply: reply || fallbackReply, bookingLink });
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
