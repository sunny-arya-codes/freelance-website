'use client';

import { motion } from 'framer-motion';
import { Check, Rocket, Zap, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tiers = [
  {
    name: "Starter PoC",
    price: "Fixed Price",
    timeline: "30 Days",
    description: "For startups who need a quick win to validate an AI idea.",
    icon: Rocket,
    features: [
      "Rapid MVP/Prototype Development",
      "Core Logic & Prompt Engineering",
      "Basic API Integration",
      "14-Day Post-Launch Support"
    ],
    cta: "Start Small",
    highlight: false,
    color: "blue"
  },
  {
    name: "Automation Bundle",
    price: "Custom Quote",
    timeline: "2-3 Months",
    description: "For ops-heavy teams drowning in manual tasks.",
    icon: Zap,
    features: [
      "End-to-End Workflow Automation",
      "Custom AI Agents (n8n/LangChain)",
      "Live Analytics Dashboard",
      "Employee Training Session",
      "Documentation & Handover"
    ],
    cta: "Automate Ops",
    highlight: true, // Highlights this card
    color: "purple"
  },
  {
    name: "Full Transformation",
    price: "Retainer / Contract",
    timeline: "Ongoing",
    description: "For enterprises needing a scalable AI infrastructure.",
    icon: Building2,
    features: [
      "Custom LLM Fine-Tuning / RAG",
      "Enterprise-Grade Security",
      "Multi-Agent Orchestration",
      "SLA-Backed Support",
      "Strategic Roadmap Consulting"
    ],
    cta: "Contact Sales",
    highlight: false,
    color: "orange"
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

export default function Pricing() {
  const handleContact = () => {
    // Scroll to contact section or open chat
    window.dispatchEvent(new Event('open-liquid-chat'));
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Value Models
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No hourly billing guessing games. Clear deliverables, fixed timelines, and guaranteed outcomes.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                tier.highlight 
                  ? 'bg-background/80 border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.15)] scale-105 z-10' 
                  : 'bg-card/30 border-white/5 hover:border-white/10'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${tier.color}-500/10`}>
                  <tier.icon className={`w-6 h-6 text-${tier.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px]">{tier.description}</p>
              </div>

              {/* Price Tag */}
              <div className="mb-8 pb-8 border-b border-border/50">
                <div className="text-3xl font-bold text-foreground">{tier.price}</div>
                <div className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {tier.timeline}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                onClick={handleContact}
                className={`w-full h-12 rounded-xl font-semibold transition-all ${
                  tier.highlight 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10'
                }`}
              >
                {tier.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}