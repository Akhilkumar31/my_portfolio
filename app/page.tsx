'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ArrowUp } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>

          <footer className="relative border-t border-white/5 py-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-xl font-heading font-bold gradient-text">
                AKP
              </span>
              <p className="text-text-muted text-sm">
                &copy; {new Date().getFullYear()} Akhil Kumar Puri. All rights
                reserved.
              </p>
              <MagneticButton
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow-sm transition-shadow"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} className="text-text-muted" />
              </MagneticButton>
            </div>
          </footer>
        </SmoothScroll>
      )}
    </>
  );
}
