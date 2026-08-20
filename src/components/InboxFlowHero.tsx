/* AI Inbox Management System — animated hero (12s loop, CSS keyframes + offset-path, no libs) */
import React from "react";

type InboxFlowHeroProps = { className?: string };
const CSS = `
.ifh-root{
  --ifh-bg:#18191f; --ifh-bg2:#22232c;
  --ifh-line:rgba(255,110,90,.32);
  --ifh-node:#2d2e3a; --ifh-stroke:#484a58;
  --ifh-text:#c3c4d0; --ifh-dim:#7d7f8f;
  --ifh-accent:#ff6d5a; --ifh-cyan:#ff9b8a; --ifh-green:#3fd68f;
  --ifh-junk:#61626f; --ifh-card:#24252e; --ifh-cardline:#484a58;
  --ifh-gmail:#ea4335; --ifh-wa:#25d366; --ifh-filter:#f5a623; --ifh-crm:#4a9fff; --ifh-slack:#e01e5a;
  width:100%; aspect-ratio:16/7; overflow:hidden;
  background:radial-gradient(120% 140% at 50% 0%, var(--ifh-bg2), var(--ifh-bg) 72%);
}
.main-container.light-mode .ifh-root, .main-container.light .ifh-root, [data-theme="light"] .ifh-root{
  --ifh-bg:#f7f7f8; --ifh-bg2:#ffffff;
  --ifh-line:rgba(238,74,52,.35);
  --ifh-node:#ffffff; --ifh-stroke:#dbdce2;
  --ifh-text:#555561; --ifh-dim:#9b9ca6;
  --ifh-accent:#ee4a34; --ifh-cyan:#ff6d5a; --ifh-green:#0aa06e;
  --ifh-junk:#c4c5cd; --ifh-card:#ffffff; --ifh-cardline:#e4e5ea;
  --ifh-gmail:#d93a2b; --ifh-wa:#1da851; --ifh-filter:#e09112; --ifh-crm:#2f7fe0; --ifh-slack:#e01e5a;
}
.ifh-root svg{display:block;width:100%;height:100%}
.ifh-label{font:600 10.5px/1 Inter,ui-sans-serif,system-ui,sans-serif;letter-spacing:.18em;fill:var(--ifh-text);text-anchor:middle;text-transform:uppercase}
.ifh-sub{font:500 9px/1 Inter,ui-sans-serif,system-ui,sans-serif;letter-spacing:.12em;fill:var(--ifh-dim);text-anchor:middle;text-transform:uppercase}
.ifh-btntx{font:600 9px/1 Inter,ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em;text-anchor:middle}
.ifh-dot{offset-rotate:0deg}
.ifh-real{fill:var(--ifh-cyan);filter:drop-shadow(0 0 6px var(--ifh-cyan))}
.ifh-junkdot{fill:var(--ifh-junk)}
.ifh-outdot{fill:var(--ifh-green);filter:drop-shadow(0 0 6px var(--ifh-green))}
.ifh-d1{offset-path:path("M110,165 C200,168 252,240 330,258 C408,272 436,260 505,260 C574,260 622,260 690,260");animation:ifh-d1 12s linear infinite}
.ifh-d4{offset-path:path("M110,355 C200,352 252,280 330,262 C408,248 436,260 505,260 C574,260 622,260 690,260");animation:ifh-d4 12s linear infinite}
.ifh-d5{offset-path:path("M110,165 C200,168 252,240 330,258 C408,272 436,260 505,260 C574,260 622,260 690,260");animation:ifh-d5 12s linear infinite}
.ifh-d2{offset-path:path("M110,355 C200,352 252,280 330,262");animation:ifh-d2 12s linear infinite}
.ifh-d3{offset-path:path("M110,165 C200,168 252,240 330,258");animation:ifh-d3 12s linear infinite}
.ifh-out1{offset-path:path("M1040,235 C1075,215 1096,186 1116,158");animation:ifh-out1 12s linear infinite}
.ifh-out2{offset-path:path("M1040,265 C1075,290 1096,322 1116,352");animation:ifh-out2 12s linear infinite}
@keyframes ifh-d1{0%{offset-distance:0%;opacity:0}1.5%{opacity:1}31%{opacity:1}33.33%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes ifh-d4{0%,13.33%{offset-distance:0%;opacity:0}15%{opacity:1}41.5%{opacity:1}43.33%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes ifh-d5{0%,21.67%{offset-distance:0%;opacity:0}23.2%{opacity:1}48%{opacity:1}50%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes ifh-d2{0%,5%{offset-distance:0%;transform:translateY(0);opacity:0}6.5%{opacity:.85}20%{opacity:.85;transform:translateY(0)}21.67%{offset-distance:100%;transform:translateY(0);opacity:.7}28.33%{offset-distance:100%;transform:translateY(48px);opacity:0}100%{offset-distance:100%;transform:translateY(48px);opacity:0}}
@keyframes ifh-d3{0%,9.17%{offset-distance:0%;transform:translateY(0);opacity:0}10.7%{opacity:.85}24%{opacity:.85;transform:translateY(0)}25.83%{offset-distance:100%;transform:translateY(0);opacity:.7}32.5%{offset-distance:100%;transform:translateY(48px);opacity:0}100%{offset-distance:100%;transform:translateY(48px);opacity:0}}
@keyframes ifh-out1{0%,80%{offset-distance:0%;opacity:0}81.5%{opacity:1}90%{opacity:1}91.67%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
@keyframes ifh-out2{0%,80.8%{offset-distance:0%;opacity:0}82.3%{opacity:1}91%{opacity:1}92.5%{offset-distance:100%;opacity:0}100%{offset-distance:100%;opacity:0}}
.ifh-crmflash{transform-box:fill-box;transform-origin:center;opacity:0;animation:ifh-crmflash 12s linear infinite}
@keyframes ifh-crmflash{0%,21.5%{opacity:0;transform:scale(.5)}23%{opacity:1;transform:scale(1)}25.5%{opacity:0;transform:scale(1.15)}32.5%{opacity:0;transform:scale(.5)}34%{opacity:1;transform:scale(1)}36.5%{opacity:0;transform:scale(1.15)}39.7%{opacity:0;transform:scale(.5)}41.2%{opacity:1;transform:scale(1)}43.7%,100%{opacity:0;transform:scale(1.15)}}
.ifh-pulse{transform-box:fill-box;transform-origin:center;animation:ifh-pulse 2s ease-in-out infinite}
@keyframes ifh-pulse{0%,100%{transform:scale(1);opacity:.14}50%{transform:scale(1.22);opacity:.3}}
.ifh-busy{opacity:.12;animation:ifh-busy 12s linear infinite}
@keyframes ifh-busy{0%,30%{opacity:.12}36%{opacity:.6}55%{opacity:.6}62%,100%{opacity:.12}}
.ifh-draft{opacity:0;animation:ifh-draft 12s linear infinite}
@keyframes ifh-draft{
  0%,40%{opacity:0;transform:translate(640px,84px) scale(.85)}
  43%{opacity:1;transform:translate(640px,84px) scale(1)}
  58.33%{opacity:1;transform:translate(640px,84px) scale(1);animation-timing-function:cubic-bezier(.45,0,.2,1)}
  65%{opacity:1;transform:translate(846px,180px) scale(.8)}
  93.5%{opacity:1;transform:translate(846px,180px) scale(.8)}
  97%,100%{opacity:0;transform:translate(846px,180px) scale(.8)}}
.ifh-bar{transform-box:fill-box;transform-origin:left center;transform:scaleX(0)}
.ifh-b1{animation:ifh-b1 12s linear infinite}
.ifh-b2{animation:ifh-b2 12s linear infinite}
.ifh-b3{animation:ifh-b3 12s linear infinite}
.ifh-b4{animation:ifh-b4 12s linear infinite}
@keyframes ifh-b1{0%,41.7%{transform:scaleX(0)}45.5%{transform:scaleX(1)}100%{transform:scaleX(1)}}
@keyframes ifh-b2{0%,45.5%{transform:scaleX(0)}49.3%{transform:scaleX(1)}100%{transform:scaleX(1)}}
@keyframes ifh-b3{0%,49.3%{transform:scaleX(0)}53%{transform:scaleX(1)}100%{transform:scaleX(1)}}
@keyframes ifh-b4{0%,53%{transform:scaleX(0)}56.7%{transform:scaleX(1)}100%{transform:scaleX(1)}}
.ifh-slack{opacity:0;animation:ifh-slack 12s linear infinite}
@keyframes ifh-slack{0%,56.5%{opacity:0;transform:translateY(10px)}60%{opacity:1;transform:translateY(0)}93.5%{opacity:1;transform:translateY(0)}97%,100%{opacity:0;transform:translateY(0)}}
.ifh-cursor{opacity:0;animation:ifh-cursor 12s linear infinite}
@keyframes ifh-cursor{
  0%,64%{opacity:0;transform:translate(1010px,440px)}
  67%{opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  73.3%{transform:translate(854px,272px)}
  74.6%{transform:translate(854px,272px) scale(1)}
  75.4%{transform:translate(854px,272px) scale(.8)}
  76.3%{transform:translate(854px,272px) scale(1)}
  80%{opacity:1;transform:translate(854px,272px)}
  85%{opacity:0;transform:translate(880px,310px)}
  100%{opacity:0;transform:translate(880px,310px)}}
.ifh-apflash{opacity:0;animation:ifh-apflash 12s linear infinite}
@keyframes ifh-apflash{0%,74.6%{opacity:0}75.6%{opacity:.5}79.5%{opacity:0}100%{opacity:0}}
.ifh-sentpop{transform-box:fill-box;transform-origin:center;opacity:0;animation:ifh-sentpop 12s linear infinite}
@keyframes ifh-sentpop{0%,90.5%{opacity:0;transform:scale(.4)}92.5%{opacity:1;transform:scale(1.15)}94%{opacity:1;transform:scale(1)}96.5%,100%{opacity:0;transform:scale(1)}}
.ifh-notepop{transform-box:fill-box;transform-origin:center;opacity:0;animation:ifh-notepop 12s linear infinite}
@keyframes ifh-notepop{0%,91.3%{opacity:0;transform:scale(.4)}93.3%{opacity:1;transform:scale(1.15)}94.8%{opacity:1;transform:scale(1)}97%,100%{opacity:0;transform:scale(1)}}
.ifh-hand{animation:ifh-clock 12s steps(12) infinite}
@keyframes ifh-clock{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion: reduce){
  .ifh-root *{animation:none !important}
  .ifh-d1,.ifh-d2,.ifh-d3,.ifh-d4,.ifh-d5,.ifh-out1,.ifh-out2,.ifh-cursor,.ifh-apflash{opacity:0 !important}
  .ifh-draft{opacity:1 !important;transform:translate(846px,180px) scale(.8) !important}
  .ifh-bar{transform:scaleX(1) !important}
  .ifh-slack,.ifh-crmflash,.ifh-sentpop,.ifh-notepop{opacity:1 !important;transform:none !important}
  .ifh-busy{opacity:.3 !important}
}
`;

