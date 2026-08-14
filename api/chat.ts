/* Vercel serverless function: POST /api/chat
   Bridges the portfolio chat widget to the Google Gemini API.

   Setup: create a free API key at https://aistudio.google.com and add it in
   Vercel → Project → Settings → Environment Variables as GEMINI_API_KEY.

   This file lives outside src/ on purpose — the site's `tsc --noEmit` step
   only checks src/, and Vercel compiles api/ functions independently. */

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const WHATSAPP_NUMBER = '923116566318';

/* Everything the assistant is allowed to know comes from this prompt, so it
   can only talk about Haroon — not act as a general-purpose chatbot. */
const SYSTEM_PROMPT = `
You are the friendly AI assistant on the portfolio website of Muhammad Haroon Sajid.
Your only job is to answer visitors' questions about Haroon and help them book an
appointment with him. Politely decline anything unrelated to Haroon or his work,
and steer the conversation back to how Haroon can help.

Reply in the same language the visitor writes in (the site supports English and
Arabic). Keep answers short and conversational — usually 1 to 3 sentences, since
they render in a small chat bubble. Never invent facts; if you don't know
something, say so and suggest contacting Haroon directly.

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

const BOOKING_TOOL = {
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
    }
  ]
};

type ChatMessage = { from?: unknown; text?: unknown };
type GeminiPart = {
  text?: string;
  functionCall?: { name: string; args: Record<string, string> };
};

async function callGemini(apiKey: string, contents: unknown[]): Promise<GeminiPart[]> {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      tools: [BOOKING_TOOL],
      generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
    })
  });
  if (!response.ok) {
    throw new Error(`Gemini API error ${response.status}: ${await response.text()}`);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts ?? [];
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
    const booking = parts.find((p) => p.functionCall?.name === 'book_appointment')?.functionCall;

    if (!booking) {
      const reply = parts.map((p) => p.text ?? '').join('').trim();
      res.status(200).json({ reply: reply || 'Sorry, I could not come up with a reply — please try again.' });
      return;
    }

    /* The model asked to book: hand the collected details back so it can
       confirm to the visitor, and give the widget a prefilled WhatsApp link. */
    const bookingLink = buildWhatsAppLink(booking.args ?? {});
    let reply = '';
    try {
      const followUp = await callGemini(apiKey, [
        ...contents,
        { role: 'model', parts: [{ functionCall: booking }] },
        {
          role: 'user',
          parts: [
            {
              functionResponse: {
                name: 'book_appointment',
                response: {
                  status: 'ready',
                  note: 'Request prepared. Tell the visitor to tap the WhatsApp button below this message to send it to Haroon.'
                }
              }
            }
          ]
        }
      ]);
      reply = followUp.map((p) => p.text ?? '').join('').trim();
    } catch {
      /* If the confirmation round fails, the link still works on its own. */
    }
    res.status(200).json({
      reply: reply || 'Your appointment request is ready — tap the WhatsApp button below to send it to Haroon!',
      bookingLink
    });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'AI service unavailable' });
  }
}
