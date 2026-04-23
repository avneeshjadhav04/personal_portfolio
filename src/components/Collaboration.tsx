import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Briefcase, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Project',
    icon: Zap,
    description: 'One-off builds, prototypes, and MVPs. Ideal for validating an AI idea or automating a specific workflow.',
    features: ['Scoping & architecture', 'Prototype delivery', '2 revision cycles', 'Code handoff'],
    cta: 'Start a Project',
    featured: false,
  },
  {
    name: 'Retainer',
    icon: Briefcase,
    description: 'Ongoing AI automation and system improvements. A true extension of your engineering team.',
    features: [
      'Monthly deliverables',
      'Priority support',
      'Continuous optimization',
      'Weekly standups',
    ],
    cta: 'Discuss Retainer',
    featured: true,
  },
  {
    name: 'Full-Time',
    icon: Building2,
    description: 'Dedicated AI Engineering role. Deep integration into your product and long-term roadmap.',
    features: ['Full product ownership', 'Team leadership', 'R&D initiatives', 'Strategic input'],
    cta: 'Schedule Interview',
    featured: false,
  },
];

export default function Collaboration() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tier-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="collaboration" ref={sectionRef} className="py-24 md:py-32 px-6 relative bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[12px] font-mono-accent uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            Collaboration
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-primary mb-4 uppercase">
            Let's <span className="text-gradient">Work Together.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed font-light">
            Flexible engagement models. Choose what fits your timeline, budget, and ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`tier-card relative flex flex-col p-10 transition-all duration-500 ${
                  tier.featured
                    ? 'bg-background border-2 border-text-primary shadow-2xl scale-[1.02] md:scale-[1.05] z-10'
                    : 'bg-background border border-border shadow-md'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-glow" />
                )}

                <div className="mb-8">
                  <div
                    className={`w-14 h-14 rounded-none flex items-center justify-center mb-6 border ${
                      tier.featured
                        ? 'bg-surface border-text-primary text-text-primary'
                        : 'bg-surface border-border text-text-secondary'
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight">{tier.name}</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-light">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-medium text-text-primary">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          tier.featured ? 'bg-accent' : 'bg-text-secondary/30'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:avneeshjadhav1@gmail.com"
                  className={`inline-flex items-center justify-center gap-3 w-full px-6 py-4 rounded-none text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    tier.featured
                      ? 'bg-text-primary text-surface hover:bg-accent hover:text-white hover:border-accent border border-text-primary'
                      : 'bg-surface border border-text-primary/20 text-text-primary hover:border-text-primary'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Direct contact row */}
        <div className="mt-24 text-center">
          <p className="text-text-secondary text-sm mb-6 uppercase tracking-widest font-mono-accent">
            Prefer to reach out directly?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="mailto:avneeshjadhav1@gmail.com"
              className="text-text-primary font-bold text-xl md:text-3xl link-underline hover-lift"
            >
              avneeshjadhav1@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
