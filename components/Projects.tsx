'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Job Application Tracker',
    duration: 'Jun 2025 - Dec 2025',
    description: [
      'Developed a backend using Spring Boot 3 with PostgreSQL and Flyway for versioned migrations, integrating OpenAI for resume-to-job description keyword analysis, handling API key absence gracefully.',
      'Created a frontend with React.js and TypeScript, utilizing Vite and Tailwind CSS; built a Chrome Extension that injects a content script into job portals to pull job data into the tracker via a REST API.',
    ],
    tech: [
      'Spring Boot 3',
      'PostgreSQL',
      'React',
      'TypeScript',
      'OpenAI',
      'Chrome Extension',
    ],
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-blue-500/20',
    accentColor: '#10b981',
  },
  {
    title: 'KVStore-cpp',
    duration: 'Sep 2025 - Oct 2025',
    description: [
      'Built a Redis-compatible in-memory store in C++17, featuring a custom TCP server, gRPC binary framing, and implemented POSIX threads with reader-writer locks for concurrency.',
      'Implemented TTL expiry and AOF persistence with fsync, along with startup log replay for crash recovery; set up GitHub Actions for CI testing on every push.',
    ],
    tech: [
      'C++17',
      'gRPC',
      'POSIX Threads',
      'Redis Protocol',
      'GitHub Actions',
    ],
    gradient: 'from-orange-500/20 via-red-500/10 to-purple-500/20',
    accentColor: '#f97316',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.filter(Boolean).forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: 5 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="section-container">
        <TextReveal
          text="Projects"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{ perspective: '1000px' }}
            >
              <GlowCard
                className="overflow-hidden"
                tilt
                glowColor={
                  index === 0
                    ? 'rgba(16, 185, 129, 0.12)'
                    : 'rgba(249, 115, 22, 0.12)'
                }
              >
                {/* Gradient Header */}
                <div
                  className={`h-32 md:h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  {/* Decorative grid pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute bottom-4 left-8 text-5xl md:text-6xl font-heading font-bold opacity-10 text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-heading font-bold text-text-primary">
                      {project.title}
                    </h3>
                    <span className="text-sm text-text-muted font-medium whitespace-nowrap">
                      {project.duration}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {project.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold glass text-text-secondary"
                        style={{
                          borderColor: `${project.accentColor}20`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
