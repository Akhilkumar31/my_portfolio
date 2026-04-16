'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'chars' | 'words';
  stagger?: number;
  className?: string;
  delay?: number;
  scrollTrigger?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = 'h2',
  animation = 'words',
  stagger = 0.03,
  className = '',
  delay = 0,
  scrollTrigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = elementsRef.current.filter(Boolean);
    if (elements.length === 0) return;

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
      delay,
    };

    if (scrollTrigger) {
      animConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      };
    }

    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      animConfig
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [text, stagger, delay, scrollTrigger]);

  const renderContent = () => {
    if (animation === 'chars') {
      const words = text.split(' ');
      let charIndex = 0;
      return words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => {
            const idx = charIndex++;
            return (
              <span
                key={`${wi}-${ci}`}
                ref={(el) => { elementsRef.current[idx] = el; }}
                className="inline-block"
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
          {(() => { if (wi < words.length - 1) charIndex++; return null; })()}
        </span>
      ));
    }

    return text.split(' ').map((word, i) => (
      <span
        key={i}
        ref={(el) => { elementsRef.current[i] = el; }}
        className="inline-block mr-[0.3em]"
      >
        {word}
      </span>
    ));
  };

  return (
    <Tag ref={containerRef as React.Ref<never>} className={`overflow-hidden ${className}`}>
      {renderContent()}
    </Tag>
  );
}
