import React, { useEffect, useRef } from 'react';

const BackgroundFX: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let raf = 0;
        let width = 0;
        let height = 0;
        const mouse = { x: -9999, y: -9999 };

        type Particle = { x: number; y: number; vx: number; vy: number; r: number; seed: number };
        let particles: Particle[] = [];

        const resize = () => {
            width = window.innerWidth;
            height = Math.max(window.innerHeight * 0.8, 600); // hauteur raisonnable pour sections
            canvas.width = width * DPR;
            canvas.height = height * DPR;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

            const count = Math.max(60, Math.min(160, Math.floor((width * height) / 24000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                r: Math.random() * 1.8 + 0.6,
                seed: Math.random() * Math.PI * 2,
            }));
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const step = (t: number) => {
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                const dxm = mouse.x - p.x;
                const dym = mouse.y - p.y;
                const dm = Math.hypot(dxm, dym);
                if (dm < 180) {
                    p.vx += (dxm / dm) * 0.005;
                    p.vy += (dym / dm) * 0.005;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -50) p.x = width + 50;
                if (p.x > width + 50) p.x = -50;
                if (p.y < -50) p.y = height + 50;
                if (p.y > height + 50) p.y = -50;

                const twinkle = 0.5 + 0.5 * Math.sin(t / 600 + p.seed);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${0.35 + twinkle * 0.35})`;
                ctx.fill();
            }

            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < maxDist) {
                        ctx.strokeStyle = `rgba(255,255,255,${(1 - d / maxDist) * 0.25})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of particles) {
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < 160) {
                    ctx.strokeStyle = `rgba(20,184,166,${(1 - d / 160) * 0.35})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            raf = requestAnimationFrame(step);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), rgba(0,0,0,0) 60%)' }}
            />
            <div
                className="pointer-events-none absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(20,184,166,0.25), rgba(0,0,0,0) 60%)' }}
            />
        </>
    );
};

export default BackgroundFX;