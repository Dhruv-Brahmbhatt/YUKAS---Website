import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-cream-200 overflow-hidden transform transition-all animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-10 border-b border-cream-100 bg-cream-50">
          <div>
            <h3 className="text-3xl font-display font-bold text-navy-900 tracking-tight">{title}</h3>
            <div className="h-1.5 w-12 bg-gold-400 rounded-full mt-3" />
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-navy-900 hover:bg-white rounded-2xl border border-transparent hover:border-cream-200 transition-all shadow-sm"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
