import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Code,
  Users,
  BookOpen,
  Trophy,
  GraduationCap,
  X,
  Sparkles,
  ArrowRight,
  Bot,
  PlayCircle
} from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import ScrollReveal from './ScrollReveal';

interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  stats: { label: string; value: string }[];
  architecture: {
    front: string;
    back: string;
    db: string;
    state?: string;
  };
}

const projects: Project[] = [
  {
    id: 'vasco',
    title: 'Vasco AI',
    category: 'Intelligence Artificielle / Agent',
    subtitle: 'Agent IA Autonome avec Outils, Recherche Web & Streaming',
    description:
      "Agent IA qui ne se contente pas de répondre : il planifie, appelle des outils, lit les résultats et recommence jusqu'à pouvoir donner une réponse vérifiée et sourcée. Chaque étape (réflexion, appel d'outil, résultat) s'affiche en direct. Il comprend le Français, la Darija marocaine, l'Arabe et l'Anglais.",
    technologies: ['Python', 'FastAPI', 'React.js', 'Vite', 'SSE', 'Docker'],
    features: [
      "Boucle agentique avec appels d'outils natifs (function calling) en parallèle",
      'Streaming temps réel (Server-Sent Events) : réflexion, outils et réponse',
      'Outils : recherche Web, lecture de pages / PDF, calculatrice sécurisée, images',
      'Multi-modèles : Claude, GPT, Gemini, DeepSeek, OpenRouter et Ollama',
      'Sécurité : sessions authentifiées, protection SSRF, HTML assaini (DOMPurify)'
    ],
    stats: [
      { label: 'Langues', value: 'FR · Darija · AR · EN' },
      { label: 'Temps réel', value: 'Streaming SSE' },
      { label: 'Modèles', value: 'Multi-fournisseurs' }
    ],
    architecture: {
      front: 'React.js, Vite, rendu Markdown assaini (DOMPurify)',
      back: 'FastAPI (Python) : boucle de l’agent, registre d’outils, adaptateurs LLM',
      db: 'Sessions & clés API sécurisées côté serveur',
      state: 'Événements SSE en direct (réflexion, outils, réponse)'
    },
    gradient: 'from-violet-500 to-cyan-500',
    icon: <Bot size={26} className="text-violet-300" />
  },
  {
    id: 'mr1academy',
    title: 'MR1Academy',
    category: 'E-Learning / IA',
    subtitle: 'Plateforme Académique Interactive avec Assistant IA & Certifications',
    description:
      "Plateforme e-learning de nouvelle génération : 24 cursus d'ingénierie (IA générative, Data, DevOps, Cybersécurité, Web/Mobile) organisés en playlists séquentielles, quiz d'évaluation, certificats vérifiables, agenda synchronisé et un assistant IA intégré (VibeGPT) disponible 24h/24.",
    technologies: ['React.js', 'Laravel', 'Sanctum', 'Framer Motion', 'React Router', 'Vercel'],
    features: [
      'Catalogue de 24 cursus et lecteur de cours en playlists séquentielles',
      'Quiz d’évaluation et certificats officiels avec page de vérification',
      'Assistant IA VibeGPT : cours, génération et explication de code',
      'Agenda synchronisé (RFC 5545), communauté, favoris et profil étudiant',
      'Panneau d’administration et authentification OTP par e-mail'
    ],
    stats: [
      { label: 'Cursus', value: '24 parcours' },
      { label: 'Assistant', value: 'IA 24h/24' },
      { label: 'Statut', value: 'En ligne' }
    ],
    architecture: {
      front: 'React 19, React Router, Framer Motion, Axios',
      back: 'Laravel 12 (API REST), Sanctum, envoi d’e-mails SMTP',
      db: 'Base relationnelle via Eloquent ORM',
      state: 'React Context & hooks'
    },
    gradient: 'from-[#dfff5b] to-emerald-500',
    icon: <PlayCircle size={26} className="text-[#dfff5b]" />
  },
  {
    id: 'gestion-rh',
    title: 'Gestion-RH',
    category: 'Application Entreprise / RH',
    subtitle: 'Application Web Intégrée de Gestion des Ressources Humaines',
    description:
      'Solution complète de centralisation et de numérisation des opérations RH destinée aux entreprises. Elle unifie la gestion du personnel, le suivi des congés avec circuit de validation, le calcul des fiches de paie et la gestion des candidatures / CV entrants.',
    technologies: ['React.js', 'Laravel', 'TypeScript', 'MySQL', 'Redux Toolkit', 'Tailwind CSS'],
    features: [
      'Gestion centralisée des profils employés et contrats',
      'Module de demandes et approbations de congés en temps réel',
      'Simulation et édition des bulletins de paie',
      'Portail de suivi des candidatures et indexation de CV',
      'Gestion des rôles (Administrateur RH, Manager, Salarié)'
    ],
    stats: [
      { label: 'Modules', value: '4 complets' },
      { label: 'Rôles', value: 'Multi-niveaux' },
      { label: 'Architecture', value: 'REST API' }
    ],
    architecture: {
      front: 'React.js, TypeScript, Tailwind CSS',
      back: 'Laravel 10, API REST, Middleware d’authentification',
      db: 'MySQL (schéma relationnel normalisé)',
      state: 'Redux Toolkit pour la gestion globale de l’état'
    },
    gradient: 'from-[#dfff5b] to-emerald-500',
    icon: <Users size={26} className="text-[#dfff5b]" />
  },
  {
    id: 'goaltime',
    title: 'GoalTime',
    category: 'Plateforme Réservation / Sport',
    subtitle: 'Plateforme Web de Réservation de Terrains de Football',
    description:
      'Plateforme web interactive simplifiant la réservation de terrains sportifs. Elle comprend un espace client ergonomique pour consulter les disponibilités en direct et réserver un créneau, ainsi qu’un espace administration pour la gestion des plannings, des tarifs et des demandes.',
    technologies: ['React.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'TypeScript', 'REST API'],
    features: [
      'Calendrier dynamique des créneaux en direct',
      'Espace client personnalisé avec historique des réservations',
      'Espace d’administration pour la gestion des terrains et tarifs',
      'Validation et gestion des demandes de réservation',
      'Interface responsive optimisée mobile et desktop'
    ],
    stats: [
      { label: 'Espaces', value: 'Client & Admin' },
      { label: 'Disponibilité', value: 'Temps réel' },
      { label: 'Design', value: 'Mobile-first' }
    ],
    architecture: {
      front: 'React.js, TypeScript, Tailwind CSS',
      back: 'Laravel, Contrôleurs REST, Validation de requêtes',
      db: 'MySQL (gestion des créneaux, utilisateurs, réservations)',
      state: 'React Hooks & Context'
    },
    gradient: 'from-emerald-500 to-teal-600',
    icon: <Trophy size={26} className="text-emerald-400" />
  },
  {
    id: 'smart-library',
    title: 'Smart Library',
    category: 'Gestion de Catalogue / Numérique',
    subtitle: 'Bibliothèque Numérique & Système de Recherche Dynamique',
    description:
      'Application web dédiée à la recherche, la consultation et la gestion dynamique d’un catalogue d’ouvrages numériques. Elle intègre un moteur de recherche performant, un système d’authentification sécurisé et un back-office pour le suivi des emprunts et des stocks.',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap', 'Tailwind CSS', 'POO'],
    features: [
      'Moteur de recherche multicritère (titre, auteur, catégorie, ISBN)',
      'Authentification sécurisée des utilisateurs et gestion des sessions',
      'Catalogue interactif avec fiches de présentation d’ouvrages',
      'Module de gestion des emprunts et des retours avec rappels',
      'Panneau de bord d’administration du stock de documents'
    ],
    stats: [
      { label: 'Recherche', value: 'Multicritère' },
      { label: 'Sécurité', value: 'Sessions & Hash' },
      { label: 'Conception', value: 'POO & MVC' }
    ],
    architecture: {
      front: 'HTML5, CSS3, JavaScript, Tailwind CSS / Bootstrap',
      back: 'PHP orienté objet (POO), Architecture MVC',
      db: 'MySQL avec requêtes préparées (sécurité anti-injection SQL)'
    },
    gradient: 'from-cyan-500 to-teal-500',
    icon: <BookOpen size={26} className="text-cyan-300" />
  },
  {
    id: 'vibe-academy',
    title: 'VibeAcademy',
    category: 'E-Learning / Éducation',
    subtitle: 'Plateforme d’Apprentissage en Ligne & Certifications',
    description:
      'Plateforme d’e-learning moderne dédiée à l’apprentissage des langages de programmation informatique. Elle propose un parcours structuré pour le suivi des cours, la validation des compétences par des quiz et la délivrance automatique de certificats de complétion.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    features: [
      'Parcours pédagogiques modulaires par langage (JS, PHP, Python, Java)',
      'Suivi en direct de la progression de l’étudiant par chapitre',
      'Système de quiz d’évaluation avec calcul automatique des scores',
      'Génération et validation de certificats de réussite numériques',
      'Authentification sécurisée par Tokens JWT'
    ],
    stats: [
      { label: 'Stack', value: 'MERN Stack' },
      { label: 'Auth', value: 'JWT Tokens' },
      { label: 'Certificats', value: 'Génération auto' }
    ],
    architecture: {
      front: 'React.js, Tailwind CSS, Axios',
      back: 'Node.js, Express.js (API RESTful modulaire)',
      db: 'MongoDB (NoSQL orienté documents / Mongoose)',
      state: 'Context API'
    },
    gradient: 'from-blue-500 to-cyan-500',
    icon: <GraduationCap size={26} className="text-blue-400" />
  }
];

