import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";

const Footer = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-gray-900 pt-8 sm:pt-10 mt-12 sm:mt-20 md:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40"
    >
      {/* Footer Top */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 sm:gap-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-6 text-base text-black dark:text-white"
        >
          <a href="#hero" className="group cursor-pointer lg:justify-start block mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-cyan-400 group-hover:to-indigo-500 transition-all duration-300" style={{ fontFamily: 'var(--font-heading), sans-serif', letterSpacing: '-0.02em' }}>
              Haroon Sajid
            </span>
          </a>
          <p className="max-w-md text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mt-2 sm:mt-4">
            Building scalable, intelligent, and user-centric digital solutions.
            Let's create something amazing together.
          </p>

          <nav>
            <ul className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-xs sm:text-sm md:text-base font-medium">
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#about">
                  About Me
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#skills">
                  Skills
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#experience">
                  Experience
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors duration-300" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-black dark:text-white lg:max-w-md w-full"
        >
          <h3 className="font-bold text-base sm:text-lg">Let's Connect</h3>
          <p className="text-xs sm:text-sm mt-2 mb-4 sm:mb-6 text-gray-600 dark:text-gray-400">
            Open for opportunities. Drop me a line!
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:haroonsajid.ai@gmail.com" className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 text-white font-bold rounded-lg sm:rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 transition-all shadow-lg shadow-indigo-500/20 text-center w-full sm:w-auto text-sm sm:text-base min-h-[44px] flex items-center justify-center">
              Send Email
            </a>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800 my-6 sm:my-8 md:my-10" />

      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="pb-6 sm:pb-8 md:pb-10 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <p className="text-center md:text-left">Copyright {new Date().getFullYear()} © Haroon Sajid - All Right Reserved.</p>

        <div className="flex items-center gap-6">
          <a href="https://www.facebook.com/share/1CqRy9mzjM/" target="_blank" rel="noopener noreferrer" className="hover:scale-120 hover:text-primary transition-all cursor-pointer text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5 hover:opacity-100 opacity-70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/haroon-sajid-ai?" target="_blank" rel="noopener noreferrer" className="hover:scale-120 hover:text-primary transition-all cursor-pointer">
            {/* Icons kept as is or updated if different needs */}
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-5 h-5 opacity-70 hover:opacity-100" />
          </a>
          <a href="https://github.com/haroon-sajid" target="_blank" rel="noopener noreferrer" className="hover:scale-120 hover:text-primary transition-all cursor-pointer text-gray-400">
            <svg className="w-5 h-5 opacity-70 hover:opacity-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;

{
  /* <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img className="h-9" src={assets.logo} alt="dummyLogoDark" />
                    <p className="mt-6 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-2">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                                <button className="bg-blue-600 w-24 h-9 text-white rounded">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
            </p>
        </footer> */
}
