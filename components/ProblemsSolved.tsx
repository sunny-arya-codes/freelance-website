'use client';

import { motion } from 'framer-motion';
import { ArrowRight, XCircle, CheckCircle2, AlertTriangle, Clock, TrendingDown, Users } from 'lucide-react';

const problems = [
  {
    icon: DatabaseIcon,
    pain: "We have data but no insights.",
    solution: "I build pipelines that turn raw logs into real-time predictive intelligence.",
    color: "text-blue-400"
  },
  {
    icon: Clock,
    pain: "Manual tasks are draining time/money.",
    solution: "I deploy autonomous agents that handle repetitive ops on autopilot.",
    color: "text-orange-400"
  },
  {
    icon: AlertTriangle,
    pain: "Competitors adopted AI; we didn’t.",
    solution: "I fast-track your AI roadmap to reclaim your market edge immediately.",
    color: "text-yellow-400"
  },
  {
    icon: Users,
    pain: "Our support team is overloaded.",
    solution: "I implement intelligent bots that resolve 60% of tickets instantly 24/7.",
    color: "text-purple-400"
  },
  {
    icon: TrendingDown,
    pain: "Leadership needs high-impact AI demos.",
    solution: "I ship interactive, visual prototypes in days—not months—to secure buy-in.",
    color: "text-red-400"
  }
];

// Custom icon for the first item since Database is common
function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function ProblemsSolved() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Stop Losing Money on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Solvable Problems.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You don't need more "tech." You need these specific business pains removed.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group relative flex flex-col md:flex-row items-center bg-card/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
            >
              {/* Problem Side (Left) */}
              <div className="w-full md:w-[45%] p-6 md:p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/5 bg-red-500/5">
                <div className="p-3 rounded-full bg-red-500/10 shrink-0">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-red-400/80 font-semibold mb-1">The Pain</div>
                  <h3 className="text-lg md:text-xl font-medium text-foreground/90">"{prob.pain}"</h3>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 bg-background border border-border p-1.5 rounded-full shadow-lg">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Solution Side (Right) */}
              <div className="w-full md:w-[55%] p-6 md:p-8 flex items-center gap-4 bg-green-500/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-3 rounded-full bg-green-500/10 shrink-0 relative z-10">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-widest text-green-400/80 font-semibold mb-1">The Fix</div>
                  <p className="text-lg md:text-xl font-medium text-foreground">{prob.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}