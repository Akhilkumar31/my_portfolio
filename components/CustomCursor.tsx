'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    const addLinkListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
      return interactives;
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactives = addLinkListeners();

    const observer = new MutationObserver(() => {
      addLinkListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: isHovering ? 'width 0.3s, height 0.3s' : undefined,
          width: isHovering ? '4px' : '8px',
          height: isHovering ? '4px' : '8px',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering
            ? 'rgba(0, 212, 255, 0.5)'
            : 'rgba(0, 212, 255, 0.25)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
