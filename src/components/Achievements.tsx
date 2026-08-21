import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCertificate, faMedal, faArrowRight, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
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
                {t.achievements.items.map((item, index) => {
                    const hint = item.path ? t.achievements.moreHint : item.file ? t.achievements.certHint : null;
                    const body = (
                        <>
                            <div className="ach-card-top">
                                <span className="ach-icon-tile">
                                    <FontAwesomeIcon icon={achievementIcons[index % achievementIcons.length]} />
                                </span>
                                <span className="ach-date">{item.date}</span>
                            </div>
                            <h3>{item.title}</h3>
                            <span className="ach-org">{item.org}</span>
                            <p>{item.desc}</p>
                            {hint && (
                                <span className="ach-more">
                                    {hint}
                                    <FontAwesomeIcon icon={item.file ? faUpRightFromSquare : faArrowRight} />
                                </span>
                            )}
                        </>
                    );

                    /* Entries with a `path` open their own detail page; entries
                       with a `file` open the certificate PDF in a new tab */
                    if (item.path) {
                        return (
                            <Link className="ach-card is-linked" to={item.path} key={index}>
                                {body}
                            </Link>
                        );
                    }
                    return item.file ? (
                        <a className="ach-card is-linked" href={item.file} target="_blank" rel="noreferrer" key={index}>
                            {body}
                        </a>
                    ) : (
                        <div className="ach-card" key={index}>
                            {body}
                        </div>
                    );
                })}
            </div>

        </div>
    </div>
    );
}

export default Achievements;
