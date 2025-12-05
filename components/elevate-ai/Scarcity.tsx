'use client';

import React from 'react';
import { Reveal } from './Reveal';

interface ScarcityProps {
    navigate: (page: string) => void;
}

export const Scarcity: React.FC<ScarcityProps> = ({ navigate }) => (
    <div className="py-24 px-6 bg-white border-t border-neutral-100 text-center">
        <Reveal>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-medium mb-6 text-neutral-900">Partner, not Vendor.</h2>
                <p className="text-lg text-neutral-500 font-light mb-10 leading-relaxed">
                    Meaningful transformation requires deep focus. Unlike agencies that chase volume,
                    we cap our active partnerships to ensure our senior engineers are personally invested in your success.
                </p>


                <div className="mt-10">
                    <button
                        onClick={() => navigate('contact')}
                        className="px-8 py-4 text-white rounded-full font-medium transition-all duration-500 cursor-pointer bg-gradient-to-r from-neutral-900 via-neutral-800 to-cyan-900 bg-[length:200%_100%] bg-left hover:bg-right shadow-xl hover:shadow-cyan-500/20"
                    >
                        Apply for Consideration
                    </button>
                </div>
            </div>
        </Reveal>
    </div>
);
