'use client';

import { useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(0, 212, 255, 0.15)',
  tilt = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowRef.current.style.opacity = '1';
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`;

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = '0';

    if (tilt && cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden glass rounded-2xl transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
