import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   SVG ANIMATION — Scanning Laser Line
   ============================================ */
function LaserScan() {
  const lineRef = useRef<SVGLineElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        attr: { x1: 400, x2: 400 },
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      const dots = dotsRef.current?.querySelectorAll('circle');
      if (dots) {
        gsap.to(dots, {
          opacity: (i: number) => (i % 3 === 0 ? 0.6 : 0.15),
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const dots = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={30 + col * 30}
          cy={30 + row * 30}
          r="2"
          fill="#3333FF"
          opacity="0.15"
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g ref={dotsRef}>{dots}</g>
      <line
        ref={lineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="300"
        stroke="#3333FF"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  );
}

/* ============================================
   VIDEO COMPONENT — Controlled by ScrollTrigger
   ============================================ */
function AutoPlayVideo({ src }: { src: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        src={src}
        loop
        playsInline
        controls
        className="max-w-[85%] max-h-[85%] object-contain"
      />
    </div>
  );
}

/* ============================================
   PROTOCOL SECTION (Renamed to Projects)
   ============================================ */
const protocols = [
  {
    step: '01',
    title: 'Project Vulcan: AI Assistant',
    description:
      'An open-source platform that helps you operate AI with terminal-level access for your daily workflows, making them simpler, more secure, and self-hosted.',
    tags: ['TypeScript', 'React', 'Rust', 'Axum', 'SQLite', 'AI'],
    visual: <AutoPlayVideo src="/project-vulcan.mp4" />,
    link: 'https://project-vulcan.onrender.com/',
  },
  {
    step: '02',
    title: 'Kovero AI: AI Powered Healthcare Claims Assistance Platform',
    description:
      'A full-fledged user-centric insurance claims assistance platform that simplifies finding the right health policies and helps users prepare for claims. Integrates AI using OCR and transformer-based LLMs for document verification and query resolution.',
    tags: ['Next.js', 'React', 'TypeScript', 'Rust', 'Axum', 'SQLite', 'Docker', 'AI'],
    visual: <AutoPlayVideo src="/kovero-ai.mp4" />,
    link: 'https://koveroai-alpha.onrender.com/',
  },
  {
    step: '03',
    title: 'Lead Generation System',
    description:
      'A fully automated outreach engine that identifies prospects, personalizes messaging, and manages follow-ups.',
    tags: ['AI Agents', 'APIs', 'Python', 'Automation'],
    visual: <LaserScan />,
  },
];

export default function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: isLast ? '+=50%' : 'bottom top',
          pin: true,
          pinSpacing: isLast,
          scrub: true,
          onUpdate: (self) => {
            const prev = cards[i - 1];
            const progress = self.progress;

            // Animate previous card (scale, blur, fade)
            if (prev) {
              gsap.set(prev, {
                scale: 1 - progress * 0.05,
                filter: `blur(${progress * 10}px)`,
                opacity: 1 - progress * 0.3,
              });
            }

            // Video playback control — only the fully-visible card plays
            cards.forEach((c) => {
              const v = c.querySelector('video') as HTMLVideoElement | null;
              if (v) v.pause();
            });

            const currentVideo = card.querySelector('video') as HTMLVideoElement | null;
            if (currentVideo && progress < 0.05) {
              currentVideo.play();
            }
          },
        });
      });
    }, sectionRef);

    // Section-level trigger: pause all videos when user scrolls away from Protocol entirely
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => {
        cardsRef.current.forEach((card) => {
          const video = card.querySelector('video') as HTMLVideoElement | null;
          if (video) video.pause();
        });
      },
      onLeaveBack: () => {
        cardsRef.current.forEach((card) => {
          const video = card.querySelector('video') as HTMLVideoElement | null;
          if (video) video.pause();
        });
      },
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-background">
      <div className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-[12px] font-mono-accent uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-4 uppercase">
            Selected <span className="text-gradient">Projects.</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-xl mx-auto leading-relaxed font-light">
            Real-world systems solving real problems using AI.
          </p>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className="relative">
        {protocols.map((protocol, i) => (
          <div
            key={protocol.step}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="w-full min-h-[100dvh] flex items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-5xl rounded-none bg-surface border border-border overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Visual Side */}
                <div className="relative h-64 md:h-auto md:min-h-[500px] flex items-center justify-center overflow-hidden border-r border-border">
                  <div className="absolute inset-0">
                    {protocol.visual}
                  </div>
                  <div className="relative z-10">
                    <span className="text-8xl md:text-9xl font-bold text-text-primary/5">
                      {protocol.step}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-[10px] font-mono-accent uppercase tracking-[0.25em] text-text-secondary mb-4 block">
                    Project {protocol.step}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 tracking-tight uppercase">
                    {protocol.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-8 font-light">
                    {protocol.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {protocol.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-mono-accent font-medium bg-surface border border-text-primary/20 text-text-primary uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {protocol.link && (
                    <a
                      href={protocol.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-text-primary text-surface font-mono-accent text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
