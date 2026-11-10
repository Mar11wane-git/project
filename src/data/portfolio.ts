export const PROFILE = {
  firstName: 'Marouane',
  lastName: 'El Hamdaoui',
  headline: 'Développeur Full Stack Java · PHP · React',
  role: 'Développeur Full Stack Java · PHP · React, élève-ingénieur en Génie Informatique',
  current: 'Pilote de Production Monétique @ HPS',
  location: 'Casablanca, Maroc',
  seeking: 'Poste de développeur ou concepteur développeur à Casablanca ou Rabat',
  email: 'elhamdawimarwane@gmail.com',
  phone: '+212 7 77 07 97 74',
  phoneHref: 'tel:+212777079774',
  github: 'https://github.com/Mar11wane-git',
  linkedin: 'https://www.linkedin.com/in/Marouane-El-Hamdaoui/',
  photo: '/photo pro.jpg',
};

export const SLIDES = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'Profil' },
  { id: 'experience', label: 'Parcours' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
] as const;

export type ProjectAccent = 'lime' | 'violet' | 'emerald' | 'cyan' | 'amber';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  isNew?: boolean;
  description: string;
  features: string[];
  stack: string[];
  architecture: { label: string; value: string }[];
  accent: ProjectAccent;
  glyph: string;
  links: { label: string; href: string; kind: 'live' | 'code' }[];
  note?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'vasco',
    title: 'Vasco AI',
    tagline: 'Agent IA autonome qui planifie, cherche et vérifie',
    category: 'Intelligence Artificielle · Agent',
    year: '2026',
    isNew: true,
    description:
      "Vasco ne se contente pas de répondre : il planifie, appelle des outils, lit les résultats et recommence jusqu'à pouvoir donner une réponse vérifiée et sourcée. Chaque étape (réflexion, appel d'outil, résultat) s'affiche en direct. Il comprend le Français, la Darija marocaine, l'Arabe et l'Anglais.",
    features: [
      "Boucle agentique avec function calling natif, appels d'outils en parallèle (jusqu'à 8 étapes)",
      'Streaming temps réel (Server-Sent Events) : réflexion, outils et tokens de la réponse',
      'Outils : recherche Web, lecture de pages / PDF, calculatrice AST sécurisée, date, génération d’images',
      'Multi-fournisseurs : Claude, GPT, Gemini, DeepSeek, OpenRouter et modèles locaux Ollama',
      'Sécurité : sessions Bearer, protection SSRF, HTML assaini avec DOMPurify',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'SSE', 'LLM APIs', 'Docker'],
    architecture: [
      { label: 'Front', value: 'React 18 + Vite, timeline des étapes, rendu Markdown assaini' },
      { label: 'Back', value: 'FastAPI : boucle agent, registre d’outils, adaptateurs streaming' },
      { label: 'Déploiement', value: 'Docker · Railway / Render' },
    ],
    accent: 'violet',
    glyph: 'V',
    links: [],
    note: 'Démo disponible sur demande',
  },
  {
    id: 'mr1academy',
    title: 'MR1Academy',
    tagline: 'Plateforme e-learning avec assistant IA et certifications',
    category: 'E-Learning · EdTech',
    year: '2026',
    isNew: true,
    description:
      "Plateforme académique interactive : 24 cursus d'ingénierie (IA générative, Data, DevOps, Cybersécurité, Web/Mobile) organisés en playlists séquentielles, quiz, certificats vérifiables, agenda synchronisé et un assistant IA intégré (VibeGPT) disponible 24h/24.",
    features: [
      'Catalogue de 24 cursus et lecteur de cours en playlists séquentielles',
      'Quiz d’évaluation et certificats officiels avec page de vérification',
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
    links: [
      { label: 'Voir le site', href: 'https://vibe-academy-chi.vercel.app', kind: 'live' },
      { label: 'Code source', href: 'https://github.com/Mar11wane-git/VibeAcademy', kind: 'code' },
    ],
  },
  {
    id: 'gestion-rh',
    title: 'Gestion-RH',
    tagline: 'Application intégrée de gestion des ressources humaines',
    category: 'Application Entreprise · RH',
    year: '2025',
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
    links: [{ label: 'Code source', href: 'https://github.com/Mar11wane-git/Gestion-RH', kind: 'code' }],
  },
  {
    id: 'goaltime',
    title: 'GoalTime',
    tagline: 'Réservation de terrains de football en ligne',
    category: 'Réservation · Sport',
    year: '2025',
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
    links: [{ label: 'Code source', href: 'https://github.com/Mar11wane-git/GOALTIME', kind: 'code' }],
  },
  {
    id: 'smart-library',
    title: 'Smart Library',
    tagline: 'Bibliothèque numérique et recherche multicritère',
    category: 'Catalogue · Numérique',
    year: '2024',
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
    links: [{ label: 'Profil GitHub', href: 'https://github.com/Mar11wane-git', kind: 'code' }],
  },
];

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  bullets: string[];
  skills: string[];
}

