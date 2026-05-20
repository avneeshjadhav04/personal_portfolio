import { useEffect, useRef } from 'react';

export function useScrollVelocity() {
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    lastTime.current = performance.now();

    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY.current;
        const deltaTime = now - lastTime.current;

        if (deltaTime > 0) {
          velocityRef.current = deltaY / deltaTime;
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

  // Return a frozen snapshot ref value to avoid re-renders
  // Components that need re-renders on velocity should use their own state
  return velocityRef.current;
}

/* Throttled scroll handler for non-animated logic */
export function useThrottledScroll(callback: () => void, delay: number = 100) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) return;
      timeoutRef.current = setTimeout(() => {
        callback();
        timeoutRef.current = null;
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, delay]);
}
