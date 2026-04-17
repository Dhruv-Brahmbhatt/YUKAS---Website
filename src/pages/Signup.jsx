import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Input from '../components/ui/Input';
import usePageTitle from '../hooks/usePageTitle';

const perks = [
  'Access to exclusive YUKAS conference registrations',
  'Early-bird notifications for upcoming events',
  'Join 500+ youth leaders across India',
  'Certificate of participation for each event attended',
];

const institutions = ['IIT Bombay', 'BITS Pilani', "St. Xavier's", 'IIT KGP', 'Symbiosis'];

export default function Signup() {
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                   = useState('');
  const [isSubmitting, setSubmit]           = useState(false);
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Passwords do not match.');
    try {
      setError(''); setSubmit(true);
      await signup(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. ' + err.message);
    } finally { setSubmit(false); }
  };

  return (
    <div className="min-h-screen flex bg-cream-50">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-20 relative overflow-hidden bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none bg-gold-500/10 blur-3xl opacity-50" />

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

        {/* Headline + perks */}
        <div className="relative z-10 my-auto pt-16">
          <h2 className="font-display font-bold text-white text-5xl md:text-[3.5rem] leading-[1.1] mb-12">
            Your leadership <br />
            <em className="font-light italic text-gold-300 pr-2">journey</em> starts here.
          </h2>
          <div className="space-y-6">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gold-500/10 border border-gold-500/20">
                  <FiCheckCircle size={14} className="text-gold-400" />
                </div>
                <span className="text-lg leading-relaxed text-cream-50/70 font-light">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Institution strip */}
        <div className="relative z-10 pt-16 mt-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 text-cream-50/40">
            Trusted by students from
          </p>
          <div className="flex flex-wrap gap-3">
            {institutions.map(inst => (
              <span key={inst} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-cream-50/60 border border-white/10 backdrop-blur-sm">
                {inst}
              </span>
            ))}
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
              Join YUKAS
            </h1>
            <p className="text-slate-500 text-lg font-light">Create your account and start your leadership journey.</p>
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
            <Input id="name"             type="text"     label="Full Name"        icon={FiUser} placeholder="John Doe"         required value={name}            onChange={e => setName(e.target.value)} />
            <Input id="email"            type="email"    label="Email Address"    icon={FiMail} placeholder="you@example.com"  required value={email}           onChange={e => setEmail(e.target.value)} />
            <Input id="password"         type="password" label="Password"         icon={FiLock} placeholder="Min. 8 characters" required value={password}       onChange={e => setPassword(e.target.value)} />
            <Input id="confirm-password" type="password" label="Confirm Password" icon={FiLock} placeholder="••••••••"          required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 text-base font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-gold-400 to-gold-500 text-navy-900 hover:shadow-gold-500/30 font-mono tracking-wide"
              >
                {isSubmitting ? 'Creating Account…' : 'Create Free Account'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-base text-slate-500 font-light">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-navy-900 transition-colors hover:text-gold-600 underline decoration-gold-500/30 underline-offset-4">
              Sign in instead <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
