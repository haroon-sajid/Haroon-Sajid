import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
    const stats = [
        { value: '5+', label: 'Years of Innovation' },
        { value: '40+', label: 'Happy Clients' },
        { value: '20+', label: 'Deployed Agents' },
        { value: '05+', label: 'Global Partnerships' }
    ];

    return (
        <section className="py-12 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-8 bg-primary rounded-full transform -skew-x-12"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                            Why Choose Haroon
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                        This highlights our skills, experience, and quality of work, demonstrating our commitment to excellence in the digital landscape.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100 dark:border-gray-800">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-10 text-center flex flex-col items-center justify-center border-gray-100 dark:border-gray-800 
                                ${index !== stats.length - 1 ? 'lg:border-r' : ''} 
                                ${index % 2 === 0 ? 'md:border-r' : 'md:border-r-0 lg:border-r'}
                                ${index !== stats.length - 1 ? 'border-b lg:border-b-0' : ''}`}
                        >
                            <span className="text-4xl md:text-5xl font-extrabold text-[#0D1041] dark:text-white mb-2">
                                {stat.value}
                            </span>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
