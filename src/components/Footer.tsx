import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-gradient-to-t from-background via-background/95 to-background/90">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 glass-card rounded-full text-primary hover:text-primary-glow glow-hover transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-6 pt-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Sunni Kumar
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Software Engineer • AI/ML Specialist
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Skills', id: 'skills' },
              { label: 'Experience', id: 'experience' },
              { label: 'Projects', id: 'projects' },
              { label: 'Education', id: 'education' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-glass-border to-transparent mb-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>© {currentYear} Sunni Kumar. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Heart size={16} className="text-primary animate-pulse" fill="currentColor" />
              <span>in India</span>
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-px bg-gradient-primary opacity-50 glow"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;