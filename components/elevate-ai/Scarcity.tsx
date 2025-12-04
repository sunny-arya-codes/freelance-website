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

                <div className="inline-flex items-center gap-4 p-1 pr-6 border border-neutral-200 rounded-full bg-neutral-50">
                    <div className="bg-white px-4 py-2 rounded-full border border-neutral-100 shadow-sm text-sm font-bold text-neutral-900">
                        Q3 2025 COHORT
                    </div>
                    <div className="text-sm text-neutral-600 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                        Only 2 partnership slots remaining
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => navigate('contact')}
                        className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200/50"
                    >
                        Apply for Consideration
                    </button>
                </div>
            </div>
        </Reveal>
    </div>
);
