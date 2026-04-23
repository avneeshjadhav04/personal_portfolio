import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   CARD 1 — Diagnostic Shuffler
   ============================================ */
const shufflerLabels = [
  'Autonomous Agents',
  'Workflow Automation',
  'Intelligent Pipelines',
];

function DiagnosticShuffler() {
  const [items, setItems] = useState(shufflerLabels);
  const containerRef = useRef<HTMLDivElement>(null);

  const cycle = useCallback(() => {
    setItems((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(cycle, 3000);
    return () => clearInterval(interval);
  }, [cycle]);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.shuffle-card');
    if (!cards) return;
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.08,
      }
    );
  }, [items]);

  return (
    <div ref={containerRef} className="relative h-64 flex items-center justify-center bg-surface border-t border-border">
      {items.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className="shuffle-card absolute w-64 md:w-72 px-6 py-6 bg-background border border-text-primary/10 shadow-lg flex items-center justify-center text-center"
          style={{
            zIndex: items.length - i,
            transform: `translateY(${i * 12}px) scale(${1 - i * 0.04})`,
            opacity: 1 - i * 0.15,
          }}
        >
          <span className="text-sm md:text-base font-bold text-text-primary uppercase tracking-wide">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================
   CARD 2 — Telemetry Typewriter
   ============================================ */
const telemetryMessages = [
  'Initializing RAG pipeline...',
  'Embedding vector space: 4096d',
  'Model checkpoint loaded: v2.1.4',
  'Token throughput: 1,240 tok/s',
  'Fine-tuning epoch 12/50...',
  'Deploying inference cluster...',
];

function TelemetryTypewriter() {
  const [display, setDisplay] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = telemetryMessages[msgIndex];
    const speed = deleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex((c) => c + 1);
          setDisplay(current.slice(0, charIndex + 1));
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
          setDisplay(current.slice(0, charIndex - 1));
        } else {
          setDeleting(false);
          setMsgIndex((i) => (i + 1) % telemetryMessages.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, msgIndex]);

  return (
    <div className="h-64 flex flex-col justify-center px-8 bg-text-primary text-surface border-t border-border">
      <div className="mb-6 flex items-center gap-3">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <span className="text-[10px] font-mono-accent uppercase tracking-widest text-surface/70">
          Live Feed
        </span>
      </div>
      <div className="font-mono-accent text-sm md:text-base text-accent leading-relaxed min-h-[3.5rem]">
        {display}
        <span className="inline-block w-[2px] h-5 bg-accent ml-1 animate-[pulse_1s_infinite] align-middle" />
      </div>
      <div className="mt-8 flex gap-2">
        {telemetryMessages.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] transition-all duration-300 ${
              i === msgIndex ? 'w-8 bg-accent' : 'w-4 bg-surface/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================
   FEATURES SECTION
   ============================================ */
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-block',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      id: '01',
      title: 'AI Automation',
      desc: 'Building autonomous agents and intelligent pipelines that eliminate manual bottlenecks.',
      visual: <DiagnosticShuffler />,
    },
    {
      id: '02',
      title: 'Machine Learning',
      desc: 'Designing and deploying ML models, NLP systems, and vector-driven knowledge engines.',
      visual: <TelemetryTypewriter />,
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-32 md:py-48 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <span className="text-[12px] font-mono-accent uppercase tracking-[0.3em] text-text-secondary mb-6 block border-l-2 border-accent pl-4">
            What I Do
          </span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-text-primary uppercase leading-[0.9]">
            My <br /> <span className="text-gradient-alt">Expertise.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-block border border-border bg-surface flex flex-col hover:shadow-2xl hover:shadow-accent/5 transition-shadow duration-500"
            >
              <div className="p-8 md:p-12 flex-grow">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-5xl font-serif italic text-text-secondary/30">
                    {feature.id}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
              {feature.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
