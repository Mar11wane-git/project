import React from 'react';
import { Check, Download, GraduationCap, MapPin } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { EDUCATION, JOBS } from '../data/portfolio';

const Experience: React.FC<{ onOpenCV: () => void }> = ({ onOpenCV }) => (
  <section id="experience" className="section-pad border-t border-line bg-surface">
    <div className="container-page">
      <SectionHeading
        index="02"
        kicker="Expérience"
        title="Mon parcours professionnel"
        subtitle="De la production monétique chez HPS aux stages en développement web : des expériences qui m'ont appris à livrer du code fiable."
        action={
          <button onClick={onOpenCV} className="btn-lime">
            <Download size={16} /> Voir mon CV
          </button>
        }
      />

      <ol className="relative space-y-6">
        <span className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-lime opacity-60 sm:block" aria-hidden />
        {JOBS.map((job, i) => (
          <Reveal as="li" key={job.id} delay={i * 60} className="relative sm:pl-14">
            <span
              className="absolute left-0 top-9 hidden h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] sm:flex"
              aria-hidden
            >
              <span className="h-3.5 w-3.5 rounded-full bg-lime ring-4 ring-[color:var(--surface)]" />
            </span>
            <article className="card p-5 transition-colors hover:border-line-strong sm:p-7">
              <div className="flex flex-wrap items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card-2 font-mono text-xs font-bold text-accent">
                  {job.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-ink">{job.company}</h3>
                  <p className="text-sm font-semibold text-muted">{job.role}</p>
                </div>
                <div className="flex basis-full flex-wrap items-center gap-x-3 gap-y-1.5 sm:basis-auto sm:flex-col sm:items-end sm:text-right">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      job.current ? 'bg-lime text-on-lime' : 'bg-card-2 text-ink'
                    }`}
                  >
                    {job.current ? 'Poste actuel' : job.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <MapPin size={12} /> {job.location}
                    {job.current && <> · {job.period}</>}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted sm:pl-16">{job.summary}</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 sm:pl-16">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5 sm:pl-16">
                {job.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <h3 className="mb-5 mt-16 flex items-center gap-3 text-xl font-bold text-ink">
          <span className="soft-accent flex h-9 w-9 items-center justify-center rounded-xl text-accent">
            <GraduationCap size={18} />
          </span>
          Formation
        </h3>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.title} delay={i * 60}>
            <article className="card h-full p-5">
              <span className="font-mono text-xs font-bold text-accent">{e.period}</span>
              <h4 className="mt-2 font-bold leading-snug text-ink">{e.title}</h4>
              <p className="mt-1 text-sm text-muted">{e.school}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.topics.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
