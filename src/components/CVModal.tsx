import React, { useEffect } from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_PDF_URL = '/CV_Marouane_El_Hamdaoui.pdf';

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
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
    const link = document.createElement('a');
    link.href = CV_PDF_URL;
    link.download = 'CV-Marouane-El-Hamdaoui.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111612] border border-white/15 rounded-3xl shadow-2xl max-w-5xl w-full h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#0e130f] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#dfff5b]/10 border border-[#dfff5b]/30 flex items-center justify-center text-[#dfff5b] shrink-0">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                Curriculum Vitae — Marouane El Hamdaoui
              </h3>
              <p className="text-[11px] font-mono text-slate-400 truncate">
                Génie Informatique & Développeur Web Full Stack
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Open in new tab */}
            <a
              href={CV_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold text-[#dfff5b] bg-[#dfff5b]/10 border border-[#dfff5b]/30 hover:bg-[#dfff5b]/20 transition-all active:scale-95"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Plein écran</span>
            </a>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0D100E] bg-[#dfff5b] hover:bg-[#ebff82] shadow-md shadow-[#dfff5b]/20 transition-all active:scale-95"
            >
              <Download size={14} />
              <span>Télécharger</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF with Object and Fallback */}
        <div className="flex-1 w-full bg-[#0a0d0b] relative flex flex-col overflow-hidden">
          <object
            data={CV_PDF_URL}
            type="application/pdf"
            className="w-full h-full flex-1 bg-white"
            aria-label="Curriculum Vitae Marouane El Hamdaoui"
          >
            <iframe
              src={CV_PDF_URL}
              title="Curriculum Vitae Marouane El Hamdaoui"
              className="w-full h-full border-0 bg-white"
            >
              {/* Fallback if browser blocks iframe */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#0D100E] text-white">
                <div className="w-16 h-16 rounded-2xl bg-[#dfff5b]/10 border border-[#dfff5b]/30 flex items-center justify-center text-[#dfff5b] mb-4">
                  <FileText size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Curriculum Vitae — Marouane El Hamdaoui</h4>
                <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                  L'aperçu intégré est bloqué par les paramètres de votre navigateur. Vous pouvez consulter le CV directement en plein écran ou le télécharger.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={CV_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#dfff5b] text-[#0D100E] hover:bg-[#ebff82] transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Ouvrir dans un nouvel onglet</span>
                  </a>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    <Download size={16} />
                    <span>Télécharger le PDF</span>
                  </button>
                </div>
              </div>
            </iframe>
          </object>
        </div>

        {/* Bottom Bar: Direct helper link */}
        <div className="px-5 py-2.5 bg-[#0e130f] border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">Document PDF officiel • Marouane El Hamdaoui</span>
          <a
            href={CV_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dfff5b] hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>Ouvrir dans un nouvel onglet</span>
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default CVModal;
