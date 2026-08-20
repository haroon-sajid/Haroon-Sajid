import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Footer.scss'

const FACEBOOK_URL = 'https://www.facebook.com/haroonsajid016';

const navSections = ['about', 'expertise', 'projects', 'history', 'education', 'contact'];

function Footer() {

  const { t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* On the one-page portfolio the sections are right here; from another
     route (e.g. /blog) go home first and let AppShell finish the scroll */
  const scrollToSection = (section: string) => {
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
      return;
    }

    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-grid">

          <div className="footer-brand">
            <span className="footer-logo">Haroon<span className="footer-logo-dot">.</span></span>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-social">
              <a href="https://github.com/haroon-sajid" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
              <a href="https://www.linkedin.com/in/haroon-sajid-ai" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
              <a href="https://x.com/haroonsajid_" target="_blank" rel="noreferrer" aria-label="X"><XIcon/></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon/></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t.footer.navigateTitle}</h4>
            <ul>
              {t.footer.navigate.map((label, index) => (
                <li key={index}>
                  <button type="button" onClick={() => scrollToSection(navSections[index])}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h4>{t.footer.contactTitle}</h4>
            <ul>
              <li>
                <span className="contact-tile"><EmailIcon/></span>
                <span className="contact-body">
                  <span className="contact-label">{t.footer.emailLabel}</span>
                  <a className="contact-value" href="mailto:haroonsajid.ai@gmail.com">haroonsajid.ai@gmail.com</a>
                </span>
              </li>
              <li>
                <span className="contact-tile"><WhatsAppIcon/></span>
                <span className="contact-body">
                  <span className="contact-label">{t.footer.whatsappLabel}</span>
                  <a className="contact-value" href="https://wa.me/923116566318" target="_blank" rel="noreferrer">+92 311 6566318</a>
                </span>
              </li>
              <li>
                <span className="contact-tile"><LocationOnIcon/></span>
                <span className="contact-body">
                  <span className="contact-label">{t.footer.locationLabel}</span>
                  <span className="contact-value contact-static">{t.footer.locationValue}</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            {/* The rights clause is a span so phones can drop it and keep the
                bar to one line (Footer.scss) */}
            &copy; {new Date().getFullYear()} {t.footer.creditName}.{' '}
            <span className="footer-rights">{t.footer.rights}</span>
          </p>
          <p className="footer-credit">
            {t.footer.creditBefore}
            <a href="https://github.com/haroon-sajid" target="_blank" rel="noreferrer">{t.footer.creditName}</a>
          </p>
          <button type="button" className="footer-top" onClick={scrollToTop} aria-label={t.footer.backToTop}>
            {t.footer.backToTop} <KeyboardArrowUpIcon/>
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
