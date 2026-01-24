import React, { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
    
    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('.fade-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => {
      elements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      id='hero' 
      className='relative w-full min-h-screen flex items-center justify-center overflow-hidden 
        bg-gradient-to-br from-gray-50 via-white to-blue-50
        dark:from-indigo-950 dark:via-black dark:to-gray-950
        px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20'
    >
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div 
          className="absolute inset-0 grid-pattern"
          style={{
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-200/30 via-cyan-200/20 to-transparent dark:from-blue-500/20 dark:via-cyan-500/10 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-200/30 via-purple-200/20 to-transparent dark:from-indigo-500/20 dark:via-purple-500/10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Professional Badge */}
        <div className="mb-4 sm:mb-6 fade-on-scroll">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-blue-100 via-cyan-100 to-indigo-100 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-indigo-500/20 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-white text-xs sm:text-sm font-medium">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="whitespace-nowrap">Professional Full Stack Engineer</span>
          </span>
        </div>

        {/* Name */}
        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-3 sm:mb-4 fade-on-scroll px-2">
          <span className="animated-gradient-text break-words md:whitespace-nowrap" style={{ letterSpacing: '-0.03em' }}>
            Muhammad Haroon Sajid
          </span>
        </h1>

        {/* Main Title */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 fade-on-scroll px-2">
          <span 
            className="text-black dark:text-white break-words" 
            style={{ 
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 800,
              lineHeight: '1.1'
            }}
          >
            Full Stack AI Engineer
          </span>
        </h2>

        {/* Professional Description */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed fade-on-scroll px-2">
          Full Stack Engineer specializing in modern web technologies, 
          <span className="text-blue-600 dark:text-cyan-400 font-semibold"> backend systems</span>, and 
          <span className="text-blue-600 dark:text-cyan-400 font-semibold"> AI-powered applications</span>. 
          Transforming ideas into high-performance, scalable solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 fade-on-scroll px-2">
          <a
            href="#portfolio"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 sm:gap-3 overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base min-h-[44px]"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download CV</span>
          </a>

          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-white dark:hover:bg-black/60 transition-all duration-300 hover:scale-105 text-sm sm:text-base min-h-[44px]"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact Me</span>
          </a>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto fade-on-scroll px-2">
          {[
            { 
              value: "1.5+", 
              label: "Years Experience", 
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              ),
              iconColor: "text-amber-600"
            },
            { 
              value: "10+", 
              label: "Projects Completed", 
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              ),
              iconColor: "text-orange-500"
            },
            { 
              value: "15+", 
              label: "Technologies", 
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              ),
              iconColor: "text-yellow-400"
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className={`${stat.iconColor} mb-3 sm:mb-4 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-cyan-400 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .fade-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-on-scroll.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .grid-pattern {
          background-image: linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px);
        }
        .dark .grid-pattern {
          background-image: linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
        }
        
        /* Animated Coder-Style Gradient Text for Name */
        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #2563eb 0%,
            #3b82f6 20%,
            #06b6d4 40%,
            #8b5cf6 60%,
            #6366f1 80%,
            #2563eb 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        
        .dark .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #3b82f6 0%,
            #60a5fa 20%,
            #22d3ee 40%,
            #a78bfa 60%,
            #818cf8 80%,
            #3b82f6 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
