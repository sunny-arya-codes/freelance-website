'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, TrendingUp, Zap, Activity, ShieldCheck, TerminalSquare } from 'lucide-react';

interface Profile {
  name: string;
  title: string;
  summary: string;
  imageUrl?: string;
  contact: any;
}

const Hero = ({ profile }: { profile: Profile }) => {
  const imageUrl = profile?.imageUrl || '/images/default-avatar.png';

  const handleOpenChat = () => {
    window.dispatchEvent(new Event('open-liquid-chat'));
  };

  return (
    <section className="relative flex items-center px-4 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for New Projects
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.15]">
            AI That Cuts Costs & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500">
              Automates Ops.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-relaxed max-w-xl">
            I help businesses go from <em className="text-foreground font-normal not-italic">"drowning in data"</em> to <strong className="text-foreground font-medium">"running on autopilot."</strong> Stop burning cash on manual workflows.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg"
              className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-[0_4px_20px_rgba(var(--primary),0.25)] transition-all hover:translate-y-[-2px]"
            >
              Book Free AI Audit <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={handleOpenChat}
              variant="outline" 
              size="lg"
              className="h-14 px-8 rounded-full border-border bg-background/40 backdrop-blur-md text-foreground hover:bg-background/80 text-base font-medium transition-all hover:border-primary/50"
            >
              <Bot className="w-5 h-5 mr-2 text-primary" /> Ask My AI Agent
            </Button>
          </div>

          {/* Trust/Social Proof */}
          <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground border-t border-border/40 w-fit pr-10">
             <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Enterprise Grade Security</span>
             </div>
             <div className="w-1 h-1 bg-border rounded-full" />
             <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Rapid Deployment</span>
             </div>
          </div>
        </motion.div>


        {/* RIGHT COLUMN: The "Impact Dashboard" Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block perspective-1000"
        >
          {/* Dashboard Container */}
          <div className="relative z-10 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl ring-1 ring-white/5 transform transition-transform hover:rotate-y-2 hover:scale-[1.01] duration-500">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-[1px]">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-black/50">
                       <Image src={imageUrl} alt="Profile" width={48} height={48} className="object-cover opacity-90" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <Activity className="w-2.5 h-2.5 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 text-lg">System Optimization</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE MONITORING
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white tracking-tight">+142%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Efficiency Gain</div>
              </div>
            </div>

            {/* Middle Section: The "Graph" & Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Main Graph Card */}
              <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-muted-foreground">COST REDUCTION TRAJECTORY</span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                {/* CSS Graph Representation */}
                <div className="h-24 flex items-end justify-between gap-1 mt-2 px-1">
                   {[35, 45, 40, 60, 55, 75, 85, 80, 95].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className={`w-full rounded-t-sm transition-all duration-700 ${i > 5 ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-primary/20'}`}
                      />
                   ))}
                </div>
                {/* Glow effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Stat Card: Speed */}
              <div className="col-span-1 bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                <div>
                  <div className="text-2xl font-bold text-white">4x</div>
                  <div className="text-[10px] text-muted-foreground leading-tight mt-1">Faster Execution</div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Active Agents (Terminal Style) */}
            <div className="bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-xs overflow-hidden">
               <div className="flex items-center justify-between text-muted-foreground mb-3 border-b border-white/5 pb-2">
                 <span className="flex items-center gap-2"><TerminalSquare className="w-3.5 h-3.5" /> ACTIVE AGENTS</span>
                 <span>3 ONLINE</span>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-green-400">➜</span>
                    <span className="flex-1 ml-2">Data_Parser_v2</span>
                    <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[10px]">Active</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-green-400">➜</span>
                    <span className="flex-1 ml-2">Customer_Support_LLM</span>
                    <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[10px]">Answering</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="text-gray-600">➜</span>
                    <span className="flex-1 ml-2">Ops_Scheduler</span>
                    <span className="text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded text-[10px]">Training</span>
                  </div>
               </div>
            </div>

            {/* Floating Elements (Parallax feel) */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-8 top-20 bg-card border border-border shadow-xl rounded-lg p-3 flex items-center gap-3 max-w-[160px]"
            >
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                 <Bot className="w-4 h-4 text-blue-500" />
               </div>
               <div>
                 <div className="text-xs font-bold text-foreground">60% Automated</div>
                 <div className="text-[10px] text-muted-foreground">Ops Workload</div>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -left-6 bottom-32 bg-card border border-border shadow-xl rounded-lg p-3 max-w-[150px]"
            >
               <div className="text-xs text-muted-foreground mb-1">PoC Delivery</div>
               <div className="text-lg font-bold text-foreground flex items-baseline gap-1">
                 30 Days
                 <span className="text-[10px] font-normal text-green-500">▼ fast</span>
               </div>
            </motion.div>

          </div>
          
          {/* Background Glow for Dashboard */}
          <div className="absolute inset-0 bg-primary/20 blur-[60px] -z-10 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;