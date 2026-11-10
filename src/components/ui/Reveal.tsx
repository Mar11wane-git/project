import React, { useEffect, useRef, useState } from 'react';

type Effect = 'rise' | 'flip' | 'left' | 'right' | 'zoom';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  effect?: Effect;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/** Presentation-style "build": content animates in (once) when it enters the viewport. */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, effect = 'rise', className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${effect} ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
