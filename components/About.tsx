'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  'Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL', 'AWS',
  'Kubernetes', 'Docker', 'Redis', 'gRPC', 'Jenkins',
  'Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL', 'AWS',
  'Kubernetes', 'Docker', 'Redis', 'gRPC', 'Jenkins',
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const gpaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );

    if (counterRef.current) {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 3,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = Math.floor(counter.val).toString();
        },
      });
    }

    if (gpaRef.current) {
      const gpa = { val: 0 };
      gsap.to(gpa, {
        val: 3.9,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gpaRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (gpaRef.current)
            gpaRef.current.textContent = gpa.val.toFixed(1);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container">
        <TextReveal
          text="About Me"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {/* Profile Summary - Large card */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="md:col-span-2 md:row-span-2"
          >
            <GlowCard className="h-full p-8" tilt>
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Who I Am
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Software engineer with 3+ years of experience building reliable backend
                systems. I focus on Java 17, Spring Boot microservices, event-driven
                architectures with Apache Kafka, and cloud-native deployments on AWS and
                Kubernetes.
              </p>
              <p className="text-text-muted leading-relaxed">
                I enjoy tracing issues through distributed systems, designing clear data
                contracts, and making production behavior observable and controlled.
              </p>
            </GlowCard>
          </div>

          {/* Location Card */}
          <div ref={(el) => { cardsRef.current[1] = el; }}>
            <GlowCard className="h-full p-6 flex flex-col items-center justify-center text-center" tilt>
              <div className="relative mb-3">
                <div className="w-3 h-3 bg-accent-blue rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-accent-blue rounded-full animate-ping-slow opacity-40" />
                <div className="absolute -inset-2 w-7 h-7 border border-accent-blue/20 rounded-full animate-ping-slow opacity-20" style={{ animationDelay: '0.5s' }} />
              </div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                Glassboro, NJ
              </p>
              <p className="text-sm text-text-muted">United States</p>
            </GlowCard>
          </div>

          {/* Years Experience */}
          <div ref={(el) => { cardsRef.current[2] = el; }}>
            <GlowCard className="h-full p-6 flex flex-col items-center justify-center text-center" tilt>
              <span
                ref={counterRef}
                className="text-5xl font-heading font-bold gradient-text"
              >
                0
              </span>
              <p className="text-sm text-text-muted mt-2">Years Experience</p>
            </GlowCard>
          </div>

          {/* Tech Marquee - Wide card */}
          <div
            ref={(el) => { cardsRef.current[3] = el; }}
            className="md:col-span-2"
          >
            <GlowCard className="h-full p-6 overflow-hidden">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-3">
                Tech Stack
              </p>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee gap-3">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 text-text-secondary border border-white/5 whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[rgba(18,18,26,1)] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[rgba(18,18,26,1)] to-transparent pointer-events-none z-10" />
              </div>
            </GlowCard>
          </div>

          {/* GPA Card */}
          <div ref={(el) => { cardsRef.current[4] = el; }}>
            <GlowCard className="h-full p-6 flex flex-col items-center justify-center text-center" tilt>
              <span
                ref={gpaRef}
                className="text-4xl font-heading font-bold text-accent-blue"
              >
                0.0
              </span>
              <p className="text-sm text-text-muted mt-1">GPA / 4.0</p>
              <p className="text-xs text-text-muted mt-1">MS in CS</p>
            </GlowCard>
          </div>

          {/* Education Quick Card */}
          <div ref={(el) => { cardsRef.current[5] = el; }}>
            <GlowCard className="h-full p-6 flex flex-col items-center justify-center text-center" tilt>
              <div className="text-3xl mb-2 animate-float" style={{ animationDuration: '4s' }}>
                🎓
              </div>
              <p className="text-sm font-heading font-semibold text-text-primary">
                Rowan University
              </p>
              <p className="text-xs text-text-muted mt-1">Jan 2024 - Dec 2025</p>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