function InboxFlowHero({ className = '' }: InboxFlowHeroProps) {
  const ic = { fill: 'none', stroke: 'var(--ifh-text)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <div className={'ifh-root ' + className} role="img"
      aria-label="Animated diagram of an AI inbox management system: messages arrive from Gmail and WhatsApp, junk is filtered out, contacts are matched in Recruit CRM, Claude AI drafts a reply, a human reviews and approves it in Slack, and only then is the message sent and a note logged to the CRM.">
      <style>{CSS}</style>
      <svg viewBox="0 0 1200 525" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="ifh-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--ifh-stroke)" />
          </pattern>
        </defs>
        <rect width="1200" height="525" fill="url(#ifh-grid)" opacity="0.35" />
        {/* connection lines */}
        <g fill="none" stroke="var(--ifh-line)" strokeWidth="1.4">
          <path d="M110,165 C200,168 252,240 330,258 C408,272 436,260 505,260 C574,260 622,260 690,260" />
          <path d="M110,355 C200,352 252,280 330,262 C408,248 436,260 505,260 C574,260 622,260 690,260" />
          <path d="M726,252 C762,240 780,232 808,224" />
          <path d="M1040,235 C1075,215 1096,186 1116,158" />
          <path d="M1040,265 C1075,290 1096,322 1116,352" />
        </g>
        {/* Gmail */}
        <g transform="translate(110,165)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-gmail)" strokeOpacity=".65" strokeWidth="1.4" />
          <g {...ic} stroke="var(--ifh-gmail)"><rect x="-14" y="-10" width="28" height="20" rx="3" /><path d="M-14,-7 L0,4 L14,-7" /></g>
        </g>
        <text x="110" y="215" className="ifh-label">Gmail</text>
        {/* WhatsApp */}
        <g transform="translate(110,355)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-wa)" strokeOpacity=".65" strokeWidth="1.4" />
          <g {...ic} stroke="var(--ifh-wa)"><rect x="-13" y="-12" width="26" height="19" rx="6" /><path d="M-4,7 L-1,13 L3,7" /></g>
        </g>
        <text x="110" y="405" className="ifh-label">WhatsApp</text>
        {/* Filter */}
        <g transform="translate(330,260)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-filter)" strokeOpacity=".65" strokeWidth="1.4" />
          <g {...ic} stroke="var(--ifh-filter)"><path d="M-12,-9 L12,-9 L3,3 L3,12 L-3,15 L-3,3 Z" /></g>
        </g>
        <text x="330" y="310" className="ifh-sub">Noise filtered</text>
        {/* Recruit CRM */}
        <g transform="translate(505,260)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-crm)" strokeOpacity=".65" strokeWidth="1.4" />
          <g {...ic} stroke="var(--ifh-crm)"><circle cx="0" cy="-5" r="4.5" /><path d="M-8,9 a8,8 0 0 1 16,0" /></g>
        </g>
        <g className="ifh-crmflash" transform="translate(528,236)">
          <circle r="9" fill="var(--ifh-green)" />
          <path d="M-4,0 L-1,3 L4,-3" fill="none" stroke="var(--ifh-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="505" y="310" className="ifh-label">Recruit CRM</text>
        <text x="505" y="326" className="ifh-sub">Contact matched</text>
        {/* Claude AI */}
        <g transform="translate(690,260)">
          <circle r="46" fill="var(--ifh-accent)" opacity=".08" />
          <circle className="ifh-pulse" r="40" fill="var(--ifh-accent)" />
          <circle className="ifh-busy" r="34" fill="none" stroke="var(--ifh-cyan)" strokeWidth="1.5" />
          <circle r="30" fill="var(--ifh-node)" stroke="var(--ifh-accent)" strokeOpacity=".55" strokeWidth="1.4" />
          <path d="M0,-13 L2.8,-2.8 L13,0 L2.8,2.8 L0,13 L-2.8,2.8 L-13,0 L-2.8,-2.8 Z" fill="var(--ifh-accent)" />
        </g>
        <text x="690" y="322" className="ifh-label">Claude AI</text>
        <text x="690" y="338" className="ifh-sub">AI drafts a reply — never sends</text>
        {/* Sent */}
        <g transform="translate(1120,150)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-green)" strokeOpacity=".65" strokeWidth="1.4" />
          <path d="M-8,1 L-2,7 L9,-6" {...ic} stroke="var(--ifh-green)" />
          <g className="ifh-sentpop">
            <circle r="26" fill="none" stroke="var(--ifh-green)" strokeWidth="1.6" />
            <path d="M-8,1 L-2,7 L9,-6" fill="none" stroke="var(--ifh-green)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <text x="1120" y="200" className="ifh-label">Sent</text>
        <text x="1120" y="216" className="ifh-sub">via Gmail &amp; WhatsApp</text>
        {/* CRM note */}
        <g transform="translate(1120,365)">
          <circle r="26" fill="var(--ifh-node)" stroke="var(--ifh-crm)" strokeOpacity=".65" strokeWidth="1.4" />
          <g {...ic} stroke="var(--ifh-crm)"><rect x="-8" y="-11" width="16" height="22" rx="2" /><path d="M-4,-5 H4 M-4,0 H4 M-4,5 H1" /></g>
          <g className="ifh-notepop">
            <circle r="26" fill="none" stroke="var(--ifh-green)" strokeWidth="1.6" />
            <circle cx="12" cy="-12" r="8" fill="var(--ifh-green)" />
            <path d="M8.5,-12 L11,-9.5 L15.5,-15" fill="none" stroke="var(--ifh-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <text x="1120" y="415" className="ifh-label">CRM note logged</text>
        {/* daily digest clock */}
        <g transform="translate(566,468)" opacity=".55">
          <circle r="11" fill="none" stroke="var(--ifh-dim)" strokeWidth="1.4" />
          <line className="ifh-hand" x1="0" y1="0" x2="0" y2="-7" stroke="var(--ifh-dim)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="5" y2="0" stroke="var(--ifh-dim)" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <text x="588" y="472" className="ifh-sub" style={{ textAnchor: 'start' }}>Daily digest</text>
        {/* Slack review card */}
        <g className="ifh-slack">
          <g transform="translate(810,150)">
            <rect width="230" height="150" rx="10" fill="var(--ifh-card)" stroke="var(--ifh-cardline)" strokeWidth="1.2" />
            <circle cx="20" cy="19" r="3.5" fill="var(--ifh-slack)" />
            <text x="30" y="22.5" className="ifh-sub" style={{ textAnchor: 'start' }}>Draft ready for review</text>
            <rect x="14" y="32" width="202" height="68" rx="6" fill="none" stroke="var(--ifh-cardline)" strokeWidth="1" strokeDasharray="3 3" opacity=".6" />
            <rect x="14" y="112" width="66" height="26" rx="6" fill="none" stroke="var(--ifh-green)" strokeWidth="1.2" />
            <text x="47" y="128.5" className="ifh-btntx" fill="var(--ifh-green)">Approve</text>
            <rect x="86" y="112" width="48" height="26" rx="6" fill="none" stroke="var(--ifh-cardline)" strokeWidth="1.2" />
            <text x="110" y="128.5" className="ifh-btntx" fill="var(--ifh-dim)">Edit</text>
            <rect x="140" y="112" width="62" height="26" rx="6" fill="none" stroke="var(--ifh-cardline)" strokeWidth="1.2" />
            <text x="171" y="128.5" className="ifh-btntx" fill="var(--ifh-dim)">Discard</text>
            <rect className="ifh-apflash" x="14" y="112" width="66" height="26" rx="6" fill="var(--ifh-green)" />
          </g>
          <text x="925" y="322" className="ifh-label">Slack review</text>
          <text x="925" y="338" className="ifh-sub">A human approves every message</text>
        </g>
        {/* draft card */}
        <g className="ifh-draft">
          <rect width="150" height="90" rx="8" fill="var(--ifh-card)" stroke="var(--ifh-accent)" strokeOpacity=".5" strokeWidth="1.2" />
          <text x="12" y="19" className="ifh-sub" style={{ textAnchor: 'start', fill: 'var(--ifh-accent)' }}>Draft</text>
          <rect className="ifh-bar ifh-b1" x="12" y="30" width="126" height="5" rx="2.5" fill="var(--ifh-dim)" opacity=".85" />
          <rect className="ifh-bar ifh-b2" x="12" y="44" width="116" height="5" rx="2.5" fill="var(--ifh-dim)" opacity=".85" />
          <rect className="ifh-bar ifh-b3" x="12" y="58" width="126" height="5" rx="2.5" fill="var(--ifh-dim)" opacity=".85" />
          <rect className="ifh-bar ifh-b4" x="12" y="72" width="74" height="5" rx="2.5" fill="var(--ifh-dim)" opacity=".85" />
        </g>
        {/* message dots */}
        <circle className="ifh-dot ifh-real ifh-d1" r="5" />
        <circle className="ifh-dot ifh-junkdot ifh-d2" r="4" />
        <circle className="ifh-dot ifh-junkdot ifh-d3" r="4" />
        <circle className="ifh-dot ifh-real ifh-d4" r="5" />
        <circle className="ifh-dot ifh-real ifh-d5" r="5" />
        <circle className="ifh-dot ifh-outdot ifh-out1" r="5" />
        <circle className="ifh-dot ifh-outdot ifh-out2" r="5" />
        {/* cursor */}
        <g className="ifh-cursor">
          <path d="M0,0 L0,15 L4.2,11.2 L7.4,18 L10.2,16.6 L7,10 L12,9.4 Z" fill="var(--ifh-text)" stroke="var(--ifh-bg)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
export default InboxFlowHero;
