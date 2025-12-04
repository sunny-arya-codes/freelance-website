'use client';

import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { ChaosToOrder } from './ChaosToOrder';

interface HeroProps {
    navigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate }) => (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 relative overflow-hidden bg-white">
        {/* Chaos to Order Background Animation */}
        <div className="absolute top-0 right-0 w-full h-full md:w-2/3 md:h-2/3 md:top-1/4 md:right-0 opacity-50">
            <ChaosToOrder />
        </div>

        <div className="max-w-6xl mx-auto w-full z-10">
            <Reveal delay={0}>
                <div className="inline-flex items-center gap-3 mb-8">
                    <div className="px-3 py-1 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm text-xs font-medium text-neutral-600">
                        <span className="font-bold text-neutral-900">Category:</span> Applied AI Consultancy
                    </div>
                    <div className="hidden md:flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                        Q3 Intake: 2 Slots Open
                    </div>
                </div>
            </Reveal>

            <Reveal delay={100}>
                <h1 className="text-5xl md:text-8xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-8">
                    Not just algorithms. <br />
                    <span className="text-neutral-400">Business Logic.</span>
                </h1>
            </Reveal>

            <Reveal delay={200}>
                <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed font-light">
                    The world doesn&apos;t need more AI experiments. It needs <span className="text-neutral-900 font-medium">Applied Intelligence.</span>
                    <br className="hidden md:block" />
                    We fuse IIT Madras rigor with Freshmenu operational speed to build systems that actually work.
                </p>
            </Reveal>

            <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mt-12">
                    <button
                        onClick={() => navigate('contact')}
                        className="group flex items-center justify-center px-8 py-4 bg-neutral-900 text-white rounded-full font-medium transition-all hover:bg-neutral-800 hover:scale-[1.02] shadow-lg shadow-neutral-200"
                    >
                        Apply for Partnership
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => navigate('about')}
                        className="flex items-center justify-center px-8 py-4 bg-transparent border border-neutral-200 text-neutral-600 rounded-full font-medium transition-all hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300"
                    >
                        Why We Are Different
                    </button>
                </div>
            </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-300 hidden md:block">
            <ChevronDown size={24} />
        </div>
    </div>
);
