import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found');

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-6 overflow-hidden relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-800/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-red-600">Error 404</span>
        </div>
        
        <h1 className="font-display font-bold text-navy-900 text-6xl md:text-8xl mb-8 tracking-tighter">
          Lost in <em className="text-gold-500 italic font-light pr-2">Translation?</em>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 mb-12 font-light leading-relaxed">
          The page you are looking for has been moved, deleted, or never existed in our committee records.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-base font-bold text-white rounded-full bg-navy-900 shadow-xl shadow-navy-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl font-mono">
              <FiHome size={20} /> Return Home
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-base font-bold text-navy-800 rounded-full border border-cream-200 bg-white hover:bg-cream-50 transition-all duration-300 font-mono"
          >
            <FiArrowLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
