'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface WindowProps {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Window = ({ children, title = 'Window', isOpen, onClose, className = '' }: WindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            width: isMaximized ? '95vw' : 'auto',
            height: isMaximized ? '90vh' : 'auto',
          }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`fixed z-[60] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden ${!isMaximized ? 'w-[90vw] max-w-2xl max-h-[80vh]' : ''} ${className}`}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 cursor-move">
            <div className="flex items-center gap-2">
               <div className="flex gap-1.5 group">
                 <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500" />
                 <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500" />
                 <button className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500" />
               </div>
            </div>
            <span className="text-xs font-medium text-white/50">{title}</span>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 text-white scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;