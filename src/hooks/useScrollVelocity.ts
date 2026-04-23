import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    lastTime.current = Date.now();

    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY.current;
        const deltaTime = now - lastTime.current;

        if (deltaTime > 0) {
          const v = deltaY / deltaTime;
          setVelocity(v);
        }

        lastScrollY.current = currentScrollY;
        lastTime.current = now;
        rafId.current = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return velocity;
}
