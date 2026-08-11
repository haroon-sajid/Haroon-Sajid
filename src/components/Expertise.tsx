import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWandMagicSparkles,
    faServer,
    faCode,
    faDatabase,
    faCloudArrowUp,
    faShareNodes
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Expertise.scss';

const areaIcons = [faWandMagicSparkles, faServer, faCode, faDatabase, faCloudArrowUp, faShareNodes];

/* Tech names stay in Latin script in both languages — that is how they are
   written in Arabic technical writing too. */
const areaStacks = [
    ['n8n', 'Make', 'Zapier', 'GoHighLevel', 'LangChain', 'LangGraph', 'AI Agents', 'RAG', 'Prompt Engineering', 'LLM Integration', 'MCP'],
    ['Python', 'FastAPI', 'Django', 'Flask', 'Node.js', 'REST API Design', 'Backend Architecture'],
    ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Supabase', 'Firebase', 'Vector Databases'],
    ['Docker', 'AWS', 'Railway', 'Render', 'GitHub Actions', 'CI/CD Pipelines', 'Git & GitHub'],
    ['REST APIs', 'Webhooks', 'Airtable', 'Twilio', 'Google Workspace', 'Retell', 'Vapi', 'Notion', 'ElevenLabs', 'Zoho CRM', 'Postman']
];

function Expertise() {
    const { t } = useLanguage();

    return (
    <div className="container" id="expertise">
        <div className="expertise-container">

            <div className="expertise-head">
                <div className="expertise-head-left">
                    <span className="expertise-eyebrow">{t.expertise.eyebrow}</span>
                    <h1>{t.expertise.titleMain}<span className="expertise-outline">{t.expertise.titleOutline}</span></h1>
                    <span className="expertise-rule"></span>
                    <p className="expertise-intro">{t.expertise.intro}</p>
                </div>
            </div>

            <div className="expertise-grid">
                {t.expertise.areas.map((area, index) => (
                    <div className="area" key={index}>
                        <span className="area-ghost">{`0${index + 1}`}</span>
                        <FontAwesomeIcon className="area-icon" icon={areaIcons[index]} />
                        <h3>
                            {area.title} <span className="area-title-alt">{area.titleAlt}</span>
                        </h3>
                        <p>{area.desc}</p>
                        <span className="area-stack-label">{t.expertise.stackLabel}</span>
                        <div className="area-stack">
                            {areaStacks[index].map((tech, i) => (
                                <span className="tech" key={i}>{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </div>
    );
}

export default Expertise;
