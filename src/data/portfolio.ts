export const PROFILE = {
  firstName: 'Marouane',
  lastName: 'El Hamdaoui',
  headline: 'Développeur Full Stack Java · PHP · React',
  subline: 'Élève-ingénieur en Génie Informatique',
  current: 'Pilote de Production Monétique @ HPS',
  location: 'Casablanca, Maroc',
  seeking: 'Poste de développeur ou concepteur développeur à Casablanca ou Rabat',
  email: 'elhamdawimarwane@gmail.com',
  phone: '+212 7 77 07 97 74',
  phoneHref: 'tel:+212777079774',
  whatsapp: 'https://wa.me/212777079774',
  github: 'https://github.com/Mar11wane-git',
  linkedin: 'https://www.linkedin.com/in/Marouane-El-Hamdaoui/',
  linkedinHandle: 'Marouane-El-Hamdaoui',
  photo: '/photo pro.jpg',
};

export const SECTIONS = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Accent = 'lime' | 'violet' | 'emerald' | 'cyan' | 'amber';
export type ProjectTag = 'Full Stack' | 'React' | 'PHP' | 'IA';
export type ProjectArt = 'agent' | 'academy' | 'hr' | 'booking' | 'library';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  year: string;
  status: 'Nouveau' | 'En ligne' | 'Terminé';
  tags: ProjectTag[];
  description: string;
  features: string[];
  stack: string[];
  architecture: { label: string; value: string }[];
  accent: Accent;
  glyph: string;
  art: ProjectArt;
  links: { label: string; href: string; kind: 'live' | 'code' }[];
  note?: string;
}

export const PROJECT_FILTERS: ('Tous' | ProjectTag)[] = ['Tous', 'Full Stack', 'React', 'PHP', 'IA'];

