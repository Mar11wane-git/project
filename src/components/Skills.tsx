import React, { useState } from 'react';
import {
  Code,
  Server,
  Database,
  Cpu,
  Wrench,
  Terminal,
  Layers,
  Sparkles,
  CornerDownLeft
} from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import ScrollReveal from './ScrollReveal';

interface SkillGroup {
  id: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; level: number; featured?: boolean }[];
}

const skillCategories: SkillGroup[] = [
  {
    id: 'frontend',
    category: 'Front-End',
    icon: <Code size={22} className="text-[#dfff5b]" />,
    description: 'Interfaces modernes, composants réactifs, typage et stylisation avancée.',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'JavaScript (ES6+)', level: 90, featured: true },
      { name: 'React.js', level: 92, featured: true },
      { name: 'React Router', level: 88 },
      { name: 'Redux Toolkit', level: 85 },
      { name: 'Tailwind CSS', level: 95, featured: true },
      { name: 'Bootstrap', level: 85 },
      { name: 'Vite', level: 90 }
    ]
  },
  {
    id: 'backend',
    category: 'Back-End & APIs',
    icon: <Server size={22} className="text-emerald-400" />,
    description: 'Architectures modulaires, contrôleurs, services et conception d’APIs REST sécurisées.',
    skills: [
      { name: 'PHP', level: 90, featured: true },
      { name: 'Laravel', level: 92, featured: true },
      { name: 'Java', level: 86, featured: true },
      { name: 'JEE', level: 82 },
      { name: 'Spring Boot', level: 85, featured: true },
      { name: 'Spring MVC', level: 84 },
      { name: 'Node.js', level: 85 },
      { name: 'API REST', level: 92 }
    ]
  },
  {
    id: 'database',
    category: 'Bases de Données',
    icon: <Database size={22} className="text-cyan-300" />,
    description: 'Modélisation relationnelle, procédures stockées, requêtes complexes et NoSQL.',
    skills: [
      { name: 'MySQL', level: 92, featured: true },
      { name: 'Oracle Database', level: 86, featured: true },
      { name: 'PL/SQL', level: 85 },
      { name: 'SQL Standard', level: 94, featured: true },
      { name: 'MongoDB', level: 82 },
      { name: 'Conception & Modélisation', level: 90 }
    ]
  },
  {
    id: 'programming',
    category: 'Programmation & Algorithmique',
    icon: <Cpu size={22} className="text-[#dfff5b]" />,
    description: 'Paradigme orienté objet, structures de données, optimisation et logique de résolution.',
    skills: [
      { name: 'Java (POO)', level: 88, featured: true },
      { name: 'PHP (POO)', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 84, featured: true },
      { name: 'Programmation Orientée Objet', level: 92 },
      { name: 'Algorithmique & Complexité', level: 88 }
    ]
  },
  {
    id: 'tools',
    category: 'Outils & Environnements de Dév',
    icon: <Wrench size={22} className="text-emerald-300" />,
    description: 'Gestionnaire de paquets, contrôle de version, conteneurs et outils de test.',
    skills: [
      { name: 'Git', level: 94, featured: true },
      { name: 'GitHub', level: 92, featured: true },
      { name: 'npm', level: 90 },
      { name: 'Composer', level: 88 },
      { name: 'XAMPP', level: 90 },
      { name: 'Postman', level: 92 },
      { name: 'Docker', level: 82, featured: true },
      { name: 'Eclipse', level: 85 },
      { name: 'CI/CD Pipelines', level: 80 }
    ]
  },
  {
    id: 'systems',
    category: 'Systèmes & Exploitation Monétique',
    icon: <Terminal size={22} className="text-[#dfff5b]" />,
    description: 'Supervision de production en temps réel, protocoles et accès sécurisés aux serveurs.',
    skills: [
      { name: 'Linux', level: 88, featured: true },
      { name: 'Windows Server', level: 86 },
      { name: 'PowerShell & Bash', level: 85 },
      { name: 'SSH & PuTTY', level: 92, featured: true },
      { name: 'Zabbix (Supervision)', level: 90, featured: true },
      { name: 'Dollar Universe', level: 84 },
      { name: 'Gestion des Utilisateurs', level: 88 },
      { name: 'Suivi des Incidents N1/N2', level: 92, featured: true }
    ]
  }
];

