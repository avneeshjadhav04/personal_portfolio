import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: 'HackerRank Golden Badges',
    description:
      '5-star golden badges in Problem Solving, C++, Java, and Python. Plus 30 Days of Code completion badge.',
    image: '/hackerrank.png',
    link: 'https://www.hackerrank.com/profile/avneeshjadhav1',
    label: 'Competitive Programming',
  },
  {
    title: 'LeetCode Milestone',
    description:
      '279 problems solved across Easy, Medium, and Hard difficulty levels. Consistent daily practice demonstrating strong DSA fundamentals.',
    image: '/leetcode.png',
    link: 'https://leetcode.com/u/avneeshjadhav/',
    label: 'Data Structures & Algorithms',
  },
  {
    title: 'ICTIS Bangkok 2025',
    description:
      'Research paper selected for the 11th International Conference on Transportation Information and Safety (ICTIS) in Bangkok, Thailand.',
    image: '/conference-1.jpg',
    link: null,
    label: 'Research & Academia',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[12px] font-mono-accent uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            Proof of Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-primary mb-4 uppercase">
            Achievements & <span className="text-gradient-alt">Credentials.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Verified proof of consistent effort, competitive programming excellence,
            and academic research.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className="achievement-card group bg-background border border-border overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-light border-b border-border">
                <img
                  src={ach.image}
                  alt={ach.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-none text-[10px] font-mono-accent font-bold bg-background border border-border text-text-primary uppercase tracking-widest shadow-sm">
                    {ach.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-none bg-surface border border-text-primary/10 shrink-0">
                    <Award size={20} className="text-text-primary" />
                  </div>
                  {ach.link && (
                    <a
                      href={ach.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors hover-lift"
                      aria-label={`View ${ach.title}`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 uppercase tracking-tight">{ach.title}</h3>
                <p className="text-base text-text-secondary leading-relaxed font-light">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
