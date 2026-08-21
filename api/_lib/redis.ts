/* Shared Upstash Redis helpers for the api/ functions.

   This folder is named with a leading underscore on purpose: Vercel treats
   `api/_lib/**` as private support code rather than routes, so nothing here
   is reachable at a URL. Do not rename it to `lib`.

   Both api/chat.ts (writer) and api/notes.ts (reader/mutator) import from
   here so there is exactly one copy of the connection logic and one
   definition of the stored record. */

/* ---------------- Connection ---------------- */

/* Upstash injects UPSTASH_REDIS_REST_* when connected directly, and Vercel's
   marketplace integration injects KV_REST_API_* instead. Either pair works. */
export function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export async function redis(command: (string | number)[]): Promise<any> {
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

/* ---------------- Stored conversation ----------------
   THE SCHEMA BELOW IS SHARED. api/chat.ts writes it and api/notes.ts reads
   and mutates it; both import this type rather than redeclaring it, so the
   two endpoints cannot drift apart. Changing a field here changes both. */

export type StoredChat = {
  /* One visit. A new browser session starts a new one, so a returning
     visitor is filed as a separate conversation rather than overwriting
     yesterday's. */
  id: string;
  /* The person behind the visit, stable across visits, so the admin page can
     link several conversations back to the same visitor. Empty on records
     written before visitor ids existed. */
  visitor_id: string;
  ts: string;
  updated: string;
  read: boolean;
  lang: string;
  visitor_type: string;
  name: string;
  contact: string;
  note: string;
  messages: { from: string; text: string }[];
};

/* ---------------- Rate limiting ----------------
   A fixed window per calendar minute: INCR a per-IP counter and let the key
   expire on its own. 90s of TTL on a 60s window means a key always outlives
   the window it counts, without needing a sweep.

   Deliberately fail-open. This protects against casual abuse, and a storage
   outage must never take the chat down with it, so both "no Redis" and "Redis
   errored" allow the request through. */

const RATE_LIMIT = 20;
const RATE_WINDOW_TTL = 90;

/* First entry of x-forwarded-for is the real client; the rest are proxies. */
export function clientIp(req: any): string {
  const header = req?.headers?.['x-forwarded-for'];
  const raw = Array.isArray(header) ? header[0] : header;
  if (typeof raw !== 'string' || !raw.trim()) return 'unknown';
  return raw.split(',')[0].trim() || 'unknown';
}

/* Returns false only when the caller has provably gone over the limit. */
export async function withinRateLimit(ip: string): Promise<boolean> {
  if (!redisConfig()) return true;
  try {
    const minute = Math.floor(Date.now() / 60000);
    const key = `rl:${ip}:${minute}`;
    const hits = Number(await redis(['INCR', key]));
    /* Only the first hit needs the TTL, but setting it again is cheap and
       guards against a key that somehow lost its expiry. */
    if (hits === 1) await redis(['EXPIRE', key, RATE_WINDOW_TTL]);
    return !Number.isFinite(hits) || hits <= RATE_LIMIT;
  } catch {
    return true;
  }
}

/* ---------------- Growth control ----------------
   Free Redis tiers are small and conversations are never deleted otherwise,
   so old records are swept opportunistically instead of on a cron: roughly
   one save in twenty pays the cost of a sweep. Anything that fails here is
   swallowed, since it runs after the visitor already has their reply. */

const MAX_AGE_DAYS = 60;
const SWEEP_CHANCE = 0.05;

export async function pruneOldChats(force = false): Promise<number> {
  if (!force && Math.random() >= SWEEP_CHANCE) return 0;
  if (!redisConfig()) return 0;
  try {
    const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    /* HGETALL over REST returns a flat [field, value, field, value] array */
    const flat: string[] = (await redis(['HGETALL', 'chats'])) ?? [];
    const stale: string[] = [];

    for (let i = 0; i < flat.length - 1; i += 2) {
      const id = flat[i];
      try {
        const row = JSON.parse(flat[i + 1]);
        const when = Date.parse(row?.updated || row?.ts || '');
        /* An unparseable date is left alone rather than guessed at */
        if (Number.isFinite(when) && when < cutoff) stale.push(id);
      } catch {
        /* Malformed entries are not this function's problem */
      }
    }

    if (!stale.length) return 0;
    await redis((['HDEL', 'chats'] as (string | number)[]).concat(stale));
    console.log(`[chats] pruned ${stale.length} conversation(s) older than ${MAX_AGE_DAYS} days`);
    return stale.length;
  } catch (error) {
    console.error('Chat prune failed, ignoring:', error);
    return 0;
  }
}

/* ---------------- Writing a conversation ----------------
   Never throws: a storage problem must never cost the visitor their reply,
   so failures fall back to the function log and the chat carries on. */

export async function saveChat(
  sid: string,
  vid: string,
  lang: string,
  messages: { from: string; text: string }[],
  noteArgs: Record<string, string> | null
): Promise<void> {
  const now = new Date().toISOString();
  /* Defensive: this runs after the visitor's reply has already been sent, so
     a throw here would surface as a second response attempt rather than a
     clean failure. Bad input becomes an empty transcript instead. */
  const trimmed = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && typeof m.text === 'string' && m.text)
    .slice(-60)
    .map((m) => ({ from: m.from === 'user' ? 'user' : 'bot', text: m.text.slice(0, 2000) }));

  if (!redisConfig()) {
    console.log('[chat — connect Upstash Redis in Vercel Storage to persist these]', { sid, noteArgs, turns: trimmed.length });
    return;
  }

  try {
    /* Read first so a returning turn keeps its original time, its read flag,
       and any details the assistant flagged earlier in the same visit. */
    let existing: Partial<StoredChat> = {};
    try {
      const raw = await redis(['HGET', 'chats', sid]);
      if (raw) existing = JSON.parse(raw);
    } catch {
      /* A corrupt or missing record just starts fresh */
    }

    const chat: StoredChat = {
      id: sid,
      /* Never let a later turn blank out an id the visit already had */
      visitor_id: vid || existing.visitor_id || '',
      ts: existing.ts || now,
      updated: now,
      /* Any new message makes the conversation unread again */
      read: false,
      lang,
      visitor_type: noteArgs?.visitor_type || existing.visitor_type || '',
      name: noteArgs?.name || existing.name || '',
      contact: noteArgs?.contact || existing.contact || '',
      note: noteArgs?.note ? String(noteArgs.note).slice(0, 4000) : existing.note || '',
      messages: trimmed
    };
    await redis(['HSET', 'chats', sid, JSON.stringify(chat)]);
  } catch (error) {
    console.error('Chat storage failed, logging instead:', error, { sid, noteArgs });
  }

  /* Separate from the write above: a failed sweep must not look like a
     failed save, and vice versa. */
  await pruneOldChats();
}