const GITHUB_PROFILE = 'https://github.com/Mar11wane-git';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'laravel' | 'react'>('all');

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'laravel') return p.technologies.some((t) => t.includes('Laravel') || t.includes('PHP'));
    if (activeTab === 'react') return p.technologies.some((t) => t.includes('React'));
    return true;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0D100E] border-t border-white/[0.04]">
      <BackgroundFX density="low" variant="teal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <ScrollReveal delay={50} direction="down">
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="text-[#dfff5b] font-bold">SLIDE 04</span>
            <span>/</span>
            <span>06</span>
            <span className="w-10 h-[1px] bg-white/10" />
            <span>PORTFOLIO & PROJETS PHARES</span>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18201a] border border-[#2b392f] text-[#dfff5b] text-xs font-mono mb-3">
              <FolderGit2 size={13} />
              <span>RÉALISATIONS CONCRÈTES</span>
            </div>

            <div className="font-handwriting text-2xl text-[#dfff5b] font-semibold -rotate-1 mb-1">
              ~ Projets Concrets & Vrais Codes ~
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Mes Réalisations{' '}
              <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                Académiques & Personnelles
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Applications conçues pour répondre à des cas d'usage réels : gestion RH d'entreprise, réservation sportive, catalogues et e-learning.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dfff5b] to-[#10b981] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Tab Filters */}
        <ScrollReveal delay={200} direction="up">
          <div className="flex justify-center mb-14">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#141a15] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tous les projets ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('laravel')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'laravel'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Laravel & PHP
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'react'
                    ? 'bg-[#dfff5b] text-[#0D100E] shadow-md shadow-[#dfff5b]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                React & Node.js
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid: Cascading reveal one by one */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              delay={150 + idx * 160} // 150ms, 310ms, 470ms, 630ms stagger
              direction="up"
              distance={30}
              className="h-full"
            >
              <div className="group rounded-3xl bg-[#131814]/85 hover:bg-[#131814]/95 border border-white/10 hover:border-[#dfff5b]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_35px_rgba(223,255,91,0.12)] flex flex-col justify-between overflow-hidden p-7 sm:p-8 h-full">
                <div>
                  
                  {/* Header card with icon and category */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      {project.icon}
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#dfff5b]/10 text-[#dfff5b] border border-[#dfff5b]/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#dfff5b] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Points forts :
                    </span>
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 size={15} className="text-[#dfff5b] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.03] text-slate-300 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Action buttons */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#19211b] hover:bg-[#222c24] border border-white/10 hover:border-[#dfff5b]/40 hover:text-[#dfff5b] transition-all duration-200 active:scale-95 shadow-sm"
                  >
                    <span>Détails & Architecture</span>
                    <ArrowRight size={14} className="text-[#dfff5b]" />
                  </button>

                  <a
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* GitHub Profile Banner */}
        <ScrollReveal delay={300} direction="up">
          <div className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#141a15]/90 border border-[#dfff5b]/30 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#dfff5b]/10 border border-[#dfff5b]/30 flex items-center justify-center text-[#dfff5b] shrink-0">
                <Github size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Explorer tous mes dépôts sur GitHub
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Code source, commits, projets de formation et expérimentations techniques.
                </p>
              </div>
            </div>

            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0D100E] bg-[#dfff5b] hover:bg-[#ebff82] shadow-[0_0_20px_rgba(223,255,91,0.4)] transition-all duration-200 shrink-0"
            >
              <span>Voir @Mar11wane-git</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </ScrollReveal>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#131814] border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#dfff5b]/15 border border-[#dfff5b]/30 flex items-center justify-center">
                {selectedProject.icon}
              </div>
              <div>
                <span className="text-xs font-mono text-[#dfff5b]">{selectedProject.category}</span>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {selectedProject.stats.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                  <div className="text-xs text-slate-400">{s.label}</div>
                  <div className="text-sm font-bold text-[#dfff5b] font-mono mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Architecture Details */}
            <div className="space-y-4 mb-6 p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <Code size={14} /> Architecture Technique
              </h4>
              <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400 font-mono">Front-End:</span>
                  <span className="font-semibold text-white">{selectedProject.architecture.front}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400 font-mono">Back-End:</span>
                  <span className="font-semibold text-white">{selectedProject.architecture.back}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400 font-mono">Base de Données:</span>
                  <span className="font-semibold text-white">{selectedProject.architecture.db}</span>
                </div>
                {selectedProject.architecture.state && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/[0.02]">
                    <span className="text-slate-400 font-mono">State Management:</span>
                    <span className="font-semibold text-white">{selectedProject.architecture.state}</span>
                  </div>
                )}
              </div>
            </div>

            {/* All Features */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#dfff5b] font-semibold mb-3">
                Fonctionnalités Implémentées
              </h4>
              <div className="space-y-2">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15"
              >
                <Github size={16} />
                <span>Consulter le profil GitHub</span>
              </a>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  const contact = document.getElementById('contact');
                  contact?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0D100E] bg-[#dfff5b]"
              >
                <Sparkles size={14} />
                <span>Discuter de ce projet</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