export const TIMELINE: TimelineItem[] = [
  {
    id: 'hps',
    type: 'work',
    title: 'Pilote de Production Monétique',
    organization: 'HPS – Hightech Payment Systems',
    location: 'Casablanca',
    period: 'Janv. 2026 – Présent',
    badge: 'Poste actuel',
    bullets: [
      'Supervision des traitements batch et gestion des incidents N1/N2 avec escalade.',
      'Surveillance temps réel des serveurs et interfaces via Zabbix (24/7).',
      'Transferts de fichiers sécurisés entre systèmes bancaires via CFT.',
      'Requêtes SQL de contrôle d’intégrité et d’analyse des écarts.',
      'Suivi des flux Visa / Mastercard et des interfaces GAB.',
      'Exploitation en ligne de commande : PuTTY, TSO IBM, SUNIVERS.',
      'Ordonnancement et maintien en conditions opérationnelles sous PowerCARD.',
      'Création et résolution de tickets via GLPI.',
    ],
    skills: ['PowerCARD', 'Zabbix', 'CFT', 'SQL', 'Visa / Mastercard', 'GLPI'],
  },
  {
    id: 'yonetwork',
    type: 'work',
    title: 'Stagiaire Développeur Web Full Stack',
    organization: 'YONETWORK',
    location: 'Meknès',
    period: 'Janv. – Mars 2025',
    bullets: [
      'Développement front et back d’une plateforme de gestion RH selon cahier des charges.',
      'Optimisation des temps de réponse et des requêtes.',
      'Conception et sécurisation des bases de données ; tests d’intégration.',
      'Méthode Agile (Scrum) : suivi technique, revues et jalons.',
    ],
    skills: ['React.js', 'Laravel', 'MySQL', 'REST API', 'Scrum'],
  },
  {
    id: 'club-digital',
    type: 'work',
    title: 'Stagiaire Développement Web',
    organization: 'Club Digital de Bab Tizimi',
    location: 'Meknès',
    period: 'Mars 2023 – Mars 2024',
    bullets: [
      'Développement front et back : HTML5, CSS3, JavaScript, PHP.',
      'Applications web dynamiques et initiation au Cloud Native.',
      'Bases de données relationnelles, travail d’équipe en mode Agile.',
    ],
    skills: ['JavaScript', 'PHP', 'MySQL', 'Git'],
  },
  {
    id: 'ht-rabat',
    type: 'education',
    title: 'Cycle d’Ingénieur en Génie Informatique',
    organization: 'École High Technologie (HT)',
    location: 'Rabat',
    period: '2025 – en cours',
    badge: 'Bac+5',
    bullets: [
      'Programmation orientée objet avancée (Java, Python).',
      'Bases de données avancées, Oracle et PL/SQL.',
      'Cybersécurité, réseaux et administration Linux / Windows Server.',
      'Gestion de projet informatique et analyse de données.',
    ],
    skills: ['Java', 'Oracle PL/SQL', 'Cybersécurité', 'Python'],
  },
  {
    id: 'ista',
    type: 'education',
    title: 'Technicien Spécialisé en Développement Digital',
    organization: 'ISTA Bab Tizimi',
    location: 'Meknès',
    period: '2023 – 2025',
    badge: 'Option Web Full Stack',
    bullets: [
      'Développement Web Full Stack de bout en bout.',
      'Applications Cloud Native, gestion de projet Agile, modélisation UML.',
      'Sécurité des systèmes d’information.',
    ],
    skills: ['React', 'Laravel', 'UML', 'Agile'],
  },
  {
    id: 'bac',
    type: 'education',
    title: 'Baccalauréat Sciences Physiques',
    organization: 'Lycée William Thompson',
    location: 'Meknès',
    period: '2022 – 2023',
    bullets: ['Mathématiques, physique-chimie : rigueur et résolution de problèmes.'],
    skills: ['Logique', 'Analyse'],
  },
];

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  icon: 'code' | 'server' | 'database' | 'cpu' | 'wrench' | 'terminal';
  skills: { name: string; level: number }[];
}

