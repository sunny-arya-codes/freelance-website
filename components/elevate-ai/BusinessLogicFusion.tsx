'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Factory, BarChart3, MessageSquare, Cpu } from 'lucide-react';

export const BusinessLogicFusion: React.FC = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Central AI Node */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-20"
            >
                <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center shadow-xl shadow-cyan-500/20 border border-neutral-800">
                    <Cpu className="w-10 h-10 text-cyan-400" />
                </div>
                {/* Pulse Effect */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-cyan-500/20 -z-10"
                />
            </motion.div>

            {/* Satellite Business Nodes */}
            <BusinessNode icon={Briefcase} angle={0} delay={0.2} label="Strategy" />
            <BusinessNode icon={Factory} angle={90} delay={0.4} label="Operations" />
            <BusinessNode icon={BarChart3} angle={180} delay={0.6} label="Growth" />
            <BusinessNode icon={MessageSquare} angle={270} delay={0.8} label="Support" />

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <ConnectionLine angle={0} />
                <ConnectionLine angle={90} />
                <ConnectionLine angle={180} />
                <ConnectionLine angle={270} />
            </svg>
        </div>
    );
};

const BusinessNode = ({ icon: Icon, angle, delay, label }: { icon: any, angle: number, delay: number, label: string }) => {
    const radius = 160; // Distance from center
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ duration: 0.8, delay, type: 'spring' }}
            className="absolute z-20 flex flex-col items-center"
        >
            <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-lg flex items-center justify-center mb-2">
                <Icon className="w-6 h-6 text-neutral-700" />
            </div>
            <span className="text-xs font-semibold text-neutral-500 bg-white/80 backdrop-blur px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                {label}
            </span>
        </motion.div>
    );
};

const ConnectionLine = ({ angle }: { angle: number }) => {
    return (
        <motion.line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 0.4,
                x2: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 140}px)`,
                y2: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 140}px)`
            }}
            transition={{ duration: 1.5, delay: 0.5 }}
        >
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000000" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
        </motion.line>
    );
};
