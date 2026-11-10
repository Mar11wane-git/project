import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

const Footer: React.FC<{ goTo: (i: number) => void }> = ({ goTo }) => (
  <footer className="relative z-10 border-t border-line px-4 pb-24 pt-8 sm:px-6 sm:pb-10 lg:px-10">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold text-ink">{PROFILE.firstName} {PROFILE.lastName}</span> · {PROFILE.headline}
      </p>
      <button onClick={() => goTo(0)} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-lime">
        <ArrowUp size={14} /> Revenir au début
      </button>
    </div>
  </footer>
);

export default Footer;
