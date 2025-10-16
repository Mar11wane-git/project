import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Eye } from 'lucide-react';
import CVModal from './CVModal';

const dynamicDescriptions = [
  "Développeur Full Stack passionné, je transforme vos idées en solutions web modernes et performantes avec Laravel, React et Node.js.",
  "Créateur d'expériences numériques exceptionnelles, maîtrisant les technologies frontend et backend les plus récentes.",
  "Développeur polyvalent capable de gérer des projets complets, de la conception à la mise en production."
];

// Supprime le mock CVModal et utilise le vrai composant importé

const Hero = () => {
  const [currentDescription, setCurrentDescription] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescription((prev) => (prev + 1) % dynamicDescriptions.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCVModal = () => {
    setIsCVModalOpen(true);
  };

  const closeCVModal = () => {
    setIsCVModalOpen(false);
  };

  // Animation de fond constellation améliorée
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

    let particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; seed: number }> = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(70, Math.min(200, Math.floor((width * height) / 20000)));
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

      // Particules avec couleurs cohérentes
      for (const p of particles) {
        // Attraction légère vers la souris
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

        // Scintillement avec couleur teal/cyan
        const twinkle = 0.5 + 0.5 * Math.sin(t / 600 + p.seed);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        // Couleur variable entre cyan et teal
        const colorMix = Math.sin(t / 800 + p.seed * 2) * 0.5 + 0.5;
        const r = Math.floor(34 + colorMix * 186); // De cyan-500 à teal-400
        const g = Math.floor(211 - colorMix * 27); // Interpolation
        const b = Math.floor(238 - colorMix * 72);

        ctx.fillStyle = `rgba(${r},${g},${b},${0.4 + twinkle * 0.4})`;
        ctx.fill();
      }

      // Lignes entre particules proches
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / maxDist) * 0.3})`; // cyan-400
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Lignes interactives vers la souris
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 160) {
          ctx.strokeStyle = `rgba(20,184,166,${(1 - d / 160) * 0.5})`; // teal-500
          ctx.lineWidth = 1.5;
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Canvas constellation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Quadrillage tech subtil avec couleur cohérente */}
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,184,166,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Halos de couleur cohérents */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.4), rgba(0,0,0,0) 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle at 70% 70%, rgba(20,184,166,0.35), rgba(0,0,0,0) 70%)' }}
      />

      {/* Contenu principal avec photo sur le côté droit */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Contenu texte centré */}
          <div className="lg:col-span-2 text-center">
            <div className="mb-8 relative flex justify-center">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full opacity-20 animate-spin slow-spin"></div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full opacity-15 animate-pulse"></div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                <span className="text-white drop-shadow-lg">Salut,</span><br />
                <span className="text-white drop-shadow-lg">Je suis </span>
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                  Marouane El hamdaoui
                </span>
              </h1>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                Développeur Full Stack
              </h2>

              <div className="mb-8 max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  <span className="text-teal-400 font-bold mr-2 text-2xl">{'>'}</span>
                  <span className="text-gray-100">{dynamicDescriptions[currentDescription]}</span>
                </p>
              </div>

              {/* Boutons d'action centrés */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.7)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.8)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transform hover:scale-105"
                >
                  <Mail size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  Me Contacter
                </button>
                <button
                  onClick={openCVModal}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white bg-gray-800/80 backdrop-blur-sm border border-teal-500/30 hover:bg-gray-700/80 hover:border-teal-400/50 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.7)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-400/40 transform hover:scale-105"
                >
                  <Eye size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  Voir CV
                </button>
              </div>

              {/* Liens sociaux centrés */}
              <div className="flex justify-center space-x-6 mb-16">
                {[
                  { icon: Github, href: 'https://github.com/Mar11wane-git', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/Marouane-El-Hamdaoui/', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:marouane.elhamdaoui@gmail.com', label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-gray-800/60 backdrop-blur-sm rounded-full border border-teal-500/20 hover:border-teal-400/40 hover:bg-teal-500/10 transition-all duration-300 transform hover:scale-110 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.5)]"
                    aria-label={label}
                  >
                    <Icon size={24} className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Photo centrée avec statut */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="relative group mb-4">
              {/* Anneau autour de la photo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img
                src="/pecture pro.png"
                alt="Photo professionnelle"
                className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-gray-800/50 shadow-2xl shadow-cyan-400/20 hover:shadow-teal-400/30 transition-all duration-300 transform group-hover:scale-105"
              />
              {/* Anneau intérieur */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-pulse"></div>
            </div>

            {/* Phrase de disponibilité */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 text-green-400 text-sm font-medium animate-pulse">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Disponible pour travail
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full bg-teal-500/20 border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
          aria-label="Défiler vers la section À propos"
        >
          <ChevronDown size={32} className="text-cyan-400" />
        </button>
      </div>

      {/* Modal du CV */}
      <CVModal isOpen={isCVModalOpen} onClose={closeCVModal} />

      <style jsx>{`
        .slow-spin {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;