export const PROJECTS: Project[] = [
  {
    id: 'vasco',
    title: 'Vasco AI',
    subtitle: 'Agent IA · Projet personnel',
    tagline: 'Agent IA autonome qui planifie, cherche et vérifie ses réponses, en direct.',
    year: '2026',
    status: 'Nouveau',
    tags: ['IA', 'React', 'Full Stack'],
    description:
      "Vasco ne se contente pas de répondre : il planifie, appelle des outils, lit les résultats et recommence jusqu'à pouvoir donner une réponse vérifiée et sourcée. Chaque étape (réflexion, appel d'outil, résultat) s'affiche en direct. Il comprend le Français, la Darija marocaine, l'Arabe et l'Anglais.",
    features: [
      "Boucle agentique avec function calling natif et appels d'outils en parallèle",
      'Streaming temps réel (Server-Sent Events) : réflexion, outils, réponse',
      'Recherche Web, lecture de pages / PDF, calculatrice sécurisée, images',
      'Multi-fournisseurs : Claude, GPT, Gemini, DeepSeek, OpenRouter, Ollama',
      'Sécurité : sessions Bearer, protection SSRF, HTML assaini (DOMPurify)',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'SSE', 'Docker'],
    architecture: [
      { label: 'Front', value: 'React 18 + Vite, timeline des étapes, Markdown assaini' },
      { label: 'Back', value: 'FastAPI : boucle agent, registre d’outils, streaming' },
      { label: 'Déploiement', value: 'Docker · Railway / Render' },
    ],
    accent: 'violet',
    glyph: 'V',
    art: 'agent',
    links: [],
    note: 'Code privé · démo sur demande',
  },
  {
    id: 'mr1academy',
    title: 'MR1Academy',
    subtitle: 'E-learning · Projet personnel',
    tagline: 'Plateforme e-learning : 24 cursus, quiz, certificats et assistant IA intégré.',
    year: '2026',
    status: 'En ligne',
    tags: ['Full Stack', 'React', 'PHP', 'IA'],
    description:
      "Plateforme académique interactive : 24 cursus d'ingénierie (IA générative, Data, DevOps, Cybersécurité, Web/Mobile) organisés en playlists séquentielles, quiz, certificats vérifiables, agenda synchronisé et un assistant IA intégré (VibeGPT) disponible 24h/24.",
    features: [
      'Catalogue de 24 cursus et lecteur de cours en playlists séquentielles',
      'Quiz d’évaluation et certificats avec page de vérification',
      'Assistant IA VibeGPT : cours, génération et explication de code',
      'Agenda (RFC 5545), communauté, favoris et profil étudiant',
      'Panneau d’administration, authentification OTP par e-mail',
    ],
    stack: ['React 19', 'Laravel 12', 'Sanctum', 'Framer Motion', 'React Router', 'Vercel'],
    architecture: [
      { label: 'Front', value: 'React 19, React Router 7, Framer Motion, Axios' },
      { label: 'Back', value: 'Laravel 12 (API REST), Sanctum, SMTP' },
      { label: 'Déploiement', value: 'Vercel (front + PHP serverless)' },
    ],
    accent: 'lime',
    glyph: 'M1',
    art: 'academy',
    links: [
      { label: 'Voir le site', href: 'https://vibe-academy-chi.vercel.app', kind: 'live' },
      { label: 'Code source', href: 'https://github.com/Mar11wane-git/VibeAcademy', kind: 'code' },
    ],
  },
  {
    id: 'gestion-rh',
    title: 'Gestion-RH',
    subtitle: 'Application RH · Stage YONETWORK',
    tagline: 'Employés, congés, paie et candidatures réunis dans une interface unifiée.',
    year: '2025',
    status: 'Terminé',
    tags: ['Full Stack', 'React', 'PHP'],
    description:
      'Solution de centralisation des opérations RH : gestion du personnel, congés avec circuit de validation, simulation des fiches de paie et suivi des candidatures. Réalisée pendant le stage chez YONETWORK.',
    features: [
      'Profils employés et contrats centralisés',
      'Demandes et approbations de congés en temps réel',
      'Simulation et édition des bulletins de paie',
      'Portail de suivi des candidatures et des CV',
      'Rôles : Administrateur RH, Manager, Salarié',
    ],
    stack: ['React.js', 'Laravel', 'TypeScript', 'MySQL', 'Redux Toolkit', 'Tailwind'],
    architecture: [
      { label: 'Front', value: 'React.js, TypeScript, Tailwind CSS, Redux Toolkit' },
      { label: 'Back', value: 'Laravel 10, API REST, middleware d’authentification' },
      { label: 'Données', value: 'MySQL (schéma relationnel normalisé)' },
    ],
    accent: 'emerald',
    glyph: 'RH',
    art: 'hr',
    links: [{ label: 'Code source', href: 'https://github.com/Mar11wane-git/Gestion-RH', kind: 'code' }],
  },
  {
    id: 'goaltime',
    title: 'GoalTime',
    subtitle: 'Réservation · Sport',
    tagline: 'Réservation de terrains de football avec espace client et administration.',
    year: '2025',
    status: 'Terminé',
    tags: ['Full Stack', 'React', 'PHP'],
    description:
      'Plateforme de réservation de terrains : espace client pour consulter les disponibilités et réserver un créneau, espace administration pour les plannings, les tarifs et la validation des demandes.',
    features: [
      'Calendrier dynamique des créneaux en direct',
      'Espace client avec historique des réservations',
      'Administration des terrains et des tarifs',
      'Validation des demandes de réservation',
      'Interface responsive mobile et desktop',
    ],
    stack: ['React.js', 'Laravel', 'MySQL', 'TypeScript', 'Tailwind', 'REST API'],
    architecture: [
      { label: 'Front', value: 'React.js, TypeScript, Tailwind CSS' },
      { label: 'Back', value: 'Laravel, contrôleurs REST, validation des requêtes' },
      { label: 'Données', value: 'MySQL (créneaux, utilisateurs, réservations)' },
    ],
    accent: 'cyan',
    glyph: 'GT',
    art: 'booking',
    links: [{ label: 'Code source', href: 'https://github.com/Mar11wane-git/GOALTIME', kind: 'code' }],
  },
  {
    id: 'smart-library',
    title: 'Smart Library',
    subtitle: 'Bibliothèque numérique',
    tagline: 'Recherche multicritère et gestion dynamique d’un catalogue numérique.',
    year: '2024',
    status: 'Terminé',
    tags: ['PHP'],
    description:
      'Application de recherche, consultation et gestion d’un catalogue d’ouvrages numériques, avec authentification sécurisée et back-office de suivi des emprunts et du stock.',
    features: [
      'Recherche multicritère (titre, auteur, catégorie, ISBN)',
      'Authentification et gestion des sessions',
      'Catalogue interactif avec fiches d’ouvrages',
      'Gestion des emprunts et des retours',
      'Tableau de bord du stock',
    ],
    stack: ['PHP (POO)', 'MVC', 'JavaScript', 'MySQL', 'Bootstrap'],
    architecture: [
      { label: 'Front', value: 'HTML5, CSS3, JavaScript, Bootstrap' },
      { label: 'Back', value: 'PHP orienté objet, architecture MVC' },
      { label: 'Données', value: 'MySQL, requêtes préparées (anti-injection SQL)' },
    ],
    accent: 'amber',
    glyph: 'SL',
    art: 'library',
    links: [{ label: 'Profil GitHub', href: 'https://github.com/Mar11wane-git', kind: 'code' }],
  },
];

export interface Job {
  id: string;
  company: string;
  initials: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
}

