'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Map, Rocket, RefreshCw } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Understand',
        description: 'We dive deep to analyze your current workflows and pain points.',
        icon: Search,
    },
    {
        id: 2,
        title: 'Strategize',
        description: 'We identify high-value AI opportunities and map out a custom roadmap.',
        icon: Map,
    },
    {
        id: 3,
        title: 'Implement',
        description: 'We deploy robust automation tools and AI agents into your system.',
        icon: Rocket,
    },
    {
        id: 4,
        title: 'Optimize',
        description: 'We continuously refine and improve performance for maximum ROI.',
        icon: RefreshCw,
    },
];

export function ProcessFlow() {
    return (
        <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        How We Transform Your Business
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        A simple, transparent 4-step process to take you from manual to automated.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all text-center md:text-left"
                            >
                                <div className="relative inline-block mb-6">
                                    <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-2xl font-bold relative z-10 mx-auto md:mx-0">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
