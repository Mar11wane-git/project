import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              MAROUANE EL HAMDAOUI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(['hero', 'about', 'skills', 'projects', 'contact'][index])}
                className="hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-4">
            {['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(['hero', 'about', 'skills', 'projects', 'contact'][index])}
                className="block w-full text-left py-2 hover:text-cyan-400 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;