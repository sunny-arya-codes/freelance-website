'use client';

import React from 'react';
import { Reveal } from './Reveal';

export const Approach: React.FC = () => (
    <div className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto">
            <Reveal>
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">The Applied Protocol</h2>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-neutral-800 -z-0"></div>

                {[
                    {
                        step: "01",
                        title: "Audit & Align",
                        content: "We don't code on day one. We dissect your P&L to find where AI delivers actual margin expansion."
                    },
                    {
                        step: "02",
                        title: "The 21-Day Sprint",
                        content: "We believe in speed. We deliver a functional, data-trained prototype in 3 weeks. No vaporware."
                    },
                    {
                        step: "03",
                        title: "Transfer & Scale",
                        content: "We are not a retainer farm. We build the system, train your team to run it, and hand over the keys."
                    }
                ].map((item, i) => (
                    <Reveal key={i} delay={i * 150} className="relative z-10 bg-neutral-900">
                        <div className="flex flex-col items-start">
                            <span className="text-5xl font-mono text-neutral-700 mb-6 block bg-neutral-900 pr-4">
                                {item.step}
                            </span>
                            <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed text-sm">
                                {item.content}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </div>
);
