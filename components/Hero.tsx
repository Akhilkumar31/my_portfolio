'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Mail, Phone, Linkedin, MapPin, ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ParticleBackground from './ParticleBackground';

const roles = ['Software Engineer', 'Backend Architect', 'Cloud Infrastructure'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 2.8,
      }
    );
  }, []);

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:akhilkumarpuri2@gmail.com',
      label: 'Email',
    },
    {
      icon: Phone,
      href: 'tel:+18565658270',
      label: 'Phone',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/akhilkumarpuri',
      label: 'LinkedIn',
      external: true,
    },
  ];

  const nameChars = 'Akhil Kumar Puri'.split('');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite 2s',
          }}
        />
      </div>

      <ParticleBackground />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-20 h-20 border border-white/5 rounded-full animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-[60%] right-[15%] w-3 h-3 bg-accent-blue/30 rounded-full animate-float"
          style={{ animationDelay: '3s', animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[25%] left-[20%] w-1 h-1 bg-accent-purple/50 rounded-full animate-glow-pulse"
        />
        <div
          className="absolute top-[30%] right-[25%] w-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 animate-float"
          style={{ animationDelay: '2s', animationDuration: '10s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold mb-6 overflow-hidden"
        >
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="char inline-block opacity-0"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Role Morph */}
        <div className="h-12 md:h-14 mb-6 overflow-hidden">
          <motion.p
            key={roleIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xl md:text-3xl font-heading font-medium text-text-secondary"
          >
            {roles[roleIndex]}
          </motion.p>
        </div>

        {/* Specialization */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="text-base md:text-lg text-text-muted mb-10 max-w-2xl mx-auto"
        >
          Specializing in Java, Spring Boot Microservices, Apache Kafka & Cloud
          Infrastructure
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-white/10 transition-all duration-300 hover:shadow-glow-sm"
                aria-label={link.label}
              >
                <Icon
                  size={20}
                  className="text-text-secondary group-hover:text-accent-blue transition-colors"
                />
              </MagneticButton>
            );
          })}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-text-muted text-sm"
        >
          <MapPin size={14} className="text-accent-blue" />
          <span>Glassboro, NJ, USA</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
