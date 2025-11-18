'use client';
import React from 'react';
import Image from 'next/image';

const dockItems = [
  { id: 'about-me', title: 'About Me', icon: '/user.svg' },
  { id: 'skills', title: 'Skills', icon: '/code.svg' },
  { id: 'experience', title: 'Experience', icon: '/briefcase.svg' },
  { id: 'projects', title: 'Projects', icon: '/globe.svg' },
  { id: 'education', title: 'Education', icon: '/book.svg' },
  { id: 'trainings', title: 'Trainings', icon: '/award.svg' },
  { id: 'achievements', title: 'Achievements', icon: '/star.svg' },
];

const Dock = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center space-x-4 bg-white/30 backdrop-blur-lg rounded-2xl p-2 shadow-lg">
        {dockItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex flex-col items-center space-y-1 focus:outline-none"
          >
            <Image src={item.icon} alt={item.title} width={48} height={48} />
            <span className="text-xs text-gray-800">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dock;
