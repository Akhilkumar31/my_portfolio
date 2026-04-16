'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

interface OrbitSkill {
  name: string;
  category: string;
}

const orbits: { ring: number; speed: number; reverse: boolean; skills: OrbitSkill[] }[] = [
  {
    ring: 1,
    speed: 30,
    reverse: false,
    skills: [
      { name: 'Java 17', category: 'Backend' },
      { name: 'Spring Boot', category: 'Backend' },
      { name: 'Kafka', category: 'Messaging' },
      { name: 'PostgreSQL', category: 'Datastores' },
    ],
  },
  {
    ring: 2,
    speed: 25,
    reverse: true,
    skills: [
      { name: 'AWS', category: 'Cloud' },
      { name: 'Kubernetes', category: 'Containers' },
      { name: 'Docker', category: 'Containers' },
      { name: 'Redis', category: 'Datastores' },
      { name: 'gRPC', category: 'Backend' },
    ],
  },
  {
    ring: 3,
    speed: 40,
    reverse: false,
    skills: [
      { name: 'Jenkins', category: 'CI/CD' },
      { name: 'Grafana', category: 'Monitoring' },
      { name: 'Prometheus', category: 'Monitoring' },
      { name: 'Helm', category: 'Containers' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Git', category: 'Tools' },
    ],
  },
  {
    ring: 4,
    speed: 35,
    reverse: true,
    skills: [
      { name: 'Spring Security', category: 'Backend' },
      { name: 'CloudFormation', category: 'Cloud' },
      { name: 'GitHub Actions', category: 'CI/CD' },
      { name: 'Maven', category: 'Build' },
      { name: 'REST APIs', category: 'Backend' },
      { name: 'Protobuf', category: 'Backend' },
      { name: 'MySQL', category: 'Datastores' },
    ],
  },
];

const allSkillCategories = [
  {
    title: 'Backend',
    skills: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'REST APIs', 'gRPC', 'Protobuf', 'JWT', 'Swagger/OpenAPI'],
  },
  { title: 'Messaging', skills: ['Apache Kafka'] },
  { title: 'Datastores', skills: ['PostgreSQL', 'MySQL', 'AWS RDS', 'Redis'] },
  {
    title: 'Cloud & Infrastructure',
    skills: ['AWS EC2', 'AWS S3', 'AWS EKS', 'AWS Lambda', 'CloudFormation', 'CloudWatch', 'IAM', 'Route 53'],
  },
  { title: 'Containers & Orchestration', skills: ['Docker', 'Kubernetes', 'HPA', 'Probes', 'Helm'] },
  { title: 'Build & CI/CD', skills: ['Maven', 'Jenkins', 'GitHub Actions'] },
  { title: 'Frontend', skills: ['JavaScript', 'TypeScript'] },
  { title: 'Monitoring & Ops', skills: ['Prometheus', 'Grafana', 'Linux', 'Git'] },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !orbitContainerRef.current) return;

    gsap.fromTo(
      orbitContainerRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const orbitSizes = [140, 220, 300, 380];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container">
        <TextReveal
          text="Technical Skills"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        {/* Orbit Visualization - Desktop */}
        <div className="hidden md:flex justify-center items-center mb-16">
          <div
            ref={orbitContainerRef}
            className="relative group"
            style={{ width: `${orbitSizes[3] * 2 + 80}px`, height: `${orbitSizes[3] * 2 + 80}px` }}
          >
            {/* Center Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center glass-strong shadow-glow-md">
                <span className="text-xl font-heading font-bold gradient-text">{'</>'}</span>
              </div>
              <div className="absolute inset-0 w-20 h-20 rounded-full animate-glow-pulse opacity-30" style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
            </div>

            {/* Orbit Rings */}
            {orbits.map((orbit, oi) => {
              const size = orbitSizes[oi];
              const animClass = orbit.reverse
                ? (oi === 1 ? 'animate-spin-slow-reverse' : 'animate-spin-slower-reverse')
                : (oi === 0 ? 'animate-spin-slow' : 'animate-spin-slower');

              return (
                <div
                  key={oi}
                  className={`absolute top-1/2 left-1/2 rounded-full border border-white/[0.04] ${animClass} group-hover:[animation-play-state:paused]`}
                  style={{
                    width: `${size * 2}px`,
                    height: `${size * 2}px`,
                    marginLeft: `-${size}px`,
                    marginTop: `-${size}px`,
                  }}
                >
                  {orbit.skills.map((skill, si) => {
                    const angle = (si / orbit.skills.length) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * size;
                    const y = Math.sin(rad) * size;
                    const counterAnimClass = orbit.reverse
                      ? (oi === 1 ? 'animate-spin-slow' : 'animate-spin-slower')
                      : (oi === 0 ? 'animate-spin-slow-reverse' : 'animate-spin-slower-reverse');

                    return (
                      <div
                        key={skill.name}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(${x - 40}px, ${y - 14}px)`,
                        }}
                      >
                        <div
                          className={`${counterAnimClass} group-hover:[animation-play-state:paused]`}
                        >
                          <span
                            className="px-3 py-1.5 rounded-full text-xs font-medium glass whitespace-nowrap text-text-secondary hover:text-accent-blue hover:shadow-glow-sm transition-all duration-300 cursor-default inline-block"
                          >
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Fallback - Categorized Grid */}
        <div className="md:hidden space-y-6">
          {allSkillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-heading font-semibold text-accent-blue uppercase tracking-wider mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm glass text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
