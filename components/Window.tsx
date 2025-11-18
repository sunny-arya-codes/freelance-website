'use client';

import { motion, type Variants, type Transition } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  }
};

interface WindowProps {
  children: ReactNode;
  title?: string;
  initial?: 'hidden' | 'visible' | 'exit';
  animate?: 'hidden' | 'visible' | 'exit';
  exit?: 'hidden' | 'visible' | 'exit';
  transition?: Transition;
  className?: string;
  contentClassName?: string;
  showTitleBar?: boolean;
}

const Window = forwardRef<HTMLDivElement, WindowProps>(({
  children,
  title,
  initial = 'hidden',
  animate = 'visible',
  exit = 'exit',
  transition = { duration: 0.3 },
  className = '',
  contentClassName = '',
  showTitleBar = true,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={cn(
        'bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden',
        'transition-all duration-200 hover:shadow-md',
        className
      )}
    >
      {showTitleBar && title && (
        <div className="border-b bg-muted/50 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
          </div>
        </div>
      )}
      <div className={cn('p-6', contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
});

Window.displayName = 'Window';

export { Window };
export type { WindowProps };