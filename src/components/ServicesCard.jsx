import React, { useEffect, useRef } from "react";
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const ServicesCard = ({ service, index }) => {
  const [cardRef, , hasIntersected] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: '50px'
  })

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden w-full flex flex-col rounded-2xl p-8 h-full
        transition-all duration-500 group
        bg-gradient-to-br from-white to-gray-50/50 dark:from-[#0F1218] dark:to-[#1a1f2e]
        border border-gray-200/50 dark:border-white/5 
        hover:border-primary/50 dark:hover:border-primary/50 
        shadow-lg shadow-gray-200/50 dark:shadow-black/50
        hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10
        hover:scale-[1.03] hover:-translate-y-1
        will-change-transform
        ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 0.05}s`,
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
    >
      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-3xl transition-colors duration-300 pointer-events-none" />

      {/* Content wrapper to ensure z-index above background */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon & Title */}
        <div className="flex flex-col gap-6 mb-6 flex-shrink-0">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-blue-600 dark:text-blue-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
            {typeof service.icon === 'string' ? (
              <img src={service.icon} alt="" className="w-8 h-8 object-contain" loading="lazy" />
            ) : (
              <service.icon className="w-7 h-7" strokeWidth={1.5} />
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
            {service.title}
          </h3>
        </div>

        {/* Skills List */}
        <div className="flex flex-col gap-3 mt-auto">
          {service.items && service.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
