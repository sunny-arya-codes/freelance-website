'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';

export function BeforeAfter() {
    return (
        <section className="py-20 bg-neutral-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        The Difference is Clear
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        Stop drowning in manual tasks. Start scaling with intelligent automation.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Arrow for Desktop */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-neutral-300">
                        <ArrowRight className="w-12 h-12" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {/* Before Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-red-50/50 rounded-3xl p-8 border border-red-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <XCircle className="w-32 h-32 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
                                <XCircle className="w-6 h-6 text-red-500" />
                                The Old Way
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Endless manual data entry',
                                    'Slow response times & lost leads',
                                    'Inconsistent quality & errors',
                                    'Employee burnout from repetitive tasks',
                                    'Guesswork in decision making',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-red-900/80">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* After Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-cyan-50/50 rounded-3xl p-8 border border-cyan-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CheckCircle className="w-32 h-32 text-cyan-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-cyan-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-cyan-500" />
                                The AI Advantage
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Automated workflows & instant sync',
                                    '24/7 instant customer engagement',
                                    'Precision & consistency at scale',
                                    'Team focused on strategy & creativity',
                                    'Data-driven insights & growth',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-cyan-900/80">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
