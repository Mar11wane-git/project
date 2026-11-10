import React from 'react';
import { Mail, Eye, Github, Linkedin, ArrowRight, Sparkles, MapPin, Building2, GraduationCap, CheckCircle2 } from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onOpenCV: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-24 overflow-hidden bg-[#0D100E]"
    >
      <BackgroundFX density="low" variant="teal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <span className="text-[#dfff5b] font-bold">SLIDE 01</span>
          <span>/</span>
          <span>06</span>
          <span className="w-10 h-[1px] bg-white/10" />
          <span>PRÉSENTATION EXÉCUTIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Presentation Elements - Staggered Cascade */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 1. Status Pill */}
            <ScrollReveal delay={100} direction="down">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161d18] border border-[#27322a] shadow-[0_0_20px_rgba(223,255,91,0.08)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfff5b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dfff5b]"></span>
                </span>
                <span className="text-xs font-mono font-medium text-[#eef3ea]/90">
                  Pilote de Production Monétique @ HPS • Élève-Ingénieur
                </span>
              </div>
            </ScrollReveal>

            {/* 2. Main Title */}
            <ScrollReveal delay={200} direction="up">
              <div className="relative">
                <div className="font-handwriting text-2xl sm:text-3xl text-[#dfff5b] font-semibold -rotate-2 transform mb-1 flex items-center gap-2">
                  <span>Bonjour, je suis</span>
                  <span className="text-xs font-mono text-[#eef3ea]/50 tracking-normal font-normal">
                    — Casablanca, Maroc
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  MAROUANE <br />
                  <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                    EL HAMDAOUI
                  </span>
                </h1>
              </div>
            </ScrollReveal>

            {/* 3. Subtitle & Bio pitch */}
            <ScrollReveal delay={300} direction="up">
              <div className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-200">
                  Étudiant en cycle d’ingénierie en Génie Informatique{' '}
                  <span className="text-[#dfff5b]">&bull;</span> Développeur Web Full Stack
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Passionné par l'architecture logicielle et le développement web moderne (React.js, Laravel, Spring Boot, Node.js). Fort d'une expérience concrète en{' '}
                  <strong className="text-[#dfff5b] font-semibold">production monétique critique chez HPS</strong> (supervision Zabbix, transferts CFT, protocoles Visa/Mastercard & requêtes SQL).
                </p>
              </div>
            </ScrollReveal>

            {/* 4. Credentials badges row */}
            <ScrollReveal delay={400} direction="up">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <Building2 size={13} className="text-[#dfff5b]" />
                  <span>HPS — Hightech Payment Systems</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <GraduationCap size={13} className="text-[#22d3ee]" />
                  <span>École High Tech Rabat (Bac+5)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <MapPin size={13} className="text-[#34d399]" />
                  <span>Casablanca & Meknès</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. CTAs Buttons */}
            <ScrollReveal delay={500} direction="up">
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-[#0D100E] bg-[#dfff5b] hover:bg-[#ebff82] shadow-[0_0_25px_rgba(223,255,91,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Mail size={16} />
                  <span>Me Contacter</span>
                  <ArrowRight size={14} className="ml-1" />
                </button>

                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#151a16] hover:bg-[#1f2720] border border-white/10 hover:border-[#dfff5b]/40 transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <Eye size={16} className="text-[#dfff5b]" />
                  <span>Consulter mon CV</span>
                </button>

                <button
                  onClick={() => scrollTo('projects')}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-[#dfff5b] transition-colors"
                >
                  <span>Voir mes projets</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </ScrollReveal>

            {/* 6. Social links */}
            <ScrollReveal delay={600} direction="up">
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-mono text-slate-400">Réseaux :</span>
                <a
                  href="https://github.com/Mar11wane-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/40 text-slate-300 hover:text-[#dfff5b] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/Marouane-El-Hamdaoui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/40 text-slate-300 hover:text-[#dfff5b] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href="mailto:elhamdawimarwane@gmail.com"
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#dfff5b]/10 border border-white/10 hover:border-[#dfff5b]/40 text-slate-300 hover:text-[#dfff5b] transition-colors"
                  aria-label="Email"
                >
                  <Mail size={17} />
                </a>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Presentation Slide Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal delay={350} direction="left">
              <div className="relative w-full max-w-[420px] rounded-3xl bg-[#131814]/90 border border-white/10 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                
                {/* Header of the Slide Card */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dfff5b] animate-ping" />
                    <span className="text-xs font-mono font-bold text-[#dfff5b]">PROFIL VÉRIFIÉ</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Marouane El Hamdaoui</span>
                </div>

                {/* Profile Photo */}
                <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 mb-6">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#dfff5b] via-[#34d399] to-[#22d3ee] opacity-60 blur-sm" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border-2 border-white/20">
                    <img
                      src="/photo pro.jpg"
                      alt="Marouane El Hamdaoui"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Core Credentials List */}
                <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-slate-400">Poste actuel :</span>
                    <span className="font-semibold text-white">Pilote Monétique @ HPS</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-slate-400">Formation :</span>
                    <span className="font-semibold text-white">Ingénierie Génie Info (HT Rabat)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-slate-400">Diplôme précédent :</span>
                    <span className="font-semibold text-white">DTS Web Full Stack</span>
                  </div>
                </div>

                {/* 3 Metric counters */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-base sm:text-lg font-bold text-[#dfff5b] font-mono">2026</div>
                    <div className="text-[10px] text-slate-400">HPS Prod</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-base sm:text-lg font-bold text-[#34d399] font-mono">4+</div>
                    <div className="text-[10px] text-slate-400">Projets Web</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-base sm:text-lg font-bold text-[#22d3ee] font-mono">Bac+5</div>
                    <div className="text-[10px] text-slate-400">Génie Info</div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
