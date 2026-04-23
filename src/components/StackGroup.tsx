import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StackGroup({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return; // Disable stacking on mobile

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card', containerRef.current!);

      cards.forEach((card, i) => {
        const inner = card.querySelector('.stack-card-inner');
        const nextCard = cards[i + 1];
        const isLast = !nextCard;

        if (!isLast && inner) {
          // Covered card: scale down + darken as next card slides over
          gsap.to(inner, {
            scale: 0.9,
            filter: 'brightness(0.5)',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.8,
            },
          });
        }

        if (inner) {
          // Entering card: subtle upward motion as it comes into view
          gsap.fromTo(
            inner,
            { y: 40 },
            {
              y: 0,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top center',
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="stack-group">
      {children}
    </div>
  );
}
