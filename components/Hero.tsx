'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Terminal } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface Profile {
  name: string;
  title: string;
  summary: string;
  imageUrl?: string;
  contact: any;
}

const Hero = ({ profile }: { profile: Profile }) => {
  const imageUrl = profile?.imageUrl || '/images/default-avatar.png';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4">

      {/* Ambient Glow behind profile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-8"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary/20 to-transparent">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-muted">
            <Image
              src={imageUrl}
              alt={profile?.name || 'Profile'}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Online Status Indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl z-10 space-y-6"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest uppercase">
            System Online
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Architecting the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary">
            Future of Intelligence
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
          Senior Full Stack Engineer & AI Specialist building scalable digital neural networks and high-performance web architectures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Button className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all">
            View Projects <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="h-12 px-8 rounded-full border-border bg-card/50 text-foreground hover:bg-card backdrop-blur-sm">
            <Terminal className="w-4 h-4 mr-2" /> Technical Stack
          </Button>
        </div>

        {/* Minimal Socials Row */}
        <div className="flex justify-center gap-6 pt-8 opacity-70">
          <a href={profile.contact.github} className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-5 h-5" /></a>
          <a href={profile.contact.linkedin} className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;