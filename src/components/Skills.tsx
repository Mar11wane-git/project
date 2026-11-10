import React from 'react';
import { ArrowRight, Database, Github, Layers, Server, Wrench } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TechIcon from './ui/TechIcon';
import { PROFILE, SKILL_GROUPS, SOFT_SKILLS, TOOLBOX } from '../data/portfolio';

const ICONS = { layers: Layers, server: Server, database: Database, wrench: Wrench };

const Skills: React.FC = () => (
  <section id="skills" className="section-pad relative overflow-hidden border-t border-line bg-surface">
    <div className="container-page relative">
      <SectionHeading
        index="04"
        kicker="Compétences"
        title="Mes compétences"
        subtitle="Une stack complète pour construire des applications fiables : Java / Spring Boot et Laravel côté serveur, React côté interface."
        action={
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={16} /> Voir mon GitHub <ArrowRight size={15} />
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => {
          const Icon = ICONS[g.icon];
          return (
            <Reveal key={g.title} delay={i * 60} effect="flip" className="h-full">
              <div className="card h-full p-5 sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ink">{g.title}</h3>
                  <Icon size={18} className="text-muted" />
                </div>
                <ul className="grid grid-cols-3 gap-x-2 gap-y-5">
                  {g.items.map((t) => (
                    <li key={t.name} className="group flex flex-col items-center gap-2 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-card-2 transition-transform duration-300 group-hover:-translate-y-1">
                        <TechIcon name={t.name} icon={t.icon} size={24} />
                      </span>
                      <span className="text-[11px] font-semibold leading-tight text-ink">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="card h-full p-5 sm:p-6">
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              <span className="h-px w-6 bg-line-strong" /> Aussi dans ma boîte à outils
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLBOX.map((t) => (
                <span key={t.name} className="chip !px-2.5 !py-1.5 !text-xs">
                  {t.icon && <TechIcon name={t.name} icon={t.icon} size={14} />}
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={60} className="lg:col-span-2">
          <div className="card h-full p-5 sm:p-6">
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              <span className="h-px w-6 bg-line-strong" /> Méthode & savoir-être
            </p>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span key={s} className="soft-accent rounded-md px-2.5 py-1.5 text-xs font-semibold text-accent">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Skills;
