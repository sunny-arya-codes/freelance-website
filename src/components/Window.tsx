import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

const Window = forwardRef<HTMLDivElement, WindowProps>(({
  title,
  children,
  className = '',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={`relative bg-card/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-border/50 w-full max-w-4xl mx-auto my-8 ${className}`}
      {...props}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
        </div>
        <h2 className="text-sm font-semibold text-foreground/90">
          {title}
        </h2>
        <div className="w-12" /> {/* Spacer for alignment */}
      </div>
      
      {/* Window Content */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-card/50 to-card/30">
        {children}
      </div>
      
      {/* Subtle reflection effect */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
      }} />
    </motion.div>
  );
});

Window.displayName = 'Window';

export default Window;
