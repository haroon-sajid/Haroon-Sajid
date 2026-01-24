import React, { useEffect, useRef } from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact = () => {
  const [sectionRef, , hasIntersected] = useIntersectionObserver({ threshold: 0.1 })
  const formRef = useRef(null)
  const infoRef = useRef(null)

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "2738e7c3-8bc9-46d4-acac-071c74d03fa6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for your submission");
        event.target.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-12 lg:px-24 xl:px-40 
        bg-gradient-to-br from-white via-gray-50/30 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-900 
        overflow-hidden scroll-mt-20
        transition-opacity duration-700 ${hasIntersected ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-0 
          border border-gray-200/50 dark:border-gray-800 
          rounded-2xl sm:rounded-3xl overflow-hidden 
          shadow-2xl shadow-gray-200/50 dark:shadow-black/50
          bg-white/80 dark:bg-gray-900/50
          backdrop-blur-sm">

          {/* Left Column: Form Section */}
          <div
            ref={formRef}
            className={`flex-1 p-5 sm:p-8 md:p-12 lg:p-16 bg-slate-50/50 dark:bg-gray-900/20 flex flex-col justify-between
              transition-opacity duration-600 ${hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ letterSpacing: '-0.02em', fontFamily: 'var(--font-heading), sans-serif' }}>
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">Get in Touch</span>
              </h2>
              <p className="text-primary font-medium mb-6 sm:mb-8 md:mb-12 tracking-wide uppercase text-xs sm:text-sm">Let's discuss your project</p>

              <form onSubmit={onSubmit} id="contact-form" className="space-y-8 sm:space-y-10 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-2.5 sm:py-3 outline-none focus:border-primary transition-all text-black dark:text-white placeholder-transparent text-sm sm:text-base"
                      placeholder="Name"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs sm:peer-focus:text-sm pointer-events-none">Your Name</label>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-2.5 sm:py-3 outline-none focus:border-primary transition-all text-black dark:text-white placeholder-transparent text-sm sm:text-base"
                      placeholder="Email"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs sm:peer-focus:text-sm pointer-events-none">Your Email</label>
                  </div>
                </div>
                <div className="relative group">
                  <textarea
                    name="message"
                    rows="3"
                    required
                    className="peer w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-2.5 sm:py-3 outline-none focus:border-primary transition-all text-black dark:text-white placeholder-transparent resize-none text-sm sm:text-base"
                    placeholder="Message"
                  ></textarea>
                  <label className="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs sm:peer-focus:text-sm pointer-events-none">Your Message</label>
                </div>
              </form>
            </div>

            <div className="mt-8 sm:mt-12 md:mt-16">
              <button
                type="submit"
                form="contact-form"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 font-bold text-white transition-all duration-200 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 overflow-hidden shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base min-h-[44px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </button>
            </div>
          </div>

          {/* Vertical Divider (Hidden on Mobile) */}
          <div className="hidden lg:block w-[1px] bg-gray-100 dark:bg-gray-800"></div>
          {/* Horizontal Divider (Visible on Mobile) */}
          <div className="block lg:hidden h-[1px] bg-gray-100 dark:border-gray-800"></div>

          {/* Right Column: Contact Detail Section */}
          <div
            ref={infoRef}
            className={`flex-1 p-5 sm:p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-900/10 flex flex-col justify-between
              transition-opacity duration-600 ${hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-heading), sans-serif' }}>
                <span className="text-gray-900 dark:text-white">
                  Let's work <br />
                  <span className="text-primary">together</span>
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-8 sm:mb-10 md:mb-12">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group">
                  <div className="mt-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:-rotate-6 shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">Email Me</p>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-black dark:text-white tracking-tight break-words">haroonsajid.ai@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group">
                  <div className="mt-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">WhatsApp</p>
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <span className="text-sm sm:text-base md:text-lg font-bold text-black dark:text-white tracking-tight">+92 311 6566311</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group">
                <div className="mt-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2">Location</p>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-black dark:text-white">Available for remote work</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
