'use client';

import { motion } from 'framer-motion';
import { Bot, BrainCircuit, LineChart, MessageSquareCode, ArrowUpRight } from 'lucide-react';

const solutions = [
  {
    id: 'agents',
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Autonomous workers that handle complex workflows. They don't just chat; they do work.",
    tags: ["n8n / LangChain", "Auto-GPT", "Process Automation"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-400"
  },
  {
    id: 'models',
    icon: BrainCircuit,
    title: "Predictive Models",
    description: "Custom algorithms that score leads, forecast churn, and predict trends before they happen.",
    tags: ["Scoring Engines", "Demand Forecasting", "Regression Models"],
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50",
    iconColor: "text-purple-400"
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: "Analytics Dashboards",
    description: "I turn invisible data into visible insights. Real-time visualization for executive decision making.",
    tags: ["Live KPI Tracking", "Data Storytelling", "Executive Views"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400"
  },
  {
    id: 'chatbots',
    icon: MessageSquareCode,
    title: "Custom Chatbots & LLMs",
    description: "Context-aware assistants trained specifically on your company's private knowledge base.",
    tags: ["RAG Systems", "Internal Support", "Sales Assistants"],
    gradient: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50",
    iconColor: "text-orange-400"
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
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function AISolutions() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            End-to-End <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Intelligence Solutions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            I don't just wrap ChatGPT. I architect complete, self-sustaining AI systems tailored to your infrastructure.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {solutions.map((sol) => (
            <motion.div
              key={sol.id}
              variants={item}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-background/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl ${sol.border}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sol.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-background/80 border border-white/5 shadow-sm ${sol.iconColor}`}>
                    <sol.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{sol.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {sol.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {sol.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-background/40 border border-white/10 text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}