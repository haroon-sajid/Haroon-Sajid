import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 py-4 sm:py-5 sticky top-0 z-[100] backdrop-blur-xl border-b border-gray-100 dark:border-gray-900/50 font-medium bg-white/70 dark:bg-gray-950/70 transition-colors duration-300"
      >
        {/* Logo */}
        <a href="#" className="group cursor-pointer">
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-cyan-400 group-hover:to-indigo-500 transition-all duration-300" style={{ fontFamily: 'var(--font-heading), sans-serif', letterSpacing: '-0.02em' }}>
            Haroon Sajid
          </span>
        </a>

        {/* Desktop Menu - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-600 dark:text-gray-300">
          <a href="#" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            About Me
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#skills" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#experience" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#portfolio" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            Portfolio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-primary transition-colors duration-300 relative group text-sm font-semibold uppercase tracking-wider">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          {/* Contact Button Desktop */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all active:scale-95"
          >
            Hire Me <img src={assets.arrow_icon} width={14} alt="" className="invert brightness-0" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-900 dark:text-white transition-transform active:scale-90 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Standalone Mobile Menu Component */}
      <MobileMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
      />
    </>
  );
};

export default Navbar;
