import React from 'react';
import Spinner from './Spinner';

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  icon: Icon,
  ...props
}) {
  const baseStyle = 'btn inline-flex flex-shrink-0 items-center justify-center gap-3 px-8 py-4 text-sm font-bold rounded-2xl transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wide';
  
  const variants = {
    primary: 'bg-gradient-to-br from-navy-800 to-navy-950 text-white shadow-xl shadow-navy-900/20 hover:shadow-2xl hover:-translate-y-1',
    gold: 'bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900 shadow-xl shadow-gold-500/20 hover:shadow-2xl hover:-translate-y-1',
    secondary: 'bg-white text-navy-900 border border-cream-200 hover:border-gold-300 shadow-sm hover:shadow-xl hover:-translate-y-1',
    outline: 'bg-transparent text-gold-500 border-2 border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/5',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
    ghost: 'bg-transparent text-slate-500 hover:text-navy-900 hover:bg-cream-50',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="sm" color={variant === 'gold' ? 'text-navy-900' : 'text-gold-500'} />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children}
    </button>
  );
}
