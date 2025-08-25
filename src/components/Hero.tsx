import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="fade-in">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden glass-card p-2">
                  <img 
                    src="/api/placeholder/300/300" 
                    alt="Sunni Kumar - Full Stack Engineer" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Sunni Kumar</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-4 text-muted-foreground">
                Full Stack Engineer
              </h2>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Building innovative digital experiences with modern technologies. 
                Passionate about clean code, user experience, and cutting-edge solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button 
                  size="lg" 
                  onClick={() => {
                    // Create a temporary link to download resume
                    const link = document.createElement('a');
                    link.href = '/resume.pdf'; // You'll need to add this file to public folder
                    link.download = 'Sunni_Kumar_Resume.pdf';
                    link.click();
                  }}
                  className="bg-primary hover:bg-primary-glow text-primary-foreground font-medium px-8 py-3 glow-hover"
                >
                  Download Resume
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-3"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary-glow transition-colors animate-bounce"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;