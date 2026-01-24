import{r,j as e}from"./index-CJx5kdJ6.js";import{u as o}from"./useIntersectionObserver-BITu4yvg.js";const d=({title:s,desc:n})=>{const[i,,t]=o({threshold:.1}),a=r.useRef(null);return r.useEffect(()=>{t&&a.current&&setTimeout(()=>{a.current?.classList.add("animate-underline")},300)},[t]),e.jsxs("div",{className:"relative",ref:i,children:[e.jsx("h1",{className:`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center mb-3 sm:mb-4 font-black 
          tracking-tight leading-tight px-2
          transition-opacity duration-700 ${t?"opacity-100":"opacity-0"}`,style:{letterSpacing:"-0.03em",fontFamily:"var(--font-heading), sans-serif",transform:t?"translateY(0)":"translateY(20px)",transition:"opacity 0.7s ease-out, transform 0.7s ease-out"},children:e.jsxs("span",{className:"relative inline-block break-words professional-gradient-text",children:[s,e.jsx("span",{ref:a,className:"absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 rounded-full origin-left scale-x-0 transition-transform duration-800 ease-out"})]})}),e.jsx("p",{className:`max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 
          text-sm sm:text-base md:text-lg font-medium leading-relaxed px-2
          transition-opacity duration-500 delay-200 ${t?"opacity-100":"opacity-0"}`,style:{transform:t?"translateY(0)":"translateY(20px)",transition:"opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s"},children:n}),e.jsx("style",{children:`
        .animate-underline {
          transform: scaleX(1) !important;
        }
        
        /* Professional Coder-Style Gradient for Section Headings */
        .professional-gradient-text {
          background: linear-gradient(
            135deg,
            #2563eb 0%,
            #3b82f6 25%,
            #06b6d4 50%,
            #8b5cf6 75%,
            #6366f1 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .dark .professional-gradient-text {
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #60a5fa 25%,
            #22d3ee 50%,
            #a78bfa 75%,
            #818cf8 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `})]})};export{d as T};
