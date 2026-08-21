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
    max-width: 380px; margin: 12vh auto 0;
    background: linear-gradient(180deg, #171d26 0%, #12171e 100%);
    border: 1px solid #262d38; border-radius: 18px; padding: 30px 28px 26px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, .55);
  }
  .lock-badge {
    display: flex; align-items: center; justify-content: center;
    width: 46px; height: 46px; margin-bottom: 16px; border-radius: 14px;
    background: rgba(79, 143, 247, .13); border: 1px solid rgba(79, 143, 247, .32);
    font-size: 20px;
  }
  .lock h1 { font-size: 19px; letter-spacing: -.01em; margin-bottom: 6px; }
  .lock .sub { color: #8b949e; font-size: 13px; line-height: 1.5; margin-bottom: 22px; }

  /* Each input owns its row, so the reveal button can sit inside it */
  .field { position: relative; margin-bottom: 11px; }
  .field input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1px solid #2b323d; background: #0b0f14; color: #e6edf3; font-size: 14px;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  .field.has-peek input { padding-right: 46px; }
  .field input::placeholder { color: #6b7683; }
  .field input:focus {
    outline: none; border-color: #4f8ff7; box-shadow: 0 0 0 3px rgba(79, 143, 247, .16);
  }
  .peek {
    position: absolute; top: 50%; right: 7px; transform: translateY(-50%);
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; padding: 0; border: none; border-radius: 8px;
    background: transparent; color: #7d8792; cursor: pointer;
    transition: color .15s ease, background-color .15s ease;
  }
  .peek:hover { color: #e6edf3; background: #1b2029; }
  .peek svg { width: 17px; height: 17px; }

  .remember {
    display: flex; align-items: center; gap: 9px; margin: 14px 0 18px;
    color: #8b949e; font-size: 13px; cursor: pointer; user-select: none;
  }
  .remember input { width: 15px; height: 15px; accent-color: #4f8ff7; cursor: pointer; }

  .lock button[type=submit] {
    width: 100%; padding: 11px; border: none; border-radius: 10px;
    background: linear-gradient(180deg, #5b97f8 0%, #3f7fe4 100%);
    color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: filter .15s ease, transform .1s ease;
  }
  .lock button[type=submit]:hover { filter: brightness(1.08); }
  .lock button[type=submit]:active { transform: translateY(1px); }
  .lock .err {
    color: #f85149; font-size: 13px; margin: 12px 0 0; min-height: 16px; text-align: center;
  }

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
  <div class="lock-badge">&#128274;</div>
  <h1>Private notes</h1>
  <p class="sub">Sign in to read what your AI assistant saved from visitors.</p>
  <form id="loginForm">
    <div class="field">
      <input id="user" name="username" placeholder="Username" autocomplete="username" autocapitalize="off" spellcheck="false">
    </div>
    <div class="field has-peek">
      <input id="pass" name="password" type="password" placeholder="Password" autocomplete="current-password">
      <button type="button" class="peek" id="peek" aria-label="Show password" title="Show password">
        <svg id="eyeOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3.2"/>
        </svg>
        <svg id="eyeShut" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden>
          <path d="M9.9 5.2A9.6 9.6 0 0 1 12 5c7 0 10.5 7 10.5 7a17 17 0 0 1-3.5 4.3M6.3 6.9A17 17 0 0 0 1.5 12S5 19 12 19a9.9 9.9 0 0 0 4.2-.9"/>
          <path d="m3 3 18 18"/>
        </svg>
      </button>
    </div>
    <label class="remember">
      <input type="checkbox" id="remember"> Keep me signed in on this device
    </label>
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

  /* Credentials live in sessionStorage by default, so they die with the tab.
     Ticking "keep me signed in" moves them to localStorage instead, which
     survives closing the browser. Reads check both. */
  const readCred = (key) => localStorage.getItem(key) || sessionStorage.getItem(key);
  const authHeader = () => 'Basic ' + btoa(readCred('nu') + ':' + readCred('np'));

  function saveCreds(user, pass, remember) {
    clearCreds();
    const store = remember ? localStorage : sessionStorage;
    store.setItem('nu', user);
    store.setItem('np', pass);
    if (remember) localStorage.setItem('nr', '1');
  }

  function clearCreds() {
    ['nu', 'np', 'nr'].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  function showLock(message) {
    $('app').hidden = true;
    $('lock').hidden = false;
    $('loginErr').textContent = message || '';
  }

  function logout() {
    clearCreds();
    $('pass').value = '';
    showLock('');
  }

  /* Reveal the password, so a typo in a field you cannot read is fixable */
  $('peek').addEventListener('click', () => {
    const showing = $('pass').type === 'text';
    $('pass').type = showing ? 'password' : 'text';
    $('eyeOpen').hidden = !showing;
    $('eyeShut').hidden = showing;
    const label = showing ? 'Show password' : 'Hide password';
    $('peek').setAttribute('aria-label', label);
    $('peek').setAttribute('title', label);
    $('pass').focus();
  });

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
    saveCreds($('user').value.trim(), $('pass').value, $('remember').checked);
    $('loginErr').textContent = '';
    load();
  });

  /* Prefill from a remembered sign-in, then go straight to the notes */
  if (localStorage.getItem('nr')) {
    $('remember').checked = true;
    $('user').value = readCred('nu') || '';
    $('pass').value = readCred('np') || '';
  }
  if (readCred('nu')) load();
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
