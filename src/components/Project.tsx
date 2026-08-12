import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
/* Filename is idle-, not idol- — matches the file as it sits on disk. */
import idolfluence from '../assets/images/idlefluence.jpeg';
import publisha from '../assets/images/publisha.jpeg';
import aiInbox from '../assets/images/ai-inbox-management-system.png';
import caregivers from '../assets/images/caregivers-monitoring-system.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock09 from '../assets/images/mock09.png';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Project.scss';

/* Stacks live here rather than in translations.ts — tool names are the same in
   every language, so translating them would just duplicate the list. */
const projectMeta = [
    {
        image: publisha,
        link: 'https://publisha.io',
        stack: ['Django', 'PostgreSQL', 'Celery', 'LangChain', 'LangGraph']
    },
    {
        image: caregivers,
        link: '#projects',
        stack: ['n8n', 'Twilio', 'OpenAI', 'GoTo SMS', 'Google Sheets', 'Gmail', 'SwyftOps']
    },
    {
        image: idolfluence,
        link: 'https://account.idolfluence.com/sign-up',
        stack: ['n8n', 'Make', 'Airtable', 'Softr', 'OpenAI', 'ElevenLabs', 'Twilio', 'REST APIs', 'Webhooks']
    },
    {
        image: aiInbox,
        /* Placeholder until the project details arrive */
        link: '#projects',
        stack: ['AI', 'Automation']
    },
    {
        image: mock06,
        link: 'http://www.wemanage.jp/',
        stack: ['Ruby on Rails']
    },
    {
        image: mock05,
        link: 'https://www.byuh.edu/covid-19-case-management',
        stack: ['JavaScript', 'Google Sheets API']
    },
    {
        image: mock04,
        link: 'https://github.com/yujisatojr/multi-reg-analysis',
        stack: ['Python', 'Pandas', 'Scikit-Learn']
    },
    {
        image: mock03,
        link: 'https://holokai.byuh.edu/programs-of-study',
        stack: ['Java', 'Handlebars', 'LESS']
    },
    {
        image: mock02,
        link: 'https://hookele.byuh.edu/transfer-evaluation-guidelines-and-matrix',
        stack: ['Java', 'Handlebars', 'LESS']
    }
];

/* Four chips is what fits on one line at the narrowest card width, and one line
   is what keeps every card the same height. Anything past that collapses into a
   +N chip that names the rest on hover, so nothing is actually lost. */
const MAX_CHIPS = 4;

function ProjectStack({ stack }: { stack: string[] }) {
    const shown = stack.slice(0, MAX_CHIPS);
    const rest = stack.slice(MAX_CHIPS);

    return (
        <div className="project-stack">
            {shown.map((tech) => (
                <span className="tech" key={tech}>{tech}</span>
            ))}
            {rest.length > 0 && (
                <span className="tech tech-more" title={rest.join(', ')}>+{rest.length}</span>
            )}
        </div>
    );
}

/* Six cards fill the grid evenly (2 or 3 per row at every width);
   the rest stay behind the See More toggle. */
const INITIAL_COUNT = 6;

function Project() {
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll
        ? t.projects.items
        : t.projects.items.slice(0, INITIAL_COUNT);

    const toggleShowAll = () => {
        // Collapsing can leave the viewport stranded far below the grid —
        // bring the section back into view before the cards disappear.
        if (showAll) {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        setShowAll((prev) => !prev);
    };

    return(
    <div className="projects-container" id="projects">
        <div className="projects-head">
            <span className="projects-eyebrow">{t.projects.eyebrow}</span>
            <h1>{t.projects.titleMain} <span className="projects-outline">{t.projects.titleOutline}</span></h1>
            <span className="projects-rule"></span>
            <p className="projects-intro">{t.projects.intro}</p>
        </div>
        <div className="projects-grid">
            {visibleProjects.map((project, index) => (
                <div className="project" key={index}>
                    <a className="project-thumb" href={projectMeta[index].link} target="_blank" rel="noreferrer">
                        <img src={projectMeta[index].image} className="zoom" alt={project.title} />
                    </a>
                    <a className="project-link" href={projectMeta[index].link} target="_blank" rel="noreferrer">
                        <h2>{project.title}</h2>
                    </a>
                    <p>{project.desc}</p>
                    <ProjectStack stack={projectMeta[index].stack} />
                </div>
            ))}
        </div>
        {t.projects.items.length > INITIAL_COUNT && (
            <div className="projects-more">
                <button type="button" className="projects-more-btn" onClick={toggleShowAll}>
                    {showAll ? t.projects.seeLess : t.projects.seeMore}
                    {showAll ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </button>
            </div>
        )}
    </div>
    );
}

export default Project;
