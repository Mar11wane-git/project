import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, CheckCheck, Github, Linkedin, MessageSquare, Clock } from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import Tilt3DCard from './Tilt3DCard';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0D100E] border-t border-white/[0.04]">
      <BackgroundFX density="low" variant="teal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Counter Indicator */}
        <ScrollReveal delay={50} direction="down">
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="text-[#dfff5b] font-bold">SLIDE 06</span>
            <span>/</span>
            <span>06</span>
            <span className="w-10 h-[1px] bg-white/10" />
            <span>CONTACT & OPPORTUNITÉS</span>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18201a] border border-[#2b392f] text-[#dfff5b] text-xs font-mono mb-3">
              <MessageSquare size={13} />
              <span>PRENDRE CONTACT</span>
            </div>

            <div className="font-handwriting text-2xl text-[#dfff5b] font-semibold -rotate-1 mb-1">
              ~ Parlons de votre prochain projet ~
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Discutons de vos projets &{' '}
              <span className="bg-gradient-to-r from-[#dfff5b] via-[#34d399] to-[#22d3ee] bg-clip-text text-transparent">
                opportunités
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Vous avez un projet web, une opportunité d’embauche ou une mission technique ? N'hésitez pas à me joindre directement.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dfff5b] to-[#10b981] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info in 3D */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal delay={200} direction="left" className="h-full">
              <Tilt3DCard
                maxTilt={6}
                scale={1.01}
                className="rounded-3xl h-full"
              >
                <div className="p-7 rounded-3xl bg-[#131814]/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Coordonnées directes
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Disponible par email, téléphone ou via les plateformes professionnelles.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    
                    {/* Email card */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#dfff5b]/40 transition-colors flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#dfff5b]/10 border border-[#dfff5b]/30 flex items-center justify-center text-[#dfff5b] shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono text-slate-400">Email personnel</div>
                          <a
                            href="mailto:elhamdawimarwane@gmail.com"
                            className="text-xs sm:text-sm font-semibold text-white hover:text-[#dfff5b] truncate block transition-colors"
                          >
                            elhamdawimarwane@gmail.com
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard('elhamdawimarwane@gmail.com', 'email')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                        title="Copier l'email"
                        aria-label="Copier l'email"
                      >
                        {copiedItem === 'email' ? <CheckCheck size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Phone card */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#dfff5b]/40 transition-colors flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                          <Phone size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono text-slate-400">Téléphone / WhatsApp</div>
                          <a
                            href="tel:+212777079774"
                            className="text-xs sm:text-sm font-semibold text-white hover:text-[#dfff5b] font-mono truncate block transition-colors"
                          >
                            +212 7 77 07 97 74
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard('+212777079774', 'phone')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                        title="Copier le numéro"
                        aria-label="Copier le numéro"
                      >
                        {copiedItem === 'phone' ? <CheckCheck size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Location card */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">Localisation géographique</div>
                        <div className="text-xs sm:text-sm font-semibold text-white">Casablanca & Meknès, Maroc</div>
                      </div>
                    </div>

                  </div>

                  {/* Status pill */}
                  <div className="p-4 rounded-2xl bg-[#172019] border border-[#2b392f] flex items-center gap-3 text-xs text-[#dfff5b]">
                    <Clock size={16} className="text-[#dfff5b] shrink-0" />
                    <span>Temps de réponse habituel : moins de 24h</span>
                  </div>

                  {/* Social networks quick pills */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Profils :</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/Mar11wane-git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-200 transition-colors"
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/Marouane-El-Hamdaoui/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-200 transition-colors"
                      >
                        <Linkedin size={14} />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>

                </div>
              </Tilt3DCard>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form in 3D */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={320} direction="right">
              <Tilt3DCard
                maxTilt={6}
                scale={1.01}
                className="rounded-3xl"
              >
                <div className="p-7 sm:p-9 rounded-3xl bg-[#131814]/80 border border-white/10 backdrop-blur-xl shadow-xl">
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Envoyez-moi un message
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                          Remplissez ce formulaire et je vous répondrai très rapidement.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Jean Dupont"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#dfff5b] focus:ring-1 focus:ring-[#dfff5b]/30 text-sm transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                            Adresse Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Ex: jean.dupont@entreprise.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#dfff5b] focus:ring-1 focus:ring-[#dfff5b]/30 text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                          Objet de votre prise de contact *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Ex: Opportunité Ingénieur / Projet Web Full Stack"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#dfff5b] focus:ring-1 focus:ring-[#dfff5b]/30 text-sm transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                          Votre Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Décrivez votre besoin, les détails de votre projet ou les spécificités de votre opportunité..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#dfff5b] focus:ring-1 focus:ring-[#dfff5b]/30 text-sm transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl font-bold text-sm text-[#0D100E] bg-[#dfff5b] hover:bg-[#ebff82] shadow-[0_0_25px_rgba(223,255,91,0.4)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Transmettre mon message</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                        <Check size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Message transmis avec succès !
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                        Merci pour votre prise de contact. Je prendrai connaissance de votre message et vous répondrai dans les plus brefs délais.
                      </p>
                    </div>
                  )}

                </div>
              </Tilt3DCard>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
