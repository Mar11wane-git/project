import React, { useEffect, useRef, useState } from 'react';

/** PowerPoint slide transitions (Transitions tab): each section gets one. */
export type Transition = 'fade' | 'push' | 'wipe' | 'cube' | 'zoom' | 'split';

interface SlideTransitionProps {
  effect: Transition;
  children: React.ReactNode;
}

/**
 * Plays the section's transition each time it comes onto the screen, like
 * arriving on a new slide. When the section has fully left the screen it is
 * reset, so the transition plays again next time (out of sight: no flicker).
 *
 * Visibility is measured with getBoundingClientRect rather than an
 * IntersectionObserver: the "wipe" / "split" waiting states use clip-path,
 * which IntersectionObserver counts as invisible, so it would never fire.
 */
const SlideTransition: React.FC<SlideTransitionProps> = ({ effect, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let state = false;

    const check = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      let next = state;
      if (visible > Math.min(vh * 0.18, r.height * 0.5)) next = true;
      else if (r.bottom <= 0 || r.top >= vh) next = false;
      if (next !== state) {
        state = next;
        setPlaying(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <div ref={ref} className={`ppt-slide ppt-${effect} ${playing ? 'ppt-play' : ''}`}>{children}</div>;
};

export default SlideTransition;
