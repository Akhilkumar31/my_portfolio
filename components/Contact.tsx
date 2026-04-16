'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin, Copy, Check } from 'lucide-react';
import GlowCard from './GlowCard';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'akhilkumarpuri2@gmail.com',
    href: 'mailto:akhilkumarpuri2@gmail.com',
    copyable: true,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (856) 565-8270',
    href: 'tel:+18565658270',
    copyable: false,
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/akhilkumarpuri',
    href: 'https://linkedin.com/in/akhilkumarpuri',
    copyable: false,
    external: true,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('akhilkumarpuri2@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative">
        <TextReveal
          text="Let's Connect"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        <div ref={cardRef} className="max-w-2xl mx-auto">
          <GlowCard className="p-8 md:p-12" tilt glowColor="rgba(124, 58, 237, 0.12)">
            <p className="text-text-secondary text-center mb-8 text-lg">
              Interested in working together? Let&apos;s talk.
            </p>

            <div className="space-y-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:shadow-glow-sm transition-shadow duration-300">
                      <Icon
                        size={20}
                        className="text-text-muted group-hover:text-accent-blue transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        {method.title}
                      </p>
                      <MagneticButton
                        as="a"
                        href={method.href}
                        target={method.external ? '_blank' : undefined}
                        rel={method.external ? 'noopener noreferrer' : undefined}
                        className="text-text-primary hover:text-accent-blue transition-colors text-sm md:text-base truncate block"
                        strength={0.15}
                      >
                        {method.value}
                      </MagneticButton>
                    </div>
                    {method.copyable && (
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                        aria-label="Copy email"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-text-muted" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <MagneticButton
                as="a"
                href="mailto:akhilkumarpuri2@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading font-semibold text-white transition-all duration-300 hover:shadow-glow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #00d4ff, #7c3aed)',
                }}
              >
                <Mail size={18} />
                Send Email
              </MagneticButton>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
