import { FiX, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { useEffect } from 'react';

export default function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-950/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      {/* Close */}
      <button
        id="lightbox-close"
        onClick={onClose}
        className="absolute top-10 right-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white transition-all z-20 shadow-2xl"
        aria-label="Close lightbox"
      >
        <FiX size={24} />
      </button>

      {/* Prev */}
      <button
        id="lightbox-prev"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-8 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white transition-all z-20 shadow-2xl hidden md:flex"
        aria-label="Previous image"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-6xl w-full mx-auto flex flex-col items-center animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative group w-full flex justify-center">
          <div className="absolute -inset-4 bg-gold-500/10 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
          <img
            src={image.url.replace('w=600', 'w=1600')}
            alt={image.title}
            className="w-full max-h-[75vh] object-contain rounded-[2rem] shadow-2xl ring-1 ring-white/10"
          />
        </div>
        
        <div className="mt-10 text-center space-y-3">
          <h2 className="text-white font-bold text-2xl md:text-3xl font-display tracking-tight">
            {image.title}
          </h2>
          <div className="flex items-center justify-center gap-4 text-gold-400 font-mono text-sm tracking-widest uppercase font-bold">
            <FiMapPin size={14} className="opacity-70" />
            <span>{image.city}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-cream-50/50">{image.category}</span>
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        id="lightbox-next"
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-8 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white transition-all z-20 shadow-2xl hidden md:flex"
        aria-label="Next image"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}
