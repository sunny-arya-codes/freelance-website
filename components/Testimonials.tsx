'use client';

import { motion } from 'framer-motion';
import { Quote, Linkedin, User } from 'lucide-react';

const testimonials = [
  {
    name: "Alex R.",
    role: "CTO @ TechFlow (Former Manager)",
    text: "Sunny isn't just a coder; he's a product builder. He took our vague AI requirements and shipped a production-ready agent in 3 weeks. Rare combination of deep ML knowledge and full-stack speed.",
    relation: "Senior Leadership"
  },
  {
    name: "Sarah J.",
    role: "Product Owner @ FinStream",
    text: "I've worked with many engineers who speak 'code', but Sunny speaks 'business'. He pushed back on features that wouldn't drive ROI and doubled down on the ones that did. He saved us months of dev time.",
    relation: "Client / Product"
  },
  {
    name: "David K.",
    role: "Senior Staff Engineer",
    text: "The cleanest code I've reviewed in a long time. His architecture for the RAG pipeline was scalable from day one. If you need someone to own the stack end-to-end, he is your guy.",
    relation: "Technical Peer"
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

export default function Testimonials() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Technical Leaders
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here is what people who have seen my code in production have to say.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group relative p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                    <User className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      {t.name}
                      <Linkedin className="w-3 h-3 text-[#0077b5] opacity-80" />
                    </div>
                    <div className="text-xs text-primary font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}