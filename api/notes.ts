/* Vercel serverless function: /api/notes — private API behind the admin login.
   Used only by the hidden admin page (api/admin.ts).

   GET  /api/notes                          → list all notes, newest first
   POST /api/notes {action, id}             → action: "toggle_read" | "delete"

   Auth: HTTP Basic against ADMIN_USER / ADMIN_PASS env vars (set them in
   Vercel → Project → Settings → Environment Variables — your choice of
   username and password). Storage: same Upstash Redis "notes" hash that
   api/chat.ts writes into — keep the schema in sync across the two files. */

type Note = {
  id: string;
  ts: string;
  visitor_type: string;
  name: string;
  contact: string;
  note: string;
  read: boolean;
};

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command: (string | number)[]): Promise<any> {
  const config = redisConfig();
  if (!config) throw new Error('storage-not-configured');
  const response = await fetch(config.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  if (!response.ok) throw new Error(`redis ${response.status}`);
  return (await response.json()).result;
}

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
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    res.status(500).json({ error: 'Set ADMIN_USER and ADMIN_PASS in Vercel environment variables' });
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

  try {
    if (req.method === 'GET') {
      /* HGETALL over REST returns a flat [field, value, field, value] array */
      const flat: string[] = (await redis(['HGETALL', 'notes'])) ?? [];
      const notes: Note[] = [];
      for (let i = 1; i < flat.length; i += 2) {
        try {
          notes.push(JSON.parse(flat[i]));
        } catch {
          /* skip malformed entries rather than breaking the whole page */
        }
      }
      notes.sort((a, b) => (a.ts < b.ts ? 1 : -1));
      res.status(200).json({ notes });
      return;
    }

    if (req.method === 'POST') {
      const { action, id } = req.body ?? {};
      if (typeof id !== 'string' || !id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
      }

      if (action === 'delete') {
        await redis(['HDEL', 'notes', id]);
        res.status(200).json({ ok: true });
        return;
      }

      if (action === 'toggle_read') {
        const raw = await redis(['HGET', 'notes', id]);
        if (!raw) {
          res.status(404).json({ error: 'Note not found' });
          return;
        }
        const note: Note = JSON.parse(raw);
        note.read = !note.read;
        await redis(['HSET', 'notes', id, JSON.stringify(note)]);
        res.status(200).json({ ok: true, read: note.read });
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
