import { useCallback, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';
import { useSections } from './hooks/useSections';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { active, scrolled } = useSections();
  const { theme, setTheme } = useTheme();
  const openCV = useCallback(() => setIsCVOpen(true), []);
  const closeCV = useCallback(() => setIsCVOpen(false), []);

  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-ink">
      <Header active={active} scrolled={scrolled} theme={theme} onTheme={setTheme} />
      <main>
        <Hero onOpenCV={openCV} />
        <About />
        <Experience onOpenCV={openCV} />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CVModal isOpen={isCVOpen} onClose={closeCV} />
    </div>
  );
}

export default App;
