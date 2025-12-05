'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        content: "Elevate AI completely transformed how we handle customer inquiries. The automation is seamless and feels incredibly human.",
        author: "Sarah J.",
        role: "Operations Director",
        company: "TechFlow Solutions"
    },
    {
        id: 2,
        content: "We reduced our manual data entry by 80% in just two weeks. The ROI was immediate and the team is much happier.",
        author: "Michael C.",
        role: "CEO",
        company: "GrowthScale Inc."
    },
    {
        id: 3,
        content: "The strategic insights we gained were invaluable. It's not just about tools; it's about rethinking your entire workflow.",
        author: "Elena R.",
        role: "Founder",
        company: "Creative Pulse"
    }
];

export function Testimonials() {
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
                        Trusted by Innovators
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        Hear from the businesses that are already leading the way with AI.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 relative"
                        >
                            <Quote className="w-10 h-10 text-cyan-200 absolute top-6 left-6 -z-10" />
                            <p className="text-neutral-700 mb-6 relative z-10 italic">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold mr-3">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-neutral-900">{testimonial.author}</div>
                                    <div className="text-sm text-neutral-500">{testimonial.role}, {testimonial.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
