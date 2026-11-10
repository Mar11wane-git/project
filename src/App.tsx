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
import { useDeck } from './hooks/useDeck';

function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { active, goTo } = useDeck();
  const openCV = () => setIsCVOpen(true);
  const closeCV = useCallback(() => setIsCVOpen(false), []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="stage-bg" aria-hidden>
        <div className="stage-grid" />
      </div>

      <Header active={active} goTo={goTo} onOpenCV={openCV} />

      <main className="relative z-10">
        <Hero onOpenCV={openCV} goTo={goTo} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer goTo={goTo} />

      <CVModal isOpen={isCVOpen} onClose={closeCV} />
    </div>
  );
}

export default App;
