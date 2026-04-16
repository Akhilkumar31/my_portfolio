'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsExiting(true);
        setTimeout(onComplete, 600);
      },
    });

    tl.fromTo(
      lettersRef.current.filter(Boolean),
      { y: 60, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.inOut' },
      '-=0.3'
    );

    tl.to(
      lettersRef.current.filter(Boolean),
      {
        y: -40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      },
      '+=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const letters = ['A', 'K', 'P'];

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background ${
        isExiting ? 'preloader-exit' : ''
      }`}
    >
      <div className="flex gap-4 perspective-[800px]" style={{ perspective: '800px' }}>
        {letters.map((letter, i) => (
          <span
            key={letter}
            ref={(el) => { lettersRef.current[i] = el; }}
            className="text-6xl md:text-8xl font-heading font-bold gradient-text inline-block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div
        ref={lineRef}
        className="mt-8 h-[2px] w-48 origin-left"
        style={{
          background:
            'linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)',
          transform: 'scaleX(0)',
        }}
      />
      <p className="mt-4 text-text-muted text-sm tracking-[0.3em] uppercase font-body">
        Software Engineer
      </p>
    </div>
  );
}
