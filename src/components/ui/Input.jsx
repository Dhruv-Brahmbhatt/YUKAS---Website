import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  icon: Icon,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.1em] text-navy-800 mb-2.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold-500">
            <Icon size={18} />
          </div>
        )}
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={`w-full bg-cream-50 border rounded-2xl py-4 px-5 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 font-medium ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-cream-200 focus:border-gold-500 focus:ring-gold-500/10 hover:border-gold-300'}`}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            className={`w-full bg-cream-50 border rounded-2xl py-4 ${Icon ? 'pl-12' : 'pl-5'} pr-5 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 font-medium ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-cream-200 focus:border-gold-500 focus:ring-gold-500/10 hover:border-gold-300'}`}
            {...props}
          />
        )}
      </div>
      {error && (
        <p className="mt-2 ml-1 text-sm text-red-500 font-bold">{error}</p>
      )}
    </div>
  );
}
