import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';
import SlideTransition from './components/SlideTransition';

function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const handleOpenCV = () => setIsCVModalOpen(true);
  const handleCloseCV = () => setIsCVModalOpen(false);

  return (
    <div className="min-h-screen bg-[#0D100E] text-slate-100 flex flex-col selection:bg-[#dfff5b]/25 selection:text-[#dfff5b] relative overflow-x-hidden">
      {/* Navigation Header with Slide Indicator */}
      <Header onOpenCV={handleOpenCV} />

      {/* Main Presentation Slides */}
      <main className="flex-grow">
        <SlideTransition effect="fade"><Hero onOpenCV={handleOpenCV} /></SlideTransition>
        <SlideTransition effect="push"><About /></SlideTransition>
        <SlideTransition effect="wipe"><Experience /></SlideTransition>
        <SlideTransition effect="cube"><Projects /></SlideTransition>
        <SlideTransition effect="zoom"><Skills /></SlideTransition>
        <SlideTransition effect="split"><Contact /></SlideTransition>
      </main>

      {/* Footer */}
      <Footer />

      {/* Curriculum Vitae Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={handleCloseCV} />
    </div>
  );
}

export default App;
