import React from 'react';
import { Heart, Code, Coffee, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@exemple.com', label: 'Email' }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
              MAROUANE EL HAMDAOUI
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Développeur Full Stack spécialisé en Laravel, PHP, React et Node.js.
              Je crée des solutions web modernes et performantes avec une expertise technique approfondie.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 group"
                  aria-label={label}
                >
                  <Icon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6">Navigation</h4>
            <nav className="space-y-3">
              {[
                { name: 'Accueil', id: 'hero' },
                { name: 'À propos', id: 'about' },
                { name: 'Compétences', id: 'skills' },
                { name: 'Projets', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
            <div className="space-y-3 text-gray-400">
              <div>Développement Laravel/PHP</div>
              <div>Applications React</div>
              <div>APIs Node.js/Express</div>
              <div>Consulting Technique</div>
              <div>Bases de données MySQL/MongoDB</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Fait avec</span>
              <Heart size={16} className="text-teal-400 animate-pulse" />
              <span>et</span>
              <Code size={16} className="text-blue-400" />
              <Code size={16} className="text-teal-400" />
              <span>•</span>
              <Coffee size={16} className="text-yellow-400" />
              <span>© {currentYear} MAROUANE EL HAMDAOUI. Tous droits réservés.</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 group"
              aria-label="Retour en haut"
            >
              <ArrowUp size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;