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
  /* Every colour on this page is a token, so light and dark are the same
     stylesheet with one block swapped. Dark is the base; the theme follows
     the operating system unless the toggle has stored a choice. */
  :root {
    --bg: #0d1116;
    --panel: #12171e;
    --panel-2: #171d26;
    --sunk: #0b0f14;
    --line: #262d38;
    --line-soft: #222932;
    --ink: #e6edf3;
    --ink-2: #cdd9e5;
    --muted: #8b949e;
    --muted-2: #6e7681;
    --blue: #4f8ff7;
    --danger: #f85149;
    --shadow: rgba(0, 0, 0, .55);
    --shadow-card: rgba(0, 0, 0, .35);
    --veil: rgba(5, 7, 10, .78);
    --hover: #1b2029;
    --chip-on-bg: #e6edf3;
    --chip-on-ink: #0d1116;
    --curl: rgba(0, 0, 0, .13);
    --turf: #1f4a22;
    --blade-a: rgba(255, 255, 255, .05);
    --blade-b: rgba(0, 0, 0, .16);
    --blade-c: rgba(120, 200, 110, .07);
  }
  @media (prefers-color-scheme: light) {
    :root:not([data-theme="dark"]) {
      --bg: #f4f5f7;
      --panel: #ffffff;
      --panel-2: #ffffff;
      --sunk: #f7f8fa;
      --line: #e0e3e8;
      --line-soft: #eaecf0;
      --ink: #10151c;
      --ink-2: #39424f;
      --muted: #5f6874;
      --muted-2: #8a929c;
      --blue: #2f6fd8;
      --danger: #d1242f;
      --shadow: rgba(16, 21, 28, .16);
      --shadow-card: rgba(16, 21, 28, .13);
      --veil: rgba(16, 21, 28, .55);
      --hover: #f0f2f5;
      --chip-on-bg: #10151c;
      --chip-on-ink: #ffffff;
      --curl: rgba(0, 0, 0, .10);
      --turf: #2f7a33;
      --blade-a: rgba(255, 255, 255, .09);
      --blade-b: rgba(0, 0, 0, .13);
      --blade-c: rgba(170, 230, 150, .10);
    }
  }
  :root[data-theme="light"] {
    --bg: #f4f5f7;
    --panel: #ffffff;
    --panel-2: #ffffff;
    --sunk: #f7f8fa;
    --line: #e0e3e8;
    --line-soft: #eaecf0;
    --ink: #10151c;
    --ink-2: #39424f;
    --muted: #5f6874;
    --muted-2: #8a929c;
    --blue: #2f6fd8;
    --danger: #d1242f;
    --shadow: rgba(16, 21, 28, .16);
    --shadow-card: rgba(16, 21, 28, .13);
    --veil: rgba(16, 21, 28, .55);
    --hover: #f0f2f5;
    --chip-on-bg: #10151c;
    --chip-on-ink: #ffffff;
    --curl: rgba(0, 0, 0, .10);
    --turf: #2f7a33;
    --blade-a: rgba(255, 255, 255, .09);
    --blade-b: rgba(0, 0, 0, .13);
    --blade-c: rgba(170, 230, 150, .10);
  }

  * { box-sizing: border-box; margin: 0; }

  /* ---- The board ----
     Artificial turf, built entirely from gradients so the page stays one
     self-contained file with no image requests. Three layers do the work:
     fine near-vertical strokes in two directions for the blades, a coarser
     set for clumping, and an SVG turbulence speckle for the organic noise
     that keeps repeating gradients from looking like wallpaper. A vignette
     sits on top so the middle reads as lit. */
  body {
    background-color: var(--turf);
    background-image:
      radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, .10), transparent 60%),
      radial-gradient(ellipse at 50% 120%, rgba(0, 0, 0, .38), transparent 65%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85 0.35' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.30'/%3E%3C/svg%3E"),
      repeating-linear-gradient(84deg, var(--blade-a) 0 1px, transparent 1px 5px),
      repeating-linear-gradient(96deg, var(--blade-b) 0 1px, transparent 1px 6px),
      repeating-linear-gradient(88deg, var(--blade-c) 0 2px, transparent 2px 11px);
    background-attachment: fixed, fixed, scroll, scroll, scroll, scroll;
    color: var(--ink);
    min-height: 100vh;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  .wrap { max-width: 760px; margin: 0 auto; padding: 32px 16px 64px; }

  /* Theme toggle, top right of the viewport on both screens */
  .theme-btn {
    position: fixed; top: 18px; right: 18px; z-index: 80;
    display: flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; padding: 0; border-radius: 10px;
    border: 1px solid var(--line); background: var(--panel); color: var(--muted);
    cursor: pointer; font-size: 16px; line-height: 1;
    transition: color .15s ease, border-color .15s ease, background-color .15s ease;
  }
  .theme-btn:hover { color: var(--ink); border-color: var(--blue); background: var(--hover); }

  /* Lock screen */
  .lock {
    max-width: 380px; margin: 12vh auto 0;
    background: linear-gradient(180deg, var(--panel-2) 0%, var(--panel) 100%);
    border: 1px solid var(--line); border-radius: 18px; padding: 30px 28px 26px;
    box-shadow: 0 24px 60px var(--shadow);
  }
  .lock-badge {
    display: flex; align-items: center; justify-content: center;
    width: 46px; height: 46px; margin-bottom: 16px; border-radius: 14px;
    background: rgba(79, 143, 247, .13); border: 1px solid rgba(79, 143, 247, .32);
    font-size: 20px;
  }
  .lock h1 { font-size: 19px; letter-spacing: -.01em; margin-bottom: 6px; }
  .lock .sub { color: var(--muted); font-size: 13px; line-height: 1.5; margin-bottom: 22px; }

  /* Each input owns its row, so the reveal button can sit inside it */
  .field { position: relative; margin-bottom: 11px; }
  .field input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1px solid var(--line); background: var(--sunk); color: var(--ink); font-size: 14px;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  .field.has-peek input { padding-right: 46px; }
  .field input::placeholder { color: var(--muted-2); }
  .field input:focus {
    outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(79, 143, 247, .16);
  }
  .peek {
    position: absolute; top: 50%; right: 7px; transform: translateY(-50%);
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; padding: 0; border: none; border-radius: 8px;
    background: transparent; color: var(--muted); cursor: pointer;
    transition: color .15s ease, background-color .15s ease;
  }
  .peek:hover { color: var(--ink); background: var(--hover); }
  .peek svg { width: 17px; height: 17px; }

  .remember {
    display: flex; align-items: center; gap: 9px; margin: 14px 0 18px;
    color: var(--muted); font-size: 13px; cursor: pointer; user-select: none;
  }
  .remember input { width: 15px; height: 15px; accent-color: var(--blue); cursor: pointer; }

  .lock button[type=submit] {
    width: 100%; padding: 11px; border: none; border-radius: 10px;
    background: linear-gradient(180deg, #5b97f8 0%, #3f7fe4 100%);
    color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: filter .15s ease, transform .1s ease;
  }
  .lock button[type=submit]:hover { filter: brightness(1.08); }
  .lock button[type=submit]:active { transform: translateY(1px); }
  .lock .err {
    color: var(--danger); font-size: 13px; margin: 12px 0 0; min-height: 16px; text-align: center;
  }

  /* Dashboard */
  .wrap { max-width: 1180px; }

  /* ---- Board header ----
     A solid plaque, not the grass, is what the title and counts sit on. The
     turf tokens gave the earlier version its texture but nowhere near enough
     contrast for small grey text, which is why the visit count read as
     blank. This bar owns its own background, sticks to the top so it stays
     reachable while the board scrolls, and everything inside it uses the
     same panel-paired tokens as the lock screen, which were built for
     exactly this contrast. */
  .board-header {
    position: sticky; top: 0; z-index: 40;
    background: var(--panel);
    border-top: 3px solid var(--blue);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 8px 24px rgba(0, 0, 0, .28);
  }
  .board-header-inner {
    max-width: 1180px; margin: 0 auto; padding: 20px 16px 14px;
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .board-title h1 {
    font-size: 25px; font-weight: 800; letter-spacing: -.02em; color: var(--ink);
  }
  .count { color: var(--muted); font-size: 13px; margin-top: 4px; }
  .board-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .btn {
    padding: 7px 13px; border-radius: 8px; border: 1px solid var(--line);
    background: var(--panel-2); color: var(--ink); font-size: 13px; cursor: pointer;
    transition: border-color .15s ease, background-color .15s ease;
  }
  .btn:hover { border-color: var(--blue); background: var(--hover); }
  .btn.danger { color: var(--danger); }
  .btn.danger:hover { border-color: var(--danger); }

  /* Filter chips */
  .filters {
    display: flex; gap: 8px; flex-wrap: wrap;
    max-width: 1180px; margin: 0 auto; padding: 0 16px 16px;
  }
  .chip {
    padding: 6px 13px; border-radius: 999px; border: 1px solid var(--line);
    background: transparent; color: var(--muted); font-size: 12.5px; cursor: pointer;
    transition: all .15s ease;
  }
  .chip:hover { color: var(--ink); border-color: var(--line); }
  .chip.on { background: var(--ink); border-color: var(--ink); color: var(--chip-on-ink); font-weight: 600; }

  /* Sticky note grid.
     position: relative makes this the anchor a dragged note's left/top
     percentages are measured against. It stays underneath the notes that
     are still in normal grid flow, and a min-height keeps the board from
     collapsing if every visible note has been pulled out of that flow. */
  .grid {
    position: relative;
    display: grid; gap: 18px; min-height: 60vh;
    grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
    padding-top: 10px;
  }
  .note-card {
    position: relative; display: flex; flex-direction: column;
    /* Top padding clears the pin that sits over the paper */
    min-height: 208px; padding: 30px 16px 14px; border: none; text-align: left;
    border-radius: 2px; cursor: grab; color: #1a1a1a; touch-action: none;
    font-family: inherit; font-size: 14px;
    /* Two shadows: a tight one where the paper meets the board, and a soft
       wide one so the note reads as lifted off it */
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 10px 22px rgba(0, 0, 0, .35);
    transition: transform .18s ease, box-shadow .18s ease;
  }
  /* Pulled out of the grid to sit wherever it was dropped. left is a
     percentage of the board's width, so a layout saved on a wide screen
     still lands somewhere sane on a phone; top is plain pixels, since the
     board's height is auto (min-height plus whatever content gives it), and
     a percentage top against an auto-height container is not reliably
     computable, only an offset from the top edge is. */
  .note-card.placed { position: absolute; width: 232px; }
  .note-card.dragging {
    cursor: grabbing; z-index: 30; transition: none !important;
    transform: rotate(0deg) scale(1.04) !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .35), 0 26px 44px rgba(0, 0, 0, .5) !important;
  }
  /* Pinned paper never hangs perfectly straight. Cycling four small angles
     keeps the wall from looking like a spreadsheet, and the rotation origin
     is the pin itself so each note appears to hang from it. */
  .note-card { transform-origin: 50% 6px; }
  .note-card:nth-child(4n+1) { transform: rotate(-1.1deg); }
  .note-card:nth-child(4n+2) { transform: rotate(.8deg); }
  .note-card:nth-child(4n+3) { transform: rotate(-.5deg); }
  .note-card:nth-child(4n+4) { transform: rotate(1.3deg); }
  .note-card:hover {
    transform: rotate(0deg) translateY(-5px) scale(1.02);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3), 0 20px 38px rgba(0, 0, 0, .45);
    z-index: 3;
  }

  /* ---- Pushpin ----
     Drawn rather than an image: a metal needle behind a domed head, with a
     specular highlight offset to the top left so every pin on the board is
     lit from the same direction. */
  .pin {
    position: absolute; top: -7px; left: 50%; margin-left: -9px;
    width: 18px; height: 18px; z-index: 2;
  }
  .pin::before {
    content: ''; position: absolute; left: 50%; top: 10px;
    width: 3px; height: 10px; margin-left: -1.5px; border-radius: 0 0 1px 1px;
    background: linear-gradient(90deg, #6e7681, #c9ccd1 45%, #6e7681);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .4);
  }
  .pin::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background:
      radial-gradient(circle at 33% 28%, rgba(255, 255, 255, .95), rgba(255, 255, 255, 0) 42%),
      radial-gradient(circle at 60% 68%, var(--pin-dark), var(--pin) 70%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, .45), inset 0 -1px 2px rgba(0, 0, 0, .3);
  }
  /* Pin colour keys to the visitor type, like the paper does */
  .n-lead      { --pin: #e0453f; --pin-dark: #a81f1a; }
  .n-recruiter { --pin: #8b5cf6; --pin-dark: #5b2fb8; }
  .n-visitor   { --pin: #2f7fd8; --pin-dark: #1a4f8f; }
  .n-other     { --pin: #f0a020; --pin-dark: #b06f00; }
  .n-none      { --pin: #e05a8a; --pin-dark: #a82458; }
  /* The paper curls very slightly, which is what sells it as a sticky note */
  .note-card::after {
    content: ''; position: absolute; right: 0; bottom: 0;
    border-width: 0 0 20px 20px; border-style: solid;
    border-color: transparent transparent var(--curl) transparent;
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
  /* Marks a note as one of several from the same person */
  .n-visit {
    font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px;
    padding: 3px 7px; border-radius: 4px; white-space: nowrap;
    background: rgba(0, 0, 0, .55); color: #f4f4f4;
  }
  .n-visit + .n-dot { margin-left: 0; }
  .n-who { font-weight: 700; font-size: 14px; margin-bottom: 3px; word-break: break-word; }
  /* A real email or phone number is the most valuable thing on the card, so
     it gets its own line rather than being buried in the body text */
  .n-contact {
    display: inline-block; margin-bottom: 7px; padding: 2px 7px; border-radius: 4px;
    background: rgba(0, 0, 0, .10); font-size: 11.5px; font-weight: 600;
    color: #1f1f1f; word-break: break-all;
  }
  .n-body {
    font-size: 13px; line-height: 1.5; color: #2b2b2b; word-break: break-word;
    /* Only the gist belongs on the paper; the rest is in the modal */
    display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
  }
  .n-foot {
    display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
    margin-top: auto; padding-top: 12px; font-size: 10.5px; color: rgba(0, 0, 0, .58);
  }
  /* The stamp is the fixed half; the count gives way if the card is narrow */
  .n-when { white-space: nowrap; font-weight: 600; }
  .n-turns { flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Conversation modal */
  .modal {
    position: fixed; inset: 0; z-index: 50; display: flex; align-items: center;
    justify-content: center; padding: 4vh 16px;
    background: var(--veil);
  }
  .sheet {
    display: flex; flex-direction: column; width: 100%; max-width: 680px; max-height: 92vh;
    background: var(--panel); border: 1px solid var(--line); border-radius: 16px; overflow: hidden;
    box-shadow: 0 30px 80px var(--shadow);
  }
  .sheet-head { padding: 20px 22px 16px; border-bottom: 1px solid var(--line-soft); }
  .sheet-head .row { display: flex; align-items: center; gap: 9px; margin-bottom: 10px; }
  .sheet-badge { background: var(--sunk); border: 1px solid var(--line); color: var(--muted); }
  .sheet-head h2 { font-size: 17px; margin-right: auto; }
  .x {
    border: none; background: transparent; color: var(--muted); font-size: 22px;
    line-height: 1; cursor: pointer; padding: 0 4px;
  }
  .x:hover { color: var(--ink); }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: 12.5px; color: var(--muted); }
  .meta b { color: var(--ink); font-weight: 600; }
  .summary {
    margin-top: 14px; padding: 12px 14px; border-radius: 10px;
    background: rgba(79, 143, 247, .08); border: 1px solid rgba(79, 143, 247, .22);
    font-size: 13px; line-height: 1.55; color: var(--ink-2);
  }
  .summary span { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .7px; color: var(--blue); margin-bottom: 5px; font-weight: 700; }

  /* Every conversation this same person has had, so a returning lead reads
     as one relationship instead of several unrelated notes */
  .visits { margin-top: 12px; }
  .visits > span {
    display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .7px;
    color: var(--muted); margin-bottom: 7px; font-weight: 700;
  }
  .visit-link {
    display: block; width: 100%; text-align: left; margin-bottom: 5px;
    padding: 8px 11px; border-radius: 8px; border: 1px solid var(--line);
    background: var(--sunk); color: var(--ink-2); font-size: 12.5px;
    font-family: inherit; cursor: pointer;
    transition: border-color .15s ease, background-color .15s ease;
  }
  .visit-link:hover { border-color: var(--blue); background: var(--hover); }
  .visit-link.current {
    cursor: default; color: var(--muted); border-style: dashed; background: transparent;
  }

  .thread { padding: 18px 22px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
  .msg { max-width: 82%; padding: 10px 13px; border-radius: 13px; font-size: 13.5px; line-height: 1.55; white-space: pre-wrap; word-break: break-word; }
  .msg.user { align-self: flex-end; background: var(--ink); color: var(--chip-on-ink); border-bottom-right-radius: 4px; }
  .msg.bot { align-self: flex-start; background: var(--sunk); color: var(--ink-2); border: 1px solid var(--line); border-bottom-left-radius: 4px; }
  .msg-who { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .6px; opacity: .55; margin-bottom: 4px; font-weight: 700; }
  .no-thread { color: var(--muted-2); font-size: 13px; text-align: center; padding: 26px 0; }
  .sheet-foot { display: flex; gap: 8px; padding: 14px 22px; border-top: 1px solid var(--line-soft); }

  .empty { color: var(--muted); text-align: center; padding: 70px 0; font-size: 14px; }
  [hidden] { display: none !important; }
  @media (max-width: 560px) {
    .grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
    .note-card { min-height: 176px; }
  }
</style>
</head>
<body>

<button class="theme-btn" id="themeBtn" aria-label="Switch theme" title="Switch theme"></button>

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

<div id="app" hidden>
  <header class="board-header">
    <div class="board-header-inner">
      <div class="board-title">
        <h1>Notes for Haroon</h1>
        <p class="count" id="count"></p>
      </div>
      <div class="board-actions">
        <button class="btn" onclick="load()">Refresh</button>
        <button class="btn" id="resetLayoutBtn">Reset layout</button>
        <button class="btn" onclick="logout()">Log out</button>
      </div>
    </div>
    <div class="filters" id="filters"></div>
  </header>
  <div class="wrap">
    <div class="grid" id="list"></div>
  </div>
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
      <div class="visits" id="mVisits" hidden></div>
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

  /* ---- Theme ----
     No stored choice means follow the operating system, which is what the
     media query already does, so nothing is stamped on the root until the
     toggle is actually used. */
  const prefersDark = () =>
    !window.matchMedia || !window.matchMedia('(prefers-color-scheme: light)').matches;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') ||
      (prefersDark() ? 'dark' : 'light');
  }

  function paintThemeButton() {
    /* Show where the toggle will take you, not where you already are */
    $('themeBtn').textContent = currentTheme() === 'dark' ? '☀' : '☾';
  }

  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    paintThemeButton();
  }

  try {
    const saved = localStorage.getItem('notes-theme');
    if (saved === 'light' || saved === 'dark') applyTheme(saved);
  } catch {
    /* private mode, fall through to the system preference */
  }
  paintThemeButton();

  $('themeBtn').addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('notes-theme', next); } catch {}
  });

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

  /* Every string on this page comes from a stranger on the internet, so it
     is escaped before it is ever concatenated into markup.

     Quotes are escaped too, which the obvious textContent/innerHTML trick
     does NOT do. That matters because this value also lands inside
     attributes (data-id, title), where an unescaped double quote would end
     the attribute early and let the rest of the payload become a new one,
     such as an onmouseover handler. Escaping all five characters makes the
     output safe in both text and attribute position. */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let chats = [];
  let filter = 'all';
  let openId = null;

  /* ---- Board layout ----
     Where each note has been dragged to, as a percentage of the board's own
     width and height rather than raw pixels, so a layout saved on a wide
     monitor still lands somewhere sane on a phone. Kept in localStorage: this
     is one admin's personal arrangement, not something visitors or other
     data touches, so it belongs next to the theme choice, not in Redis. */
  const POSITIONS_KEY = 'notes-positions';
  let positions = {};
  try {
    positions = JSON.parse(localStorage.getItem(POSITIONS_KEY) || '{}') || {};
  } catch {
    positions = {};
  }
  function savePositions() {
    try { localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions)); } catch {}
  }

  /* Set by a drag right before the browser's own click event would fire, so
     the tap that ends a drag does not also reopen the conversation you just
     finished repositioning. */
  let suppressClick = false;

  /* Pointer events cover mouse, touch and pen in one API. A drag only
     starts once the pointer has actually moved a few pixels, so an ordinary
     tap still opens the modal instead of being swallowed as a micro-drag. */
  function enableDrag(card) {
    const id = card.getAttribute('data-id');
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let boardRect = null;

    card.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      dragging = false;
      startX = event.clientX;
      startY = event.clientY;
      boardRect = $('list').getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      startLeft = cardRect.left - boardRect.left;
      startTop = cardRect.top - boardRect.top;
      card.setPointerCapture(event.pointerId);
    });

    card.addEventListener('pointermove', (event) => {
      if (!boardRect) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!dragging && Math.hypot(dx, dy) < 6) return;
      if (!dragging) {
        dragging = true;
        card.classList.add('placed', 'dragging');
      }
      event.preventDefault();
      const width = boardRect.width || 1;
      const height = boardRect.height || 1;
      /* Clamped so a note can hang half off the edge, like a real pinned
         note, but never gets dragged somewhere it can no longer be found */
      const left = Math.max(-140, Math.min(width - 60, startLeft + dx));
      const top = Math.max(-10, Math.min(height - 40, startTop + dy));
      card.style.left = (left / width * 100) + '%';
      card.style.top = top + 'px';
    });

    const finish = (event) => {
      if (!boardRect) return;
      try { card.releasePointerCapture(event.pointerId); } catch {}
      if (dragging) {
        card.classList.remove('dragging');
        positions[id] = { x: parseFloat(card.style.left), y: parseFloat(card.style.top) };
        savePositions();
        /* The pointerup that ends a drag is immediately followed by a click
           event; this is what that click checks before opening the modal. */
        suppressClick = true;
      }
      dragging = false;
      boardRect = null;
    };
    card.addEventListener('pointerup', finish);
    card.addEventListener('pointercancel', finish);
  }

  const TYPES = ['lead', 'recruiter', 'visitor', 'other'];
  const typeOf = (c) => (TYPES.indexOf(c.visitor_type) >= 0 ? c.visitor_type : '');

  /* Visits by the same person, oldest first. A visitor id only groups
     conversations when it is actually present, so older records and
     privacy-mode visitors stay independent instead of all collapsing
     together under one empty key. */
  function visitsOf(chat) {
    if (!chat.visitor_id) return [chat];
    return chats
      .filter((c) => c.visitor_id === chat.visitor_id)
      .sort((a, b) => ((a.ts || '') < (b.ts || '') ? -1 : 1));
  }

  /* "Visit 2 of 3" for a returning visitor, empty for a first timer */
  function visitLabel(chat) {
    const group = visitsOf(chat);
    if (group.length < 2) return '';
    const index = group.findIndex((c) => c.id === chat.id);
    return 'Visit ' + (index + 1) + ' of ' + group.length;
  }

  /* The assistant answers in a small markdown subset for the chat bubbles.
     Those markers are noise here, so they come off before display. */
  function plain(text) {
    return String(text == null ? '' : text)
      .replace(/\\*\\*(.+?)\\*\\*/g, '$1')
      .replace(/~(.+?)~/g, '$1')
      .replace(/^##\\s*/gm, '')
      .trim();
  }

  /* "hlo" tells you nothing about a visit, so openers like it are skipped
     when picking what to show on the paper. */
  const SMALL_TALK = /^(hi+|hey+|h[ea]l+o+|yo|salam|as+alam[ou]?[ -]?al[ae]ikum|ok(ay)?|thanks?|thank you|thx|bye|good (morning|evening|afternoon|night))[\\s!.,?]*$/i;
  /* Anything that sounds like why they came: hiring, a project, money, or
     wanting to reach him */
  const INTENT = /\\b(hir|hiring|job|role|position|vacanc|opening|recruit|salary|rate|budget|quote|freelanc|contract|full.?time|part.?time|project|build|develop|automat|need|want|looking for|interested|work with|collaborat|available|start)/i;
  const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/;
  const PHONE = /(?:\\+?\\d[\\d\\s-]{7,}\\d)/;

  /* A contact the assistant flagged is best, but visitors often type an
     email or number without it ever being saved, so the transcript is
     searched too rather than showing nothing. */
  function contactOf(c) {
    if (c.contact) return c.contact;
    const said = (c.messages || []).filter((m) => m.from === 'user').map((m) => m.text).join('  ');
    const email = said.match(EMAIL);
    if (email) return email[0];
    const phone = said.match(PHONE);
    if (phone) return phone[0].trim();
    return '';
  }

  /* What goes on the paper, best available first: the assistant's own
     summary, then whatever the visitor said that actually mattered, with
     hiring, project and contact messages pulled to the front. Greetings
     only show if there was nothing else at all. */
  function gist(c) {
    const summary = plain(c.note);
    if (summary) return summary;

    const said = (c.messages || [])
      .filter((m) => m.from === 'user')
      .map((m) => plain(m.text))
      .filter(Boolean);

    const real = said.filter((t) => t.length > 3 && !SMALL_TALK.test(t));
    const important = real.filter((t) => INTENT.test(t) || EMAIL.test(t) || PHONE.test(t));
    const ordered = important.concat(real.filter((t) => important.indexOf(t) < 0));

    if (ordered.length) return ordered.slice(0, 3).join(' · ');
    if (said.length) return said.join(' · ');
    return 'Opened the chat but did not say anything yet.';
  }

  /* Date and time both, kept short: today and yesterday are named, and the
     year only appears once it stops being obvious. */
  function stamp(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    if (date.toDateString() === now.toDateString()) return 'Today, ' + time;
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday, ' + time;

    const opts = date.getFullYear() === now.getFullYear()
      ? { day: 'numeric', month: 'short' }
      : { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString([], opts) + ', ' + time;
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
      const contact = contactOf(c);
      const who = c.name || contact || 'Anonymous visitor';
      /* Only a second line when it adds something the title does not */
      const sub = contact && contact !== who ? contact : '';
      const turns = (c.messages || []).filter((m) => m.from === 'user').length;
      const visit = visitLabel(c);
      /* A note the admin has dragged before is pulled out of the grid and
         put back exactly where they left it */
      const pos = positions[c.id];
      const placedClass = pos ? ' placed' : '';
      const placedStyle = pos ? ' style="left:' + pos.x + '%;top:' + pos.y + 'px"' : '';
      return (
        '<button class="note-card n-' + (type || 'none') + placedClass + '" data-id="' + escapeHtml(c.id) + '"' + placedStyle + '>' +
          '<span class="pin" aria-hidden="true"></span>' +
          '<div class="n-top">' +
            (type ? '<span class="n-badge">' + type + '</span>' : '') +
            (visit ? '<span class="n-visit" title="Same visitor as other notes">' + escapeHtml(visit) + '</span>' : '') +
            (c.read ? '' : '<span class="n-dot" title="Unread"></span>') +
          '</div>' +
          '<div class="n-who">' + escapeHtml(who) + '</div>' +
          (sub ? '<div class="n-contact">' + escapeHtml(sub) + '</div>' : '') +
          '<div class="n-body">' + escapeHtml(gist(c)) + '</div>' +
          '<div class="n-foot" title="' + escapeHtml(new Date(c.updated || c.ts).toLocaleString()) + '">' +
            '<span class="n-when">' + escapeHtml(stamp(c.updated || c.ts)) + '</span>' +
            (turns ? '<span class="n-turns">' + turns + ' msg' + (turns === 1 ? '' : 's') + '</span>' : '') +
          '</div>' +
        '</button>'
      );
    }).join('');
    Array.prototype.forEach.call($('list').querySelectorAll('.note-card'), (card) => {
      card.onclick = () => {
        if (suppressClick) { suppressClick = false; return; }
        openModal(card.getAttribute('data-id'));
      };
      enableDrag(card);
    });
  }

  function render() {
    const unread = chats.filter((c) => !c.read).length;
    $('count').textContent = chats.length + ' conversation' + (chats.length === 1 ? '' : 's') +
      (unread ? ' · ' + unread + ' unread' : '');
    renderFilters();
    renderCards();
  }

  /* Drops every dragged note back into the organised grid it started in */
  $('resetLayoutBtn').addEventListener('click', () => {
    positions = {};
    try { localStorage.removeItem(POSITIONS_KEY); } catch {}
    renderCards();
  });

  /* ---- Conversation modal ---- */

  function openModal(id) {
    const chat = chats.filter((c) => c.id === id)[0];
    if (!chat) return;
    openId = id;

    const type = typeOf(chat);
    /* .n-badge is tuned for pastel paper; inside the modal it takes the
       page's own tokens instead, so it reads in either theme */
    $('mBadge').textContent = type || 'chat';
    $('mBadge').className = 'n-badge sheet-badge';
    $('mTitle').textContent = chat.name || contactOf(chat) || 'Anonymous visitor';

    const bits = ['<span>' + escapeHtml(new Date(chat.ts).toLocaleString()) + '</span>'];
    const contact = contactOf(chat);
    if (contact) bits.push('<span>Contact: <b>' + escapeHtml(contact) + '</b></span>');
    if (chat.lang) bits.push('<span>Language: <b>' + escapeHtml(chat.lang) + '</b></span>');
    $('mMeta').innerHTML = bits.join('');

    if (chat.note) {
      $('mSummary').innerHTML = '<span>What the assistant flagged</span>' + escapeHtml(plain(chat.note));
      $('mSummary').hidden = false;
    } else {
      $('mSummary').hidden = true;
    }

    /* Other conversations by the same person, so a returning lead reads as
       one relationship rather than several unconnected notes. */
    const group = visitsOf(chat);
    if (group.length > 1) {
      $('mVisits').innerHTML =
        '<span>Same visitor, ' + group.length + ' conversations</span>' +
        group.map((v, i) => {
          const current = v.id === chat.id;
          return '<button class="visit-link' + (current ? ' current' : '') + '"' +
            (current ? ' disabled' : ' data-goto="' + escapeHtml(v.id) + '"') + '>' +
            'Visit ' + (i + 1) + ' &middot; ' + escapeHtml(stamp(v.ts)) +
            (current ? ' (this one)' : '') +
          '</button>';
        }).join('');
      $('mVisits').hidden = false;
      Array.prototype.forEach.call($('mVisits').querySelectorAll('[data-goto]'), (button) => {
        button.onclick = () => openModal(button.getAttribute('data-goto'));
      });
    } else {
      $('mVisits').hidden = true;
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
  /* This page changes every time the code is redeployed, and it is the
     admin's only view onto live, private data, so a stale cached copy is
     never acceptable. Without this the browser (and any CDN in front of it)
     is free to reuse an old response, which is exactly what silently served
     the previous layout after the last few deploys. */
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.status(200).send(PAGE);
}
