import React from 'react';

export default function Card({ children, className = '', padding = 'p-6', hover = false }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${padding} ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : ''} ${className}`}>
      {children}
    </div>
  );
}
