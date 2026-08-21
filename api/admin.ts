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
  .wrap { max-width: 1180px; }
  .bar { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
  .bar h1 { font-size: 26px; letter-spacing: -.02em; margin-right: auto; }
  .count { color: #8b949e; font-size: 13px; margin-bottom: 22px; }
  .btn {
    padding: 7px 13px; border-radius: 8px; border: 1px solid #30363d;
    background: #161b22; color: #e6edf3; font-size: 13px; cursor: pointer;
    transition: border-color .15s ease, background-color .15s ease;
  }
  .btn:hover { border-color: #4f8ff7; background: #1b2029; }
  .btn.danger { color: #f85149; }
  .btn.danger:hover { border-color: #f85149; }

  /* Filter chips */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
  .chip {
    padding: 6px 13px; border-radius: 999px; border: 1px solid #2b323d;
    background: transparent; color: #8b949e; font-size: 12.5px; cursor: pointer;
    transition: all .15s ease;
  }
  .chip:hover { color: #e6edf3; border-color: #3d4650; }
  .chip.on { background: #e6edf3; border-color: #e6edf3; color: #0d1116; font-weight: 600; }

  /* Sticky note grid */
  .grid {
    display: grid; gap: 18px;
    grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
  }
  .note-card {
    position: relative; display: flex; flex-direction: column;
    min-height: 208px; padding: 18px 16px 14px; border: none; text-align: left;
    border-radius: 3px 3px 2px 2px; cursor: pointer; color: #1a1a1a;
    font-family: inherit; font-size: 14px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, .35);
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .note-card:hover { transform: translateY(-4px) rotate(-.5deg); box-shadow: 0 16px 30px rgba(0, 0, 0, .45); }
  /* The paper curls very slightly, which is what sells it as a sticky note */
  .note-card::after {
    content: ''; position: absolute; right: 0; bottom: 0;
    border-width: 0 0 20px 20px; border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, .13) transparent;
  }
  .n-lead      { background: linear-gradient(160deg, #b8e6a0 0%, #a5dd8c 100%); }
  .n-recruiter { background: linear-gradient(160deg, #d9c2f0 0%, #cbb0e8 100%); }
  .n-visitor   { background: linear-gradient(160deg, #a9dcf0 0%, #93d1ea 100%); }
  .n-other     { background: linear-gradient(160deg, #ffd79a 0%, #ffc978 100%); }
  .n-none      { background: linear-gradient(160deg, #f2ede2 0%, #e6dfd0 100%); }

  .n-top { display: flex; align-items: center; gap: 8px; margin-bottom: 11px; }
  .n-badge {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px;
    padding: 3px 8px; border-radius: 4px; background: rgba(0, 0, 0, .14); color: #1a1a1a;
  }
  .n-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #e5484d; margin-left: auto;
    box-shadow: 0 0 0 3px rgba(229, 72, 77, .22);
  }
  .n-who { font-weight: 700; font-size: 14px; margin-bottom: 5px; word-break: break-word; }
  .n-body {
    font-size: 13px; line-height: 1.5; color: #2b2b2b; word-break: break-word;
    /* Only the gist belongs on the paper; the rest is in the modal */
    display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
  }
  .n-foot {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    margin-top: auto; padding-top: 12px; font-size: 11px; color: rgba(0, 0, 0, .55);
  }
  .n-turns { font-weight: 600; }

  /* Conversation modal */
  .modal {
    position: fixed; inset: 0; z-index: 50; display: flex; align-items: center;
    justify-content: center; padding: 4vh 16px;
    background: rgba(5, 7, 10, .78);
  }
  .sheet {
    display: flex; flex-direction: column; width: 100%; max-width: 680px; max-height: 92vh;
    background: #12171e; border: 1px solid #262d38; border-radius: 16px; overflow: hidden;
    box-shadow: 0 30px 80px rgba(0, 0, 0, .6);
  }
  .sheet-head { padding: 20px 22px 16px; border-bottom: 1px solid #222932; }
  .sheet-head .row { display: flex; align-items: center; gap: 9px; margin-bottom: 10px; }
  .sheet-head h2 { font-size: 17px; margin-right: auto; }
  .x {
    border: none; background: transparent; color: #8b949e; font-size: 22px;
    line-height: 1; cursor: pointer; padding: 0 4px;
  }
  .x:hover { color: #e6edf3; }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: 12.5px; color: #8b949e; }
  .meta b { color: #e6edf3; font-weight: 600; }
  .summary {
    margin-top: 14px; padding: 12px 14px; border-radius: 10px;
    background: rgba(79, 143, 247, .08); border: 1px solid rgba(79, 143, 247, .22);
    font-size: 13px; line-height: 1.55; color: #cdd9e5;
  }
  .summary span { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .7px; color: #6f9fe8; margin-bottom: 5px; font-weight: 700; }

  .thread { padding: 18px 22px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
  .msg { max-width: 82%; padding: 10px 13px; border-radius: 13px; font-size: 13.5px; line-height: 1.55; white-space: pre-wrap; word-break: break-word; }
  .msg.user { align-self: flex-end; background: #e6edf3; color: #0d1116; border-bottom-right-radius: 4px; }
  .msg.bot { align-self: flex-start; background: #1c232c; color: #cdd9e5; border: 1px solid #262d38; border-bottom-left-radius: 4px; }
  .msg-who { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .6px; opacity: .55; margin-bottom: 4px; font-weight: 700; }
  .no-thread { color: #6e7681; font-size: 13px; text-align: center; padding: 26px 0; }
  .sheet-foot { display: flex; gap: 8px; padding: 14px 22px; border-top: 1px solid #222932; }

  .empty { color: #8b949e; text-align: center; padding: 70px 0; font-size: 14px; }
  [hidden] { display: none !important; }
  @media (max-width: 560px) {
    .grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
    .note-card { min-height: 176px; }
  }
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
    <h1>Notes</h1>
    <button class="btn" onclick="load()">Refresh</button>
    <button class="btn" onclick="logout()">Log out</button>
  </div>
  <p class="count" id="count"></p>
  <div class="filters" id="filters"></div>
  <div class="grid" id="list"></div>
</div>

<div class="modal" id="modal" hidden>
  <div class="sheet" id="sheet">
    <div class="sheet-head">
      <div class="row">
        <span class="n-badge" id="mBadge"></span>
        <h2 id="mTitle"></h2>
        <button class="x" onclick="closeModal()" aria-label="Close">&times;</button>
      </div>
      <div class="meta" id="mMeta"></div>
      <div class="summary" id="mSummary" hidden></div>
    </div>
    <div class="thread" id="mThread"></div>
    <div class="sheet-foot">
      <button class="btn" id="mRead"></button>
      <button class="btn danger" id="mDel">Delete</button>
    </div>
  </div>
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

  let chats = [];
  let filter = 'all';
  let openId = null;

  const TYPES = ['lead', 'recruiter', 'visitor', 'other'];
  const typeOf = (c) => (TYPES.indexOf(c.visitor_type) >= 0 ? c.visitor_type : '');

  /* The assistant answers in a small markdown subset for the chat bubbles.
     Those markers are noise here, so they come off before display. */
  function plain(text) {
    return String(text == null ? '' : text)
      .replace(/\\*\\*(.+?)\\*\\*/g, '$1')
      .replace(/~(.+?)~/g, '$1')
      .replace(/^##\\s*/gm, '')
      .trim();
  }

  const firstAsk = (c) => {
    const said = (c.messages || []).filter((m) => m.from === 'user');
    return said.length ? said[0].text : '';
  };

  /* What goes on the paper: the assistant's own summary if it wrote one,
     otherwise what the visitor opened with. */
  const gist = (c) => plain(c.note) || plain(firstAsk(c)) || 'Opened the chat but did not say anything yet.';

  function shortDate(value) {
    const date = new Date(value);
    const today = new Date();
    const sameDay = date.toDateString() === today.toDateString();
    return sameDay
      ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      : date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  }

  function renderFilters() {
    const counts = { all: chats.length, unread: chats.filter((c) => !c.read).length };
    TYPES.forEach((t) => { counts[t] = chats.filter((c) => typeOf(c) === t).length; });
    const keys = ['all', 'unread'].concat(TYPES.filter((t) => counts[t] > 0));
    $('filters').innerHTML = keys.map((key) =>
      '<button class="chip ' + (filter === key ? 'on' : '') + '" data-f="' + key + '">' +
        key.charAt(0).toUpperCase() + key.slice(1) + ' ' + counts[key] +
      '</button>'
    ).join('');
    Array.prototype.forEach.call($('filters').querySelectorAll('.chip'), (chip) => {
      chip.onclick = () => { filter = chip.getAttribute('data-f'); renderFilters(); renderCards(); };
    });
  }

  function visible() {
    if (filter === 'all') return chats;
    if (filter === 'unread') return chats.filter((c) => !c.read);
    return chats.filter((c) => typeOf(c) === filter);
  }

  function renderCards() {
    const rows = visible();
    if (!rows.length) {
      $('list').innerHTML = '<div class="empty">Nothing here yet. Conversations appear as soon as someone talks to your assistant.</div>';
      return;
    }
    $('list').innerHTML = rows.map((c) => {
      const type = typeOf(c);
      const who = c.name || c.contact || 'Anonymous visitor';
      const turns = (c.messages || []).filter((m) => m.from === 'user').length;
      return (
        '<button class="note-card n-' + (type || 'none') + '" data-id="' + escapeHtml(c.id) + '">' +
          '<div class="n-top">' +
            (type ? '<span class="n-badge">' + type + '</span>' : '') +
            (c.read ? '' : '<span class="n-dot" title="Unread"></span>') +
          '</div>' +
          '<div class="n-who">' + escapeHtml(who) + '</div>' +
          '<div class="n-body">' + escapeHtml(gist(c)) + '</div>' +
          '<div class="n-foot">' +
            '<span>' + escapeHtml(shortDate(c.updated || c.ts)) + '</span>' +
            (turns ? '<span class="n-turns">' + turns + ' message' + (turns === 1 ? '' : 's') + '</span>' : '') +
          '</div>' +
        '</button>'
      );
    }).join('');
    Array.prototype.forEach.call($('list').querySelectorAll('.note-card'), (card) => {
      card.onclick = () => openModal(card.getAttribute('data-id'));
    });
  }

  function render() {
    const unread = chats.filter((c) => !c.read).length;
    $('count').textContent = chats.length + ' conversation' + (chats.length === 1 ? '' : 's') +
      (unread ? ' · ' + unread + ' unread' : '');
    renderFilters();
    renderCards();
  }

  /* ---- Conversation modal ---- */

  function openModal(id) {
    const chat = chats.filter((c) => c.id === id)[0];
    if (!chat) return;
    openId = id;

    const type = typeOf(chat);
    $('mBadge').textContent = type || 'chat';
    $('mBadge').style.background = 'rgba(255,255,255,.09)';
    $('mBadge').style.color = '#cdd9e5';
    $('mTitle').textContent = chat.name || chat.contact || 'Anonymous visitor';

    const bits = ['<span>' + escapeHtml(new Date(chat.ts).toLocaleString()) + '</span>'];
    if (chat.contact) bits.push('<span>Contact: <b>' + escapeHtml(chat.contact) + '</b></span>');
    if (chat.lang) bits.push('<span>Language: <b>' + escapeHtml(chat.lang) + '</b></span>');
    $('mMeta').innerHTML = bits.join('');

    if (chat.note) {
      $('mSummary').innerHTML = '<span>What the assistant flagged</span>' + escapeHtml(plain(chat.note));
      $('mSummary').hidden = false;
    } else {
      $('mSummary').hidden = true;
    }

    const messages = chat.messages || [];
    $('mThread').innerHTML = messages.length
      ? messages.map((m) => {
          const mine = m.from === 'user';
          return '<div class="msg ' + (mine ? 'user' : 'bot') + '">' +
            '<span class="msg-who">' + (mine ? 'Visitor' : 'Assistant') + '</span>' +
            escapeHtml(plain(m.text)) +
          '</div>';
        }).join('')
      : '<div class="no-thread">This one was saved before full conversations were kept, so only the summary above survives.</div>';

    $('mRead').textContent = chat.read ? 'Mark unread' : 'Mark read';
    $('mRead').onclick = () => { toggleRead(id); closeModal(); };
    $('mDel').onclick = () => { del(id); };

    $('modal').hidden = false;
    $('mThread').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    openId = null;
    $('modal').hidden = true;
    document.body.style.overflow = '';
  }

  $('modal').addEventListener('click', (event) => {
    if (event.target === $('modal')) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('modal').hidden) closeModal();
  });

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
    chats = data.chats || [];
    $('lock').hidden = true;
    $('app').hidden = false;
    render();
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
  function del(id) {
    if (!confirm('Delete this conversation permanently?')) return;
    closeModal();
    act('delete', id);
  }

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
