'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Activity, Truck, Check, ArrowRight } from 'lucide-react';

const cases = [
  {
    category: "E-commerce Startup",
    icon: ShoppingBag,
    problems: [
      "20+ support agents required",
      "Poor order forecasting",
      "Slow manual review checks"
    ],
    delivered: [
      "AI chatbot (24/7)",
      "Inventory prediction model",
      "Auto sentiment analysis",
      "Unified analytics dashboard"
    ],
    impact: [
      "Major cost savings",
      "Faster ops",
      "Better customer experience"
    ],
    color: "blue"
  },
  {
    category: "FinTech Scale-up",
    icon: TrendingUp,
    problems: [
      "High user churn rate",
      "Manual fraud detection",
      "Slow customer onboarding"
    ],
    delivered: [
      "Churn prediction engine",
      "Real-time anomaly detection",
      "Automated KYC pipeline",
      "Risk scoring model"
    ],
    impact: [
      "15% Churn reduction",
      "Instant fraud blocking",
      "3x Faster onboarding"
    ],
    color: "purple"
  },
  {
    category: "Healthcare Ops",
    icon: Activity,
    problems: [
      "Unstructured patient data",
      "Scheduling conflicts",
      "Doctor burnout"
    ],
    delivered: [
      "NLP clinical summarizer",
      "Smart scheduling agent",
      "RAG knowledge base"
    ],
    impact: [
      "2h/day saved per doctor",
      "Zero scheduling conflicts",
      "Instant record retrieval"
    ],
    color: "emerald"
  },
  {
    category: "Logistics Firm",
    icon: Truck,
    problems: [
      "Unpredictable delays",
      "Fuel inefficiency",
      "Manual route planning"
    ],
    delivered: [
      "Route optimization AI",
      "Predictive maintenance",
      "Automated dispatch system"
    ],
    impact: [
      "20% Fuel savings",
      "98% On-time delivery",
      "Fully automated dispatch"
    ],
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

export default function CaseStudies() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Proven Results <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Across Industries
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real problems. Real solutions. Real impact. <br/>
            Here is how I transformed chaos into order for past clients.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {cases.map((study, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group relative rounded-3xl border border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
                <div className={`p-3 rounded-xl bg-background shadow-sm text-${study.color}-400`}>
                  <study.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{study.category}</h3>
              </div>

              <div className="p-8 grid gap-8">
                {/* Problems Section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    The Problems
                  </h4>
                  <ul className="space-y-2">
                    {study.problems.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-400/50 mt-1">✕</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivered Section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Delivered Solution
                  </h4>
                  <ul className="space-y-2">
                    {study.delivered.map((d, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-blue-400 mt-1">➜</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Section (Highlighted) */}
                <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-xl border border-green-500/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Business Impact
                  </h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {study.impact.map((imp, i) => (
                      <span key={i} className="text-sm font-semibold text-green-100 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-green-500" /> {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-${study.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}