import React, { useState } from 'react';

const CDN = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/';
// Logos drawn in plain black: inverted in dark mode (see .icon-mono).
const MONO = ['github', 'bash', 'vercel'];
const LIFT = ['mysql', 'oracle'];

/** Technology logo from Devicon, with a monogram fallback when there's no icon or it fails to load. */
const TechIcon: React.FC<{ name: string; icon: string | null; size?: number }> = ({ name, icon, size = 22 }) => {
  const [failed, setFailed] = useState(false);
  if (!icon || failed) {
    return (
      <span className="font-mono text-[11px] font-bold text-accent" style={{ fontSize: size * 0.48 }} aria-hidden>
        {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={`${CDN}${icon}.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={MONO.some((m) => icon.startsWith(m)) ? 'icon-mono' : LIFT.some((m) => icon.startsWith(m)) ? 'icon-lift' : undefined}
      style={{ width: size, height: size }}
    />
  );
};

export default TechIcon;
