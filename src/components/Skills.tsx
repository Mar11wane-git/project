import React, { useState } from 'react';
import { Code2, Cpu, Database, RotateCcw, Server, Terminal, Wrench } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import { SKILLS, type SkillGroup } from '../data/portfolio';

const ICONS = { code: Code2, server: Server, database: Database, cpu: Cpu, wrench: Wrench, terminal: Terminal };
const COLORS = ['#dfff5b', '#34d399', '#22d3ee', '#a78bfa', '#fbbf24', '#dfff5b'];

const MARQUEE = [
  'Java', 'Spring Boot', 'Spring MVC', 'JEE', 'PHP', 'Laravel', 'Node.js', 'React', 'Redux Toolkit', 'Tailwind CSS',
  'MySQL', 'Oracle', 'PL/SQL', 'MongoDB', 'Python', 'FastAPI', 'Docker', 'Git', 'Postman', 'Linux', 'Zabbix', 'Dollar Universe',
];

const FlipCard: React.FC<{ g: SkillGroup; color: string }> = ({ g, color }) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = ICONS[g.icon];

  return (
    <button
      type="button"
      className="flip block h-[300px] w-full text-left"
      data-flipped={flipped}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${g.title} : ${g.skills.map((s) => s.name).join(', ')}`}
    >
      <div className="flip-inner">
        {/* front */}
        <div className="flip-face flex flex-col rounded-3xl border border-line bg-surface p-6">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: `${color}1f`, color, boxShadow: `0 0 30px ${color}22` }}
          >
            <Icon size={22} />
          </span>
          <h3 className="mt-5 text-xl font-bold text-ink">{g.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{g.blurb}</p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {g.skills.slice(0, 4).map((s) => (
              <span key={s.name} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                {s.name}
              </span>
            ))}
          </div>
          <span className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider" style={{ color }}>
            <RotateCcw size={11} /> Retourner pour le détail
          </span>
        </div>

        {/* back */}
        <div
          className="flip-face flip-back flex flex-col rounded-3xl border p-6"
          style={{ borderColor: color, background: `linear-gradient(160deg, ${color}14, var(--surface) 60%)` }}
        >
          <h3 className="mb-4 font-mono text-xs uppercase tracking-wider" style={{ color }}>
            {g.title}
          </h3>
          <ul className="space-y-3">
            {g.skills.map((s) => (
              <li key={s.name}>
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="text-ink">{s.name}</span>
                  <span className="font-mono text-muted">{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.07)]">
                  <div className="bar-fill h-full rounded-full" style={{ background: color, ['--v' as string]: s.level / 100 }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
};

const Skills: React.FC = () => (
  <Slide
    index={4}
    kicker="Compétences techniques"
    title={
      <>
        Une stack <span className="text-shine">de bout en bout</span>.
      </>
    }
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((g, i) => (
        <Reveal key={g.id} effect="flip" delay={(i % 3) * 120}>
          <FlipCard g={g} color={COLORS[i]} />
        </Reveal>
      ))}
    </div>

    <div
      className="relative -mx-5 mt-10 overflow-hidden border-y border-line py-4 sm:-mx-8 lg:-mx-12"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
      aria-hidden
    >
      <div className="marquee flex w-max gap-8">
        {[...MARQUEE, ...MARQUEE].map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-semibold text-muted">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  </Slide>
);

export default Skills;
