import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#090c0a] border-t border-white/[0.06] text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#dfff5b] to-[#10b981] p-[1px]">
                <div className="w-full h-full bg-[#0D100E] rounded-[7px] flex items-center justify-center font-mono font-bold text-[#dfff5b] text-xs">
                  ME
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                MAROUANE EL HAMDAOUI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Étudiant en cycle d’ingénierie en Génie Informatique (École High Tech Rabat) & Pilote de Production Monétique chez HPS. Passionné par l’architecture logicielle, le développement Web Full Stack et les systèmes critiques.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={14} className="text-[#dfff5b]" />
              <span>Casablanca & Meknès, Maroc</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/Mar11wane-git"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/30 text-slate-300 hover:text-[#dfff5b] transition-colors"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/Marouane-El-Hamdaoui/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/30 text-slate-300 hover:text-[#dfff5b] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:elhamdawimarwane@gmail.com"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/30 text-slate-300 hover:text-[#dfff5b] transition-colors"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm">
              {[
                { label: 'Accueil', id: 'hero' },
                { label: 'À propos de moi', id: 'about' },
                { label: 'Expérience & Études', id: 'experience' },
                { label: 'Projets Académiques & Personnels', id: 'projects' },
                { label: 'Compétences Techniques', id: 'skills' },
                { label: 'Prendre Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-slate-400 hover:text-[#dfff5b] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core expertise stack */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Stack & Domaines d'Intervention
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-semibold text-slate-200">React.js & Tailwind</div>
                <div className="text-[10px] text-slate-400">Front-End dynamique</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-semibold text-slate-200">Laravel & Spring</div>
                <div className="text-[10px] text-slate-400">Back-End & API REST</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-semibold text-slate-200">MySQL & Oracle</div>
                <div className="text-[10px] text-slate-400">PL/SQL & Données</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-semibold text-slate-200">HPS Monétique</div>
                <div className="text-[10px] text-slate-400">Supervision & Batchs</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>© {currentYear} Marouane El Hamdaoui. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/30 text-slate-300 hover:text-[#dfff5b] transition-colors"
            >
              <span>Haut de page</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
