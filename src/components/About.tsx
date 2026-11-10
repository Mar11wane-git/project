import React from 'react';
import { User, Code2, Server, Shield, Database, Award, MapPin, Mail, Phone, GraduationCap, CheckCircle2 } from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import ScrollReveal from './ScrollReveal';

const pillars = [
  {
    icon: Code2,
    title: "Développement Web Full Stack",
    description:
      "Conception d'applications complètes et réactives associant le Front-End (React.js, Tailwind CSS, TypeScript) et le Back-End (Laravel, PHP, Spring Boot, Node.js, API REST).",
    badge: "Front & Back-end"
  },
  {
    icon: Shield,
    title: "Production Monétique & Systèmes Critiques",
    description:
      "Expérience chez HPS : supervision des traitements batch N1/N2, monitoring Zabbix 24/7, transferts CFT, protocoles Visa/Mastercard, gestion GAB, PowerCARD et résolution d'incidents.",
    badge: "HPS Monétique"
  },
  {
    icon: Database,
    title: "Bases de Données & Architecture",
    description:
      "Modélisation, administration et requêtage avancé en SQL, PL/SQL sous MySQL, Oracle et bases NoSQL MongoDB. Contrôle et cohérence des flux de données bancaires critiques.",
    badge: "SQL & Oracle"
  },
  {
    icon: Server,
    title: "DevOps, Environnements & Agile",
    description:
      "Maîtrise des environnements Linux & Windows Server, scripting PowerShell/SSH/PuTTY, conteneurisation Docker, gestion de versions Git/GitHub et respect des cycles Agiles (Scrum).",
    badge: "DevOps & Cloud Native"
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0D100E] border-t border-white/[0.04]">
      <BackgroundFX density="low" variant="teal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <ScrollReveal delay={50} direction="down">
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="text-[#dfff5b] font-bold">SLIDE 02</span>
            <span>/</span>
            <span>06</span>
            <span className="w-10 h-[1px] bg-white/10" />
            <span>PROFIL PROFESSIONNEL & VALEURS</span>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18201a] border border-[#2b392f] text-[#dfff5b] text-xs font-mono mb-3">
              <User size={13} />
              <span>À PROPOS DE MOI</span>
            </div>

            <div className="font-handwriting text-2xl text-[#dfff5b] font-semibold -rotate-1 mb-1">
              ~ Profil & Valeurs Professionnelles ~
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Passionné par le code & la{' '}
              <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                rigueur opérationnelle
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Alliant la créativité du développement web moderne et la rigueur de la production monétique à haute disponibilité.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dfff5b] to-[#10b981] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Bio Card + Personal Details: Appear step by step */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 max-w-6xl mx-auto">
          
          {/* Main Story Slide Card */}
          <ScrollReveal delay={200} direction="right" className="lg:col-span-7 h-full">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#131814]/85 border border-white/[0.08] backdrop-blur-xl shadow-xl flex flex-col justify-between h-full hover:border-[#dfff5b]/30 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#dfff5b] font-mono text-xs uppercase tracking-wider">
                  <GraduationCap size={16} />
                  <span>Objectif & Parcours</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Marouane El Hamdaoui
                </h3>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Étudiant en <strong className="text-[#dfff5b]">2ᵉ année du cycle d’ingénierie en Génie Informatique</strong> à l'École High Technologie (HT) de Rabat, je suis passionné par le génie logiciel et le Web Full Stack.
                </p>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Titulaire d’un diplôme de <strong className="text-emerald-300">Technicien Spécialisé en Développement Digital (option Web Full Stack)</strong>, j’ai également une expérience professionnelle concrète en tant que <strong className="text-cyan-300">Pilote de Production Monétique chez HPS (Hightech Payment Systems)</strong>.
                </p>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Je souhaite mettre mes compétences techniques, ma rigueur acquise en environnement de production critique et ma capacité d'adaptation rapide au service d'une équipe informatique ambitieuse.
                </p>
              </div>

              {/* Quick checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#dfff5b] shrink-0" />
                  <span>Programmation Orientée Objet (POO) & clean code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#dfff5b] shrink-0" />
                  <span>Gestion d'incidents N1/N2 & monitoring Zabbix</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#dfff5b] shrink-0" />
                  <span>Applications Cloud Native & bases relationnelles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#dfff5b] shrink-0" />
                  <span>Méthodologies Agiles & respect des jalons</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Info Grid */}
          <ScrollReveal delay={350} direction="left" className="lg:col-span-5 h-full">
            <div className="space-y-4 h-full flex flex-col justify-between">
              <div className="p-6 rounded-2xl bg-[#131814]/85 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4 hover:border-[#dfff5b]/30 transition-colors">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#dfff5b] font-semibold mb-2">
                  Informations Clés
                </h4>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <MapPin size={18} className="text-[#dfff5b] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-xs">Localisation</div>
                      <div className="text-white font-medium">Casablanca / Meknès, Maroc</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <Mail size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-xs">Email direct</div>
                      <a href="mailto:elhamdawimarwane@gmail.com" className="text-white font-medium hover:text-[#dfff5b] transition-colors">
                        elhamdawimarwane@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <Phone size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-xs">Téléphone</div>
                      <a href="tel:+212777079774" className="text-white font-medium hover:text-[#dfff5b] transition-colors font-mono">
                        +212 7 77 07 97 74
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <Award size={18} className="text-[#dfff5b] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400 text-xs">Statut & Poste actuel</div>
                      <div className="text-white font-medium">Pilote Monétique @ HPS & Élève-Ingénieur</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability highlight */}
              <div className="p-4 rounded-xl bg-[#172019] border border-[#2b392f] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-[#eef3ea]">
                  <span className="w-2 h-2 rounded-full bg-[#dfff5b] animate-ping" />
                  <span>Disponible pour opportunités stimulantes</span>
                </div>
                <span className="font-handwriting text-base text-[#dfff5b]">dispo !</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 4 Pillars of Competence: Cascading one by one ("katstfo haja bhaja") */}
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={150} direction="up">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
              Domaines d'Expertise & Savoir-faire
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal
                  key={i}
                  delay={150 + i * 150} // 150ms, 300ms, 450ms, 600ms stagger!
                  direction="up"
                  className="h-full"
                >
                  <div className="group p-6 rounded-2xl bg-[#131814]/75 hover:bg-[#131814]/95 border border-white/[0.07] hover:border-[#dfff5b]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_25px_rgba(223,255,91,0.12)] flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#dfff5b] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Icon size={22} />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                          {pillar.badge}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#dfff5b] transition-colors">
                        {pillar.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
