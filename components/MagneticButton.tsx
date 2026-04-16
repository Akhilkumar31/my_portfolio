'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e?: any) => void;
  'aria-label'?: string;
  style?: CSSProperties;
}

export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  strength = 0.3,
  href,
  target,
  rel,
  onClick,
  style,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(ref.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Component = as;

  return (
    <Component
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...(as === 'a' ? { href, target, rel } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}
