import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute top-[80dvh] left-0 w-full h-[1px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo(0)}
            className="text-xl font-bold tracking-tighter text-text-primary uppercase bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
          >
            Avneesh.
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide uppercase text-text-secondary hover:text-text-primary transition-colors duration-300 relative group bg-transparent border-none cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/cv.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-none border border-text-primary text-xs font-semibold uppercase tracking-widest text-text-primary hover:bg-text-primary hover:text-surface transition-colors duration-300"
          >
            Download CV
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text-primary p-2 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full left-0 w-full bg-surface border-b border-border p-6 shadow-xl md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl font-bold uppercase tracking-tighter text-text-primary hover:text-accent transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
                <a
                  href="/cv.pdf"
                  download
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-none bg-text-primary text-surface font-semibold uppercase tracking-widest"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
