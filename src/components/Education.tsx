import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Education.scss';

const eduIcons = [faGraduationCap, faBookOpen];

function Education() {
    const { t } = useLanguage();

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
                    <div className="edu-card" key={index}>
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
    </div>
    );
}

export default Education;
