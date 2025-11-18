import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

interface Profile {
  name: string;
  title: string;
  location: string;
  summary: string;
  high_res_image_url: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

const socialLinks = [
  { name: 'Email', icon: Mail, href: (p: Profile) => `mailto:${p.contact.email}`, variant: 'default' as const },
  { name: 'LinkedIn', icon: Linkedin, href: (p: Profile) => p.contact.linkedin, variant: 'ghost' as const }, // Changed to ghost for minimal look
  { name: 'GitHub', icon: Github, href: (p: Profile) => p.contact.github, variant: 'ghost' as const },
  { name: 'Portfolio', icon: ExternalLink, href: (p: Profile) => p.contact.portfolio, variant: 'ghost' as const },
];

const Hero = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-10">
      
      <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-2xl opacity-20 animate-pulse" />
        <Image
          src={profile.high_res_image_url}
          alt={profile.name}
          fill
          className="rounded-full object-cover border-2 border-white/10 shadow-2xl"
          priority
        />
      </div>
      
      <div className="text-center md:text-left max-w-2xl">
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-300 mb-4">
          Available for work
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-light mb-6">
          {profile.title}
        </p>
        <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
          {profile.summary}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
           {/* Social buttons - kept simple */}
           <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
             <a href={profile.contact.github} target="_blank"><Github className="w-4 h-4 mr-2"/> GitHub</a>
           </Button>
           <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
             <a href={profile.contact.linkedin} target="_blank"><Linkedin className="w-4 h-4 mr-2"/> LinkedIn</a>
           </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;