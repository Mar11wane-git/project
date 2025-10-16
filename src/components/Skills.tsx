import React from 'react';
import { Database, Settings, Smartphone, Server, GitBranch, Terminal, Container, Cloud } from 'lucide-react';

// BackgroundFX component identique au Hero, About et Projects
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

const Skills = () => {
  // Icônes SVG personnalisées pour les technologies
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

  const VueIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" />
    </svg>
  );

  const LaravelIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.017c-.008.002-.016.002-.024.002-.03 0-.06-.008-.09-.022L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033.012.009.025.018.037.027.013.014.022.03.033.045.008.011.02.021.025.033.007.02.017.038.022.058.005.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.021.025-.033.012-.015.021-.030.033-.043.012-.012.025-.02.037-.027.014-.013.030-.026.044-.035h.002l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.015.009.03.022.044.035.012.007.025.015.037.027.013.013.022.028.033.043.007.012.018.021.025.033.007.02.017.038.024.059.003.012.01.022.013.032.01.032.013.065.013.098zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.037v-.001c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.164 3.76 2.164 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58-.909zM10.328 18.323l6.793-3.88 2.147-1.225v-4.286l-1.578.908-2.182 1.256-4.323 2.49v4.325z" />
    </svg>
  );

  const PythonIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  );

  const TailwindIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );

  const NextJSIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5502.0445h-.4697l-.1085-.0747c-.0606-.0411-.1085-.1007-.1314-.1618l-.0281-.084.0188-4.178.0235-4.1849.0516-.1103c.0327-.0632.0847-.1249.1408-.1618.0659-.0374.1171-.042.5847-.042.4929 0 .5847.0067.6504.0634.0659.0566.1445.1249.1963.1618.0233.0174.8058 1.2112 1.7383 2.6611 2.3594 3.6778 4.1424 6.4495 4.4012 6.8472.0188.0233.0376.0233.0564.0233.0376 0 .1134-.1103.1763-.2539.1085-.2416.1618-.5502.1618-.8987 0-.8537-.012-1.0884-.108-1.7476-.652-4.506-3.8591-8.2919-8.2087-9.6945C13.3595.2511 12.5384.0799 11.6047-.0233 11.2411-.0328 11.6839-.0328 11.5725 0z" />
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

  const DockerIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const ExpressIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957c-2.643 1.612-6.281.733-7.967-1.85A7.793 7.793 0 010 11.576zM1.116 10.073h10.694c.161-2.441-.637-4.404-2.525-5.458-2.669-1.49-6.137-.466-7.746 2.407A5.183 5.183 0 001.116 10.073z" />
    </svg>
  );

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
      skills: [
        { name: 'React', level: 95, icon: <ReactIcon /> },
        { name: 'JavaScript', level: 90, icon: <JSIcon /> },
        { name: 'Vue.js', level: 85, icon: <VueIcon /> },
        { name: 'Tailwind CSS', level: 95, icon: <TailwindIcon /> },
        { name: 'Next.js', level: 88, icon: <NextJSIcon /> }
      ]
    },
    {
      title: 'Backend',
      icon: <Server className="w-8 h-8 text-cyan-400" />,
      skills: [
        { name: 'Laravel', level: 90, icon: <LaravelIcon /> },
        { name: 'Python', level: 85, icon: <PythonIcon /> },
        { name: 'MySQL', level: 88, icon: <MySQLIcon /> },
        { name: 'MongoDB', level: 82, icon: <MongoDBIcon /> },
        { name: 'Express.js', level: 80, icon: <ExpressIcon /> }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <Settings className="w-8 h-8 text-cyan-400" />,
      skills: [
        { name: 'Docker', level: 85, icon: <DockerIcon /> },
        { name: 'GitHub', level: 80, icon: <GitHubIcon /> },
        { name: 'Git', level: 95, icon: <GitBranch className="w-5 h-5" /> },
        { name: 'CI/CD', level: 82, icon: <Cloud className="w-5 h-5" /> },
        { name: 'UML', level: 85, icon: <Terminal className="w-5 h-5" /> }
      ]
    }
  ];

  const technologies = [
    { name: 'Laravel', icon: <LaravelIcon /> },
    { name: 'PHP', icon: <PHPIcon /> },
    { name: 'React', icon: <ReactIcon /> },
    { name: 'JavaScript', icon: <JSIcon /> },
    { name: 'Node.js', icon: <NodeJSIcon /> },
    { name: 'Express', icon: <ExpressIcon /> },
    { name: 'MySQL', icon: <MySQLIcon /> },
    { name: 'MongoDB', icon: <MongoDBIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon /> },
    { name: 'Git', icon: <GitBranch className="w-5 h-5" /> },
    { name: 'GitHub', icon: <GitHubIcon /> },
    { name: 'Python', icon: <PythonIcon /> }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <BackgroundFX />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Mes Compétences
            </span>
          </h2>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Maîtrise complète des technologies web modernes, des frameworks backend
            aux outils de développement et de productivité professionnelle.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto rounded-full mt-6 shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* Grille centrée avec colonnes auto-fit */}
        <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(300px,360px))] max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-400/40 hover:bg-gray-800/60 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_40px_-12px_rgba(20,184,166,0.4)]"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white ml-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-cyan-400 mr-2 group-hover/skill:text-teal-400 transition-colors duration-300">
                          {skill.icon}
                        </span>
                        <span className="text-gray-300 font-medium group-hover/skill:text-gray-200 transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-cyan-400 text-sm font-semibold bg-cyan-400/10 px-2 py-1 rounded-full">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transform transition-all duration-1000 ease-out group-hover/skill:scale-x-105 relative shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `fillBar 2s ease-out ${skillIndex * 0.2}s both`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Icons */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            Technologies & Outils Maîtrisés
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group flex items-center px-5 py-3 bg-gray-800/40 backdrop-blur-sm text-gray-300 rounded-xl border border-gray-600/30 hover:border-teal-400/50 hover:text-cyan-400 hover:bg-gray-700/40 transition-all duration-300 transform hover:scale-110 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_-8px_rgba(20,184,166,0.4)]"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <span className="text-cyan-400 mr-2 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-300">
                  {tech.icon}
                </span>
                <span className="font-medium group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default Skills;