export const JOBS: Job[] = [
  {
    id: 'hps',
    company: 'HPS – Hightech Payment Systems',
    initials: 'HPS',
    role: 'Pilote de Production Monétique',
    location: 'Casablanca',
    period: 'Janv. 2026 – Aujourd’hui',
    current: true,
    summary: 'Entreprise internationale spécialisée dans les solutions de paiement électronique.',
    bullets: [
      'Supervision des traitements batch et gestion des incidents N1/N2',
      'Surveillance des serveurs via Zabbix ; transferts de fichiers via CFT',
      'Contrôle des données par SQL ; transactions Visa/Mastercard et GAB',
      'Exploitation sous PowerCARD et EDIET Package (PuTTY, TSO IBM, SUNIVERS)',
      'Création d’alertes et de tickets via GLPI',
    ],
    stack: ['PowerCARD', 'Zabbix', 'CFT', 'SQL', 'GLPI', 'Linux'],
  },
  {
    id: 'yonetwork',
    company: 'YONETWORK',
    initials: 'YN',
    role: 'Développeur Web Full Stack — Stage',
    location: 'Meknès',
    period: 'Janv. – Mars 2025',
    summary: 'Développement d’une plateforme de gestion des ressources humaines.',
    bullets: [
      'Développement back-end & front-end d’une plateforme de gestion RH',
      'Applications web dynamiques et Cloud Native ; gestion des bases de données',
      'Méthode Agile : tests fonctionnels et suivi des jalons',
    ],
    stack: ['React', 'Laravel', 'MySQL', 'API REST', 'Scrum'],
  },
  {
    id: 'club-digital',
    company: 'Club Digital de Bab Tizimi',
    initials: 'CD',
    role: 'Développement Web — Stage',
    location: 'Meknès',
    period: 'Mars 2023 – Mars 2024',
    summary: 'Pratique du développement web front-end et back-end en équipe.',
    bullets: [
      'Développement web front-end & back-end : HTML5, CSS3, JavaScript, PHP',
      'Applications web dynamiques, bases de données et travail en équipe Agile',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
  },
];

export const EDUCATION = [
  {
    title: 'Cycle d’Ingénierie en Génie Informatique',
    school: 'École High Technologie (HT), Rabat',
    period: '2025 – en cours',
    topics: ['POO & Python', 'Oracle', 'Cybersécurité & réseaux', 'Admin. Windows / Unix', 'Gestion de projet'],
  },
  {
    title: 'Technicien Spécialisé en Développement Digital',
    school: 'ISTA Bab Tizimi, Meknès — option Web Full Stack',
    period: '2023 – 2025',
    topics: ['Web Full Stack', 'Cloud Native', 'Agile & données', 'Sécurité des SI'],
  },
  {
    title: 'Baccalauréat Sciences Physiques',
    school: 'Lycée William Thompson, Meknès',
    period: '2022 – 2023',
    topics: ['Mathématiques', 'Physique-chimie'],
  },
];

/** Devicon slug ("react/react-original") or null for a monogram tile. */
export interface Tech {
  name: string;
  icon: string | null;
}
export interface SkillGroup {
  title: string;
  icon: 'layers' | 'server' | 'database' | 'wrench';
  items: Tech[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'layers',
    items: [
      { name: 'React', icon: 'react/react-original' },
      { name: 'JavaScript', icon: 'javascript/javascript-original' },
      { name: 'TypeScript', icon: 'typescript/typescript-original' },
      { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original' },
      { name: 'Redux', icon: 'redux/redux-original' },
      { name: 'HTML / CSS', icon: 'html5/html5-original' },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: [
      { name: 'Java', icon: 'java/java-original' },
      { name: 'Spring Boot', icon: 'spring/spring-original' },
      { name: 'Laravel', icon: 'laravel/laravel-original' },
      { name: 'PHP', icon: 'php/php-original' },
      { name: 'Node.js', icon: 'nodejs/nodejs-original' },
      { name: 'FastAPI', icon: 'fastapi/fastapi-original' },
    ],
  },
  {
    title: 'Bases de données',
    icon: 'database',
    items: [
      { name: 'MySQL', icon: 'mysql/mysql-original' },
      { name: 'Oracle', icon: 'oracle/oracle-original' },
      { name: 'PL/SQL', icon: null },
      { name: 'MongoDB', icon: 'mongodb/mongodb-original' },
    ],
  },
  {
    title: 'Outils & Systèmes',
    icon: 'wrench',
    items: [
      { name: 'Git', icon: 'git/git-original' },
      { name: 'GitHub', icon: 'github/github-original' },
      { name: 'Docker', icon: 'docker/docker-original' },
      { name: 'Postman', icon: 'postman/postman-original' },
      { name: 'Linux', icon: 'linux/linux-original' },
      { name: 'PowerShell', icon: 'powershell/powershell-original' },
    ],
  },
];

export const TOOLBOX: Tech[] = [
  { name: 'Python', icon: 'python/python-original' },
  { name: 'JEE / Spring MVC', icon: null },
  { name: 'API REST', icon: null },
  { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original' },
  { name: 'Vite', icon: 'vitejs/vitejs-original' },
  { name: 'Composer', icon: 'composer/composer-original' },
  { name: 'Eclipse', icon: 'eclipse/eclipse-original' },
  { name: 'Bash', icon: 'bash/bash-original' },
  { name: 'CI/CD', icon: null },
  { name: 'Zabbix', icon: null },
  { name: 'Dollar Universe', icon: null },
  { name: 'SSH / PuTTY', icon: null },
];

export const SOFT_SKILLS = [
  'Méthode Agile / Scrum',
  'Rigueur en production',
  'Gestion des incidents N1/N2',
  'Résolution de problèmes',
  'Travail en équipe',
  'Documentation',
];
