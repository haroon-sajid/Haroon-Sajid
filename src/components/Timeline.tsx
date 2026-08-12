import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Timeline.scss'

type Job = {
  role: string;
  roleAlt: string;
  company: string;
  location: string;
  date: string;
  desc: string;
  points: string[];
};

function Timeline() {
  const { t } = useLanguage();

  const card = (job: Job, isCurrent: boolean) => (
    <article className="hx-card">
      <div className="hx-card-top">
        <h3 className="hx-role">
          {job.role}
          {job.roleAlt && <> <span className="hx-role-outline">{job.roleAlt}</span></>}
        </h3>
        {isCurrent && (
          <span className="hx-status"><span className="dot"></span>{t.history.present}</span>
        )}
      </div>
      <div className="hx-meta">
        <span className="hx-company">{job.company}</span>
        <span className="hx-loc">
          <FontAwesomeIcon icon={faLocationDot} />
          {job.location}
        </span>
      </div>
      <div className="hx-divider"></div>
      <p className="hx-desc">{job.desc}</p>
      {/* Mobile only: the description as short curated bullets */}
      <ul className="hx-points">
        {job.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );

  const node = (
    <div className="hx-node">
      <FontAwesomeIcon icon={faBriefcase} />
    </div>
  );

  return (
    <div id="history">
      <div className="items-container">
        <div className="history-head">
          <span className="history-eyebrow">{t.history.eyebrow}</span>
          <h1>{t.history.titleMain} <span className="history-outline">{t.history.titleOutline}</span></h1>
          <span className="history-rule"></span>
          <p className="history-intro">{t.history.intro}</p>
        </div>

        <div className="hx-timeline">
          {t.history.jobs.map((job, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div className={`hx-item ${isLeft ? 'left' : 'right'}`} key={index}>
                {isLeft ? (
                  <>
                    {card(job, index === 0)}
                    {node}
                    <span className="hx-date">{job.date}</span>
                  </>
                ) : (
                  <>
                    <span className="hx-date">{job.date}</span>
                    {node}
                    {card(job, index === 0)}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
