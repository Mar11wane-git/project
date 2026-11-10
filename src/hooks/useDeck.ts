import { useCallback, useEffect, useState } from 'react';
import { SLIDES } from '../data/portfolio';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Drives the presentation: writes --p / --ap (signed / absolute slide offset)
 * on every [data-slide] element so CSS can tilt it in 3D, tracks the active
 * slide and exposes goTo / next / prev with keyboard shortcuts.
 */
export function useDeck() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    let current = -1;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const slides = document.querySelectorAll<HTMLElement>('[data-slide]');
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        let p = 0;
        if (r.top > 0 && r.bottom > vh) p = clamp(r.top / vh, 0, 1);
        else if (r.bottom < vh && r.top < 0) p = -clamp((vh - r.bottom) / vh, 0, 1);
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--ap', Math.abs(p).toFixed(4));

        // Active slide = the one covering the viewport's upper-middle line.
        const anchor = vh * 0.4;
        const dist = r.top <= anchor && r.bottom >= anchor ? 0 : Math.min(Math.abs(r.top - anchor), Math.abs(r.bottom - anchor));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      const max = document.documentElement.scrollHeight - vh;
      document.documentElement.style.setProperty('--scroll', String(max > 0 ? clamp(window.scrollY / max, 0, 1) : 0));

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
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const i = clamp(index, 0, SLIDES.length - 1);
    const el = document.getElementById(SLIDES[i].id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  }, []);

  // Deep links: /#projects opens on that slide (content mounts after the browser's own hash jump).
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (el) requestAnimationFrame(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY }));
  }, []);

  // Keep the URL in sync with the slide on screen, so any slide can be shared.
  useEffect(() => {
    const id = SLIDES[active].id;
    const hash = active === 0 ? '' : `#${id}`;
    if (window.location.hash !== hash) history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.body.dataset.modal === 'open') return;

      if (e.key === 'PageDown' || (e.key === 'ArrowDown' && e.shiftKey)) {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === 'PageUp' || (e.key === 'ArrowUp' && e.shiftKey)) {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  return { active, goTo, next: () => goTo(active + 1), prev: () => goTo(active - 1) };
}
