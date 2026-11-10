import React from 'react';
import { ArrowRight, Eye, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './ui/Reveal';
import TechIcon from './ui/TechIcon';
import { PROFILE } from '../data/portfolio';
import { scrollToSection } from '../hooks/useSections';

/* Editor palette is fixed (always a dark editor), independent of the site theme. */
const K = ({ c }: { c: string }) => <span style={{ color: '#c792ea' }}>{c}</span>;
const T = ({ c }: { c: string }) => <span style={{ color: '#82aaff' }}>{c}</span>;
const S = ({ c }: { c: string }) => <span style={{ color: '#c3e88d' }}>{c}</span>;
const P = ({ c }: { c: string }) => <span style={{ color: '#89ddff' }}>{c}</span>;
const C = ({ c }: { c: string }) => <span style={{ color: '#5f6f63' }}>{c}</span>;

const CODE: React.ReactNode[] = [
  <C key="c" c="// Marouane.java" />,
  <>
    <K c="public class " />
    <T c="Marouane " />
    <K c="extends " />
    <T c="Developer " />
    <P c="{" />
  </>,
  <>
    {'  '}
    <T c="String " />
    role <P c="= " />
    <S c='"Full Stack"' />
    <P c=";" />
  </>,
  <>
    {'  '}
    <T c="String" />
    <P c="[] " />
    stack <P c="= {" />
    <S c='"Java"' />, <S c='"PHP"' />, <S c='"React"' />
    <P c="};" />
  </>,
  <>
    {'  '}
    <T c="String " />
    base <P c="= " />
    <S c='"Casablanca"' />
    <P c=";" />
  </>,
  <>&nbsp;</>,
  <>
    {'  '}
    <K c="public " />
    <T c="Product " />
    <span style={{ color: '#ffcb6b' }}>build</span>
    <P c="(" />
    <T c="Idea " />
    idea<P c=") {" />
  </>,
  <>
    {'    '}
    <K c="return " />
    ship<P c="(" />
    design<P c="(" />
    idea<P c="));" />
    <span className="caret ml-1" />
  </>,
  <>
    {'  '}
    <P c="}" />
  </>,
  <P key="end" c="}" />,
];

const CHIPS = [
  { name: 'Spring Boot', icon: 'spring/spring-original', cls: 'left-6 -top-1 sm:left-10 sm:-top-3', d: '' },
  { name: 'React', icon: 'react/react-original', cls: '-right-1 top-0 sm:-right-6', d: 'd2' },
  { name: 'Laravel', icon: 'laravel/laravel-original', cls: '-left-1 bottom-20 sm:-left-10', d: 'd3' },
  { name: 'MySQL', icon: 'mysql/mysql-original', cls: '-right-2 bottom-28 sm:-right-8', d: '' },
];

const Hero: React.FC<{ onOpenCV: () => void }> = ({ onOpenCV }) => (
  <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20">
    <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
    <div className="glow-lime pointer-events-none absolute -right-40 top-10 h-[520px] w-[620px]" aria-hidden />

    <div className="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
      {/* copy */}
      <div>
        <Reveal>
          <span className="pill-accent mb-7 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-accent">
            <span className="dot-ring flex h-4 w-4 items-center justify-center rounded-full">
              <span className="h-2 w-2 rounded-full bg-lime" />
            </span>
            Disponible — poste de développeur
          </span>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-3xl font-medium tracking-tight text-muted sm:text-4xl">Bonjour, je suis</p>
          <h1 className="mt-1 text-[clamp(2.7rem,7.5vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
            <span className="block text-ink">{PROFILE.firstName}</span>
            <span className="block text-accent">{PROFILE.lastName.toUpperCase()}</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Développeur Full Stack <span className="text-accent">|</span> Java · PHP · React
          </p>
          <p className="mt-1 text-lg font-medium text-muted sm:text-xl">{PROFILE.subline}</p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Je conçois des applications web complètes, de l'API à l'interface : de l'agent IA{' '}
            <strong className="font-semibold text-ink">Vasco</strong> à la plateforme e-learning{' '}
            <strong className="font-semibold text-ink">MR1Academy</strong>. Pilote de production monétique chez{' '}
            <strong className="font-semibold text-ink">HPS</strong>, j'y ai appris la rigueur qu'exige la production.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToSection('projects')} className="btn-lime">
              Voir mes projets <ArrowRight size={16} />
            </button>
            <button onClick={onOpenCV} className="btn-ghost">
              <Eye size={16} /> Voir mon CV
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2">
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
                className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-card hover:text-accent"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* 3D editor */}
      <Reveal effect="zoom" delay={150}>
        <div className="scene-3d relative mx-auto w-full max-w-[560px] py-6">
          <div className="editor-3d overflow-hidden rounded-2xl border border-white/10 bg-[#111512] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0c0f0d] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-[#7d8a80]">Marouane.java — portfolio</span>
            </div>
            <div className="flex border-b border-white/[0.06] font-mono text-[11px]">
              <span className="border-b-2 border-[#d9f45f] bg-[#111512] px-4 py-2 text-[#e6ebe3]">Marouane.java</span>
              <span className="px-4 py-2 text-[#5f6f63]">App.tsx</span>
              <span className="hidden px-4 py-2 text-[#5f6f63] sm:block">api.php</span>
            </div>
            <pre className="overflow-hidden px-4 py-4 font-mono text-[11px] leading-[1.85] text-[#d7ddd5] sm:text-[12.5px]">
              {CODE.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 w-4 select-none text-right text-[#3f4a42]">{i + 1}</span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              ))}
            </pre>
            <div className="flex items-center justify-between bg-[#d9f45f] px-4 py-1.5 font-mono text-[10px] font-semibold text-[#10140f]">
              <span>⎇ main · ✓ build passing</span>
              <span>Java 17 · UTF-8</span>
            </div>
          </div>

          {CHIPS.map((c) => (
            <span
              key={c.name}
              className={`float-slow ${c.d} absolute flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-xs font-semibold text-ink shadow-lg ${c.cls}`}
            >
              <TechIcon name={c.name} icon={c.icon} size={16} />
              {c.name}
            </span>
          ))}
          <span className="float-slow d2 absolute -bottom-2 left-6 hidden items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-lg sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime font-mono text-[11px] font-bold text-on-lime">24/7</span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold text-ink">Production monétique</span>
              <span className="text-muted">HPS · incidents N1/N2</span>
            </span>
          </span>
        </div>
      </Reveal>
    </div>

    <button
      onClick={() => scrollToSection('about')}
      className="container-page absolute inset-x-0 bottom-8 hidden items-center gap-3 text-sm text-muted transition-colors hover:text-ink lg:flex"
    >
      <span className="flex h-9 w-6 justify-center rounded-full border border-line-strong pt-2">
        <span className="scroll-cue block h-1.5 w-1 rounded-full bg-lime" />
      </span>
      Défiler pour découvrir
    </button>
  </section>
);

export default Hero;
