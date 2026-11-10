import React from 'react';
import { ArrowRight, Eye, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import Tilt from './deck/Tilt';
import { PROFILE, PROJECTS } from '../data/portfolio';

interface HeroProps {
  onOpenCV: () => void;
  goTo: (i: number) => void;
}

const ORBIT = ['React', 'Laravel', 'Spring Boot', 'FastAPI', 'SQL', 'Docker', 'Python', 'Zabbix'];

const SplitWord: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block whitespace-nowrap" aria-hidden>
    {[...text].map((c, i) => (
      <span key={i} className="char" style={{ ['--i' as string]: i }}>
        {c === ' ' ? ' ' : c}
      </span>
    ))}
  </span>
);

const Hero: React.FC<HeroProps> = ({ onOpenCV, goTo }) => {
  return (
    <Slide
      index={0}
      frame={false}
      extra={
        <button
          onClick={() => goTo(1)}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink md:flex"
        >
          Défiler · Page ↓
          <span className="flex h-8 w-5 justify-center rounded-full border border-line pt-1.5">
            <span className="scroll-cue block h-1.5 w-1 rounded-full bg-lime" />
          </span>
        </button>
      }
    >
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal effect="flip">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="font-mono text-[11px] text-ink sm:text-xs">{PROFILE.current}</span>
            </div>
          </Reveal>

          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-lime">01</span> — Bonjour, je suis
          </p>
          <h1 className="font-display text-[clamp(2.6rem,9vw,5.6rem)] font-bold leading-[0.95] tracking-tight text-ink">
            <span className="sr-only">
              {PROFILE.firstName} {PROFILE.lastName}
            </span>
            <SplitWord text={PROFILE.firstName.toUpperCase()} />
            <br />
            {/* gradient text can't paint through per-letter transforms, so the last name flips in as one block */}
            <span className="char" style={{ ['--i' as string]: 9 }} aria-hidden>
              <span className="text-shine whitespace-nowrap">{PROFILE.lastName.toUpperCase()}</span>
            </span>
          </h1>

          <Reveal delay={250}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              <strong className="text-ink">{PROFILE.headline}</strong> · élève-ingénieur en Génie Informatique. Je conçois des applications web complètes — de l'agent IA{' '}
              <strong className="text-ink">Vasco</strong> à la plateforme e-learning{' '}
              <strong className="text-ink">MR1Academy</strong> — avec la rigueur de la production monétique chez{' '}
              <strong className="text-lime">HPS</strong>.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => goTo(3)}
                className="group inline-flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-bold text-[#0e120f] shadow-[0_8px_24px_-10px_rgba(214,242,94,0.45)] transition-transform hover:-translate-y-0.5"
              >
                Voir les projets
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-[#d6f25e]"
              >
                <Eye size={16} className="text-lime" />
                Mon CV
              </button>
              <div className="flex items-center gap-2">
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
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-[#d6f25e] hover:text-lime"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: `${PROJECTS.length}`, v: 'Projets livrés' },
                { k: 'Bac+5', v: 'Génie Info' },
                { k: '24/7', v: 'Prod. monétique' },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-line bg-[rgba(18,23,19,0.7)] p-3 sm:p-4">
                  <dt className="sr-only">{s.v}</dt>
                  <dd className="font-display text-xl font-bold text-ink sm:text-2xl">{s.k}</dd>
                  <dd className="mt-0.5 text-[11px] text-muted sm:text-xs">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* 3D scene */}
        <div className="lg:col-span-5">
          <Reveal effect="zoom" delay={150}>
            <div className="orbit-scene relative mx-auto aspect-square w-full max-w-[min(440px,88vw)]">
              <div className="orbit-tilt">
                <span className="orbit-path" aria-hidden />
                <div className="orbit-ring" aria-hidden>
                  {ORBIT.map((label, i) => (
                    <span key={label} className="orbit-item" style={{ ['--a' as string]: `${(360 / ORBIT.length) * i}deg` }}>
                      <span className="block whitespace-nowrap rounded-full border border-[rgba(214,242,94,0.35)] bg-[rgba(18,23,19,0.92)] px-3 py-1.5 font-mono text-[10px] font-semibold text-lime sm:text-xs">
                        {label}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="float-y">
                    <Tilt max={14} className="rounded-[26px]">
                      <div className="relative overflow-hidden rounded-[26px] border border-[rgba(255,255,255,0.15)] bg-surface p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                        <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-[#d6f25e] via-[#3fcf98] to-[#38c6dc] opacity-40" aria-hidden />
                        <img
                          src={PROFILE.photo}
                          alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                          className="relative aspect-[4/5] w-full rounded-[20px] object-cover object-top"
                          loading="eager"
                        />
                      </div>
                    </Tilt>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted">
            <MapPin size={12} className="text-lime" /> {PROFILE.location}
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default Hero;
