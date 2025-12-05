'use client';

import React from 'react';
import { Brain, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

export const About: React.FC = () => (
    <div className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
            <Reveal>
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">The Duality</h2>
                <h3 className="text-3xl md:text-5xl font-medium text-neutral-900 mb-12 leading-tight">
                    We don&apos;t sell AI tools. <br />
                    We Engineer Transformations.
                </h3>
            </Reveal>

            <Reveal delay={100}>
                <div className="prose prose-lg text-neutral-600 font-light leading-loose">
                    <p className="mb-8 text-xl text-neutral-800">
                        There are two types of AI companies today: The Academics who know the math but ignore the market, and the Wrappers who know the hype but break at scale.
                    </p>
                    <p className="mb-8">
                        <span className="font-semibold text-neutral-900">We created a third category: Applied AI.</span>
                    </p>
                    <p className="mb-8">
                        Our DNA is a rare fusion. From <span className="text-neutral-900 font-medium border-b border-neutral-300">top-tier research</span>, we inherit the mathematical precision to build custom architectures that don&apos;t hallucinate. From <span className="text-neutral-900 font-medium border-b border-neutral-300">high-growth scale-ups</span>, we inherit the scars of operational reality—understanding that an algorithm is useless if it doesn&apos;t survive a Friday night demand spike.
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <Reveal delay={200}>
                    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <Brain className="w-8 h-8 text-neutral-900 mb-6 relative z-10" />
                        <h4 className="text-lg font-semibold text-neutral-900 mb-2 relative z-10">The Analytical Mind</h4>
                        <p className="text-neutral-500 text-sm relative z-10">
                            Rooted in deep tech. We understand the statistical boundaries of LLMs. We don&apos;t guess; we calculate.
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <Zap className="w-8 h-8 text-neutral-900 mb-6 relative z-10" />
                        <h4 className="text-lg font-semibold text-neutral-900 mb-2 relative z-10">The Operator Soul</h4>
                        <p className="text-neutral-500 text-sm relative z-10">
                            Forged in fire. We prioritize latency, cost-per-token, and integration over &quot;cool demos.&quot;
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
    </div>
);
