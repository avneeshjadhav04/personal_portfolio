import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[5]"
      animate={{
        x: position.x - 150,
        y: position.y - 150,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)',
      }}
    />
  );
}
