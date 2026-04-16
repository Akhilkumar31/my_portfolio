'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }

    if (arcRef.current) {
      const circumference = 2 * Math.PI * 54;
      const progress = 3.9 / 4.0;
      const offset = circumference * (1 - progress);

      gsap.fromTo(
        arcRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const circumference = 2 * Math.PI * 54;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="section-container">
        <TextReveal
          text="Education"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        <div ref={cardRef} className="max-w-2xl mx-auto">
          <GlowCard className="p-8 md:p-12" tilt>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* GPA Arc */}
              <div className="relative flex-shrink-0">
                <svg width="130" height="130" viewBox="0 0 120 120" className="-rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="6"
                  />
                  {/* Progress arc */}
                  <circle
                    ref={arcRef}
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gpaGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                  />
                  <defs>
                    <linearGradient id="gpaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-text-primary">
                    3.9
                  </span>
                  <span className="text-xs text-text-muted">/ 4.0</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <div className="text-3xl mb-3 animate-float" style={{ animationDuration: '4s' }}>
                  🎓
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                  Rowan University
                </h3>
                <p className="text-lg text-accent-blue font-semibold mb-3">
                  MS in Computer Science
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full glass text-text-muted text-sm">
                  Jan 2024 – Dec 2025
                </span>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
