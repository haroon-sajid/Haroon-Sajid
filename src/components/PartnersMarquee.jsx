import React from 'react';
import { company_logos } from '../assets/assets';

const PartnersMarquee = () => {
    // Duplicate logos for seamless looping
    const marqueeLogos = [...company_logos, ...company_logos, ...company_logos, ...company_logos];

    return (
        <div className="w-full bg-[#0D1041] py-12 overflow-hidden border-y border-white/5 relative">
            {/* Gradient Mask for Fade Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0D1041] via-transparent to-[#0D1041] opacity-50"></div>

            <div className="flex w-fit animate-marquee whitespace-nowrap items-center gap-16 px-8">
                {marqueeLogos.map((logo, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-32 md:w-40 flex items-center justify-center grayscale brightness-200 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                    >
                        <img
                            src={logo}
                            alt={`Partner ${index}`}
                            className="max-w-full h-8 md:h-12 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersMarquee;
