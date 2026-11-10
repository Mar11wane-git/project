import React, { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import Tilt from './deck/Tilt';
import { PROFILE } from '../data/portfolio';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Opens the visitor's mail client with everything pre-filled: nothing is lost or faked.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject || `Contact portfolio — ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    'w-full rounded-xl border border-line bg-[rgba(10,13,11,0.7)] px-4 py-3 text-sm text-ink placeholder:text-[#5f6b62] outline-none transition-colors focus:border-[#d6f25e]';

  const channels = [
    { key: 'mail', icon: Mail, label: 'E-mail', value: PROFILE.email, href: `mailto:${PROFILE.email}`, copy: PROFILE.email },
    { key: 'tel', icon: Phone, label: 'Téléphone', value: PROFILE.phone, href: PROFILE.phoneHref, copy: PROFILE.phone },
    { key: 'loc', icon: MapPin, label: 'Basé à', value: `${PROFILE.location} · ouvert à Rabat` },
  ];

  return (
    <Slide
      index={5}
      kicker="Contact & opportunités"
      title={
        <>
          Construisons <span className="text-shine">la suite</span> ensemble.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal effect="left" className="lg:col-span-5">
          <Tilt max={6} className="h-full rounded-3xl">
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-7">
              <p className="text-[15px] leading-relaxed text-muted">
                Je recherche un <strong className="text-ink">poste de développeur ou de concepteur développeur</strong> à
                Casablanca ou Rabat. Réponse rapide par e-mail ou téléphone.
              </p>
              <ul className="space-y-3">
                {channels.map(({ key, icon: Icon, label, value, href, copy: c }) => (
                  <li key={key} className="flex items-center gap-3 rounded-2xl border border-line bg-[rgba(10,13,11,0.6)] p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-lime">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{label}</span>
                      {href ? (
                        <a href={href} className="block truncate text-sm font-semibold text-ink hover:text-lime">
                          {value}
                        </a>
                      ) : (
                        <span className="block text-sm font-semibold text-ink">{value}</span>
                      )}
                    </span>
                    {c && (
                      <button
                        onClick={() => copy(c, key)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-lime"
                        aria-label={`Copier ${label}`}
                      >
                        {copied === key ? <Check size={16} className="text-lime" /> : <Copy size={16} />}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex gap-3 pt-2">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-semibold text-ink transition-colors hover:border-[#d6f25e]"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-semibold text-ink transition-colors hover:border-[#d6f25e]"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </Tilt>
        </Reveal>

        <Reveal effect="right" delay={80} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="grid h-full gap-4 rounded-3xl border border-line bg-[rgba(10,13,11,0.6)] p-6 sm:grid-cols-2 sm:p-7">
            <label className="grid gap-1.5 text-xs text-muted">
              Nom
              <input name="name" required value={form.name} onChange={onChange} className={field} placeholder="Votre nom" autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-xs text-muted">
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
            <label className="grid gap-1.5 text-xs text-muted sm:col-span-2">
              Sujet
              <input name="subject" value={form.subject} onChange={onChange} className={field} placeholder="Opportunité, projet, question…" />
            </label>
            <label className="grid gap-1.5 text-xs text-muted sm:col-span-2">
              Message
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={onChange}
                className={`${field} resize-none`}
                placeholder="Décrivez votre besoin…"
              />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
              <span className="text-xs text-muted">Ouvre votre messagerie avec le message pré-rempli.</span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-bold text-[#0e120f] shadow-[0_8px_24px_-10px_rgba(214,242,94,0.45)] transition-transform hover:-translate-y-0.5"
              >
                <Send size={16} /> Envoyer
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Slide>
  );
};

export default Contact;
