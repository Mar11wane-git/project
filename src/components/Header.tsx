import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCV: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCV }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Accueil', id: 'hero', slide: '01' },
    { label: 'À propos', id: 'about', slide: '02' },
    { label: 'Expériences & Études', id: 'experience', slide: '03' },
    { label: 'Projets', id: 'projects', slide: '04' },
    { label: 'Compétences', id: 'skills', slide: '05' },
    { label: 'Contact', id: 'contact', slide: '06' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D100E]/85 backdrop-blur-md border-b border-white/[0.08] shadow-xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#dfff5b] to-[#10b981] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(223,255,91,0.25)]">
              <div className="w-full h-full bg-[#0D100E] rounded-[10px] flex items-center justify-center font-mono font-bold text-[#dfff5b] text-sm">
                ME
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white group-hover:text-[#dfff5b] transition-colors text-sm sm:text-base">
                MAROUANE EL HAMDAOUI
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
                Génie Informatique & Full Stack
              </span>
            </div>
          </button>

          {/* Desktop Nav Pills */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.07] rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#dfff5b] bg-[#dfff5b]/10 shadow-[0_0_12px_rgba(223,255,91,0.2)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#dfff5b]' : 'text-slate-500'}`}>
                    {item.slide}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#dfff5b]/40 hover:text-[#dfff5b] transition-all duration-200 active:scale-95"
            >
              <FileDown size={14} />
              <span>Consulter CV</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0D100E] bg-[#dfff5b] hover:bg-[#ebff82] shadow-[0_0_20px_-3px_rgba(223,255,91,0.5)] transition-all duration-200 active:scale-95"
            >
              <Sparkles size={13} />
              <span>Me contacter</span>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCV}
              className="p-2 rounded-lg bg-[#dfff5b]/10 border border-[#dfff5b]/30 text-[#dfff5b]"
              aria-label="CV"
            >
              <FileDown size={16} />
            </button>
            <button
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 space-y-2 rounded-2xl bg-[#141a15]/95 border border-white/10 backdrop-blur-xl shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'text-[#dfff5b] bg-[#dfff5b]/10'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-slate-500">SLIDE {item.slide}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenCV();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center rounded-xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center gap-2"
              >
                <FileDown size={14} />
                <span>Consulter mon CV (PDF)</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 px-4 text-xs font-bold text-center rounded-xl bg-[#dfff5b] text-[#0D100E]"
              >
                Me contacter
              </button>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;
