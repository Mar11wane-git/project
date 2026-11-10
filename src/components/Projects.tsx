import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Mail, Sparkles } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import { PROFILE, PROJECTS, type Project, type ProjectAccent } from '../data/portfolio';

const ACCENT: Record<ProjectAccent, { c: string; soft: string; deep: string }> = {
  lime: { c: '#d6f25e', soft: 'rgba(214,242,94,0.14)', deep: '#3a4a12' },
  violet: { c: '#a594f0', soft: 'rgba(167,139,250,0.16)', deep: '#2e2158' },
  emerald: { c: '#3fcf98', soft: 'rgba(52,211,153,0.14)', deep: '#0f3d2c' },
  cyan: { c: '#38c6dc', soft: 'rgba(34,211,238,0.14)', deep: '#0b3a44' },
  amber: { c: '#f0bd45', soft: 'rgba(251,191,36,0.14)', deep: '#4a3508' },
};

const Card: React.FC<{ p: Project; isActive: boolean }> = ({ p, isActive }) => {
  const a = ACCENT[p.accent];
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[26px] border bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
      style={{ borderColor: isActive ? a.c : 'var(--line)' }}
    >
      {/* art */}
      <div
        className="relative h-[52%] overflow-hidden"
        style={{ background: `radial-gradient(120% 90% at 20% 10%, ${a.soft}, transparent 60%), linear-gradient(160deg, ${a.deep}, #0d110e 85%)` }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(${a.soft} 1px, transparent 1px), linear-gradient(90deg, ${a.soft} 1px, transparent 1px)`,
            backgroundSize: '22px 22px',
          }}
          aria-hidden
        />
        <span
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full border"
          style={{ borderColor: a.soft, boxShadow: `inset 0 0 40px ${a.soft}` }}
          aria-hidden
        />
        <span className="absolute -right-2 -top-2 h-24 w-24 rounded-full border" style={{ borderColor: a.soft }} aria-hidden />
        <div className="absolute inset-x-5 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span style={{ color: a.c }}>{p.year}</span>
          {p.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold text-[#0e120f]" style={{ background: a.c }}>
              <Sparkles size={10} /> Nouveau
            </span>
          )}
        </div>
        <span
          className="absolute bottom-3 left-5 font-display text-6xl font-bold leading-none sm:text-7xl"
          style={{ color: a.c, textShadow: `0 0 40px ${a.soft}` }}
          aria-hidden
        >
          {p.glyph}
        </span>
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{p.category}</span>
        <h3 className="mt-1 text-2xl font-bold text-ink">{p.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">{p.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {p.stack.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Details: React.FC<{ p: Project }> = ({ p }) => {
  const a = ACCENT[p.accent];
  return (
    <div className="swap-in grid gap-6 rounded-3xl border border-line bg-[rgba(10,13,11,0.6)] p-5 sm:p-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider" style={{ color: a.c }}>
          <span className="h-2 w-2 rounded-full" style={{ background: a.c }} /> {p.category}
        </div>
        <h3 className="text-2xl font-bold text-ink sm:text-3xl">{p.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-5 space-y-2.5">
          {p.features.map((f, i) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span className="mt-0.5 font-mono text-[11px]" style={{ color: a.c }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-muted">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <dl className="space-y-3 rounded-2xl border border-line bg-surface p-4">
          {p.architecture.map((row) => (
            <div key={row.label} className="grid grid-cols-[88px_1fr] gap-3 text-sm">
              <dt className="font-mono text-[11px] uppercase tracking-wider" style={{ color: a.c }}>
                {row.label}
              </dt>
              <dd className="text-muted">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-lg px-2.5 py-1 font-mono text-[11px]" style={{ background: a.soft, color: a.c }}>
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                l.kind === 'live'
                  ? 'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#0e120f] transition-transform hover:-translate-y-0.5'
                  : 'inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-[#d6f25e]'
              }
              style={l.kind === 'live' ? { background: a.c } : undefined}
            >
              {l.kind === 'live' ? <ExternalLink size={16} /> : <Github size={16} />}
              {l.label}
            </a>
          ))}
          {p.links.length === 0 && (
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Démo ${p.title}`)}`}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#0e120f] transition-transform hover:-translate-y-0.5"
              style={{ background: a.c }}
            >
              <Mail size={16} />
              Demander une démo
            </a>
          )}
        </div>
        {p.note && <p className="font-mono text-[11px] text-muted">{p.note}</p>}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [active, setActive] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const n = PROJECTS.length;

  const go = (i: number) => setActive(((i % n) + n) % n);

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <Slide
      index={3}
      kicker="Réalisations"
      title={
        <>
          Projets <span className="text-shine">phares</span>.
        </>
      }
    >
      <Reveal effect="zoom">
        <div
          className="cf -mx-5 overflow-hidden sm:-mx-8 lg:-mx-12"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (start.current = null)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(active + 1);
            if (e.key === 'ArrowLeft') go(active - 1);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carrousel"
          aria-label="Projets — utilisez ← → pour naviguer"
        >
          <div className="cf-track">
            {PROJECTS.map((p, i) => {
              let o = i - active;
              if (o > n / 2) o -= n;
              if (o < -n / 2) o += n;
              const ao = Math.abs(o);
              return (
                <button
                  key={p.id}
                  type="button"
                  className="cf-card text-left"
                  data-hidden={ao > 2}
                  style={{ ['--o' as string]: o, ['--ao' as string]: ao, zIndex: 10 - ao }}
                  onClick={() => go(i)}
                  aria-label={`${p.title} — ${p.tagline}`}
                  aria-current={o === 0 ? 'true' : undefined}
                  tabIndex={ao > 2 ? -1 : 0}
                >
                  <Card p={p} isActive={o === 0} />
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="mb-6 mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(active - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-[#d6f25e] hover:text-lime"
          aria-label="Projet précédent"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => go(i)}
              aria-label={p.title}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-lime' : 'w-2 bg-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.5)]'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(active + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-[#d6f25e] hover:text-lime"
          aria-label="Projet suivant"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <Details key={PROJECTS[active].id} p={PROJECTS[active]} />
    </Slide>
  );
};

export default Projects;