interface TerminalOutput {
  command: string;
  response: React.ReactNode;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cliInput, setCliInput] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      command: 'welcome',
      response: (
        <div className="text-slate-300 space-y-1">
          <p className="text-[#dfff5b] font-bold">Terminal Interactif — Marouane El Hamdaoui v2.6.0</p>
          <p className="text-xs text-slate-400">
            Tapez <span className="text-[#dfff5b] font-mono">help</span> pour afficher la liste des commandes disponibles (skills, hps, about, exp, cv, clear).
          </p>
        </div>
      )
    }
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-[#dfff5b] font-semibold">Commandes disponibles :</p>
            <p>• <span className="text-emerald-400">skills</span> : Résumé des compétences techniques</p>
            <p>• <span className="text-emerald-400">hps</span> : Détails du rôle Pilote Monétique chez HPS</p>
            <p>• <span className="text-emerald-400">stack</span> : Stack technique principale (React, Laravel, Spring)</p>
            <p>• <span className="text-emerald-400">about</span> : Parcours d'ingénieur & développement</p>
            <p>• <span className="text-emerald-400">contact</span> : Coordonnées téléphoniques et email</p>
            <p>• <span className="text-emerald-400">sudo hire</span> : Pourquoi m'intégrer dans votre équipe ?</p>
            <p>• <span className="text-emerald-400">clear</span> : Nettoyer l'écran</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setCliInput('');
        return;

      case 'skills':
        res = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-[#dfff5b]">Front : React.js, Tailwind CSS, TypeScript, Vite</p>
            <p className="text-emerald-400">Back : Laravel, PHP, Java, Spring Boot, Node.js, API REST</p>
            <p className="text-cyan-300">BDD : MySQL, Oracle, PL/SQL, MongoDB</p>
            <p className="text-teal-300">Prod : Zabbix, CFT, PuTTY, PowerCARD, Linux, Windows Server</p>
          </div>
        );
        break;

      case 'hps':
        res = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-[#dfff5b] font-bold">Pilote de Production Monétique @ HPS</p>
            <p>• Supervision batchs N1/N2 & monitoring Zabbix</p>
            <p>• Transferts sécurisés CFT & requêtes SQL de cohérence</p>
            <p>• Traitement transactions Visa & Mastercard (interfaces GAB)</p>
            <p>• Outils : PuTTY, TSO IBM, SUNIVERS, PowerCARD, GLPI</p>
          </div>
        );
        break;

      case 'stack':
        res = (
          <p className="text-xs font-mono text-[#dfff5b]">
            Stack principale : [React.js + TypeScript] + [Laravel / Spring Boot] + [MySQL / Oracle] + [Docker / Zabbix]
          </p>
        );
        break;

      case 'about':
        res = (
          <p className="text-xs font-mono text-slate-300">
            Marouane El Hamdaoui • Élève-Ingénieur en Génie Informatique (École High Tech Rabat) • Titulaire DTS Web Full Stack.
          </p>
        );
        break;

      case 'contact':
        res = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5">
            <p>Email : <a href="mailto:elhamdawimarwane@gmail.com" className="text-[#dfff5b] underline">elhamdawimarwane@gmail.com</a></p>
            <p>Tél : <span className="text-emerald-400">+212 7 77 07 97 74</span></p>
            <p>GitHub : <a href="https://github.com/Mar11wane-git" target="_blank" rel="noreferrer" className="text-[#dfff5b] underline">github.com/Mar11wane-git</a></p>
          </div>
        );
        break;

      case 'cv':
        res = (
          <p className="text-xs font-mono text-slate-300">
            Curriculum Vitae officiel : <a href="/CV%20Marouane%20El%20Hamdaoui.pdf" target="_blank" rel="noreferrer" className="text-[#dfff5b] underline font-bold">Consulter / Télécharger le CV (PDF)</a>
          </p>
        );
        break;

      case 'sudo hire':
        res = (
          <div className="text-xs font-mono text-[#dfff5b] space-y-1">
            <p className="font-bold">Accès autorisé. Pourquoi recruter Marouane ?</p>
            <p>1. Expérience concrète en environnement critique haute disponibilité (HPS).</p>
            <p>2. Polyvalence complète Full Stack (React, Laravel, Spring Boot, SQL).</p>
            <p>3. Rigueur, sens des responsabilités, culture du résultat et adaptabilité rapide.</p>
          </div>
        );
        break;

      default:
        res = (
          <p className="text-xs font-mono text-red-400">
            Commande inconnue: "{cmd}". Tapez <span className="text-[#dfff5b] underline">help</span> pour voir les options.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, response: res }]);
    setCliInput('');
  };

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0D100E] border-t border-white/[0.04]">
      <BackgroundFX density="low" variant="cyan" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <ScrollReveal delay={50} direction="down">
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="text-[#dfff5b] font-bold">SLIDE 05</span>
            <span>/</span>
            <span>06</span>
            <span className="w-10 h-[1px] bg-white/10" />
            <span>COMPÉTENCES & OUTILS TECHNIQUES</span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18201a] border border-[#2b392f] text-[#dfff5b] text-xs font-mono mb-3">
              <Layers size={13} />
              <span>COMPÉTENCES TECHNIQUES</span>
            </div>

            <div className="font-handwriting text-2xl text-[#dfff5b] font-semibold -rotate-1 mb-1">
              ~ Boîte à outils & technologies ~
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Maîtrise Technologique &{' '}
              <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                Outils Métier
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              De la programmation d’applications web modernes jusqu’à la supervision d’infrastructures de production monétique.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dfff5b] to-[#10b981] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filter Badges in volt lime style */}
        <ScrollReveal delay={200} direction="up">
          <div className="flex flex-wrap justify-center gap-2 mb-14 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-[#dfff5b] text-[#0D100E] font-bold shadow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              Toutes les catégories (6)
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  activeCategory === c.id
                    ? 'bg-[#dfff5b] text-[#0D100E] font-bold shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Cards Grid: Cascading reveal ("katstfo haja bhaja") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {filteredCategories.map((group, idx) => (
            <ScrollReveal
              key={group.id}
              delay={100 + (idx % 3) * 150} // Staggered reveal
              direction="up"
              distance={28}
              className="h-full"
            >
              <div className="group p-6 sm:p-7 rounded-2xl bg-[#131814]/85 hover:bg-[#131814]/95 border border-white/10 hover:border-[#dfff5b]/40 backdrop-blur-xl transition-all duration-300 shadow-xl flex flex-col justify-between h-full">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#dfff5b] transition-colors">
                        {group.category}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {group.skills.length} compétences répertoriées
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {group.description}
                  </p>

                  {/* Skills with mini progress bars */}
                  <div className="space-y-3">
                    {group.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-slate-200 flex items-center gap-1.5">
                            {skill.featured && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#dfff5b] shrink-0" />
                            )}
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#dfff5b] to-[#10b981] transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Developer Terminal Widget */}
        <ScrollReveal delay={250} direction="up">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#090d0b]/90 border border-[#dfff5b]/30 overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Terminal Window Header */}
            <div className="px-5 py-3.5 bg-[#121713] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">bash — marouane@elhamdaoui:~</span>
              </div>
              <div className="text-[11px] font-mono text-[#dfff5b] flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Console Interactive</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-4 max-h-80 overflow-y-auto">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[#dfff5b]">visitor@portfolio:~$</span>
                    <span className="text-white font-semibold">{item.command}</span>
                  </div>
                  <div className="pl-4 border-l-2 border-[#dfff5b]/30">
                    {item.response}
                  </div>
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                <span className="text-[#dfff5b] shrink-0">visitor@portfolio:~$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Tapez 'help', 'skills', 'hps', 'contact'..."
                  className="w-full bg-transparent text-white focus:outline-none border-none p-0 text-xs sm:text-sm placeholder-slate-600 font-mono"
                />
                <button
                  type="submit"
                  className="p-1 rounded bg-[#dfff5b]/20 text-[#dfff5b] hover:bg-[#dfff5b]/30 transition-colors shrink-0"
                  aria-label="Exécuter"
                >
                  <CornerDownLeft size={14} />
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Skills;
