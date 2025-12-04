'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/elevate-ai/Navigation';
import { Hero } from '@/components/elevate-ai/Hero';
import { About } from '@/components/elevate-ai/About';
import { Services } from '@/components/elevate-ai/Services';
import { Approach } from '@/components/elevate-ai/Approach';
import { Scarcity } from '@/components/elevate-ai/Scarcity';
import { Contact } from '@/components/elevate-ai/Contact';
import { Footer } from '@/components/elevate-ai/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 bg-white min-h-screen">

      <Navigation currentPage={currentPage} navigate={navigate} />

      <main className="pt-0">
        {currentPage === 'home' && (
          <>
            <Hero navigate={navigate} />
            <About />
            <Services />
            <Approach />
            <Scarcity navigate={navigate} />
            <Footer navigate={navigate} />
          </>
        )}

        {currentPage === 'about' && (
          <>
            <div className="pt-20">
              <About />
              <Scarcity navigate={navigate} />
              <Footer navigate={navigate} />
            </div>
          </>
        )}

        {currentPage === 'services' && (
          <>
            <div className="pt-20">
              <Services />
              <Approach />
              <Contact />
              <Footer navigate={navigate} />
            </div>
          </>
        )}

        {currentPage === 'approach' && (
          <>
            <div className="pt-20">
              <Approach />
              <Scarcity navigate={navigate} />
              <Footer navigate={navigate} />
            </div>
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <div className="pt-20">
              <Contact />
              <Footer navigate={navigate} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}