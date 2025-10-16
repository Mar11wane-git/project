import React from 'react';
import { Code, Palette, Database, Globe } from 'lucide-react';

// Composant d'effets de fond identique au Hero
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

const ReactIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2.01.2-3.6 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.31-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26" />
  </svg>
);

const JSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.77l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.528-.73.418-1.314.418-.18 0-.36-.022-.53-.058-.183-.135-.272-.418-.334-.653-.021-.163-.028-.342-.028-.529V9.288H7.468c0 1.453.007 2.898.007 4.354 0 1.385.09 2.33.405 3.064.315.764.84 1.316 1.918 1.316 1.135 0 1.854-.522 2.272-1.316.315-.765.315-1.679.315-3.064V9.288" />
  </svg>
);

const LaravelIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.017c-.008.002-.016.002-.024.002-.03 0-.06-.008-.09-.022L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033.012.009.025.018.037.027.013.014.022.03.033.045.008.011.02.021.025.033.007.02.017.038.022.058.005.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.021.025-.033.012-.015.021-.030.033-.043.012-.012.025-.02.037-.027.014-.013.030-.026.044-.035h.002l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.015.009.03.022.044.035.012.007.025.015.037.027.013.013.022.028.033.043.007.012.018.021.025.033.007.02.017.038.024.059.003.012.01.022.013.032.01.032.013.065.013.098zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.037v-.001c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.164 3.76 2.164 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58-.909zM10.328 18.323l6.793-3.88 2.147-1.225v-4.286l-1.578.908-2.182 1.256-4.323 2.49v4.325z" />
  </svg>
);

const PHPIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.52-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.742a2.8 2.8 0 0 1-.233.698c-.11.315-.28.615-.513.862zm8.688.275h1.456c.123-.866.18-1.542.18-2.028 0-.543-.133-.97-.399-1.28-.266-.31-.688-.465-1.267-.465-.577 0-1.08.225-1.508.675-.428.45-.719 1.091-.872 1.923-.153.832-.098 1.49.165 1.973.263.483.705.725 1.326.725.22 0 .406-.037.558-.11.152-.074.3-.2.444-.38l-.083.382zm4.99-5.441c.133-.476.06-.825-.217-1.047-.277-.223-.676-.334-1.184-.334h-1.378l-.327 1.681h-.76l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.742-.146.741-.426 1.279-.84 1.651-.414.372-.915.558-1.504.558H19.99l-.327 1.681h-.76zm-7.578.06c.328-.423.892-.634 1.492-.634.6 0 1.033.211 1.299.634.266.423.314.997.144 1.723-.17.726-.465 1.25-.886 1.571-.42.32-1.01.481-1.766.481s-1.346-.161-1.612-.484c-.266-.322-.314-.896-.144-1.622.17-.726.465-1.246.873-1.669z" />
  </svg>
);

const NodeJSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.68C2.376,6.729,2.322,6.825,2.322,6.921v10.15c0,0.097,0.054,0.189,0.137,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.28-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
  </svg>
);

const MySQLIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.221c.094-1.518.24-3.334.617-5.123h1.15l1.335 4.064h.008l1.347-4.064h1.095c.377 1.789.523 3.605.617 5.123zm1.557 0h-.927c.094-1.518.24-3.334.617-5.123h.927c-.377 1.789-.523 3.605-.617 5.123zm16.833 0h-4.157c.094-1.518.24-3.334.617-5.123h4.007c-.064.757-.146 1.602-.218 2.45h-2.821c-.049.64-.077 1.25-.1 1.86h2.657c-.061.756-.144 1.433-.985 1.813zm-13.215 0h-.927c.094-1.518.24-3.334.617-5.123h4.007c-.064.757-.146 1.602-.218 2.45h-2.821c-.049.64-.077 1.25-.1 1.86h2.657c-.061.756-.144 1.433-.985 1.813zm4.14 0h-.927c.094-1.518.24-3.334.617-5.123h.927c-.377 1.789-.523 3.605-.617 5.123zM24 18.695h-2.778c.094-1.518.24-3.334.617-5.123h1.778c-.377 1.789-.523 3.605-.617 5.123zM.617 10.174c-.377 1.789-.523 3.605-.617 5.123h.927c.094-1.518.24-3.334.617-5.123H.617zm23.383 0c-.377 1.789-.523 3.605-.617 5.123H24c.094-1.518.24-3.334.617-5.123h-.617z" />
  </svg>
);

const MongoDBIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-3.032.284-6.017.51-9.02.417-.296 5.51-2.966 4.292-5.425zM11.909 23.998c-.086.002-.169.003-.25.003-.081 0-.164-.001-.25-.003.086 0 .169.001.25.001.081 0 .164-.001.25-.001z" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

const About = () => {
  const stats = [
    { number: '10+', label: 'Projets académiques & personnels' },
    { number: '500+', label: 'Heures de code' },
    { number: '2', label: 'Certifications (en cours)' },
    { number: '100%', label: 'Motivation' },
  ];

  const technologies = [
    { name: 'Laravel', icon: <LaravelIcon /> },
    { name: 'PHP', icon: <PHPIcon /> },
    { name: 'React', icon: <ReactIcon /> },
    { name: 'JavaScript', icon: <JSIcon /> },
    { name: 'Node.js', icon: <NodeJSIcon /> },
    { name: 'MySQL', icon: <MySQLIcon /> },
    { name: 'MongoDB', icon: <MongoDBIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  ];

  const specialties = [
    {
      icon: Code,
      title: 'Développement Frontend',
      description: 'React, Vue.js, TypeScript, et frameworks modernes',
    },
    {
      icon: Database,
      title: 'Développement Backend',
      description: 'Node.js, Python, bases de données, APIs REST',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Design moderne, responsive et centré utilisateur',
    },
    {
      icon: Globe,
      title: 'Solutions Complètes',
      description: 'Applications web full stack de A à Z',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <BackgroundFX />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              À propos de moi
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* Carte de présentation */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-400/40 hover:bg-gray-800/70 transition-all duration-300 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.3)]">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg mr-3 flex items-center justify-center">
                <Code size={18} className="text-white" />
              </div>
              Profil
            </h3>
            <div className="space-y-6 text-left">
              <h4 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                MAROUANE EL HAMDAOUI
              </h4>
              <p className="text-gray-200 text-lg leading-relaxed">
                Développeur Web Full Stack passionné par la création d'applications performantes et intuitives,
                maîtrisant à la fois le front-end (HTML, Tailwind CSS, JavaScript, React)
                et le back-end (PHP, Laravel, Node.js). Solide expérience dans la conception,
                l'intégration et l'optimisation de bases de données relationnelles et NoSQL (MySQL, MongoDB).
              </p>
              <p className="text-gray-200 text-lg leading-relaxed">
                Doté d'une bonne compréhension des APIs et de l'architecture logicielle, j'assure le développement d'outils complets,
                de la conception à la mise en production. Curieux et motivé, je m'adapte facilement aux nouvelles technologies
                et je cherche constamment à améliorer mes compétences afin de livrer des solutions fiables, évolutives et centrées sur l'utilisateur.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-center text-white mb-8">Technologies Maîtrisées</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span
                key={tech.name}
                className="group flex items-center px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-cyan-400 rounded-full border border-teal-500/30 hover:bg-teal-500/10 hover:border-teal-400/50 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_-8px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_30px_-8px_rgba(20,184,166,0.5)]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <span className="text-cyan-400 mr-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                <span className="font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">{tech.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:bg-gray-700/50 hover:border-teal-500/40 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.3)]"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Spécialités */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-white mb-12">Mes Spécialités</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-teal-400/50 hover:bg-gray-800/60 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.4)]"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.6)] group-hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.8)]">
                  <specialty.icon size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {specialty.title}
                </h4>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {specialty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default About;