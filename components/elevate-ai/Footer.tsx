'use client';

import React from 'react';
import { Linkedin, Globe } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
    navigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => (
    <footer className="bg-white border-t border-neutral-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    <span className="font-bold text-xl tracking-tight">ACOMIS</span>
                </div>
                <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                    Pioneering Applied AI.<br />
                    Bengaluru • Singapore • Remote
                </p>
            </div>

            <div className="flex gap-8 text-sm text-neutral-600">
                <button onClick={() => navigate('services')} className="hover:text-neutral-900 transition-colors cursor-pointer">Framework</button>
                <button onClick={() => navigate('about')} className="hover:text-neutral-900 transition-colors cursor-pointer">Philosophy</button>
                <button onClick={() => navigate('contact')} className="hover:text-neutral-900 transition-colors cursor-pointer">Partner</button>
            </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
            <p>&copy; 2025 ACOMIS Solutions. Defining Applied Intelligence.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <Linkedin className="w-4 h-4 hover:text-neutral-600 cursor-pointer transition-colors" />
                <Globe className="w-4 h-4 hover:text-neutral-600 cursor-pointer transition-colors" />
            </div>
        </div>
    </footer>
);
