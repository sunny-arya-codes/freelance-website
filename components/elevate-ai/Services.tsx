'use client';

import React from 'react';
import { Target, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const Services: React.FC = () => (
    <div className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <Reveal>
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">The Work</h2>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <p className="text-3xl md:text-4xl font-medium text-neutral-900 max-w-2xl">
                        We build systems that pay for themselves.
                    </p>
                    <p className="text-neutral-400 mt-4 md:mt-0 max-w-xs text-sm">
                        Moving beyond &quot;Chatbots&quot; to autonomous revenue engines.
                    </p>
                </div>
            </Reveal>

            <div className="space-y-4">
                {[
                    {
                        icon: <Target className="w-5 h-5" />,
                        title: "Autonomous Decision Engines",
                        subtitle: "Supply Chain & Logistics",
                        desc: "Replacing human intuition with high-dimensional probability. We built systems that predicted localized food demand at Freshmenu; we can predict your inventory needs too."
                    },
                    {
                        icon: <Users className="w-5 h-5" />,
                        title: "Agentic Workflows",
                        subtitle: "Support & Sales",
                        desc: "Not a chatbot. An agent. We deploy AI that can read your database, update your CRM, and close tickets without human intervention, reducing support costs by 60%."
                    },
                    {
                        icon: <ShieldCheck className="w-5 h-5" />,
                        title: "Private Knowledge Moats",
                        subtitle: "IP & Strategy",
                        desc: "Your data is your competitive advantage. We train local, private LLMs on your proprietary documents so you can query your institutional memory safely."
                    }
                ].map((service, index) => (
                    <Reveal key={index} delay={index * 100}>
                        <div className="group relative bg-neutral-50 hover:bg-white border border-neutral-100 hover:border-neutral-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
                            <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                <div className="w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-900 shrink-0 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                        <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                                        <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide mt-1 md:mt-0">{service.subtitle}</span>
                                    </div>
                                    <p className="text-neutral-500 leading-relaxed max-w-3xl">{service.desc}</p>
                                </div>
                                <div className="hidden md:flex items-center justify-center w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="text-neutral-400" />
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </div>
);
