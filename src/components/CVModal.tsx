import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  // Empêcher le défilement du body quand le modal est ouvert (hook non conditionnel)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Télécharger le PDF depuis /public
    const link = document.createElement('a');
    link.href = '/CV%20Marouane%20El%20Hamdaoui.pdf';
    link.download = 'CV-Marouane-El-Hamdaoui.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header avec boutons */}
        <div className="absolute top-4 right-4 z-20 flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            aria-label="Télécharger CV"
          >
            <Download size={20} />
            <span>Télécharger CV</span>
          </button>
          
          <button 
            onClick={onClose}
            className="p-3 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-all duration-300 shadow-lg"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Contenu : affiche le PDF depuis /public */}
        <div className="w-full h-full overflow-auto bg-gray-100">
          <object
            data="/CV%20Marouane%20El%20Hamdaoui.pdf"
            type="application/pdf"
            className="w-full h-full min-h-[85vh]"
            aria-label="CV (PDF)"
          >
            <iframe
              title="CV (PDF)"
              src="/CV%20Marouane%20El%20Hamdaoui.pdf"
              className="w-full h-full min-h-[85vh] border-0"
            />
          </object>
        </div>
      </div>
    </div>
  );
};

export default CVModal;