import React from 'react';
import Reveal from './Reveal';

interface Props {
  index: string;
  kicker: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

const SectionHeading: React.FC<Props> = ({ index, kicker, title, subtitle, action }) => (
  <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-2xl">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="font-bold text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={120}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
    {action && (
      <Reveal delay={160} className="shrink-0">
        {action}
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
