import React, { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import HeroNet from './HeroNet';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Main.scss';

/* Local time for the mobile status bar. Fixed to the zone rather than the
   visitor's clock — it says where he is, which is the point of standing next
   to the location. */
const clockFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Karachi'
});

function Main() {

  const { t } = useLanguage();
  const [clock, setClock] = useState<string>(() => clockFormat.format(new Date()));

  /* Only ticks while the status bar is actually on screen — above 768px it is
     display:none, and a hidden clock has no business re-rendering every second. */
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)');
    let timer = 0;

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (!mobile.matches) return;
      setClock(clockFormat.format(new Date()));
      timer = window.setInterval(() => setClock(clockFormat.format(new Date())), 1000);
    };

    start();
    mobile.addEventListener('change', start);

    return () => {
      stop();
      mobile.removeEventListener('change', start);
    };
  }, []);

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Split so the phone can stack the name and reveal it a line at a time. On
     desktop the words stay inline with their spaces and render exactly as the
     single string did. */
  const nameWords = t.hero.name.split(' ');

  return (
    <div className="container">
      <div className="about-section">
        {/* Animated backdrop — mobile only, see HeroNet */}
        <HeroNet/>

        {/* Social rail, pinned to the hero's leading edge */}
        <div className="hero-rail hero-rail-start">
          <a href="https://www.linkedin.com/in/haroon-sajid-ai" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
          <a href="https://x.com/haroonsajid_" target="_blank" rel="noreferrer" aria-label="X"><XIcon/></a>
          <a href="https://github.com/haroon-sajid" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
          <span className="hero-rail-line" aria-hidden="true"></span>
        </div>

        <div className="content">
          {/* Eyebrow and rotator are mobile-only (hidden above 768px); the h2
              carries the role on desktop. */}
          <span className="hero-eyebrow">{t.hero.role}</span>

          <h1>
            {nameWords.map((word, index) => (
              <React.Fragment key={`${word}-${index}`}>
                {index > 0 && ' '}
                <span className={`hero-word${index === 1 ? ' hero-word-outline' : ''}`}>
                  <span>{word}</span>
                </span>
              </React.Fragment>
            ))}
          </h1>

          <div className="hero-rotator">
            <span className="hero-rotator-prefix">{t.hero.rotatePrefix}</span>
            <span className="hero-rotator-mask">
              <span className="hero-rotator-inner">
                {t.hero.rotate.map((phrase) => (
                  <span key={phrase}>{phrase}</span>
                ))}
                {/* Repeat of the first phrase so the loop lands where it began */}
                <span aria-hidden="true">{t.hero.rotate[0]}</span>
              </span>
            </span>
          </div>

          <h2>{t.hero.role}</h2>
          <p>
            {t.hero.taglineBefore}
            <span className="highlight">{t.hero.taglineHi1}</span>
            {t.hero.taglineMid}
            <span className="highlight">{t.hero.taglineHi2}</span>
            {t.hero.taglineAfter}
          </p>

          <div className="hero-actions">
            <a
              className="hero-btn hero-btn-primary"
              href={`${import.meta.env.BASE_URL}Haroon_Sajid_CV.pdf`}
              download="Muhammad_Haroon_Sajid_CV.pdf"
            >
              <DownloadIcon/>{t.hero.downloadCv}
            </a>
            <button className="hero-btn hero-btn-secondary" onClick={scrollToContact}>
              <MailOutlineIcon/>{t.hero.contactMe}
            </button>
          </div>
        </div>

        {/* Status bar closes the mobile hero: availability, where he is, and a
            cue that the page continues. Hidden above 768px. */}
        <div className="hero-statusbar">
          <span className="hs-left">
            <span className="hs-dot" aria-hidden="true"></span>{t.hero.statusLabel}
          </span>
          <span className="hs-mid">{t.hero.locationShort} · {clock}</span>
          <span className="hs-right">
            {t.hero.scrollLabel}<span className="hs-scroll" aria-hidden="true"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Main;
