'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const dockItems = [
  { id: 'about-me', title: 'About', icon: '/user.svg' }, // Ensure icons are white/monochrome if possible for minimal look
  { id: 'skills', title: 'Skills', icon: '/code.svg' },
  { id: 'experience', title: 'Exp', icon: '/briefcase.svg' },
  { id: 'projects', title: 'Projects', icon: '/globe.svg' },
  { id: 'education', title: 'Edu', icon: '/book.svg' },
];

const Dock = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        <TooltipProvider delayDuration={0}>
          {dockItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="relative w-5 h-5">
                    <Image 
                      src={item.icon} 
                      alt={item.title} 
                      fill
                      className="object-contain opacity-70 hover:opacity-100 invert"
                    />
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white/10 text-white border-white/10 backdrop-blur-md text-xs mb-2">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Dock;