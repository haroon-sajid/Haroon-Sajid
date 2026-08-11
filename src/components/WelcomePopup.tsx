import React, { useCallback, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/WelcomePopup.scss';

const STORAGE_KEY = 'portfolio-welcome-seen';

/* How long the exit animation runs before the popup unmounts —
   keep in sync with the `welcome-pop-out` duration in WelcomePopup.scss. */
const EXIT_MS = 280;

function WelcomePopup() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // First visit only. If storage is unavailable (private mode), skip the
  // popup rather than greet the same visitor on every page load.
  // `?welcome` in the URL forces it to show again — handy for testing.
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('welcome');
    if (!forced) {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
    }
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore write failures */
    }
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, EXIT_MS);
  }, []);

  const goToFeedback = useCallback(() => {
    close();
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, EXIT_MS + 40);
  }, [close]);

  // Escape dismisses; the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cardRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`welcome-overlay ${closing ? 'closing' : ''}`}
      onClick={close}
      role="presentation"
    >
      <div
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        ref={cardRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="welcome-close"
          onClick={close}
          aria-label={t.welcome.close}
        >
          <CloseIcon fontSize="small" />
        </button>

        <h2 id="welcome-title" className="welcome-title">
          {t.welcome.title} <span className="welcome-wave" aria-hidden="true">👋</span>
        </h2>

        <p className="welcome-highlight">{t.welcome.highlight}</p>

        <p className="welcome-body">{t.welcome.body}</p>

        <div className="welcome-actions">
          <button type="button" className="welcome-btn welcome-btn-primary" onClick={close}>
            {t.welcome.explore}
          </button>
          <button type="button" className="welcome-btn welcome-btn-secondary" onClick={goToFeedback}>
            {t.welcome.feedback}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePopup;
