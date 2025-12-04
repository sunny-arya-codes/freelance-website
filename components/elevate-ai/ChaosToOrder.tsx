'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
    size: number;
    color: string;
}

export const ChaosToOrder: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas size
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particles
        const particles: Particle[] = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                targetX: (canvas.width / particleCount) * i + (canvas.width / particleCount / 2),
                targetY: canvas.height / 2,
                size: Math.random() * 2 + 1,
                color: `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.2})`
            });
        }

        let mode: 'chaos' | 'order' = 'chaos';

        const interval = setInterval(() => {
            mode = mode === 'chaos' ? 'order' : 'chaos';
        }, 3000);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                if (mode === 'chaos') {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                } else {
                    p.x += (p.targetX - p.x) * 0.05;
                    p.y += (p.targetY - p.y) * 0.05;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = mode === 'order' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(115, 115, 115, 0.3)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            clearInterval(interval);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-60" />;
};
