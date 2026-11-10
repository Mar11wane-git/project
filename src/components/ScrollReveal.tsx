import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
}

/**
 * PowerPoint-style entrance animations ("builds"), played once when the block
 * reaches the screen, one after the other thanks to each call's delay:
 *   up    → Fly In from bottom      left / right → Fly In from the side
 *   down  → Wipe (left to right)    none         → Zoom
 * The slide transition of the section plays first, so builds start just after it.
 */
const SLIDE_TRANSITION_LEAD = 250; // ms

const FLY_EASE = 'cubic-bezier(0.22, 1.25, 0.36, 1)'; // smooth end with a light settle, like "Fly In"
const SOFT_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 700,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A clip-path'd element (the Wipe effect) reads as invisible to IntersectionObserver,
    // so for that effect the parent is observed instead.
    const el = direction === 'down' ? ref.current?.parentElement ?? ref.current : ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // once visible, keep it
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [direction]);

  const fly = Math.max(distance * 2.2, 64);
  const wait = delay + SLIDE_TRANSITION_LEAD;
  const dur = Math.max(duration, 750);

  let hidden: React.CSSProperties;
  let ease = FLY_EASE;
  switch (direction) {
    case 'up':
      hidden = { transform: `translate3d(0, ${fly}px, 0)` };
      break;
    case 'left':
      hidden = { transform: `translate3d(${fly * 1.4}px, 0, 0)` };
      break;
    case 'right':
      hidden = { transform: `translate3d(-${fly * 1.4}px, 0, 0)` };
      break;
    case 'down':
      // Wipe: revealed from left to right
      hidden = { clipPath: 'inset(0 100% 0 0)', transform: 'translate3d(-8px, 0, 0)' };
      ease = SOFT_EASE;
      break;
    case 'none':
    default:
      // Zoom
      hidden = { transform: 'scale(0.6)' };
      break;
  }

  const shown: React.CSSProperties = {
    transform: 'translate3d(0, 0, 0)',
    clipPath: direction === 'down' ? 'inset(0 0 0 0)' : undefined,
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        ...(isVisible ? shown : hidden),
        transition: [
          `opacity ${Math.round(dur * 0.6)}ms ease-out ${wait}ms`,
          `transform ${dur}ms ${ease} ${wait}ms`,
          direction === 'down' ? `clip-path ${dur}ms ${SOFT_EASE} ${wait}ms` : '',
        ]
          .filter(Boolean)
          .join(', '),
        willChange: isVisible ? undefined : 'opacity, transform',
      }}
      className={`ppt-build ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
