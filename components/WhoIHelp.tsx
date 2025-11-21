'use client';

import { motion } from 'framer-motion';
import { Database, Settings2, Zap, Users, Presentation, Rocket } from 'lucide-react';

const categories = [
  { 
    icon: Database, 
    label: "Data-Rich But Output-Poor Teams", 
    description: "You have terabytes of data but zero actionable insights.",
    color: "text-blue-400", 
    bg: "from-blue-500/10 to-blue-500/5",
    border: "group-hover:border-blue-500/30"
  },
  { 
    icon: Settings2, 
    label: "Manual Ops Heavy Companies", 
    description: "Your team is drowning in spreadsheets and repetitive tasks.",
    color: "text-orange-400", 
    bg: "from-orange-500/10 to-orange-500/5",
    border: "group-hover:border-orange-500/30"
  },
  { 
    icon: Zap, 
    label: "FOMO-Driven AI Adopters", 
    description: "You know you need AI, but don't know where to start.",
    color: "text-yellow-400", 
    bg: "from-yellow-500/10 to-yellow-500/5",
    border: "group-hover:border-yellow-500/30"
  },
  { 
    icon: Users, 
    label: "Businesses Without AI Talent", 
    description: "You need a senior AI partner without the hiring headache.",
    color: "text-purple-400", 
    bg: "from-purple-500/10 to-purple-500/5",
    border: "group-hover:border-purple-500/30"
  },
  { 
    icon: Presentation, 
    label: "Leadership Needing Impact Demos", 
    description: "You need to show stakeholders what's possible, fast.",
    color: "text-red-400", 
    bg: "from-red-500/10 to-red-500/5",
    border: "group-hover:border-red-500/30"
  },
  { 
    icon: Rocket, 
    label: "Companies Seeking Fast ROI", 
    description: "30-60 day PoCs that actually solve business problems.",
    color: "text-green-400", 
    bg: "from-green-500/10 to-green-500/5",
    border: "group-hover:border-green-500/30"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function WhoIHelp() {
  return (
    <section className="relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Who I Help
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          I don't just write code. I solve specific business bottlenecks for:
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className={`group relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${cat.bg} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cat.border}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-background/50 border border-white/5 ${cat.color}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
            
            {/* Subtle glow effect on hover */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${cat.bg} mix-blend-overlay`} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}