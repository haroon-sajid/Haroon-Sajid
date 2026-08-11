import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiagramProject,
    faRobot,
    faServer,
    faLaptopCode,
    faPlug,
    faCloud
} from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/images/profile.jpg';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/About.scss';

const doIcons = [faDiagramProject, faRobot, faServer, faLaptopCode, faPlug, faCloud];

function About() {
    const { t } = useLanguage();

    return (
    <div className="container" id="about">
        <div className="about-container">
            <div className="about-layout">

                <div className="about-visual">
                    <div className="about-panel">
                        <span className="about-vertical">{t.about.vertical}</span>
                        <div className="about-photo">
                            <img src={profile} alt={t.hero.name} />
                        </div>
                        <div className="about-badge">
                            <span className="badge-value">{t.about.badgeValue}</span>
                            <span
                                className="badge-label"
                                dangerouslySetInnerHTML={{ __html: t.about.badgeLabel }}
                            />
                            <span className="badge-sub">{t.about.badgeSub}</span>
                        </div>
                        <p className="about-script">{t.about.script}</p>
                    </div>
                </div>

                <div className="about-content">
                    <span className="about-eyebrow">{t.about.eyebrow}</span>
                    <h1>{t.about.titleMain} <span className="about-outline">{t.about.titleOutline}</span></h1>
                    <span className="about-rule"></span>

                    <div className="about-text">
                        <p>
                            {t.about.introLead}<strong>{t.about.introName}</strong>{t.about.introRest}
                        </p>
                        <p>{t.about.para2}</p>
                    </div>

                    <span className="about-divider"></span>

                    <div className="about-do">
                        <h3>{t.about.doTitle}</h3>
                        <ul className="do-list">
                            {t.about.doItems.map((label, index) => (
                                <li key={index}>
                                    <span className="do-icon">
                                        <FontAwesomeIcon icon={doIcons[index]} />
                                    </span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
}

export default About;
