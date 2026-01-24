import React, { useEffect, useRef } from "react";
import Title from "./Title";
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const [sectionRef, , hasIntersected] = useIntersectionObserver({ threshold: 0.1 })

  const workData = [
    {
      title: "Swaapty",
      category: "Full Stack Application",
      description: "Full Stack web app with WebSocket for swapping products. Features include creating ads, swapping ads, real-time chat, and real-time notifications.",
      technologies: ["Next.js", "Nest.js", "Tailwind", "TypeORM", "Docker", "Nginx", "PostgreSQL"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "Saleto Workspace",
      category: "Email Platform",
      description: "Personalized email webapp providing full control over emails with tracking capabilities. Integrated with Mailcow, Postfix, IMAP, and Dovecot.",
      technologies: ["Angular", "Django", "Postfix", "IMAP", "Redis", "Celery", "Tailwind CSS", "PostgreSQL", "MongoDB"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "BlissChat Live",
      category: "Real-time Communication",
      description: "A live social chat platform that lets users connect through real-time messaging and video interactions. Designed for spontaneous conversations.",
      technologies: ["React", "Node.js", "Webflow", "Tailwind CSS", "PostgreSQL"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "Divert2Explore",
      category: "Geoscience Platform",
      description: "A next-generation geoscience and exploration platform empowering industries with advanced subsurface analysis, data-driven insights, and exploration tools.",
      technologies: ["Advanced Geoscience Technology"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "CalStudio",
      category: "AI Platform",
      description: "An AI chatbot and app builder platform that lets users design, deploy, and monetize AI-powered apps with support for multiple LLMS (GPT-4, Claude).",
      technologies: ["Node.js", "Express", "Svelte", "Tailwind CSS", "PostgreSQL"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "AllBooked",
      category: "Workforce Management",
      description: "A cloud-based workforce management platform offering staff scheduling, time-tracking, payroll, invoicing, and integrated communication tools.",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "JavaScript"],
      liveLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <div
      ref={sectionRef}
      id="portfolio"
      className={`relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 
        text-black dark:text-white scroll-mt-20
        bg-gradient-to-br from-gray-50 via-white to-gray-50/50
        dark:from-gray-950 dark:via-black dark:to-gray-900
        py-12 sm:py-16 md:py-24 overflow-hidden
        transition-opacity duration-700 ${hasIntersected ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 text-center mb-8 sm:mb-10">
        <Title title="Featured Projects" desc="A selection of my recent work in Full Stack Development and AI." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1600px]">
        {workData.map((work, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden w-full flex flex-col rounded-xl sm:rounded-2xl p-5 sm:p-6
              bg-gradient-to-br from-white to-gray-50/50 dark:from-[#0F1218] dark:to-[#1a1f2e]
              border border-gray-200/50 dark:border-white/10
              shadow-lg shadow-gray-200/50 dark:shadow-black/50
              hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10
              hover:border-primary/30 dark:hover:border-primary/30
              transition-all duration-500 ease-out
              cursor-pointer
              min-h-[380px] sm:min-h-[420px] h-full
              hover:scale-[1.02] hover:-translate-y-2
              will-change-transform
              ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              transitionDelay: `${index * 0.08}s`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            {/* Glassmorphism Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Category Badge */}
              <div className="mb-3 sm:mb-4 flex-shrink-0">
                <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-primary dark:text-primary/90 uppercase tracking-wider 
                  bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20">
                  {work.category}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors duration-300 flex-shrink-0">
                {work.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-6 flex-grow line-clamp-3">
                {work.description}
              </p>

              {/* Technologies Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 flex-shrink-0">
                {work.technologies.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300
                      bg-gray-100 dark:bg-white/5 rounded-md sm:rounded-lg border border-gray-200 dark:border-white/10
                      group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary
                      transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {work.technologies.length > 4 && (
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                    +{work.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* View Project Button */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-white/10 flex-shrink-0">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3
                    bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90
                    text-white font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl
                    shadow-lg shadow-primary/30
                    hover:shadow-xl hover:shadow-primary/40
                    transition-all duration-300
                    group/btn
                    hover:translate-x-1
                    active:scale-95
                    min-h-[44px]"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* External Link Icon (Top Right Corner) */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/20">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
