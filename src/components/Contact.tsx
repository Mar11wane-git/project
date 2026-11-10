import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import Reveal from './ui/Reveal';
import { PROFILE } from '../data/portfolio';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Opens the visitor's mail client with everything pre-filled: nothing is lost or faked.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      form.subject || `Contact portfolio — ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const field =
    'w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-[var(--accent)]';

  const infos = [
    { icon: Mail, label: 'E-mail', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: 'Téléphone · WhatsApp', value: PROFILE.phone, href: PROFILE.phoneHref },
    { icon: Linkedin, label: 'LinkedIn', value: PROFILE.linkedinHandle, href: PROFILE.linkedin },
    { icon: MapPin, label: 'Localisation', value: `${PROFILE.location} · ouvert à Rabat` },
  ];

  return (
    <section id="contact" className="section-pad relative overflow-hidden border-t border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="glow-lime pointer-events-none absolute -left-40 top-20 h-[480px] w-[560px]" aria-hidden />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                <span className="font-bold text-accent">05</span>
                <span className="h-px w-8 bg-line-strong" />
                Contact
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.03] tracking-tight">
                <span className="block text-ink">Un poste, un projet ?</span>
                <span className="block text-accent">Parlons-en dès maintenant.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Je recherche un poste de développeur ou de concepteur développeur à Casablanca ou Rabat. Je réponds rapidement par
                e-mail ou par téléphone.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a href={`mailto:${PROFILE.email}`} className="btn-lime mr-2">
                  Me contacter <ArrowRight size={16} />
                </a>
                {[
                  { href: PROFILE.github, icon: Github, label: 'GitHub' },
                  { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
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

          <Reveal effect="zoom" delay={120} className="hidden sm:block">
            <div className="scene-3d mx-auto w-full max-w-[520px]">
              <div className="editor-3d flip-side overflow-hidden rounded-2xl border border-white/10 bg-[#111512] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
                <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0c0f0d] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-[11px] text-[#7d8a80]">contact.ts — portfolio</span>
                </div>
                <pre className="px-5 py-5 font-mono text-[12.5px] leading-[1.9] text-[#d7ddd5]">
                  <span style={{ color: '#c792ea' }}>const</span> recrutement <span style={{ color: '#89ddff' }}>= {'{'}</span>
                  {'\n'}  poste<span style={{ color: '#89ddff' }}>:</span> <span style={{ color: '#c3e88d' }}>"Développeur Full Stack"</span>,
                  {'\n'}  villes<span style={{ color: '#89ddff' }}>:</span> [<span style={{ color: '#c3e88d' }}>"Casablanca"</span>, <span style={{ color: '#c3e88d' }}>"Rabat"</span>],
                  {'\n'}  stack<span style={{ color: '#89ddff' }}>:</span> [<span style={{ color: '#c3e88d' }}>"Java"</span>, <span style={{ color: '#c3e88d' }}>"PHP"</span>, <span style={{ color: '#c3e88d' }}>"React"</span>],
                  {'\n'}<span style={{ color: '#89ddff' }}>{'};'}</span>
                  {'\n'}
                  {'\n'}<span style={{ color: '#c792ea' }}>await</span> <span style={{ color: '#ffcb6b' }}>envoyer</span>(message);
                  {'\n'}<span style={{ color: '#5f6f63' }}>// réponse sous 24 h</span>
                  <span className="caret ml-1" />
                </pre>
                <div className="flex items-center justify-between bg-[#d9f45f] px-4 py-1.5 font-mono text-[10px] font-semibold text-[#10140f]">
                  <span>⎇ main · ✓ 0 problems</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-5">
            {infos.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 50}>
                <div className="card flex items-center gap-4 !rounded-2xl p-4">
                  <span className="soft-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent">
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="block truncate font-semibold text-ink hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="block font-semibold text-ink">{value}</span>
                    )}
                  </span>
                  {i === 0 && (
                    <button
                      onClick={copyEmail}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-card-2 hover:text-accent"
                      aria-label="Copier l'e-mail"
                    >
                      {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delay={220} className="flex-1">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-lime p-6 text-on-lime">
                <p className="flex items-center gap-2 font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-on-lime" /> Disponible pour un poste
                </p>
                <p className="mt-2 text-sm opacity-80">
                  Développeur ou concepteur développeur, Casablanca ou Rabat. Ouvert aussi aux missions et collaborations.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <form onSubmit={onSubmit} className="card grid h-full gap-5 !rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
              <h3 className="text-xl font-bold text-ink sm:col-span-2">Envoyez-moi un message</h3>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                Nom complet
                <input name="name" required value={form.name} onChange={onChange} className={field} placeholder="Votre nom" autoComplete="name" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className={field}
                  placeholder="vous@entreprise.com"
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Sujet
                <input name="subject" value={form.subject} onChange={onChange} className={field} placeholder="Objet de votre message" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink sm:col-span-2">
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  className={`${field} resize-y`}
                  placeholder="Décrivez le poste ou le projet…"
                />
              </label>
              <button type="submit" className="btn-lime sm:col-span-2">
                <Send size={16} /> Envoyer le message
              </button>
              <p className="text-center text-xs text-muted sm:col-span-2">
                Ouvre votre messagerie avec le message pré-rempli · ou écrivez à{' '}
                <a href={`mailto:${PROFILE.email}`} className="font-semibold text-accent hover:underline">
                  {PROFILE.email}
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
