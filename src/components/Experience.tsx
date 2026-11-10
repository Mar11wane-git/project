import React, { useState } from 'react';
import { Briefcase, ChevronDown, GraduationCap } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import { TIMELINE, type TimelineItem } from '../data/portfolio';

const VISIBLE = 3;

const Entry: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const extra = item.bullets.length - VISIBLE;
  const bullets = open ? item.bullets : item.bullets.slice(0, VISIBLE);
  const isWork = item.type === 'work';

  return (
    <Reveal effect="flip" delay={index * 60} as="li" className="relative pl-8">
      <span
        className={`absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 ${
          isWork ? 'border-[#d6f25e] bg-[#0e120f]' : 'border-[#38c6dc] bg-[#0e120f]'
        }`}
        aria-hidden
      />
      <article className="rounded-2xl border border-line bg-[rgba(10,13,11,0.6)] p-5 transition-colors hover:border-[rgba(214,242,94,0.35)] sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-lime">{item.period}</span>
          {item.badge && (
            <span className="rounded-full border border-[rgba(214,242,94,0.3)] bg-[rgba(214,242,94,0.08)] px-2 py-0.5 font-mono text-[10px] text-lime">
              {item.badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {item.organization} · {item.location}
        </p>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-lime" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {extra > 0 && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-lime hover:underline"
            aria-expanded={open}
          >
            {open ? 'Réduire' : `+ ${extra} missions`}
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {item.skills.map((s) => (
            <span key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
};

const Column: React.FC<{ type: 'work' | 'education'; title: string }> = ({ type, title }) => {
  const items = TIMELINE.filter((t) => t.type === type);
  const Icon = type === 'work' ? Briefcase : GraduationCap;
  return (
    <div>
      <Reveal>
        <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 text-lime">
            <Icon size={17} />
          </span>
          {title}
          <span className="font-mono text-xs text-muted">({items.length})</span>
        </h3>
      </Reveal>
      <ol className="relative ml-1.5 space-y-5 border-l border-line">
        {items.map((item, i) => (
          <Entry key={item.id} item={item} index={i} />
        ))}
      </ol>
    </div>
  );
};

const Experience: React.FC = () => (
  <Slide
    index={2}
    kicker="Expériences & formations"
    title={
      <>
        Un parcours entre <span className="text-shine">code</span> et <span className="text-shine">exploitation</span>.
      </>
    }
  >
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
      <Column type="work" title="Expérience" />
      <Column type="education" title="Formation" />
    </div>
  </Slide>
);

export default Experience;
