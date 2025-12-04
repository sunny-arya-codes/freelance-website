'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, GraduationCap, ArrowUpRight } from 'lucide-react';

interface FooterProps {
    education: any[];
    trainings: any[];
}

export default function Footer({ education, trainings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background/80 backdrop-blur-xl border-t border-border pt-20 pb-10 relative overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* BRAND COLUMN (Span 4) */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 shadow-inner">
                                <span className="font-mono font-bold text-lg tracking-tighter text-primary">SA</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
                                    SUNNY ARYA
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                    AI Strategy Partner
                                </span>
                            </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
                            Senior AI Solutions Architect helping forward-thinking companies automate operations and scale with intelligence.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-[#0077b5]/10 hover:text-[#0077b5] transition-colors border border-transparent hover:border-[#0077b5]/20">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:hello@example.com" className="p-2 rounded-full bg-muted/50 hover:bg-red-500/10 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* NAVIGATION COLUMN (Span 2) */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="font-bold text-foreground mb-6">Explore</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#about-me" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#ai-solutions" className="hover:text-primary transition-colors">Solutions</a></li>
                            <li><a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
                            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#why-me" className="hover:text-primary transition-colors">Why Me?</a></li>
                        </ul>
                    </div>

                    {/* CREDENTIALS COLUMN (Span 5) - The "Chhota Section" */}
                    <div className="md:col-span-5 space-y-8">

                        {/* Education Snippet */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Education
                            </h4>
                            <ul className="space-y-3">
                                {education?.slice(0, 2).map((edu: any, idx: number) => (
                                    <li key={idx} className="flex justify-between items-start text-sm group">
                                        <div>
                                            <div className="text-foreground/90 font-medium group-hover:text-primary transition-colors">
                                                {edu.program}
                                            </div>
                                            <div className="text-muted-foreground text-xs">{edu.institution}</div>
                                        </div>
                                        <span className="text-muted-foreground/50 text-xs tabular-nums">{edu.end_date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Certifications Snippet */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4 text-primary" />
                                Certifications
                            </h4>
                            <ul className="space-y-3">
                                {trainings?.slice(0, 3).map((cert: any, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        <ArrowUpRight className="w-3 h-3 mt-1 text-primary/50" />
                                        <span>{cert.name} <span className="opacity-50 text-xs">— {cert.provider}</span></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-muted-foreground">
                        © {currentYear} Sunny Arya. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}