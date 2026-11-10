import { useEffect, useState } from 'react';
import { SECTIONS } from '../data/portfolio';

/**
 * Tracks which section is on screen (for the nav underline), drives the scroll
 * progress line and the back-to-top button. Written straight to the DOM in one
 * rAF per scroll so scrolling never re-renders the page.
 */
export function useSections() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let current = -1;
    let wasScrolled: boolean | null = null;
    const progress = document.getElementById('scroll-progress');

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const anchor = vh * 0.35;
      let best = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= anchor) best = i;
      });
      // At the very bottom, the last (short) section is the active one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) best = SECTIONS.length - 1;

      if (progress) {
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0})`;
      }
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== wasScrolled) {
        wasScrolled = isScrolled;
        setScrolled(isScrolled);
      }
      if (best !== current) {
        current = best;
        setActive(best);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Deep links (/#projects) once React has rendered the sections.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto' }));
  }, []);

  return { active, scrolled };
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
}
