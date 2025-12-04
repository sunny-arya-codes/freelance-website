'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

// Updated Navigation Items for Consultant Conversion Flow
const navItems = [
  { name: 'Solutions', id: 'ai-solutions' }, // Was 'Expertise' -> Now Productized Services
  { name: 'Results', id: 'case-studies' },   // Was 'Projects' -> Now ROI/Case Studies
  { name: 'Pricing', id: 'pricing' },         // New Transparency Section
  { name: 'Why Me', id: 'why-me' },           // Your Differentiator
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Compensate for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const handleOpenChat = () => {
    window.dispatchEvent(new Event('open-liquid-chat'));
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-border py-3 shadow-sm' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 shadow-inner">
            <span className="font-mono font-bold text-lg tracking-tighter text-primary">SA</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
              SUNNY ARYA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              AI Strategy Partner
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <div className="h-6 w-px bg-border/50" /> {/* Divider */}

          <ThemeToggle />

          <button
            onClick={handleOpenChat}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            Book AI Audit
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-foreground p-2 hover:bg-muted rounded-lg transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)} 
                  className="text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              <hr className="border-border/50 my-2" />
              <button
                onClick={handleOpenChat}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg active:scale-95 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Book Free Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};