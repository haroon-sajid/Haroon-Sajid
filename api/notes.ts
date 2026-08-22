/* Vercel serverless function: /api/notes — private API behind the admin login.
   Used only by the hidden admin page (api/admin.ts).

   GET  /api/notes                → every conversation, newest activity first
   POST /api/notes {action, id}   → action: "toggle_read" | "delete"

   Auth: HTTP Basic against ADMIN_USER / ADMIN_PASS env vars (set them in
   Vercel → Project → Settings → Environment Variables — your choice of
   username and password). Every request must authenticate; with the vars
   unset the endpoint returns 503 rather than running open.

   Storage: the Upstash Redis "chats" hash that api/chat.ts writes into. The
   connection helpers and the StoredChat schema both live in _lib/redis.ts
   and are imported by both files, so the two cannot drift apart. The older
   "notes" hash is still read so anything saved before conversations existed
   is not stranded. */

import { redis, redisConfig, StoredChat } from './_lib/redis.js';

/* The record shape is defined once in _lib/redis.ts and imported by both
   endpoints, so the writer (api/chat.ts) and this reader cannot drift out
   of sync. `Chat` is kept as a local alias so the rest of this file reads
   unchanged. */
type Chat = StoredChat;

function isAuthorized(req: any): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (!user || !pass) return false;

  const header: string = req.headers?.authorization ?? '';
  if (!header.startsWith('Basic ')) return false;
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  if (separator < 0) return false;
  return decoded.slice(0, separator) === user && decoded.slice(separator + 1) === pass;
}

export default async function handler(req: any, res: any) {
  /* Refuse to run open. With no credentials configured there is no way to
     authenticate anyone, so the endpoint reports itself unavailable rather
     than serving private conversations to whoever asks. 503, not 500: the
     service is fine, it is unconfigured. */
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    res.status(503).json({ error: 'Set ADMIN_USER and ADMIN_PASS in Vercel environment variables' });
    return;
  }
  if (!isAuthorized(req)) {
    /* No WWW-Authenticate header on purpose — the admin page has its own
       lock screen and we don't want the browser's native popup. */
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  if (!redisConfig()) {
    res.status(500).json({ error: 'Connect an Upstash Redis database in Vercel → Storage' });
    return;
  }

  /* Every response here is live private data (a conversation list or the
     result of a mutation), never something safe to reuse from a cache. */
  res.setHeader('Cache-Control', 'no-store, must-revalidate');

  try {
    if (req.method === 'GET') {
      /* HGETALL over REST returns a flat [field, value, field, value] array */
      const parseHash = async (key: string): Promise<any[]> => {
        const flat: string[] = (await redis(['HGETALL', key])) ?? [];
        const rows: any[] = [];
        for (let i = 1; i < flat.length; i += 2) {
          try {
            rows.push(JSON.parse(flat[i]));
          } catch {
            /* skip malformed entries rather than breaking the whole page */
          }
        }
        return rows;
      };

      const chats: Chat[] = await parseHash('chats');

      /* Notes written before conversations existed have no transcript, so
         they are shown as single-message cards rather than dropped. */
      const legacy: Chat[] = (await parseHash('notes')).map((n) => ({
        id: n.id,
        /* Predates visitor ids, so it links to nothing */
        visitor_id: '',
        ts: n.ts,
        updated: n.ts,
        read: !!n.read,
        lang: '',
        visitor_type: n.visitor_type ?? '',
        name: n.name ?? '',
        contact: n.contact ?? '',
        note: n.note ?? '',
        messages: []
      }));

      const all = [...chats, ...legacy].sort((a, b) =>
        (a.updated || a.ts) < (b.updated || b.ts) ? 1 : -1
      );
      res.status(200).json({ chats: all });
      return;
    }

    if (req.method === 'POST') {
      const { action, id } = req.body ?? {};
      if (typeof id !== 'string' || !id) {
        res.status(400).json({ error: 'Missing conversation id' });
        return;
      }

      /* An id can live in either hash, so both are addressed */
      if (action === 'delete') {
        await redis(['HDEL', 'chats', id]);
        await redis(['HDEL', 'notes', id]);
        res.status(200).json({ ok: true });
        return;
      }

      if (action === 'toggle_read') {
        for (const key of ['chats', 'notes']) {
          const raw = await redis(['HGET', key, id]);
          if (!raw) continue;
          const row = JSON.parse(raw);
          row.read = !row.read;
          await redis(['HSET', key, id, JSON.stringify(row)]);
          res.status(200).json({ ok: true, read: row.read });
          return;
        }
        res.status(404).json({ error: 'Conversation not found' });
        return;
      }

      res.status(400).json({ error: 'Unknown action' });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error(error);
    res.status(502).json({ error: 'Storage unavailable' });
  }
}
