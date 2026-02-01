import React from "react";
import Title from "./Title";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const workData = [
    {
      title: "TeamFlow",
      category: "Task & Project Management",
      description: "A full-stack project management platform similar to Jira, built for efficient project planning, task assignment, and team collaboration. Features include role-based access control, attendance tracking, payment integration, and comprehensive admin dashboards.",
      technologies: ["FastAPI", "React", "PostgreSQL", "Pydantic", "CSS"],
      liveLink: "https://teamflow-frontend-omega.vercel.app/"
    },
    {
      title: "Publisha.io",
      category: "AI-Powered Campaign Management",
      description: "Multi-tenant platform for automating content creation and marketing campaigns. Integrates AI (LangChain/LangGraph) to generate blogs and social captions with human-in-the-loop approval workflows and multi-channel publishing.",
      technologies: ["Django", "PostgreSQL", "Celery", "LangChain", "LangGraph"],
      liveLink: "https://publisha.io/"
    },
    {
      title: "Web Analytics",
      category: "Statistical & Data Analytics",
      description: "Full-stack analytics platform providing statistical tools, data validation, and automated report generation (PDF/Word). Supports complex data cleaning, outcome analysis, correlations, and PK/PD calculations in a scalable Dockerized environment.",
      technologies: ["FastAPI", "Django", "React", "TypeScript", "PostgreSQL", "Docker"],
      liveLink: "https://orca-app-wrqhf.ondigitalocean.app/"
    },
    {
      title: "Saleto",
      category: "Email Infrastructure & CRM",
      description: "A comprehensive email sending and receiving platform offering full control over communications. Supports email tracking, inbox management, and background processing. Integrates with Mailcow Postfix, IMAP, and Dovecot for reliable delivery.",
      technologies: ["Angular", "Django", "Redis", "Celery", "PostgreSQL", "MongoDB"],
      liveLink: "https://workspace.saleto.com/"
    },
    {
      title: "CalStudio",
      category: "AI App Generation Platform",
      description: "A powerful platform to create and monetize custom AI apps, agents, and voice solutions. Enables users to describe their app ideas and instantly generate functional AI applications.",
      technologies: ["Generative AI", "AI Agents", "Voice AI", "React", "Tailwind CSS"],
      liveLink: "https://calstudio.com/?ref=pmfm"
    },
    {
      title: "Demo Project",
      category: "Upcoming Innovation",
      description: "An upcoming showcase of cutting-edge AI capabilities and interactive web experiences. This project will demonstrate the future of automated workflows and intelligent user interfaces.",
      technologies: ["Next.js", "AI Integration", "Future Tech"],
      liveLink: "#"
    }
  ];

  return (
    <div
      id="portfolio"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-16 xl:px-24 pt-16 sm:pt-30 
        text-black dark:text-white scroll-mt-20
        bg-gradient-to-br from-gray-50 via-white to-gray-50/50
        dark:from-gray-950 dark:via-black dark:to-gray-900
        py-8 sm:py-16 md:py-24 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-8 sm:mb-10"
      >
        <Title title="Featured Projects" desc="A selection of my recent work in Full Stack Development and AI." />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1600px]">
        {workData.map((work, index) => (
          <motion.a
            href={work.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden w-full flex flex-col rounded-xl sm:rounded-2xl p-5 sm:p-6
              bg-gradient-to-br from-white to-gray-50/50 dark:from-[#0F1218] dark:to-[#1a1f2e]
              border border-gray-200/50 dark:border-white/10
              shadow-lg shadow-gray-200/50 dark:shadow-black/50
              hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10
              hover:border-blue-500/30 dark:hover:border-blue-500/30
              transition-all duration-500 ease-out
              cursor-pointer
              min-h-[380px] sm:min-h-[420px] h-full
              hover:scale-[1.02] hover:-translate-y-2"
          >
            {/* Glassmorphism Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/3 to-transparent dark:from-blue-500/10 dark:via-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

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
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0">
                {work.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-6 flex-grow line-clamp-4">
                {work.description}
              </p>

              {/* Technologies Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 flex-shrink-0">
                {work.technologies.slice(0, 5).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300
                      bg-gray-100 dark:bg-white/5 rounded-md sm:rounded-lg border border-gray-200 dark:border-white/10
                      group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400
                      transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {work.technologies.length > 5 && (
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                    +{work.technologies.length - 5}
                  </span>
                )}
              </div>

              {/* View Project Button */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-white/10 flex-shrink-0">
                <div
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3
                    bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90
                    text-white font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl
                    shadow-lg shadow-primary/30
                    hover:shadow-xl hover:shadow-primary/40
                    transition-all duration-300
                    group/btn
                    min-h-[44px]"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* External Link Icon (Top Right Corner) */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
