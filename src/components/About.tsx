import React from 'react';
import { ArrowRight, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import Reveal from './ui/Reveal';
import Tilt from './ui/Tilt';
import { JOBS, PROFILE, PROJECTS } from '../data/portfolio';
import { scrollToSection } from '../hooks/useSections';

const About: React.FC = () => {
  const stats = [
    { k: String(PROJECTS.length), v: 'projets réalisés' },
    { k: String(JOBS.length), v: 'expériences pro' },
    { k: 'Bac+5', v: 'en cours, Génie Info' },
  ];

  return (
    <section id="about" className="section-pad">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              <span className="font-bold text-accent">01</span>
              <span className="h-px w-8 bg-line-strong" />À propos
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">À propos de moi</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Développeur Full Stack junior maîtrisant <strong className="font-semibold text-ink">Java / Spring Boot</strong>,{' '}
                <strong className="font-semibold text-ink">PHP / Laravel</strong> et{' '}
                <strong className="font-semibold text-ink">React / Node.js</strong>, en 2ᵉ année du cycle d'ingénierie en
                Génie Informatique à l'École High Technologie de Rabat.
              </p>
              <p>
                Deux stages en développement web et une expérience de pilote de production monétique chez HPS (incidents N1/N2,
                SQL, supervision) m'ont appris la rigueur qu'exige la production. Je recherche un{' '}
                <strong className="font-semibold text-ink">poste de développeur ou de concepteur développeur</strong> à Casablanca
                ou Rabat.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-8 grid max-w-md grid-cols-3 border-y border-line">
              {stats.map((s, i) => (
                <div key={s.v} className={`py-5 ${i > 0 ? 'border-l border-line pl-4 sm:pl-5' : ''}`}>
                  <dt className="sr-only">{s.v}</dt>
                  <dd className="text-3xl font-extrabold tracking-tight text-ink">{s.k}</dd>
                  <dd className="mt-1 text-xs text-muted sm:text-sm">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={() => scrollToSection('contact')} className="btn-lime">
                Me contacter <ArrowRight size={16} />
              </button>
              <span className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={16} className="text-accent" /> Basé à Casablanca
              </span>
            </div>
          </Reveal>
        </div>

        {/* photo composition */}
        <Reveal effect="zoom" delay={120}>
          <div className="relative mx-auto w-full max-w-[460px] px-4 pb-10 pt-10 sm:px-8">
            <span className="absolute left-0 top-1/3 h-40 w-40 rounded-full border-2 border-lime opacity-60" aria-hidden />
            <Tilt max={6} className="rounded-3xl">
              <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow)]">
                <img
                  src={PROFILE.photo}
                  alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </Tilt>

            <div className="float-slow absolute -right-1 top-2 flex max-w-[230px] items-center gap-3 rounded-2xl border border-line bg-card p-3.5 shadow-lg sm:-right-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime text-on-lime">
                <GraduationCap size={19} />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-bold text-ink">Élève-ingénieur</span>
                <span className="text-xs text-muted">École HT Rabat · 2025</span>
              </span>
            </div>

            <div className="float-slow d2 absolute -left-1 bottom-0 flex max-w-[250px] items-center gap-3 rounded-2xl border border-line bg-card p-3.5 shadow-lg sm:-left-6">
              <span className="soft-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-accent">
                <Briefcase size={18} />
              </span>
              <span className="text-sm font-semibold leading-snug text-ink">Pilote de production monétique chez HPS</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
