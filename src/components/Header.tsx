import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, Menu, Moon, Sun, X } from 'lucide-react';
import { SECTIONS } from '../data/portfolio';
import { scrollToSection } from '../hooks/useSections';

interface HeaderProps {
  active: number;
  scrolled: boolean;
  theme: 'dark' | 'light';
  onTheme: (t: 'dark' | 'light') => void;
}

const Header: React.FC<HeaderProps> = ({ active, scrolled, theme, onTheme }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  const ThemeSwitch = (
    <div className="flex items-center rounded-full border border-line bg-card p-1" role="group" aria-label="Thème">
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          onClick={() => onTheme(t)}
          aria-pressed={theme === t}
          aria-label={t === 'light' ? 'Thème clair' : 'Thème sombre'}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            theme === t ? 'bg-lime text-on-lime' : 'text-muted hover:text-ink'
          }`}
        >
          {t === 'light' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled || open ? 'header-solid border-line' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]" aria-label="Navigation principale">
          <button onClick={() => go('home')} className="text-[26px] font-extrabold leading-none tracking-tight" aria-label="Accueil">
            <span className="text-ink">M</span>
            <span className="text-accent">E</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  aria-current={active === i ? 'true' : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active === i ? 'text-accent' : 'text-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-lime transition-transform duration-300 ${
                      active === i ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">{ThemeSwitch}</div>
            <button onClick={() => go('contact')} className="btn-lime hidden !px-4 !py-2.5 sm:inline-flex">
              Me contacter <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong text-ink lg:hidden"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        <div id="scroll-progress" className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-lime" aria-hidden />
      </header>

      {/* mobile drawer */}
      {open && (
        <div className="fade-in fixed inset-0 z-30 bg-bg pt-16 lg:hidden">
          <nav className="container-page flex h-full flex-col py-4" aria-label="Menu">
            <ul className="flex-1 overflow-y-auto">
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="border-b border-line">
                  <button
                    onClick={() => go(s.id)}
                    className={`flex w-full items-center gap-4 py-4 text-left text-2xl font-bold ${active === i ? 'text-accent' : 'text-ink'}`}
                  >
                    <span className="font-mono text-xs text-muted">{String(i).padStart(2, '0')}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 pb-6 pt-4">
              {ThemeSwitch}
              <button onClick={() => go('contact')} className="btn-lime flex-1">
                Me contacter <ArrowRight size={15} />
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* back to top */}
      <button
        onClick={() => go('home')}
        aria-label="Revenir en haut"
        className={`fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-on-lime shadow-lg transition-all duration-300 hover:-translate-y-0.5 sm:bottom-7 sm:right-7 ${
          scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};

export default Header;
