import { useCallback, useEffect, useState } from 'react';
import { SLIDES } from '../data/portfolio';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Gentle ease so a slide starts and settles softly instead of moving linearly.
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Drives the presentation: tilts each slide's .slide-stage in 3D as it enters /
 * leaves (written straight to style.transform: no inherited CSS variables, so a
 * scroll frame never restyles the whole page), tracks the active slide and
 * exposes goTo with keyboard shortcuts.
 */
export function useDeck() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    let current = -1;
    const last = new WeakMap<HTMLElement, string>();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const progress = document.getElementById('deck-progress');

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;
      const rx = mobile ? 4 : 7; // deg
      const tz = mobile ? -50 : -110; // px
      const slides = document.querySelectorAll<HTMLElement>('[data-slide]');
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        let p = 0;
        if (r.top > 0 && r.bottom > vh) p = clamp(r.top / vh, 0, 1);
        else if (r.bottom < vh && r.top < 0) p = -clamp((vh - r.bottom) / vh, 0, 1);

        const stage = el.firstElementChild as HTMLElement | null;
        if (stage) {
          const a = reduce.matches ? 0 : smooth(Math.abs(p));
          const s = Math.sign(p);
          const key = a < 0.002 ? '0' : a.toFixed(3) + s;
          if (last.get(stage) !== key) {
            last.set(stage, key);
            if (key === '0') {
              stage.style.transform = '';
              stage.style.opacity = '';
              stage.style.willChange = '';
            } else {
              stage.style.transform = `translate3d(0, ${(s * a * vh * 0.05).toFixed(1)}px, ${(a * tz).toFixed(1)}px) rotateX(${(s * a * rx).toFixed(2)}deg)`;
              stage.style.opacity = (1 - a * 0.45).toFixed(3);
              stage.style.willChange = 'transform, opacity';
            }
          }
        }

        // Active slide = the one covering the viewport's upper-middle line.
        const anchor = vh * 0.4;
        const dist = r.top <= anchor && r.bottom >= anchor ? 0 : Math.min(Math.abs(r.top - anchor), Math.abs(r.bottom - anchor));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      if (progress) {
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${(max > 0 ? clamp(window.scrollY / max, 0, 1) : 0).toFixed(4)})`;
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
