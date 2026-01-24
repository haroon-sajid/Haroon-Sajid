import React from "react";
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Experience = () => {
  const [sectionRef, , hasIntersected] = useIntersectionObserver({ threshold: 0.1 })

  const experienceData = [
    {
      company: "Orvox AI",
      role: "Full Stack Developer",
      period: "Aug 2024 - Present",
      description: "Developing full-stack applications using Python, FastAPI, Django, PostgreSQL, React, and TypeScript. Building AI chatbot solutions using LangChain.",
      technologies: ["FastAPI", "Django", "React", "Docker"],
      icon: "💻",
      location: "Remote"
    },
    {
      company: "Camden Health System",
      role: "Web Developer Intern",
      period: "Feb 2024 - Jul 2024",
      description: "Developed FastAPI-based RESTful APIs for healthcare workflows. Built AI-powered appointment booking chatbot. Created responsive frontend components.",
      technologies: ["FastAPI", "React", "Node.js"],
      icon: "🚀",
      location: "Remote"
    },
    {
      company: "Enigmatix",
      role: "Backend Developer",
      period: "Aug 2023 - Jan 2024",
      description: "Developed backend services using Python and FastAPI. Designed database schemas and wrote efficient SQL queries.",
      technologies: ["Python", "FastAPI", "PostgreSQL"],
      icon: "🎯",
      location: "Remote"
    }
  ];

  const educationData = [
    {
      institution: "The Islamia University of Bahawalpur",
      degree: "Bachelor of Science in Artificial Intelligence",
      period: "2020 - 2024",
      description: "Specialized in ML, DL, NLP, and AI System Development. Developed JARVIS Desktop Assistant for FYP.",
      technologies: ["ML/DL", "NLP", "AI Systems"],
      icon: "🎓",
      location: "Bahawalpur, Pakistan"
    },
    {
      institution: "Punjab College, Bahawalpur Campus",
      degree: "Intermediate in Science",
      period: "2018 - 2020",
      description: "Pre-Engineering focus with strong foundation in Mathematics and Physics.",
      technologies: ["Mathematics", "Physics", "Chemistry"],
      icon: "📚",
      location: "Bahawalpur, Pakistan"
    },
    {
      institution: "Online Certification Program",
      degree: "Generative AI Mastery with 15+ Real Time project certificate",
      period: "2024",
      description: "Comprehensive certification program covering Generative AI technologies with hands-on experience building 15+ real-time projects using advanced AI frameworks.",
      technologies: ["Generative AI", "LLMs", "LangChain"],
      icon: "📜",
      location: "Online"
    }
  ];

  // Unified Section Header Component
  const SectionHeader = ({ badge, title, subtitle }) => (
    <div className="text-center mb-12">
      <div className="inline-block px-5 py-2 mb-4 bg-[rgba(102,126,234,0.15)] dark:bg-[rgba(102,126,234,0.15)] border border-[rgba(102,126,234,0.3)] dark:border-[rgba(102,126,234,0.3)] rounded-[30px] text-[#667eea] text-sm font-medium">
        {badge}
      </div>
      <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-tight">
        {title}
      </h2>
      <p className="text-base text-gray-600 dark:text-[#a0a0a0] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );

  // Unified Card Component
  const Card = ({ data, index, isEducation = false, baseDelay = 0 }) => {
    const title = isEducation ? data.degree : data.role;
    const subtitle = isEducation ? data.institution : data.company;
    const delay = baseDelay + index;

    return (
      <div
        className={`group relative aspect-square 
          bg-gray-50/80 dark:bg-[rgba(255,255,255,0.05)] 
          backdrop-blur-[10px] 
          border border-gray-200/50 dark:border-[rgba(255,255,255,0.1)] 
          rounded-[20px] 
          p-6 sm:p-7 md:p-8 
          flex flex-col justify-between 
          overflow-hidden 
          transition-all duration-300 
          hover:-translate-y-2 active:translate-y-0
          hover:bg-gray-100/80 dark:hover:bg-[rgba(255,255,255,0.08)] 
          hover:border-[rgba(102,126,234,0.4)] dark:hover:border-[rgba(102,126,234,0.4)] 
          hover:shadow-[0_15px_50px_rgba(102,126,234,0.2)] dark:hover:shadow-[0_15px_50px_rgba(102,126,234,0.3)]
          ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          transitionDelay: `${delay * 0.1}s`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        }}
      >
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#667eea] to-[#764ba2]"></div>

        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[rgba(102,126,234,0.2)] to-[rgba(118,75,162,0.2)] rounded-xl flex items-center justify-center text-xl sm:text-2xl">
            {data.icon}
          </div>
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[rgba(102,126,234,0.15)] dark:bg-[rgba(102,126,234,0.15)] border border-[rgba(102,126,234,0.3)] dark:border-[rgba(102,126,234,0.3)] rounded-lg text-[0.65rem] sm:text-[0.7rem] text-[#667eea] dark:text-[#a5b4fc] font-semibold">
            {data.period}
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[1rem] sm:text-[1.1rem] font-bold mb-1 text-gray-900 dark:text-white leading-tight">
            {title}
          </h3>
          <div className="text-[0.85rem] sm:text-[0.9rem] text-[#667eea] dark:text-[#667eea] font-semibold mb-1 leading-tight">
            {subtitle}
          </div>
          <div className="text-[0.7rem] sm:text-xs text-gray-600 dark:text-[#888] mb-3 flex items-center gap-1 leading-tight">
            <span>📍</span>
            <span>{data.location}</span>
          </div>
          <p 
            className="text-[0.8rem] sm:text-[0.85rem] text-gray-600 dark:text-[#b0b0b0] leading-relaxed overflow-hidden" 
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
          {data.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 
                bg-[rgba(102,126,234,0.15)] dark:bg-[rgba(102,126,234,0.15)] 
                border border-[rgba(102,126,234,0.3)] dark:border-[rgba(102,126,234,0.3)] 
                rounded-xl 
                text-[0.65rem] sm:text-[0.7rem] 
                text-[#667eea] dark:text-[#a5b4fc] 
                transition-all duration-300 
                hover:bg-[rgba(102,126,234,0.25)] dark:hover:bg-[rgba(102,126,234,0.25)] 
                hover:border-[rgba(102,126,234,0.5)] dark:hover:border-[rgba(102,126,234,0.5)] 
                hover:-translate-y-0.5 active:translate-y-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-5 lg:px-6
        bg-white dark:bg-[#0a0a0f]
        overflow-hidden scroll-mt-20
        transition-opacity duration-700 ${hasIntersected ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Work Experience Section */}
        <div className="mb-16 sm:mb-20">
          <SectionHeader
            badge="💼 Professional Journey"
            title="Work Experience"
            subtitle="My professional journey building innovative solutions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8">
            {experienceData.map((exp, index) => (
              <Card
                key={index}
                data={exp}
                index={index}
                isEducation={false}
                baseDelay={0}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16 sm:mt-20">
          <SectionHeader
            badge="🎓 Academic Background"
            title="Education & Certifications"
            subtitle="My academic journey and professional certifications"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8">
            {educationData.map((edu, index) => (
              <Card
                key={index}
                data={edu}
                index={index}
                isEducation={true}
                baseDelay={experienceData.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
