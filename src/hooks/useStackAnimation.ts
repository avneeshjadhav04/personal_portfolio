import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useStackAnimation(enabled: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!containerRef.current) return;

    // Disable stacking on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>('.stack-group');

      groups.forEach((group) => {
        const cards = gsap.utils.toArray<HTMLElement>('.stack-card', group);

        cards.forEach((card, i) => {
          const inner = card.querySelector('.stack-card-inner');
          if (!inner) return;

          // Entrance animation: subtle rise for each card
          gsap.fromTo(
            inner,
            { y: 30, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top 60%',
                scrub: 0.5,
              },
            }
          );

          // Exit animation: scale down and darken as next card covers it
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];

            gsap.to(inner, {
              scale: 0.92,
              filter: 'brightness(0.55)',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top bottom',
                end: 'top 15%',
                scrub: 0.8,
              },
            });

            // Add a slight blur to the exiting card for depth
            gsap.to(inner, {
              filter: 'brightness(0.55) blur(2px)',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 40%',
                end: 'top 15%',
                scrub: 0.8,
              },
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [enabled]);

  return containerRef;
}
