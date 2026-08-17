import React, { useEffect, useRef, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/ChatWidget.scss';

const WHATSAPP_URL = 'https://wa.me/923116566318';

/* Browser speech recognition (Chrome/Edge/Safari; Firefox lacks it — the mic
   button simply doesn't render there). Speech synthesis is near-universal. */
const SpeechRecognitionImpl: any =
  typeof window !== 'undefined' &&
  ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

/* Hand-drawn robot face. Sized like an MUI icon (1em) so the existing
   svg font-size rules apply; everything draws in currentColor so it
   inherits each context's ink. The eyes blink and the antenna wiggles
   on a slow cycle — see ChatWidget.scss. */
function BotFace() {
  return (
    <svg className="chat-bot-face" viewBox="0 0 32 32" width="1em" height="1em" aria-hidden="true">
      <g className="bot-antenna">
        <line x1="16" y1="7.5" x2="16" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="5.5" r="2.1" fill="currentColor" />
      </g>
      {/* side nubs */}
      <rect x="2.6" y="16" width="2.4" height="6" rx="1.2" fill="currentColor" />
      <rect x="27" y="16" width="2.4" height="6" rx="1.2" fill="currentColor" />
      {/* head */}
      <rect x="6.5" y="11" width="19" height="15.5" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* eyes */}
      <circle className="bot-eye" cx="12.5" cy="17.5" r="1.9" fill="currentColor" />
      <circle className="bot-eye" cx="19.5" cy="17.5" r="1.9" fill="currentColor" />
      {/* smile */}
      <path d="M12.5 21.6 Q16 24.2 19.5 21.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type Message = {
  from: 'bot' | 'user';
  text: string;
  /* Optional handoff button under the bubble (WhatsApp chat or Calendly booking) */
  link?: string;
  linkKind?: 'whatsapp' | 'calendly';
};

function ChatWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'chat'>('menu');
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  /* Dictation state: the input's text when the mic started, the finalized
     speech so far, and whether the visitor still wants the mic open (the
     browser ends recognition on every pause — we silently restart it). */
  const listenBaseRef = useRef('');
  const finalTranscriptRef = useRef('');
  const wantListenRef = useRef(false);

  const speechLocale = lang === 'ar' ? 'ar-SA' : 'en-US';

  /* Seed the welcome message the first time the chat view opens */
  const openChat = () => {
    setView('chat');
    setMessages((prev) => (prev.length ? prev : [{ from: 'bot', text: t.chat.welcome }]));
  };

  /* If only the welcome bubble is showing, re-seed it when the site language
     toggles, so an Arabic visitor never greets an English-only bubble */
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].from === 'bot' ? [{ from: 'bot', text: t.chat.welcome }] : prev
    );
  }, [t]);

  /* Read a bot reply aloud in the site's language */
  const speak = (text: string) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLocale;
    window.speechSynthesis.speak(utterance);
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || typing) return;
    setDraft('');
    const next: Message[] = [...messages, { from: 'user', text }];
    setMessages(next);
    setTyping(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        /* Only role + text go over the wire — links are presentation-only.
           lang tells the backend which language the site is being browsed in. */
        body: JSON.stringify({
          lang,
          messages: next.map(({ from, text: body }) => ({ from, text: body }))
        })
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { from: 'bot', text: data.reply, link: data.link, linkKind: data.linkKind }]);
      } else {
        /* 429 = free AI quota exhausted for now; anything else is a real failure */
        const text = response.status === 429 ? t.chat.busyReply : t.chat.errorReply;
        setMessages((prev) => [...prev, { from: 'bot', text, link: WHATSAPP_URL }]);
      }
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: t.chat.errorReply, link: WHATSAPP_URL }]);
    } finally {
      setTyping(false);
    }
  };

  /* Dictation: tap the mic to start, speak as long as you like (pauses are
     fine — recognition is silently restarted), watch your words appear in the
     input box, then tap the mic again to stop and press send yourself. */
  const toggleMic = () => {
    if (listening) {
      wantListenRef.current = false;
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    listenBaseRef.current = draft.trim() ? draft.trim() + ' ' : '';
    finalTranscriptRef.current = '';
    wantListenRef.current = true;

    const recognition = new SpeechRecognitionImpl();
    recognition.lang = speechLocale;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      setDraft((listenBaseRef.current + finalTranscriptRef.current + interim).trimStart());
    };
    recognition.onerror = (event: any) => {
      /* Permission refused or no mic: give up. Silence timeouts are fine —
         onend below restarts while the visitor still wants to listen. */
      if (event.error === 'not-allowed' || event.error === 'audio-capture') {
        wantListenRef.current = false;
        setListening(false);
      }
    };
    recognition.onend = () => {
      if (wantListenRef.current) {
        /* The browser cuts recognition on every pause — quietly resume,
           carrying the words already finalized into the base text */
        listenBaseRef.current = (listenBaseRef.current + finalTranscriptRef.current).trimEnd() + ' ';
        finalTranscriptRef.current = '';
        try {
          recognition.start();
        } catch {
          setListening(false);
        }
      } else {
        setListening(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  /* Keep the newest message in view */
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, typing, view, open]);

  /* Stop the mic and any speech when the widget unmounts */
  useEffect(() => () => {
    wantListenRef.current = false;
    recognitionRef.current?.stop();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label={t.chat.title}>

          <div className="chat-head">
            {view === 'chat' && (
              <button type="button" className="chat-back" onClick={() => setView('menu')} aria-label={t.chat.back}>
                <ArrowBackRoundedIcon fontSize="small" />
              </button>
            )}
            <span className="chat-avatar">
              <BotFace />
            </span>
            <span className="chat-head-text">
              <span className="chat-head-title">{t.chat.title}</span>
              <span className="chat-head-status">
                <span className="chat-status-dot"></span>
                {t.chat.online}
              </span>
            </span>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label={t.chat.close}>
              <CloseRoundedIcon fontSize="small" />
            </button>
          </div>

          {view === 'menu' ? (
            <div className="chat-menu">
              <p className="chat-menu-intro">{t.chat.intro}</p>

              <button type="button" className="chat-option" onClick={openChat}>
                <span className="chat-option-tile chat-option-tile-ai">
                  <BotFace />
                </span>
                <span className="chat-option-text">
                  <span className="chat-option-title">{t.chat.aiTitle}</span>
                  <span className="chat-option-desc">{t.chat.aiDesc}</span>
                </span>
                <ChevronRightRoundedIcon className="chat-option-chevron" />
              </button>

              <a className="chat-option" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span className="chat-option-tile chat-option-tile-wa">
                  <WhatsAppIcon />
                </span>
                <span className="chat-option-text">
                  <span className="chat-option-title">{t.chat.waTitle}</span>
                  <span className="chat-option-desc">{t.chat.waDesc}</span>
                </span>
                <ChevronRightRoundedIcon className="chat-option-chevron" />
              </a>
            </div>
          ) : (
            <>
              <div className="chat-body" ref={bodyRef}>
                {messages.map((message, index) => (
                  <div className={`chat-msg ${message.from === 'user' ? 'from-user' : 'from-bot'}`} key={index}>
                    <span className="chat-bubble">{message.text}</span>
                    {message.link && (
                      <a className="chat-msg-cta" href={message.link} target="_blank" rel="noreferrer">
                        {message.linkKind === 'calendly'
                          ? <CalendarMonthRoundedIcon fontSize="small" />
                          : <WhatsAppIcon fontSize="small" />}
                        {message.linkKind === 'calendly' ? t.chat.bookCta : t.chat.demoCta}
                      </a>
                    )}
                    {message.from === 'bot' && 'speechSynthesis' in window && (
                      <button
                        type="button"
                        className="chat-listen"
                        onClick={() => speak(message.text)}
                        aria-label={t.chat.listen}
                      >
                        <VolumeUpRoundedIcon />
                        {t.chat.listen}
                      </button>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="chat-msg from-bot">
                    <span className="chat-bubble chat-typing" aria-hidden="true">
                      <span></span><span></span><span></span>
                    </span>
                  </div>
                )}
              </div>

              <form
                className="chat-input-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  send();
                }}
              >
                <input
                  type="text"
                  className="chat-input"
                  value={draft}
                  placeholder={listening ? t.chat.listening : t.chat.placeholder}
                  onChange={(event) => setDraft(event.target.value)}
                />
                {SpeechRecognitionImpl && (
                  <button
                    type="button"
                    className={`chat-mic ${listening ? 'is-listening' : ''}`}
                    onClick={toggleMic}
                    disabled={typing}
                    aria-label={listening ? t.chat.micStop : t.chat.mic}
                  >
                    {listening ? <StopRoundedIcon fontSize="small" /> : <MicRoundedIcon fontSize="small" />}
                  </button>
                )}
                <button type="submit" className="chat-send" aria-label={t.chat.send} disabled={!draft.trim() || typing}>
                  <SendRoundedIcon fontSize="small" />
                </button>
              </form>
            </>
          )}

        </div>
      )}

      <button
        type="button"
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t.chat.close : t.chat.open}
        aria-expanded={open}
      >
        {open ? <CloseRoundedIcon /> : <BotFace />}
        {!open && <span className="chat-fab-dot" aria-hidden="true"></span>}
      </button>
    </div>
  );
}

export default ChatWidget;
