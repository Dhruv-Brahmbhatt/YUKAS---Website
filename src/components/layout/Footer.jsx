import { Link } from 'react-router-dom';
import {
  FiInstagram, FiTwitter, FiLinkedin, FiYoutube,
  FiMail, FiPhone, FiMapPin, FiArrowUpRight,
} from 'react-icons/fi';

const footerLinks = {
  Platform: [
    { label: 'Events',    to: '/events' },
    { label: 'Gallery',   to: '/gallery' },
    { label: 'Our Team',  to: '/team' },
  ],
  Account: [
    { label: 'Sign Up',   to: '/signup' },
    { label: 'Login',     to: '/login' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
};

const socials = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter,   href: '#', label: 'Twitter'   },
  { icon: FiLinkedin,  href: '#', label: 'LinkedIn'  },
  { icon: FiYoutube,   href: '#', label: 'YouTube'   },
];

const contacts = [
  { icon: FiMail,   text: 'hello@yukas.in'    },
  { icon: FiPhone,  text: '+91 98765 43210'   },
  { icon: FiMapPin, text: 'Mumbai, India'     },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 relative overflow-hidden">
      {/* Decorative gradient strip */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-transparent w-full" />
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-10">
            <Link to="/" className="flex items-center gap-4 group w-max">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500/30 transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-gold-500/10">
                <span className="font-mono font-bold text-lg text-gold-400">Y</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono tracking-tight">YUKAS</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-500/80 mt-0.5">Leadership Platform</div>
              </div>
            </Link>

            <p className="text-lg text-cream-50/50 leading-relaxed max-w-sm font-light">
              India's premier youth leadership organization, orchestrating world-class MUNs, tech summits, and workshops — empowering the next generation of decision-makers.
            </p>

            <div className="space-y-4 pt-4">
              {contacts.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 text-cream-50/60 font-medium">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
                    <Icon size={14} className="text-gold-400" />
                  </div>
                  <span className="text-base">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-gold-500/90 font-mono">
                {section}
              </h4>
              <ul className="space-y-6">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex items-center gap-2 text-base font-light text-cream-50/40 hover:text-gold-300 transition-all duration-300 group"
                    >
                      <span className="relative">
                        {label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                      <FiArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-20 mb-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <p className="text-sm text-center md:text-left font-light text-cream-50/30 tracking-wide">
            © {new Date().getFullYear()} YUKAS. All rights reserved. &nbsp;·&nbsp; <span className="text-gold-500/30">Inspiring Youth. Shaping Leaders.</span>
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/10 text-cream-50/40 hover:text-gold-400 shadow-lg shadow-black/20"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
