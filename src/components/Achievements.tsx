import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCertificate, faMedal } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Achievements.scss';

/* Matched by index to t.achievements.items, wrapping if there are more cards */
const achievementIcons = [faTrophy, faCertificate, faMedal];

function Achievements() {
    const { t } = useLanguage();

    return (
    <div className="container" id="achievements">
        <div className="achievements-container">

            <div className="achievements-head">
                <span className="achievements-eyebrow">{t.achievements.eyebrow}</span>
                <h1>{t.achievements.titleMain} <span className="achievements-outline">{t.achievements.titleOutline}</span></h1>
                <span className="achievements-rule"></span>
                <p className="achievements-intro">{t.achievements.intro}</p>
            </div>

            <div className="achievements-grid">
                {t.achievements.items.map((item, index) => (
                    <div className="ach-card" key={index}>
                        <div className="ach-card-top">
                            <span className="ach-icon-tile">
                                <FontAwesomeIcon icon={achievementIcons[index % achievementIcons.length]} />
                            </span>
                            <span className="ach-date">{item.date}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <span className="ach-org">{item.org}</span>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    </div>
    );
}

export default Achievements;
