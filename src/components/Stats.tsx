import React from "react";
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Stats.scss';

function Stats() {
    const { t } = useLanguage();

    return (
    <div className="container" id="stats">
        <div className="stats-container">
            <div className="stats-band">
                {t.stats.map((stat, index) => (
                    <div className="stat" key={index}>
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Stats;
