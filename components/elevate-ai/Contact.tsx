'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const Contact: React.FC = () => (
    <div className="min-h-screen bg-neutral-50 py-24 px-6">
        <div className="max-w-xl mx-auto">
            <Reveal>
                <h2 className="text-3xl font-medium text-neutral-900 mb-4">Are you ready to scale?</h2>
                <p className="text-neutral-500 mb-12">
                    Tell us the problem that keeps you awake at night. If we can&apos;t solve it with math and code, we&apos;ll tell you upfront.
                </p>
            </Reveal>

            <Reveal delay={100}>
                <form className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-500 tracking-wide">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            placeholder="Founder / CTO Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-500 tracking-wide">Work Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-500 tracking-wide">The Bottleneck</label>
                        <textarea
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            placeholder="Describe the operational challenge you want to automate..."
                        ></textarea>
                    </div>

                    <button className="w-full py-4 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center">
                        Submit Application <ArrowRight className="ml-2 w-4 h-4" />
                    </button>

                    <p className="text-xs text-center text-neutral-400 mt-4">
                        We review applications weekly. Direct access to the founder for qualified leads.
                    </p>
                </form>
            </Reveal>
        </div>
    </div>
);
