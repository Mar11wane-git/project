import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Check, ExternalLink, Github, Lock, Mail, X } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { PROFILE, PROJECT_FILTERS, PROJECTS, type Project, type ProjectArt } from '../data/portfolio';

const acc = (p: Project) => `var(--a-${p.accent})`;
const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

/* Small CSS illustrations, one per project, tinted with the project accent. */
const Art: React.FC<{ kind: ProjectArt; c: string }> = ({ kind, c }) => {
  const bar = (w: string, o = 0.5) => <span className="block h-1.5 rounded-full" style={{ width: w, background: mix(c, o * 100) }} />;
  switch (kind) {
    case 'agent':
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-6">
          <div className="ml-auto max-w-[60%] rounded-xl rounded-br-sm px-3 py-2" style={{ background: mix(c, 30) }}>
            {bar('90%', 0.8)}
          </div>
          {['web_search', 'fetch_url'].map((t) => (
            <div key={t} className="flex items-center gap-2 font-mono text-[10px]" style={{ color: c }}>
              <Check size={12} /> {t}
            </div>
          ))}
          <div className="max-w-[75%] space-y-1.5 rounded-xl rounded-bl-sm border px-3 py-2" style={{ borderColor: mix(c, 35) }}>
            {bar('100%')}
            {bar('70%')}
          </div>
        </div>
      );
    case 'academy':
      return (
        <div className="flex h-full items-center gap-4 px-6">
          <div className="relative flex aspect-video w-[58%] items-center justify-center rounded-lg" style={{ background: mix(c, 22) }}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: c }}>
              <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent" style={{ borderLeftColor: '#10140f' }} />
            </span>
            <span className="absolute inset-x-2 bottom-2 h-1 rounded-full" style={{ background: mix(c, 25) }}>
              <span className="block h-full w-2/3 rounded-full" style={{ background: c }} />
            </span>
          </div>
          <div className="flex-1 space-y-2.5">
            {[0.9, 0.6, 0.6, 0.4].map((o, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: mix(c, o * 100) }} />
                {bar(`${80 - i * 12}%`, o * 0.7)}
              </div>
            ))}
          </div>
        </div>
      );
    case 'hr':
      return (
        <div className="flex h-full flex-col justify-center gap-2.5 px-6">
          {[0.8, 0.5, 0.5, 0.5].map((o, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-5 w-5 rounded-full" style={{ background: mix(c, o * 70) }} />
              {bar('40%', o)}
              <span className="ml-auto rounded px-2 py-0.5 font-mono text-[9px]" style={{ background: mix(c, 20), color: c }}>
                {['RH', 'Congé', 'Paie', 'CV'][i]}
              </span>
            </div>
          ))}
        </div>
      );
    case 'booking':
      return (
        <div className="flex h-full items-center justify-center px-6">
          <div className="grid w-full max-w-[220px] grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded"
                style={{ background: [3, 9, 10, 16].includes(i) ? c : mix(c, i % 5 === 0 ? 30 : 14) }}
              />
            ))}
          </div>
        </div>
      );
    case 'library':
      return (
        <div className="flex h-full flex-col justify-end gap-3 px-6 pb-5">
          <div className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5" style={{ borderColor: mix(c, 35) }}>
            <span className="h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: c }} />
            {bar('55%', 0.45)}
          </div>
          <div className="flex items-end gap-1.5">
            {[70, 90, 60, 82, 100, 66, 88, 74].map((h, i) => (
              <span key={i} className="w-4 rounded-sm" style={{ height: h * 0.55, background: mix(c, i % 3 === 0 ? 85 : 35) }} />
            ))}
          </div>
        </div>
      );
  }
};

const Status: React.FC<{ p: Project }> = ({ p }) => {
  const style =
    p.status === 'Nouveau'
      ? { background: 'var(--lime)', color: 'var(--on-lime)' }
      : p.status === 'En ligne'
        ? { background: '#3fcf98', color: '#08130e' }
        : { background: 'var(--card)', color: 'var(--ink)' };
  return (
    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow" style={style}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {p.status}
    </span>
  );
};

const PrimaryLink: React.FC<{ p: Project }> = ({ p }) => {
  const link = p.links.find((l) => l.kind === 'live') ?? p.links[0];
  if (!link) {
    return (
      <span className="inline-flex items-center gap-2 rounded-xl bg-card-2 px-4 py-2.5 text-sm font-medium text-muted">
        <Lock size={14} /> Code privé
      </span>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn-lime !px-4 !py-2.5">
      {link.kind === 'live' ? <ExternalLink size={15} /> : <Github size={15} />}
      {link.label}
    </a>
  );
};

const Card: React.FC<{ p: Project; onDetails: () => void }> = ({ p, onDetails }) => {
  const c = acc(p);
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)]">
      <div
        className="relative h-44 overflow-hidden border-b border-line"
        style={{ background: `linear-gradient(150deg, ${mix(c, 16)}, var(--card-2) 75%)` }}
      >
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <div className="relative h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <Art kind={p.art} c={c} />
        </div>
        <Status p={p} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold"
            style={{ background: c, color: p.accent === 'lime' ? 'var(--on-lime)' : '#fff' }}
          >
            {p.glyph}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-ink">{p.title}</h3>
            <p className="truncate text-xs text-muted">{p.subtitle}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
        <div className="mb-5 mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {p.stack.length > 3 && <span className="chip">+{p.stack.length - 3}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5">
          <PrimaryLink p={p} />
          <button onClick={onDetails} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent">
            Détails <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

const Details: React.FC<{ p: Project; onClose: () => void }> = ({ p, onClose }) => {
  const c = acc(p);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        className="modal-in max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-card sm:rounded-3xl"
      >
        <div className="relative h-40 border-b border-line" style={{ background: `linear-gradient(150deg, ${mix(c, 18)}, var(--card-2) 75%)` }}>
          <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
          <div className="relative h-full">
            <Art kind={p.art} c={c} />
          </div>
          <Status p={p} />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-card text-ink shadow"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: c }}>
            {p.subtitle} · {p.year}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{p.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{p.description}</p>

          <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Fonctionnalités</h4>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>

          <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Architecture</h4>
          <dl className="mt-3 divide-y divide-[color:var(--line)] rounded-2xl border border-line">
            {p.architecture.map((a) => (
              <div key={a.label} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3 text-sm">
                <dt className="font-semibold text-ink">{a.label}</dt>
                <dd className="text-muted">{a.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={l.kind === 'live' ? 'btn-lime' : 'btn-ghost'}
              >
                {l.kind === 'live' ? <ExternalLink size={16} /> : <Github size={16} />}
                {l.label}
              </a>
            ))}
            {p.links.length === 0 && (
              <a href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Démo ${p.title}`)}`} className="btn-lime">
                <Mail size={16} /> Demander une démo
              </a>
            )}
            {p.note && <span className="text-sm text-muted">{p.note}</span>}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>('Tous');
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const list = filter === 'Tous' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading
          index="03"
          kicker="Projets"
          title="Mes projets"
          subtitle="Des applications réelles, de l'agent IA à la plateforme e-learning, conçues de bout en bout."
          action={
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Filtrer les projets">
              {PROJECT_FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    filter === f ? 'border-transparent bg-ink text-bg' : 'border-line bg-card text-ink hover:border-line-strong'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={`${filter}-${p.id}`} delay={i * 60} className="h-full">
              <Card p={p} onDetails={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>
      {open && <Details p={open} onClose={close} />}
    </section>
  );
};

export default Projects;
