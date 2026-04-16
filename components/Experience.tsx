'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Informatica',
    role: 'Software Engineer',
    duration: 'Sep 2022 – Dec 2023',
    achievements: [
      'Streamed domain events through Apache Kafka into Spring Boot microservices, using Protobuf contracts and idempotent consumers to maintain data consistency across PostgreSQL and Redis projections.',
      'To support a new data integration workflow, designed Java 17-based REST APIs with clear resource modeling and Swagger/OpenAPI documentation for downstream platform teams.',
      'Inherited a monolithic ingestion service and decomposed it into Kubernetes-deployed Spring Boot microservices, with EKS-based service discovery and isolated scaling policies per workload.',
      'Given strict SLAs on transformation latency, tuned PostgreSQL queries, refined indexing, and added Redis caching, dropping p95 API response time by roughly 120 ms under load.',
      'Persistent connection failures to partner systems led to a new circuit breaker and retry strategy in a shared Spring Boot client, using backoff and request collapsing to reduce cascading failures.',
      'Configured Jenkins and GitHub Actions pipelines to build Docker images, run integration tests against ephemeral EC2 environments, and push versioned artifacts for Helm-based deployments to EKS.',
    ],
  },
  {
    company: 'Wing Communications',
    role: 'Software Engineer',
    duration: 'Oct 2020 – Aug 2022',
    achievements: [
      'Inherited a tangled Java 17 service layer and refactored core modules into smaller Spring Boot components, clarifying domain boundaries and simplifying integration with PostgreSQL and MySQL schemas.',
      'During a reliability push for messaging features, implemented idempotent message handling with Kafka and gRPC so duplicate deliveries did not corrupt transactional data in RDS PostgreSQL.',
      'Spent days tracing an intermittent timeout in a REST endpoint, walking the stack from EKS pod logs through JDBC connection pooling to a missing composite index in MySQL.',
      'Given strict latency budgets on notification APIs, tuned SQL queries, adjusted Redis usage for caching, and profiled Spring Boot controllers to keep P95 under 180 ms for peak hours.',
      'Dockerized Java microservices for EKS, wired CI pipelines in Jenkins and GitHub Actions, and used CloudWatch with custom metrics to monitor deployment health and basic backpressure behavior.',
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      }
    );

    cardsRef.current.filter(Boolean).forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          y: 0,
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    dotsRef.current.filter(Boolean).forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
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
      id="experience"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="section-container">
        <TextReveal
          text="Work Experience"
          as="h2"
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] overflow-hidden">
            <div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, #00d4ff 0%, #7c3aed 50%, #ec4899 100%)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`relative mb-16 last:mb-0 pl-12 md:pl-0 ${
                index % 2 === 0
                  ? 'md:pr-[calc(50%+2rem)] md:text-right'
                  : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Timeline Dot */}
              <div
                ref={(el) => { dotsRef.current[index] = el; }}
                className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-6 z-10"
              >
                <div className="w-3 h-3 rounded-full bg-accent-blue shadow-glow-sm" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent-blue animate-ping-slow opacity-30" />
              </div>

              {/* Card */}
              <div ref={(el) => { cardsRef.current[index] = el; }}>
                <GlowCard className="p-6 md:p-8" tilt>
                  <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
                      {exp.company}
                    </h3>
                    <p className="text-accent-blue font-medium">{exp.role}</p>
                    <span className="inline-block px-3 py-1 rounded-full glass text-text-muted text-sm w-fit">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className={`space-y-3 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/50 mt-2 flex-shrink-0" />
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
