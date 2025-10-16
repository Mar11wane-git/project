import React from 'react';
import {
    Database,
    Settings,
    Smartphone,
    Server,
    GitBranch,
    Terminal,
    Container,
    Cloud,
    Users,
    Calendar,
    DollarSign,
    MapPin,
    Trophy,
    CreditCard,
    UserPlus,
    UserMinus,
    BarChart3,
    FileText,
    ExternalLink,
    Github
} from 'lucide-react';

// BackgroundFX component identique au Hero et About
const BackgroundFX = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };

    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(50, Math.min(150, Math.floor((width * height) / 25000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        seed: Math.random() * Math.PI * 2,
      }));
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const step = (t) => {
      ctx.clearRect(0, 0, width, height);

      // Particules avec couleurs cohérentes
      for (const p of particles) {
        // Attraction légère vers la souris
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 120) {
          p.vx += (dxm / dm) * 0.003;
          p.vy += (dym / dm) * 0.003;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Scintillement avec couleur teal/cyan
        const twinkle = 0.5 + 0.5 * Math.sin(t / 800 + p.seed);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        // Couleur variable entre cyan et teal
        const colorMix = Math.sin(t / 1000 + p.seed * 2) * 0.5 + 0.5;
        const r = Math.floor(34 + colorMix * 186);
        const g = Math.floor(211 - colorMix * 27);
        const b = Math.floor(238 - colorMix * 72);
        
        ctx.fillStyle = `rgba(${r},${g},${b},${0.3 + twinkle * 0.3})`;
        ctx.fill();
      }

      // Lignes entre particules proches
      const maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / maxDist) * 0.2})`;
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
        if (d < 140) {
          ctx.strokeStyle = `rgba(20,184,166,${(1 - d / 140) * 0.4})`;
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
    <>
      {/* Canvas constellation identique au Hero */}
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
    </>
  );
};

// Icônes SVG personnalisées pour les technologies
const ReactIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2.01.2-3.6 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.31-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26" />
    </svg>
);

const LaravelIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.017c-.008.002-.016.002-.024.002-.03 0-.06-.008-.09-.022L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033.012.009.025.018.037.027.013.014.022.03.033.045.008.011.02.021.025.033.007.02.017.038.022.058.005.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.021.025-.033.012-.015.021-.030.033-.043.012-.012.025-.02.037-.027.014-.013.030-.026.044-.035h.002l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.015.009.03.022.044.035.012.007.025.015.037.027.013.013.022.028.033.043.007.012.018.021.025.033.007.02.017.038.024.059.003.012.01.022.013.032.01.032.013.065.013.098zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.037v-.001c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.164 3.76 2.164 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58-.909zM10.328 18.323l6.793-3.88 2.147-1.225v-4.286l-1.578.908-2.182 1.256-4.323 2.49v4.325z" />
    </svg>
);

const MySQLIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.221c.094-1.518.24-3.334.617-5.123h1.15l1.335 4.064h.008l1.347-4.064h1.095c.377 1.789.523 3.605.617 5.123zm1.557 0h-.927c.094-1.518.24-3.334.617-5.123h.927c-.377 1.789-.523 3.605-.617 5.123zm16.833 0h-4.157c.094-1.518.24-3.334.617-5.123h4.007c-.064.757-.146 1.602-.218 2.45h-2.821c-.049.64-.077 1.25-.1 1.86h2.657c-.061.756-.144 1.433-.985 1.813zm-13.215 0h-.927c.094-1.518.24-3.334.617-5.123h4.007c-.064.757-.146 1.602-.218 2.45h-2.821c-.049.64-.077 1.25-.1 1.86h2.657c-.061.756-.144 1.433-.985 1.813zm4.14 0h-.927c.094-1.518.24-3.334.617-5.123h.927c-.377 1.789-.523 3.605-.617 5.123zM24 18.695h-2.778c.094-1.518.24-3.334.617-5.123h1.778c-.377 1.789-.523 3.605-.617 5.123zM.617 10.174c-.377 1.789-.523 3.605-.617 5.123h.927c.094-1.518.24-3.334.617-5.123H.617zm23.383 0c-.377 1.789-.523 3.605-.617 5.123H24c.094-1.518.24-3.334.617-5.123h-.617z" />
    </svg>
);

const TailwindIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
);

const GITHUB_PROFILE = 'https://github.com/Mar11wane-git';

const projectsData = [
    {
        id: 1,
        title: "GoalTime",
        description: "Plateforme complète permettant aux utilisateurs de réserver des terrains de football, s'inscrire à des tournois, effectuer des paiements en ligne et contacter les administrateurs.",
        technologies: ["React", "Laravel", "MySQL", "CSS", "TypeScript"],
        icon: (
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-[0_8px_30px_-12px_rgba(20,184,166,0.8)] ring-2 ring-teal-400/30">
                <div className="relative">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        <path d="M12 2c-1.1 0-2.16.18-3.15.51l1.46 2.24c.53-.15 1.08-.25 1.69-.25s1.16.1 1.69.25l1.46-2.24C14.16 2.18 13.1 2 12 2z" fill="#000" />
                        <path d="M8.85 2.51c-.97.33-1.87.81-2.68 1.41l2.12 1.37c.51-.38 1.09-.67 1.71-.84L8.85 2.51z" fill="#000" />
                        <path d="M6.17 3.92c-.81.6-1.53 1.32-2.13 2.13l1.37 2.12c.17-.62.46-1.2.84-1.71L6.17 3.92z" fill="#000" />
                        <circle cx="12" cy="12" r="6" fill="none" stroke="#000" strokeWidth="0.5" />
                        <path d="M12 6c0 2-1 3-3 3s-3-1-3-3" fill="none" stroke="#000" strokeWidth="0.3" />
                        <path d="M18 12c-2 0-3-1-3-3s1-3 3-3" fill="none" stroke="#000" strokeWidth="0.3" />
                        <path d="M12 18c0-2 1-3 3-3s3 1 3 3" fill="none" stroke="#000" strokeWidth="0.3" />
                        <path d="M6 12c2 0 3 1 3 3s-1 3-3 3" fill="none" stroke="#000" strokeWidth="0.3" />
                        <path d="M9 9l6 6M15 9l-6 6" stroke="#000" strokeWidth="0.2" />
                    </svg>
                </div>
            </div>
        ),
        features: ["Réservation de terrains", "Inscription aux tournois", "Paiements en ligne", "Contact admin"],
        demoUrl: "https://football-reservation.example.com",
        githubUrl: "https://github.com/username/football-reservation"
    },
    {
        id: 2,
        title: "Gestion-RH",
        description: "Application de gestion des ressources humaines permettant d'ajouter, supprimer et modifier les informations des employés, gérer les candidatures, visualiser les salaires et administrer les congés.",
        technologies: ["React", "TypeScript", "MySQL", "Laravel", "Redux", "TailwindCSS"],
        icon: (
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-[0_8px_30px_-12px_rgba(20,184,166,0.8)] ring-2 ring-teal-400/30">
                <div className="relative">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                        {/* Silhouette principale */}
                        <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-2C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                        <path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />

                        {/* Cravate */}
                        <path d="M12 11.5l-.5 1.5h1l-.5-1.5z" fill="#ffffff" />
                        <rect x="11.7" y="13" width="0.6" height="3" fill="#ffffff" />

                        {/* Badge/ID */}
                        <rect x="16" y="6" width="3" height="4" rx="0.3" fill="#ffffff" fillOpacity="0.9" />
                        <rect x="16.5" y="6.5" width="2" height="0.5" fill="#14b8a6" />
                        <rect x="16.5" y="7.2" width="1.5" height="0.3" fill="#6b7280" />
                        <rect x="16.5" y="7.7" width="1" height="0.3" fill="#6b7280" />

                        {/* Graphique performance */}
                        <path d="M5 8l1 -1l1 2l1-1.5l1 1l1-0.5" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeOpacity="0.8" />
                        <circle cx="5" cy="8" r="0.3" fill="#ffffff" />
                        <circle cx="6" cy="7" r="0.3" fill="#ffffff" />
                        <circle cx="7" cy="9" r="0.3" fill="#ffffff" />
                        <circle cx="8" cy="7.5" r="0.3" fill="#ffffff" />
                        <circle cx="9" cy="8.5" r="0.3" fill="#ffffff" />
                        <circle cx="10" cy="8" r="0.3" fill="#ffffff" />
                    </svg>
                </div>
            </div>
        ),
        features: ["Gestion employés", "Suivi candidatures", "Calcul salaires", "Gestion congés"],
        demoUrl: "https://hrms-system.example.com",
        githubUrl: "https://github.com/username/hrms-system"
    },
    {
        id: 3,
        title: "StoreHub",
        description: "Interface e-commerce moderne développée avec React, HTML et CSS, permettant aux utilisateurs de parcourir les produits, gérer leur panier et simuler des achats en ligne.",
        technologies: ["React", "HTML", "CSS"],
        icon: (
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-[0_8px_30px_-12px_rgba(20,184,166,0.8)] ring-2 ring-teal-400/30">
                <div className="relative">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                        {/* Corps du panier */}
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="#ffffff" />
                        {/* Poignée du panier */}
                        <path d="M8 6C8 5.45 8.45 5 9 5H15C15.55 5 16 5.45 16 6V7H8V6Z" fill="#ffffff" />
                        {/* Roues du panier */}
                        <circle cx="9" cy="20" r="1.5" fill="#ffffff" />
                        <circle cx="15" cy="20" r="1.5" fill="#ffffff" />
                        {/* Axe des roues */}
                        <line x1="7.5" y1="20" x2="16.5" y2="20" stroke="#ffffff" strokeWidth="0.5" />
                        {/* Produits dans le panier */}
                        <rect x="10" y="8" width="1.5" height="3" fill="#14b8a6" />
                        <rect x="12.5" y="8" width="1.5" height="3" fill="#14b8a6" />
                        <rect x="15" y="9" width="1.5" height="2" fill="#14b8a6" />
                        {/* Ombre pour profondeur */}
                        <ellipse cx="12" cy="19.5" rx="8" ry="1" fill="#ffffff" fillOpacity="0.2" />
                    </svg>
                </div>
            </div>
        ),
        features: ["Catalogue produits", "Gestion panier", "Interface responsive", "Simulation achats"],
        demoUrl: "https://storehub-demo.example.com",
        githubUrl: "https://github.com/username/storehub"
    }
];

const getTechIcon = (tech) => {
    switch (tech.toLowerCase()) {
        case 'react':
            return <ReactIcon />;
        case 'laravel':
            return <LaravelIcon />;
        case 'mysql':
            return <MySQLIcon />;
        case 'tailwindcss':
            return <TailwindIcon />;
        case 'typescript':
            return <FileText className="w-4 h-4" />;
        case 'css':
            return <Smartphone className="w-4 h-4" />;
        case 'redux':
            return <Database className="w-4 h-4" />;
        default:
            return <Terminal className="w-4 h-4" />;
    }
};

const Projects = () => {
    return (
        <section id="projects" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <BackgroundFX />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                            Mes Projets
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto mb-6 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
                    <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
                        Découvrez une sélection de mes projets récents qui démontrent mes compétences en développement web et ma capacité à créer des solutions innovantes.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-400/40 hover:bg-gray-800/60 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.4)]"
                        >
                            {/* Icône principale */}
                            <div className="group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                            </div>

                            {/* Titre */}
                            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-300 mb-6 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                {project.description}
                            </p>

                            {/* Fonctionnalités avec icônes */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 group-hover:bg-teal-400 transition-colors duration-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {project.technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center px-3 py-2 bg-teal-500/20 text-cyan-400 text-xs font-medium rounded-full border border-teal-500/30 hover:bg-teal-500/30 hover:border-teal-400/50 transition-all duration-300 shadow-[0_4px_20px_-8px_rgba(20,184,166,0.4)]"
                                    >
                                        <span className="mr-2 group-hover:scale-110 transition-transform duration-300">
                                            {getTechIcon(tech)}
                                        </span>
                                        {tech}
                                    </div>
                                ))}
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex justify-center space-x-4">
                                {project.demoUrl && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            setTimeout(() => {
                                                document.getElementById('name')?.focus();
                                            }, 800);
                                        }}
                                        className="group flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.7)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.8)]"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                        Démo
                                    </button>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={GITHUB_PROFILE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center px-6 py-3 bg-gray-700/60 text-white rounded-lg text-sm font-semibold hover:bg-gray-600/60 transition-all duration-300 transform hover:scale-105 border border-gray-600/40 hover:border-teal-500/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.3)]"
                                    >
                                        <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Portfolio complet */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center px-8 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-teal-400/40 hover:bg-gray-800/60 transition-all duration-300 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.3)]">
                        <Github className="w-5 h-5 text-cyan-400 mr-3" />
                        <span className="text-gray-200 mr-4 font-medium">Plus de projets sur GitHub</span>
                        <a
                            href={GITHUB_PROFILE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.6)]"
                        >
                            Voir GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;