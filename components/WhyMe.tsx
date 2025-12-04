'use client';

import { motion } from 'framer-motion';
import { Zap, Briefcase, Layers, MessageSquare, Target, Code2 } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: "Speed is a Feature",
    desc: "I ship in days, not weeks. I don't wait for permission; I push to prod.",
    color: "yellow"
  },
  {
    icon: Briefcase,
    title: "Engineer + Founder Mindset",
    desc: "I don't just write code. I think about your CAC, LTV, and retention.",
    color: "blue"
  },
  {
    icon: Layers,
    title: "Full-Cycle Ownership",
    desc: "From Figma designs to DB schema to DevOps. I handle the messy parts.",
    color: "purple"
  },
  {
    icon: MessageSquare,
    title: "Zero Fluff Comms",
    desc: "No tech jargon. Daily async updates. You'll never have to ask 'What's the status?'",
    color: "green"
  },
  {
    icon: Target,
    title: "ROI Obsessed",
    desc: "If it doesn't save money or make money, I challenge why we're building it.",
    color: "red"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function WhyMe() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 backdrop-blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-primary/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Unfair Advantage</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Most devs just want to code. I want to help you win. <br className="hidden md:block"/>
              Here is why I'm different from the agency you fired.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 rounded-2xl bg-card border border-white/10 flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px]">🚀</div>
                  ))}
               </div>
               <div className="text-sm font-medium">
                 <span className="text-green-400 font-bold">100%</span> Delivery Rate
               </div>
            </div>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Main "Why Me" Box - Spans 2 cols on large screens */}
          <motion.div 
            variants={item}
            className="lg:col-span-1 lg:row-span-2 rounded-3xl p-8 bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/20 relative overflow-hidden flex flex-col justify-center"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 blur-3xl rounded-full" />
             <Code2 className="w-12 h-12 text-primary mb-6" />
             <h3 className="text-2xl font-bold mb-4">Not Just a Coder. <br/> A Partner.</h3>
             <p className="text-muted-foreground leading-relaxed mb-6">
               I bridge the gap between "technical possibility" and "business reality." I don't need hand-holding; I need a problem to solve.
             </p>
             <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Strategy</span>
                  <span className="text-primary">Execution</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-primary w-full" />
                </div>
             </div>
          </motion.div>

          {/* Individual Feature Cards */}
          {reasons.map((r, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group p-6 rounded-2xl bg-card/40 border border-white/5 hover:bg-card/60 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-${r.color}-500/10 text-${r.color}-400 group-hover:scale-110 transition-transform`}>
                <r.icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-foreground">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}