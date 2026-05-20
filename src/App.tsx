import { useState } from 'react';
import './index.css';
import SmoothScrollProvider from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Skills from './components/Skills';
import Protocol from './components/Protocol';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-background text-text-primary selection:bg-accent/30">
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
        {/* Vivid Gradient Background Mesh */}
        <div className="gradient-mesh">
          <div className="gradient-blob blob-1" />
          <div className="gradient-blob blob-2" />
          <div className="gradient-blob blob-3" />
        </div>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider" />
          <Features />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Philosophy />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Protocol />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <Achievements />
          <div className="section-divider" />
          <Certifications />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
