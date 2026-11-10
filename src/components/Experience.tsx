import React, { useState } from 'react';
import { Briefcase, GraduationCap, Building2, Calendar, MapPin, Layers } from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import ScrollReveal from './ScrollReveal';

type CategoryFilter = 'all' | 'work' | 'education';

interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  description?: string;
  bullets: string[];
  skills: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 'hps',
    type: 'work',
    title: 'Pilote de Production Monétique',
    organization: 'HPS – Hightech Payment Systems',
    location: 'Casablanca, Maroc',
    period: 'Janv. 2026 – Présent',
    badge: 'Poste Actuel • Monétique',
    description: 'Entreprise multinationale leader dans l’édition de solutions de paiement électronique (PowerCARD).',
    bullets: [
      'Supervision des traitements batch et gestion rigoureuse des incidents de niveau N1/N2 avec escalade si nécessaire.',
      'Surveillance en temps réel des serveurs, applications et interfaces via Zabbix (disponibilité et performances 24/7).',
      'Gestion et automatisation des transferts de fichiers sécurisés entre les systèmes bancaires via CFT.',
      'Exécution de requêtes SQL pour valider l’intégrité des données, analyser les écarts et contrôler les traitements critiques.',
      'Traitement et suivi des flux de transactions monétiques Visa et Mastercard, incluant les interfaces GAB (Guichets Automatiques).',
      'Opérations quotidiennes d’exploitation en ligne de commande : PuTTY, TSO IBM, SUNIVERS.',
      'Lancement, ordonnancement, suivi et maintien en conditions opérationnelles sous EDIET Package et PowerCARD.',
      'Génération d’alertes d’exploitation et création/résolution de tickets via GLPI et outils de back-office.'
    ],
    skills: ['PowerCARD', 'Visa & Mastercard', 'GAB', 'Zabbix', 'CFT', 'SQL', 'PuTTY', 'TSO IBM', 'GLPI', 'Batch N1/N2']
  },
  {
    id: 'yonetwork',
    type: 'work',
    title: 'Stage – Développeur Web Full Stack',
    organization: 'YONETWORK',
    location: 'Meknès, Maroc',
    period: 'Janv. – Mars 2025',
    badge: 'Stage Full Stack',
    bullets: [
      'Développement Back-end & Front-end complet d’une plateforme web de gestion des ressources humaines selon cahier des charges.',
      'Conception de fonctionnalités dynamiques et optimisation des temps de réponse et des requêtes.',
      'Participation à l’architecture et au développement d’applications Cloud Native modulaires.',
      'Conception, manipulation et sécurisation des bases de données relationnelles ; tests d’intégration et fonctionnels.',
      'Application concrète des méthodes Agiles (Scrum) : réunions de suivi technique, revues et respect des jalons.'
    ],
    skills: ['React.js', 'Laravel', 'PHP', 'MySQL', 'Cloud Native', 'Agile / Scrum', 'REST API']
  },
  {
    id: 'club-digital',
    type: 'work',
    title: 'Stage – Développement Web',
    organization: 'Club Digital de Bab Tizimi',
    location: 'Meknès, Maroc',
    period: 'Mars 2023 – Mars 2024',
    badge: 'Stage Web',
    bullets: [
      'Pratique approfondie du développement web Front-end & Back-end : HTML5, CSS3, JavaScript et PHP.',
      'Développement d’applications web dynamiques interactives et initiation aux principes Cloud Native.',
      'Gestion et structuration des bases de données relationnelles ; travail en équipe pluridisciplinaire en mode Agile.'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Git', 'Agile']
  },
  {
    id: 'ht-rabat',
    type: 'education',
    title: 'Cycle d’Ingénierie en Génie Informatique',
    organization: 'École High Technologie (HT)',
    location: 'Rabat, Maroc',
    period: '2025 – En cours (2ᵉ année)',
    badge: 'Diplôme d’Ingénieur d’État (Bac+5)',
    description: 'Formation d’ingénieur d’excellence axée sur le génie logiciel, les systèmes et la cybersécurité.',
    bullets: [
      'Approche et Programmation Orientées Objet avancée (POO / Java / Python)',
      'Bases de Données Avancées et Administration des SGBD Oracle & PL/SQL',
      'Fondements de la Cybersécurité et Administration des Réseaux Informatiques',
      'Administration des Systèmes d’Exploitation (Linux Unix & Windows Server)',
      'Développement Web Dynamique et Statique (Architectures modernes & API)',
      'Gestion de Projet Informatique, Conduite du changement et Ingénierie des Affaires',
      'Analyse des Données et Programmation scientifique en Python'
    ],
    skills: ['Génie Logiciel', 'POO Java/Python', 'Oracle PL/SQL', 'Cybersécurité', 'Admin Systèmes Unix/Win', 'Gestion de Projet']
  },
  {
    id: 'ista-bab-tizimi',
    type: 'education',
    title: 'Diplôme de Technicien Spécialisé en Développement Digital',
    organization: 'Institut Spécialisé de Technologie Appliquée Bab Tizimi',
    location: 'Meknès, Maroc',
    period: '2023 – 2025',
    badge: 'Option Web Full Stack',
    bullets: [
      'Développement Back-end & Front-end (Web Full Stack) de bout en bout',
      'Création et déploiement d’applications Cloud Native et web dynamiques',
      'Gestion de projet selon l’approche Agile et modélisation des données',
      'Sécurité des Systèmes d’Information et bonnes pratiques de code'
    ],
    skills: ['Web Full Stack', 'React', 'PHP / Laravel', 'JavaScript', 'UML', 'Sécurité SI', 'Agile']
  },
  {
    id: 'bac',
    type: 'education',
    title: 'Baccalauréat en Sciences Physiques',
    organization: 'Lycée William Thompson',
    location: 'Meknès, Maroc',
    period: '2022 – 2023',
    badge: 'Baccalauréat Scientifique',
    bullets: [
      'Formation scientifique rigoureuse : Mathématiques, Physique-Chimie et Sciences de la Vie et de la Terre.',
      'Développement de l’esprit d’analyse logique, d’investigation et de résolution de problèmes complexes.'
    ],
    skills: ['Mathématiques', 'Physique-Chimie', 'Méthodologie scientifique', 'Logique algorithmique']
  }
];

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredData = timelineData.filter((item) => {
    if (filter === 'work') return item.type === 'work';
    if (filter === 'education') return item.type === 'education';
    return true;
  });

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0D100E] border-t border-white/[0.04]">
      <BackgroundFX density="low" variant="teal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <ScrollReveal delay={50} direction="down">
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="text-[#dfff5b] font-bold">SLIDE 03</span>
            <span>/</span>
            <span>06</span>
            <span className="w-10 h-[1px] bg-white/10" />
            <span>EXPÉRIENCES & FORMATIONS</span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18201a] border border-[#2b392f] text-[#dfff5b] text-xs font-mono mb-3">
              <Layers size={13} />
              <span>PARCOURS CHRONOLOGIQUE</span>
            </div>

            <div className="font-handwriting text-2xl text-[#dfff5b] font-semibold -rotate-1 mb-1">
              ~ Expériences & Formations ~
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Expérience Professionnelle &{' '}
              <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                Études Supérieures
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              De la production monétique chez HPS aux projets de développement web et au cycle d’ingénierie en génie informatique.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dfff5b] to-[#10b981] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filter buttons */}
        <ScrollReveal delay={200} direction="up">
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#141a15] border border-white/10 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={15} />
                <span>Tout ({timelineData.length})</span>
              </button>
              <button
                onClick={() => setFilter('work')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  filter === 'work'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase size={15} />
                <span>Expériences Pro (3)</span>
              </button>
              <button
                onClick={() => setFilter('education')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  filter === 'education'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap size={15} />
                <span>Études & Diplômes (3)</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline list: Cascades smoothly as you scroll down */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical central-left line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#dfff5b] via-[#10b981]/50 to-transparent opacity-40" />

          <div className="space-y-8">
            {filteredData.map((item, index) => {
              const isWork = item.type === 'work';
              return (
                <ScrollReveal
                  key={item.id}
                  delay={100 + (index % 3) * 120} // staggered reveal
                  direction="up"
                  distance={28}
                >
                  <div className="relative pl-12 sm:pl-20 group">
                    
                    {/* Timeline icon node */}
                    <div className="absolute left-1 sm:left-5 top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#141a15] border-2 border-[#dfff5b] flex items-center justify-center text-[#dfff5b] shadow-[0_0_15px_rgba(223,255,91,0.3)] group-hover:scale-110 transition-all duration-300 z-20">
                      {isWork ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#131814]/85 hover:bg-[#131814]/95 border border-white/10 hover:border-[#dfff5b]/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(223,255,91,0.1)]">
                      
                      {/* Header info */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#dfff5b] transition-colors">
                              {item.title}
                            </h3>
                            {item.badge && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#dfff5b]/10 text-[#dfff5b] border border-[#dfff5b]/30">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                              <Building2 size={14} />
                              {item.organization}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <MapPin size={13} />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-[#dfff5b]">
                          <Calendar size={13} />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Optional description */}
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-400 italic mb-4">
                          {item.description}
                        </p>
                      )}

                      {/* Bullet points */}
                      <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-[#dfff5b] mt-1 shrink-0 text-sm">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills pills */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                        {item.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:border-[#dfff5b]/40 hover:text-[#dfff5b] transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

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

export default Experience;
