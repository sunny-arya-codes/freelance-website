'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/elevate-ai/Navigation';
import { Hero } from '@/components/elevate-ai/Hero';
import { About } from '@/components/elevate-ai/About';
import { ImpactStats } from '@/components/elevate-ai/ImpactStats';
import { BeforeAfter } from '@/components/elevate-ai/BeforeAfter';
import { ServicesGrid } from '@/components/elevate-ai/ServicesGrid';
import { ProcessFlow } from '@/components/elevate-ai/ProcessFlow';
import { ClientFunnel } from '@/components/elevate-ai/ClientFunnel';
import { Testimonials } from '@/components/elevate-ai/Testimonials';
import { Scarcity } from '@/components/elevate-ai/Scarcity';
import { Contact } from '@/components/elevate-ai/Contact';
import { Footer } from '@/components/elevate-ai/Footer';
import { ScrollToTop } from '@/components/elevate-ai/ScrollToTop';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    // If it's a section on the home page, scroll to it
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 bg-white min-h-screen">

      <Navigation currentPage={currentPage} navigate={navigate} />

      <main className="pt-0">
        {currentPage === 'home' && (
          <>
            <div id="home"><Hero navigate={navigate} /></div>
            <div id="impact"><ImpactStats /></div>
            <div id="about"><About /></div>
            <div id="comparison"><BeforeAfter /></div>
            <div id="services"><ServicesGrid /></div>
            <div id="approach"><ProcessFlow /></div>
            <div id="funnel"><ClientFunnel /></div>
            <div id="testimonials"><Testimonials /></div>
            <Scarcity navigate={navigate} />
            <div id="contact"><Footer navigate={navigate} /></div>
          </>
        )}

        {currentPage === 'about' && (
          <>
            <div className="pt-20">
              <About />
              <ImpactStats />
              <BeforeAfter />
              <Scarcity navigate={navigate} />
              <Footer navigate={navigate} />
            </div>
          </>
        )}

        {currentPage === 'services' && (
          <>
            <div className="pt-20">
              <ServicesGrid />
              <ProcessFlow />
              <ClientFunnel />
              <Contact />
              <Footer navigate={navigate} />
            </div>
          </>
        )}

        {currentPage === 'approach' && (
          <>
            <div className="pt-20">
              <ProcessFlow />
              <ClientFunnel />
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
      <ScrollToTop />
    </div>
  );
}