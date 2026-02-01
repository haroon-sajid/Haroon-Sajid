import React, { useEffect, useRef } from 'react'
import assets from '../assets/assets'
import Title from './Title'
import ServicesCard from './ServicesCard'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

import {
  Mic,
  Bot,
  Workflow,
  Code,
  Cpu,
  Globe,
  ShoppingBag,
  Palette
} from 'lucide-react';

const Skills = () => {
  const [sectionRef, , hasIntersected] = useIntersectionObserver({ threshold: 0.1 })

  const servicesData = [
    {
      title: 'Backend Stack',
      icon: Code,
      items: [
        'Python',
        'FastAPI',
        'Django',
        'Flask',
        'Node.js'
      ]
    },
    {
      title: 'Frontend Stack',
      icon: Globe,
      items: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'HTML5 / CSS3'
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: Bot,
      items: [
        'LangChain',
        'LLM Integration',
        'RAG Systems',
        'AI Agents',
        'OpenAI API'
      ]
    },
    {
      title: 'Databases',
      icon: Workflow,
      items: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis',
        'Supabase'
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: Cpu,
      items: [
        'Docker',
        'CI/CD Pipelines',
        'GitHub Actions',
        'Nginx',
        'Linux'
      ]
    },
    {
      title: 'Automation & Tools',
      icon: Mic,
      items: [
        'n8n Workflows',
        'WebSockets',
        'Postman',
        'Swagger',
        'Git / GitHub'
      ]
    }
  ]

  return (
    <div
      ref={sectionRef}
      id='skills'
      className={`relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-16 sm:pt-30 
        text-black dark:text-white scroll-mt-20
        bg-gradient-to-br from-white via-gray-50/30 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-900
        py-8 sm:py-16 md:py-24
        transition-opacity duration-700 ${hasIntersected ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #5044E5 1px, transparent 1px),
                              linear-gradient(to bottom, #5044E5 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>
      <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 z-1 dark:hidden opacity-20' loading="lazy" />

      <div className="relative z-10 text-center mb-8 sm:mb-10">
        <Title title="What I Work With" desc="TECHNOLOGIES & SKILLS" />
      </div>
      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 ${servicesData.length > 6 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} grid-auto-rows-[1fr] gap-6 sm:gap-8 w-full max-w-[1600px] items-stretch`}>
        {servicesData.map((service, index) => (
          <ServicesCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Skills
