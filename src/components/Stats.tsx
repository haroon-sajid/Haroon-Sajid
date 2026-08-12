import React from "react";
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Stats.scss';

function Stats() {
    const { t } = useLanguage();

    return (
    <div className="container" id="stats">
        <div className="stats-container">
            <span className="stats-eyebrow">{t.statsEyebrow}</span>
            <div className="stats-band">
                {t.stats.map((stat, index) => {
                    const number = stat.value.replace('+', '');
                    const ghost = number.padStart(2, '0');
                    return (
                        <div className="stat" key={index}>
                            <span className="stat-ghost" aria-hidden="true">{ghost}</span>
                            <span className="stat-value">
                                {number}
                                <span className="stat-plus">+</span>
                            </span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}

export default Stats;
