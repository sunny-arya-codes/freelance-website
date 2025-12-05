'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cog, GraduationCap, BarChart3, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: Lightbulb,
        title: 'AI Strategy Consulting',
        description: 'We analyze your business to identify high-impact AI opportunities tailored to your goals.',
    },
    {
        icon: Cog,
        title: 'AI Implementation',
        description: 'Seamless integration of custom AI agents and automation tools into your existing workflows.',
    },
    {
        icon: GraduationCap,
        title: 'Training & Enablement',
        description: 'Empower your team with the skills and knowledge to leverage AI tools effectively.',
    },
    {
        icon: BarChart3,
        title: 'Ongoing Optimization',
        description: 'Continuous monitoring and refinement to ensure your AI systems evolve with your business.',
    },
];

export function ServicesGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        Comprehensive AI Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        From strategy to execution, we provide end-to-end services to future-proof your business.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                <service.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-cyan-600 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center text-cyan-600 font-medium text-sm group-hover:translate-x-1 transition-transform cursor-pointer">
                                Learn more <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
