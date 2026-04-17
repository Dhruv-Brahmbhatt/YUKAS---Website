import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Input from '../components/ui/Input';
import usePageTitle from '../hooks/usePageTitle';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  usePageTitle('Login');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState('');
  const [isSubmitting, setSubmit]   = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError(''); setSubmit(true);
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to log in. Check your email and password.');
    } finally { setSubmit(false); }
  };

  return (
    <div className="min-h-screen flex bg-cream-50">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-20 relative overflow-hidden bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none bg-gold-500/10 blur-3xl opacity-50" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 relative z-10 group w-max">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500/30 transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-gold-500/10">
            <span className="font-mono font-bold text-lg text-gold-400">Y</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">YUKAS</div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-500/80 mt-0.5">Leadership Platform</div>
          </div>
        </Link>

        {/* Quote */}
        <div className="relative z-10 my-auto pt-16">
          <div className="mb-6 select-none font-display font-black text-gold-500/10 text-[8rem] leading-none">
            "
          </div>
          <p className="text-3xl lg:text-4xl leading-relaxed italic mb-10 text-white font-display font-light">
            Leadership is not about being in charge. It is about taking care of those in your charge.
          </p>
          <p className="text-sm font-bold text-gold-400 tracking-widest uppercase">— Simon Sinek</p>
        </div>

        {/* Mini testimonial */}
        <div className="relative z-10 flex items-center gap-5 mt-auto pt-16">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold-500/40 shadow-lg shadow-gold-500/10">
            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Testimonial" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-base font-bold font-mono">Rhea Chakraborty</p>
            <p className="text-sm text-cream-50/60 font-light mt-1">Delegate, YUKAS MUN 2024</p>
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-20 py-24 pt-32">
        <div className="w-full max-w-lg">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-4 mb-12 lg:hidden w-max group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500/30 transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-gold-500/10">
              <span className="font-mono font-bold text-lg text-gold-400">Y</span>
            </div>
            <span className="text-2xl font-bold text-navy-900 font-mono tracking-tight">YUKAS</span>
          </Link>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="font-display font-bold text-navy-900 text-4xl sm:text-5xl mb-4 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-lg font-light">Sign in to your YUKAS account to continue.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-5 rounded-2xl flex items-start gap-4 bg-red-50 border border-red-200 animate-fade-in shadow-lg shadow-red-500/5">
              <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
              <p className="text-sm md:text-base text-red-700 font-medium leading-relaxed">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              icon={FiMail}
              placeholder="you@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              icon={FiLock}
              placeholder="••••••••"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <div className="flex justify-end pt-2">
              <a href="#" className="text-sm font-bold transition-colors text-gold-600 hover:text-gold-500 underline decoration-gold-500/30 underline-offset-4">
                Forgot password?
              </a>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full py-5 text-base font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-navy-800 to-navy-900 text-white hover:shadow-navy-900/30 font-mono tracking-wide"
              >
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-base text-slate-500 font-light">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-navy-900 transition-colors hover:text-gold-600 underline decoration-gold-500/30 underline-offset-4">
              Create one now <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
