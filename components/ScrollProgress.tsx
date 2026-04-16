'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9997] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
        }}
      />
    </div>
  );
}
