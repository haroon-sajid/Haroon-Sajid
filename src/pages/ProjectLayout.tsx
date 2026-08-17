import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/ProjectPage.scss';

/* Shared frame for the project detail pages. Each page file supplies its own
   bilingual content object — edit those files to fill in project details;
   this layout only controls how everything is arranged. */

export type ProjectSection = {
  heading: string;
  /* Separate paragraphs with a blank line (\n\n) */
  body: string;
  /* Screenshot under the section: set `image` to an imported picture, or set
     `imageSlot: true` to reserve the space with a "coming soon" placeholder */
  image?: string;
  imageSlot?: boolean;
};

export type ProjectPageContent = {
  title: string;
  tagline: string;
  sections: ProjectSection[];
};

type Props = {
  image: string;
  stack: string[];
  /* Small mono label drawn over the cropped hero image (e.g. "N8N × CLAUDE AI ·
     AUTOMATION") — rendered as text so it stays crisp after the crop */
  heroLabel?: string;
  /* Set when the banner has its own artwork in the top corner the overlaid
     label would cover — places the label on its own line above the image */
  heroLabelAbove?: boolean;
  content: { en: ProjectPageContent; ar: ProjectPageContent };
};

function ProjectLayout({ image, stack, heroLabel, heroLabelAbove, content }: Props) {
  const { lang } = useLanguage();
  const c = content[lang];
  const stackLabel = lang === 'ar' ? 'التقنيات المستخدمة' : 'Tech Stack';
  const slotLabel = lang === 'ar' ? 'لقطة الشاشة قريبًا' : 'Screenshot coming soon';

  return (
    <div className="project-page">
      <div className="project-page-inner">
        <h1 className="project-page-title">{c.title}</h1>
        <p className="project-page-tagline">{c.tagline}</p>

        <div className="project-page-stack">
          <span className="project-page-stack-label">{stackLabel}</span>
          {stack.map((tech) => (
            <span className="project-page-chip" key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-page-hero">
          {heroLabel && (
            <span className={`project-page-hero-label${heroLabelAbove ? ' is-above' : ''}`} dir="ltr">{heroLabel}</span>
          )}
          <img className="project-page-image" src={image} alt={c.title} />
        </div>

        {c.sections.map((section) => (
          <section className="project-page-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {section.image ? (
              <img className="project-page-section-image" src={section.image} alt={section.heading} />
            ) : section.imageSlot ? (
              <div className="project-page-image-slot">{slotLabel}</div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProjectLayout;
