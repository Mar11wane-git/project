import React from 'react';
import { ArrowUp, Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { PROFILE, SLIDES } from '../data/portfolio';

/** WhatsApp logo (not in lucide), path from Simple Icons (CC0). */
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const SOCIALS = [
  { href: PROFILE.github, label: 'GitHub', icon: <Github size={20} /> },
  { href: PROFILE.linkedin, label: 'LinkedIn', icon: <Linkedin size={20} /> },
  { href: PROFILE.whatsapp, label: `WhatsApp ${PROFILE.whatsappLabel}`, icon: <WhatsAppIcon /> },
  { href: PROFILE.instagram, label: 'Instagram', icon: <Instagram size={20} /> },
];

const Footer: React.FC<{ goTo: (i: number) => void }> = ({ goTo }) => (
  <footer className="relative z-10 border-t border-line bg-[rgba(14,18,15,0.94)]">
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10">
      {/* brand */}
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold leading-none tracking-tight">
            <span className="text-ink">M</span>
            <span className="text-lime">E</span>
          </span>
          <span className="leading-tight">
            <span className="block font-bold text-ink">
              {PROFILE.firstName} {PROFILE.lastName}
            </span>
            <span className="block text-sm text-muted">Développeur Full Stack</span>
          </span>
        </div>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          Je conçois et développe des applications web complètes, de l'interface à l'API — Java, PHP et React. Ouvert aux
          postes de développeur à Casablanca et Rabat.
        </p>
        <div className="mt-6 flex items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-transparent text-ink transition-colors hover:border-[#d6f25e] hover:text-lime"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* navigation */}
      <nav className="lg:col-span-3" aria-label="Navigation du pied de page">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Navigation</p>
        <ul className="space-y-3">
          {SLIDES.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => goTo(i)} className="text-[15px] text-ink transition-colors hover:text-lime">
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* contact */}
      <div className="lg:col-span-4">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Contact</p>
        <ul className="space-y-3.5 text-[15px]">
          <li>
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 break-words text-ink hover:text-lime">
              <Mail size={17} className="shrink-0 text-muted" /> {PROFILE.email}
            </a>
          </li>
          <li>
            <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink hover:text-lime">
              <span className="shrink-0 text-muted">
                <WhatsAppIcon size={17} />
              </span>
              {PROFILE.whatsappLabel}
            </a>
          </li>
          <li className="flex items-center gap-3 text-ink">
            <MapPin size={17} className="shrink-0 text-muted" /> {PROFILE.location}
          </li>
          <li className="flex items-center gap-3 font-semibold text-lime">
            <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_0_4px_rgba(214,242,94,0.15)]" />
            </span>
            Disponible pour un poste
          </li>
        </ul>
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-line pb-24 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:pb-10">
        <p>
          © {new Date().getFullYear()} {PROFILE.firstName} {PROFILE.lastName}. Tous droits réservés.
        </p>
        <button onClick={() => goTo(0)} className="inline-flex items-center gap-2 transition-colors hover:text-lime sm:mr-36">
          Retour en haut <ArrowUp size={15} />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
