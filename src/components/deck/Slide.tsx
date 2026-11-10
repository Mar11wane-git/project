import React from 'react';
import { SLIDES } from '../../data/portfolio';

interface SlideProps {
  index: number;
  title?: React.ReactNode;
  kicker?: string;
  children: React.ReactNode;
  frame?: boolean;
  className?: string;
  /** Rendered outside the tilting stage (e.g. a scroll cue pinned to the section). */
  extra?: React.ReactNode;
}

/**
 * One "slide" of the deck. The outer section receives --p / --ap from useDeck;
 * the .slide-stage child turns those into a 3D tilt as the slide enters/leaves.
 */
const Slide: React.FC<SlideProps> = ({ index, title, kicker, children, frame = true, className = '', extra }) => {
  const meta = SLIDES[index];
  const num = String(index + 1).padStart(2, '0');
  const total = String(SLIDES.length).padStart(2, '0');

  return (
    <section
      id={meta.id}
      data-slide={index}
      aria-label={meta.label}
      className={`slide relative flex min-h-[100svh] items-center px-4 py-24 sm:px-6 lg:px-10 ${className}`}
    >
      <div className="slide-stage mx-auto w-full max-w-6xl">
        <div className={frame ? 'slide-frame relative rounded-[28px] p-5 sm:p-8 lg:p-12' : 'relative'}>
          {frame && (
            <>
              <span className="frame-corner hidden sm:block left-4 top-4 border-l border-t" aria-hidden />
              <span className="frame-corner hidden sm:block right-4 top-4 border-r border-t" aria-hidden />
              <span className="frame-corner hidden sm:block bottom-4 left-4 border-b border-l" aria-hidden />
              <span className="frame-corner hidden sm:block bottom-4 right-4 border-b border-r" aria-hidden />
            </>
          )}

          {(title || kicker) && (
            <header className="mb-8 sm:mb-12">
              <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <span className="text-lime">{num}</span>
                <span className="h-px w-8 bg-line" />
                <span>{kicker ?? meta.label}</span>
                <span className="ml-auto hidden sm:inline">
                  {num} / {total}
                </span>
              </div>
              {title && (
                <h2 className="reveal-title text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {title}
                </h2>
              )}
            </header>
          )}

          {children}
        </div>
      </div>
      {extra}
    </section>
  );
};

export default Slide;
