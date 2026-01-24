import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import assets from '../assets/assets';

const MobileMenu = ({ isOpen, onClose, theme }) => {

    // Close menu on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuLinks = [
        { name: "Home", href: "#" },
        { name: "About Me", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" }
    ];

    const containerVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div id="mobile-menu-overlay" className="fixed inset-0 z-[9999] lg:hidden">
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        variants={containerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-950 shadow-2xl flex flex-col transition-colors duration-300 border-l border-gray-100 dark:border-gray-900"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-900">
                            <div className="flex items-center">
                                <span className="text-xl font-black dark:text-white tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-heading), sans-serif', letterSpacing: '-0.02em' }}>
                                    Haroon Sajid
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-primary transition-all active:scale-90"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto pt-4 pb-8 px-6">
                            <nav className="flex flex-col">
                                {menuLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        variants={itemVariants}
                                        href={link.href}
                                        onClick={onClose}
                                        className="group py-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-900 last:border-0"
                                    >
                                        <span className="text-[17px] font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                                            {link.name}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.a>
                                ))}
                            </nav>
                        </div>

                        {/* Footer / CTA Section */}
                        <div className="p-6 pb-12 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-900">
                            <div className="flex flex-col gap-3">
                                <a
                                    href="#contact"
                                    onClick={onClose}
                                    className="w-full text-center bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                                >
                                    Get in Touch
                                </a>
                                <a
                                    href="#contact"
                                    onClick={onClose}
                                    className="w-full text-center bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-[0.98]"
                                >
                                    Book a Consultation
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
