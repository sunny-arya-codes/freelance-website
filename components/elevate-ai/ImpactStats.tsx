'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Zap } from 'lucide-react';

const stats = [
    {
        id: 1,
        label: 'Operational Costs',
        value: '40%',
        prefix: 'Save up to',
        icon: TrendingUp,
        description: 'Cut unnecessary expenses with smart automation.',
    },
    {
        id: 2,
        label: 'Manual Workload',
        value: '60%',
        prefix: 'Reduce by',
        icon: Clock,
        description: 'Free up your team to focus on high-value tasks.',
    },
    {
        id: 3,
        label: 'Project Delivery',
        value: '2x',
        prefix: 'Faster',
        icon: Zap,
        description: 'Accelerate your time-to-market significantly.',
    },
];

export function ImpactStats() {
    return (
        <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        Real Impact, Real Numbers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        See how AI transformation translates into tangible business results.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 text-center group"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="text-sm font-medium text-cyan-600 mb-2 uppercase tracking-wider">
                                {stat.prefix}
                            </div>
                            <div className="text-6xl md:text-7xl font-bold text-neutral-900 mb-4 tracking-tight">
                                {stat.value}
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                {stat.label}
                            </h3>
                            <p className="text-neutral-600">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
