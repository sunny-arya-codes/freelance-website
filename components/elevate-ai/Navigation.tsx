'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
    currentPage: string;
    navigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'Philosophy' },
        { id: 'services', label: 'Framework' },
        { id: 'approach', label: 'Protocol' },
        { id: 'contact', label: 'Partner' },
    ];

    const handleNavigate = (page: string) => {
        navigate(page);
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4' : 'bg-transparent py-6'
                }`}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <div
                        onClick={() => handleNavigate('home')}
                        className="flex items-center gap-2 cursor-pointer z-50"
                    >
                        <Image src="/logo.png" alt="Logo" width={32} height={32} />
                        <span className="font-bold text-xl tracking-tight">ACOMIS</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavigate(link.id)}
                                className={`text-sm font-medium cursor-pointer transition-colors ${currentPage === link.id ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNavigate('contact')}
                            className="px-5 py-2 text-white rounded-full text-sm font-medium transition-all duration-500 cursor-pointer bg-gradient-to-r from-neutral-900 via-neutral-800 to-cyan-900 bg-[length:200%_100%] bg-left hover:bg-right shadow-lg hover:shadow-cyan-500/20"
                        >
                            Application
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden z-50">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavigate(link.id)}
                            className="text-2xl font-light text-neutral-900 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};
