import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Maximize2, Menu, Minimize2, X } from 'lucide-react';
import { PROFILE, SLIDES } from '../data/portfolio';

interface HeaderProps {
  active: number;
  goTo: (i: number) => void;
  onOpenCV: () => void;
}

const Logo: React.FC = () => (
  <span className="relative block h-7 w-7 [perspective:300px]" aria-hidden>
    <span className="cube absolute inset-0">
      <span style={{ transform: 'translateZ(14px)' }}>ME</span>
      <span style={{ transform: 'rotateY(90deg) translateZ(14px)' }}>H</span>
      <span style={{ transform: 'rotateY(180deg) translateZ(14px)' }}>MR1</span>
      <span style={{ transform: 'rotateY(-90deg) translateZ(14px)' }}>{'</>'}</span>
    </span>
  </span>
);

const Header: React.FC<HeaderProps> = ({ active, goTo, onOpenCV }) => {
  const [open, setOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFull(Boolean(document.fullscreenElement));
    const onScroll = () => setScrolled(window.scrollY > 24);
    document.addEventListener('fullscreenchange', onFs);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      /* fullscreen not allowed (iOS Safari): ignore */
    }
  };

  const canFullscreen = typeof document !== 'undefined' && Boolean(document.documentElement.requestFullscreen);

  const navTo = (i: number) => {
    setOpen(false);
    goTo(i);
  };

  return (
    <>
      {/* progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
        <div id="deck-progress" className="deck-progress h-full bg-gradient-to-r from-[#d6f25e] via-[#3fcf98] to-[#38c6dc]" />
      </div>

      {/* top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'border-b border-line bg-[rgba(14,18,15,0.95)]' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-10">
          <button onClick={() => navTo(0)} className="flex items-center gap-3 text-left" aria-label="Retour à l'accueil">
            <Logo />
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink">{PROFILE.firstName} {PROFILE.lastName}</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:block">Portfolio · Présentation</span>
            </span>
          </button>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Diapositives">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => navTo(i)}
                aria-current={active === i ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === i ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] text-lime">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-lime transition-transform duration-300 ${
                    active === i ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            {canFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="hidden items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-[#d6f25e] sm:inline-flex"
                title="Mode présentation plein écran"
              >
                {isFull ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                <span className="hidden md:inline">{isFull ? 'Quitter' : 'Présenter'}</span>
              </button>
            )}
            <button
              onClick={onOpenCV}
              className="inline-flex items-center gap-2 rounded-xl bg-lime px-3.5 py-2 text-xs font-bold text-[#0e120f] shadow-[0_6px_18px_-8px_rgba(214,242,94,0.45)] transition-transform hover:-translate-y-0.5"
            >
              <FileText size={14} />
              CV
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink lg:hidden"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu: slides shown as a 3D stack */}
      <div
        className={`fixed inset-0 z-30 bg-[rgba(14,18,15,0.98)] transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6 [perspective:900px]" aria-label="Diapositives">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={(e) => {
                e.stopPropagation();
                navTo(i);
              }}
              style={{
                transitionDelay: open ? `${i * 55}ms` : '0ms',
                transform: open ? 'none' : 'rotateX(-70deg) translateY(20px)',
                opacity: open ? 1 : 0,
              }}
              className={`flex origin-top items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${
                active === i ? 'border-[#d6f25e] bg-[rgba(214,242,94,0.08)]' : 'border-line bg-surface'
              }`}
            >
              <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-2xl font-bold text-ink">{s.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* side dots */}
      <nav className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex" aria-label="Navigation rapide">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => navTo(i)} className="group flex items-center justify-end gap-3" aria-label={s.label}>
            <span className="pointer-events-none translate-x-2 rounded-md bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === i ? 'h-6 w-1.5 bg-lime' : 'h-1.5 w-1.5 bg-[rgba(255,255,255,0.3)] group-hover:bg-[rgba(255,255,255,0.7)]'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* slide controls */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-1 rounded-2xl border border-line bg-[rgba(21,26,22,0.96)] p-1 shadow-lg sm:bottom-6 sm:right-6">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 disabled:opacity-30"
          aria-label="Diapositive précédente"
          title="Précédente (Page ↑)"
        >
          <ChevronUp size={18} />
        </button>
        <span className="min-w-[3.5rem] text-center font-mono text-xs text-muted" aria-live="polite">
          <span className="text-lime">{String(active + 1).padStart(2, '0')}</span> / {String(SLIDES.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === SLIDES.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 disabled:opacity-30"
          aria-label="Diapositive suivante"
          title="Suivante (Page ↓)"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </>
  );
};

export default Header;