export const SKILLS: SkillGroup[] = [
  {
    id: 'front',
    title: 'Front-End',
    blurb: 'Interfaces réactives, typées et soignées.',
    icon: 'code',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'TypeScript / JS', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux Toolkit', level: 85 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Vite', level: 90 },
    ],
  },
  {
    id: 'back',
    title: 'Back-End & APIs',
    blurb: 'APIs REST sécurisées et architectures modulaires.',
    icon: 'server',
    skills: [
      { name: 'Laravel / PHP', level: 92 },
      { name: 'Spring Boot', level: 85 },
      { name: 'Java / JEE', level: 86 },
      { name: 'Node.js', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'API REST', level: 92 },
    ],
  },
  {
    id: 'data',
    title: 'Bases de données',
    blurb: 'Modélisation, SQL avancé et NoSQL.',
    icon: 'database',
    skills: [
      { name: 'SQL', level: 94 },
      { name: 'MySQL', level: 92 },
      { name: 'Oracle', level: 86 },
      { name: 'PL/SQL', level: 85 },
      { name: 'MongoDB', level: 82 },
    ],
  },
  {
    id: 'prog',
    title: 'Programmation & IA',
    blurb: 'POO, algorithmique et agents LLM.',
    icon: 'cpu',
    skills: [
      { name: 'Programmation Orientée Objet', level: 92 },
      { name: 'Python', level: 84 },
      { name: 'Algorithmique', level: 88 },
      { name: 'Agents IA / LLM APIs', level: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Outils & DevOps',
    blurb: 'Versioning, conteneurs, tests d’API.',
    icon: 'wrench',
    skills: [
      { name: 'Git / GitHub', level: 94 },
      { name: 'Docker', level: 82 },
      { name: 'Postman', level: 92 },
      { name: 'CI/CD', level: 80 },
      { name: 'Composer / npm', level: 90 },
    ],
  },
  {
    id: 'ops',
    title: 'Systèmes & Monétique',
    blurb: 'Production critique et supervision 24/7.',
    icon: 'terminal',
    skills: [
      { name: 'Linux / Windows Server', level: 88 },
      { name: 'Zabbix', level: 90 },
      { name: 'SSH / PuTTY', level: 92 },
      { name: 'PowerShell / Bash', level: 85 },
      { name: 'Incidents N1/N2', level: 92 },
    ],
  },
];

export const PILLARS = [
  {
    title: 'Web Full Stack',
    text: 'React, TypeScript et Tailwind côté client ; Laravel, Spring Boot, Node.js et FastAPI côté serveur.',
  },
  {
    title: 'Production monétique',
    text: 'Batch N1/N2, Zabbix 24/7, transferts CFT, flux Visa / Mastercard et PowerCARD chez HPS.',
  },
  {
    title: 'Données',
    text: 'Modélisation et SQL avancé sous MySQL et Oracle (PL/SQL), MongoDB pour le NoSQL.',
  },
  {
    title: 'IA appliquée',
    text: 'Agents LLM avec appels d’outils, streaming et assistants intégrés à des produits réels.',
  },
];
