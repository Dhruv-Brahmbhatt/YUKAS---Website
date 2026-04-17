import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const navLinks = [
  { label: 'Home',    to: '/' },
  { label: 'Events',  to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Team',    to: '/team' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const { user, userProfile, isAdmin, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isHome        = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isTransparent
          ? 'bg-transparent border-white/10'
          : 'bg-white/95 backdrop-blur-xl border-cream-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500/30 transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-gold-500/10">
            <span className="font-mono font-bold text-lg text-gold-400">Y</span>
          </div>
          <div className="hidden sm:block">
            <div className={`text-2xl font-bold font-mono tracking-tight transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-navy-900'}`}>
              YUKAS
            </div>
            <div className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 transition-colors duration-500 ${isTransparent ? 'text-white/50' : 'text-gold-600'}`}>
              Leadership Platform
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-6 py-2 text-sm font-bold tracking-wide uppercase transition-all duration-300 group font-mono ${
                  isActive
                    ? isTransparent ? 'text-gold-400' : 'text-navy-900'
                    : isTransparent ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-navy-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 bg-gold-400' : 'w-0 group-hover:w-4 bg-gold-400/50'
                  }`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop Auth ── */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="relative">
              <button
                id="user-menu-btn"
                onClick={() => setDropOpen(p => !p)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 border ${
                  isTransparent
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                    : 'bg-cream-50 border-cream-200 hover:border-gold-300 text-navy-900'
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-500 shadow-md">
                  <FiUser size={14} className="text-navy-900" />
                </div>
                <span className="text-sm font-bold font-mono tracking-tight">
                  {userProfile?.name?.split(' ')[0] || 'User'}
                </span>
                <FiChevronDown size={16} className={`transition-transform duration-300 ${dropOpen ? 'rotate-180' : ''} opacity-60`} />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-full mt-4 w-64 rounded-2xl bg-white border border-cream-200 shadow-2xl shadow-navy-900/10 overflow-hidden animate-fade-in origin-top-right">
                  <div className="px-6 py-5 bg-cream-50 border-b border-cream-200">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Signed in as</p>
                    <p className="text-sm text-navy-900 font-bold truncate">{user.email}</p>
                  </div>
                  <div className="p-3 space-y-1">
                    <Link to="/dashboard" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-cream-50 rounded-xl transition-all font-mono">
                      <FiUser size={16} className="text-gold-500" /> My Dashboard
                    </Link>
                    {isAdmin && (
                      <Link to="/dashboard" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all font-mono">
                        <FiUser size={16} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all font-mono">
                      <FiLogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login"
                className={`text-sm font-bold tracking-wide transition-colors font-mono ${
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-navy-900'
                }`}>
                Login
              </Link>
              <Link to="/signup"
                className="px-8 py-3 text-sm font-bold text-navy-900 bg-gradient-to-br from-gold-300 to-gold-500 rounded-full shadow-lg shadow-gold-500/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 font-mono">
                Register Free
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          id="mobile-menu-btn"
          className={`md:hidden p-3 rounded-xl transition-all ${
            isTransparent ? 'text-white hover:bg-white/10' : 'text-navy-900 hover:bg-cream-50'
          }`}
          onClick={() => setOpen(p => !p)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="md:hidden absolute w-full top-full bg-white border-b border-cream-200 shadow-2xl animate-slide-down">
          <div className="px-6 py-8 space-y-2">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-4 text-base font-bold rounded-2xl transition-all font-mono ${
                    isActive
                      ? 'text-navy-900 bg-gold-500/10 border-l-4 border-gold-500 pl-4 transition-none'
                      : 'text-slate-500 hover:text-navy-900 hover:bg-cream-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="px-8 py-10 bg-cream-50 border-t border-cream-200 flex flex-col gap-4">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}
                  className="w-full py-4 text-center text-sm font-bold text-navy-900 bg-white border border-cream-200 rounded-2xl shadow-sm font-mono">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="w-full py-4 text-sm font-bold text-center text-red-500 bg-red-50 border border-red-100 rounded-2xl font-mono">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}
                  className="w-full py-4 text-center text-sm font-bold text-navy-900 bg-white border border-cream-200 rounded-2xl font-mono">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}
                  className="w-full py-4 text-center text-sm font-bold text-white bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl shadow-lg font-mono">
                  Register Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
