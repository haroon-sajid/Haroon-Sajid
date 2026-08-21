import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen, faLocationDot, faExpand, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
/* Rotated upright and downscaled from the original camera file, which came
   off the phone sideways at 4128px and cost 3.8 MB on its own */
import graduationPhoto from '../assets/images/graduation-2024.jpg';
import '../assets/styles/Education.scss';

const eduIcons = [faGraduationCap, faBookOpen];

/* Matched by index to t.education.items. The image sits behind the card's
   text as an absolutely positioned layer rather than taking any space, so
   every card keeps exactly the same height.
   Card 2 (Punjab College) is waiting on its logo: drop the file into
   src/assets/images, import it above, and put it in this slot. */
const eduPhotos: (string | undefined)[] = [graduationPhoto, undefined];

function Education() {
    const { t } = useLanguage();
    /* Which card's image is open full size, or null for none */
    const [lightbox, setLightbox] = useState<number | null>(null);

    /* Escape closes it, and the page behind stays put while it is open */
    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setLightbox(null);
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [lightbox]);

    return (
    <div className="container" id="education">
        <div className="education-container">

            <div className="education-head">
                <span className="education-eyebrow">{t.education.eyebrow}</span>
                <h1>{t.education.titleMain}<span className="education-outline">{t.education.titleOutline}</span></h1>
                <span className="education-rule"></span>
                <p className="education-intro">{t.education.intro}</p>
            </div>

            <div className="education-grid">
                {t.education.items.map((item, index) => (
                    <div className={`edu-card ${eduPhotos[index] ? 'has-photo' : ''}`} key={index}>
                        {eduPhotos[index] && (
                            <>
                                <span
                                    className="edu-photo"
                                    aria-hidden="true"
                                    style={{ backgroundImage: `url(${eduPhotos[index]})` }}
                                ></span>
                                <button
                                    type="button"
                                    className="edu-photo-open"
                                    onClick={() => setLightbox(index)}
                                    aria-label={t.education.viewPhoto}
                                    title={t.education.viewPhoto}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                </button>
                            </>
                        )}
                        <div className="edu-card-top">
                            <span className="edu-icon-tile">
                                <FontAwesomeIcon icon={eduIcons[index]} />
                            </span>
                            <span className="edu-date">{item.date}</span>
                        </div>
                        <h3>{item.degree}</h3>
                        <span className="edu-school">{item.school}</span>
                        <span className="edu-loc">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {item.location}
                        </span>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>

        </div>

        {/* Full-size view. Clicking the backdrop closes it; clicking the
            picture itself does not, so a stray click never loses the view.
            Rendered into <body> so the section's fade wrapper can never
            become its containing block and trap it mid-page. */}
        {lightbox !== null && createPortal(
            <div
                className="edu-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={t.education.photoCaption}
                onClick={() => setLightbox(null)}
            >
                <button
                    type="button"
                    className="edu-lightbox-close"
                    onClick={() => setLightbox(null)}
                    aria-label={t.education.closePhoto}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <figure className="edu-lightbox-figure" onClick={(event) => event.stopPropagation()}>
                    <img src={eduPhotos[lightbox]} alt={t.education.photoCaption} />
                    <figcaption>{t.education.photoCaption}</figcaption>
                </figure>
            </div>,
            document.body
        )}
    </div>
    );
}

export default Education;
