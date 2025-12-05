'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, LifeBuoy } from 'lucide-react';

const stages = [
    {
        title: 'Consultation',
        description: 'We start with a deep dive into your business to understand your needs.',
        icon: MessageSquare,
        color: 'bg-neutral-900',
        textColor: 'text-white',
    },
    {
        title: 'Implementation',
        description: 'We build and deploy custom AI solutions tailored to your workflow.',
        icon: Settings,
        color: 'bg-neutral-700',
        textColor: 'text-white',
    },
    {
        title: 'Retainer Support',
        description: 'Ongoing maintenance, optimization, and support to keep you ahead.',
        icon: LifeBuoy,
        color: 'bg-cyan-500',
        textColor: 'text-white',
    },
];

export function ClientFunnel() {
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
                        Your Journey With Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        A clear path to success, from our first conversation to long-term growth.
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                        {stages.map((stage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`relative flex-1 w-full md:w-auto p-8 ${stage.color} ${stage.textColor} ${index === 0 ? 'rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none' : ''
                                    } ${index === stages.length - 1 ? 'rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none' : ''
                                    } ${index !== 0 && index !== stages.length - 1 ? 'md:-mx-4 z-10 scale-105 shadow-xl rounded-2xl' : 'z-0'
                                    }`}
                            >
                                <div className="flex flex-col items-center text-center h-full justify-center">
                                    <div className="mb-4 p-3 bg-white/10 rounded-full backdrop-blur-sm">
                                        <stage.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                                    <p className="text-sm opacity-90">{stage.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
