import React from 'react';
import { Award, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import Tilt from './deck/Tilt';
import { PILLARS, PROFILE } from '../data/portfolio';

const ACCENTS = ['#dfff5b', '#34d399', '#22d3ee', '#a78bfa'];

const About: React.FC = () => {
  const facts = [
    { icon: MapPin, label: 'Localisation', value: PROFILE.location },
    { icon: Mail, label: 'E-mail', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: 'Téléphone', value: PROFILE.phone, href: PROFILE.phoneHref },
    { icon: Award, label: 'Recherche', value: PROFILE.seeking },
  ];

  return (
    <Slide
      index={1}
      kicker="Profil professionnel"
      title={
        <>
          Du code propre à la <span className="text-shine">production critique</span>.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal effect="left" className="lg:col-span-7">
          <div className="h-full rounded-3xl border border-line bg-[rgba(10,13,11,0.6)] p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-lime">
              <GraduationCap size={16} /> Parcours & objectif
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
              <p>
                Développeur Full Stack junior maîtrisant <strong className="text-ink">Java / Spring Boot</strong>,{' '}
                <strong className="text-ink">PHP / Laravel</strong> et <strong className="text-ink">React / Node.js</strong>, en
                2ᵉ année du cycle d'ingénierie en Génie Informatique à l'École High Technologie de Rabat.
              </p>
              <p>
                Deux stages en développement Web et une expérience de{' '}
                <strong className="text-ink">Pilote de Production Monétique chez HPS</strong> (incidents N1/N2, SQL, supervision)
                m'ont appris la rigueur qu'exige la production. En parallèle, je construis des produits complets comme{' '}
                <strong className="text-lime">Vasco AI</strong> et <strong className="text-lime">MR1Academy</strong>.
              </p>
              <p>
                Je recherche un <strong className="text-ink">poste de développeur ou de concepteur développeur</strong> à
                Casablanca ou Rabat.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal effect="right" delay={150} className="lg:col-span-5">
          <ul className="grid h-full gap-3">
            {facts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4 rounded-2xl border border-line bg-[rgba(10,13,11,0.6)] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-lime">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{label}</span>
                  {href ? (
                    <a href={href} className="block truncate text-sm font-semibold text-ink hover:text-lime">
                      {value}
                    </a>
                  ) : (
                    <span className="block text-sm font-semibold text-ink">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} effect="flip" delay={i * 120}>
            <Tilt className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-line bg-surface p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: ACCENTS[i] }}>
                    0{i + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: ACCENTS[i], boxShadow: `0 0 12px ${ACCENTS[i]}` }} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Slide>
  );
};

export default About;
