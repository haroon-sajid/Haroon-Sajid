/* Vercel serverless function: GET /api/admin — Haroon's hidden notes page.

   Not linked anywhere on the site and marked noindex, so only someone with
   the URL — and the ADMIN_USER / ADMIN_PASS credentials — can use it.
   It is a single self-contained HTML page (no React, ships nothing to the
   public bundle) that talks to /api/notes with Basic auth kept in
   sessionStorage. Designed so more panels (blog, CRM, …) can be added later. */

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Notes — Private</title>
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    background: #0d1116; color: #e6edf3; min-height: 100vh;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  .wrap { max-width: 760px; margin: 0 auto; padding: 32px 16px 64px; }

  /* Lock screen */
  .lock {
    max-width: 360px; margin: 14vh auto 0; background: #161b22;
    border: 1px solid #30363d; border-radius: 14px; padding: 28px;
  }
  .lock h1 { font-size: 20px; margin-bottom: 4px; }
  .lock p { color: #8b949e; font-size: 13px; margin-bottom: 18px; }
  .lock input {
    width: 100%; margin-bottom: 10px; padding: 10px 12px; border-radius: 8px;
    border: 1px solid #30363d; background: #0d1116; color: #e6edf3; font-size: 14px;
  }
  .lock input:focus { outline: none; border-color: #4f8ff7; }
  .lock button {
    width: 100%; padding: 10px; border: none; border-radius: 8px;
    background: #4f8ff7; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
  }
  .lock .err { color: #f85149; font-size: 13px; margin: 10px 0 0; min-height: 16px; }

  /* Dashboard */
  .bar { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .bar h1 { font-size: 20px; margin-right: auto; }
  .count { color: #8b949e; font-size: 13px; }
  .btn {
    padding: 7px 12px; border-radius: 8px; border: 1px solid #30363d;
    background: #161b22; color: #e6edf3; font-size: 13px; cursor: pointer;
  }
  .btn:hover { border-color: #4f8ff7; }
  .card {
    background: #161b22; border: 1px solid #30363d; border-radius: 12px;
    padding: 16px; margin-bottom: 12px;
  }
  .card.unread { border-left: 3px solid #4f8ff7; }
  .card .top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
  .badge {
    font-size: 11px; padding: 2px 9px; border-radius: 999px; font-weight: 600;
    text-transform: uppercase; letter-spacing: .4px;
  }
  .badge.lead { background: #1f3524; color: #56d364; }
  .badge.recruiter { background: #341f3e; color: #d2a8ff; }
  .badge.visitor { background: #1c2f45; color: #79c0ff; }
  .badge.other { background: #2d2a1f; color: #e3b341; }
  .when { color: #8b949e; font-size: 12px; }
  .who { color: #8b949e; font-size: 13px; margin-bottom: 8px; }
  .who b { color: #e6edf3; font-weight: 600; }
  .note { font-size: 14px; line-height: 1.55; white-space: pre-wrap; word-break: break-word; }
  .actions { display: flex; gap: 8px; margin-top: 12px; }
  .actions .btn { font-size: 12px; padding: 5px 10px; }
  .btn.danger { color: #f85149; }
  .btn.danger:hover { border-color: #f85149; }
  .empty { color: #8b949e; text-align: center; padding: 60px 0; font-size: 14px; }
  [hidden] { display: none !important; }
</style>
</head>
<body>

<div id="lock" class="lock">
  <h1>&#128274; Private notes</h1>
  <p>Sign in to view your AI assistant's notes.</p>
  <form id="loginForm">
    <input id="user" placeholder="Username" autocomplete="username">
    <input id="pass" type="password" placeholder="Password" autocomplete="current-password">
    <button type="submit">Unlock</button>
    <p class="err" id="loginErr"></p>
  </form>
</div>

<div id="app" class="wrap" hidden>
  <div class="bar">
    <h1>&#128221; Notes</h1>
    <span class="count" id="count"></span>
    <button class="btn" onclick="load()">Refresh</button>
    <button class="btn" onclick="logout()">Log out</button>
  </div>
  <div id="list"></div>
</div>

<script>
  const $ = (id) => document.getElementById(id);
  const authHeader = () =>
    'Basic ' + btoa(sessionStorage.getItem('nu') + ':' + sessionStorage.getItem('np'));

  function showLock(message) {
    $('app').hidden = true;
    $('lock').hidden = false;
    $('loginErr').textContent = message || '';
  }

  function logout() {
    sessionStorage.removeItem('nu');
    sessionStorage.removeItem('np');
    showLock('');
  }

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  function render(notes) {
    const unread = notes.filter((n) => !n.read).length;
    $('count').textContent = notes.length + ' notes · ' + unread + ' unread';
    if (!notes.length) {
      $('list').innerHTML = '<div class="empty">No notes yet — they will appear here when visitors talk to your AI assistant.</div>';
      return;
    }
    $('list').innerHTML = notes.map((n) => {
      const type = ['lead', 'recruiter', 'visitor'].includes(n.visitor_type) ? n.visitor_type : 'other';
      const who = [n.name, n.contact].filter(Boolean).map(escapeHtml).join(' · ');
      return (
        '<div class="card ' + (n.read ? '' : 'unread') + '">' +
          '<div class="top">' +
            '<span class="badge ' + type + '">' + escapeHtml(type) + '</span>' +
            '<span class="when">' + new Date(n.ts).toLocaleString() + '</span>' +
          '</div>' +
          (who ? '<div class="who">From: <b>' + who + '</b></div>' : '') +
          '<div class="note">' + escapeHtml(n.note) + '</div>' +
          '<div class="actions">' +
            '<button class="btn" onclick="toggleRead(\\'' + n.id + '\\')">' + (n.read ? 'Mark unread' : 'Mark read') + '</button>' +
            '<button class="btn danger" onclick="del(\\'' + n.id + '\\')">Delete</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  async function load() {
    const response = await fetch('/api/notes', { headers: { Authorization: authHeader() } });
    if (response.status === 401) { logout(); $('loginErr').textContent = 'Wrong username or password.'; return; }
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      $('list').innerHTML = '<div class="empty">' + escapeHtml(data.error || 'Something went wrong.') + '</div>';
      $('lock').hidden = true; $('app').hidden = false;
      return;
    }
    const data = await response.json();
    $('lock').hidden = true;
    $('app').hidden = false;
    render(data.notes);
  }

  async function act(action, id) {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, id })
    });
    load();
  }
  function toggleRead(id) { act('toggle_read', id); }
  function del(id) { if (confirm('Delete this note permanently?')) act('delete', id); }

  $('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    sessionStorage.setItem('nu', $('user').value.trim());
    sessionStorage.setItem('np', $('pass').value);
    $('loginErr').textContent = '';
    load();
  });

  /* Already unlocked in this tab — go straight to the notes */
  if (sessionStorage.getItem('nu')) load();
</script>
</body>
</html>`;

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(200).send(PAGE);
}
