import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE, SECTIONS } from '../data/portfolio';
import { scrollToSection } from '../hooks/useSections';

const Footer: React.FC = () => (
  <footer className="border-t border-line bg-surface">
    <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <p className="text-xl font-extrabold tracking-tight">
          <span className="text-ink">{PROFILE.firstName} </span>
          <span className="text-accent">{PROFILE.lastName}</span>
        </p>
        <p className="mt-1 text-sm font-semibold text-muted">{PROFILE.headline}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Je conçois et développe des applications web complètes, de l'API à l'interface. Ouvert aux postes de développeur à
          Casablanca et Rabat.
        </p>
        <div className="mt-5 flex gap-2">
          {[
            { href: PROFILE.github, icon: Github, label: 'GitHub' },
            { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'E-mail' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-[var(--accent)] hover:text-accent"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <nav aria-label="Navigation du pied de page">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Navigation</p>
        <ul className="space-y-2.5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button onClick={() => scrollToSection(s.id)} className="text-sm text-ink hover:text-accent">
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Contact</p>
        <ul className="space-y-2.5 text-sm">
          <li>
            <a href={`mailto:${PROFILE.email}`} className="break-all text-ink hover:text-accent">
              {PROFILE.email}
            </a>
          </li>
          <li>
            <a href={PROFILE.phoneHref} className="text-ink hover:text-accent">
              {PROFILE.phone}
            </a>
          </li>
          <li className="text-muted">{PROFILE.location}</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-line">
      <p className="container-page py-6 text-xs text-muted">
        © {new Date().getFullYear()} {PROFILE.firstName} {PROFILE.lastName}. Tous droits réservés.
      </p>
    </div>
  </footer>
);

export default Footer;
