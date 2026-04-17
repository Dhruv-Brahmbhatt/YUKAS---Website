import { FiLinkedin, FiMail } from 'react-icons/fi';

const tierBadge = {
  'Founders':             { bg: 'bg-gold-500/10', text: 'text-gold-600', border: 'border-gold-500/30' },
  'Executive Board':      { bg: 'bg-navy-800/5',  text: 'text-navy-900', border: 'border-navy-900/10'   },
  'Organizing Committee': { bg: 'bg-indigo-500/5',text: 'text-indigo-600', border: 'border-indigo-500/20'  },
};

export default function TeamCard({ member }) {
  const { name, role, tier, photo, description, linkedin, email } = member;
  const badge = tierBadge[tier] || tierBadge['Organizing Committee'];

  return (
    <div className="group [perspective:1000px] h-[22rem] cursor-pointer" title={`Hover to learn about ${name}`}>
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* ── Front ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl border border-cream-200 shadow-xl shadow-navy-900/5 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 rounded-full p-1 mb-6 bg-gradient-to-br from-gold-500/40 to-gold-500/10 shadow-lg shadow-gold-500/10">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover rounded-full border-4 border-white"
              loading="lazy"
            />
          </div>
          <h3 className="text-navy-900 font-bold text-xl mb-1 font-mono tracking-tight">
            {name}
          </h3>
          <p className="text-sm font-medium text-slate-400 mb-5">{role}</p>
          <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badge.bg} ${badge.text} ${badge.border}`}>
            {tier}
          </span>
          <p className="text-[10px] mt-auto pt-4 font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-gold-500 transition-colors">
            Flip for Bio
          </p>
        </div>

        {/* ── Back ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-navy-950 to-navy-800 rounded-3xl border border-gold-500/20 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" />
          
          <img
            src={photo}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mb-5 flex-shrink-0 border-2 border-gold-500/40 shadow-lg shadow-gold-500/10 relative z-10"
          />
          <h3 className="font-bold text-lg mb-1 text-white font-mono tracking-tight relative z-10">
            {name}
          </h3>
          <p className="text-xs font-bold mb-4 text-gold-400 uppercase tracking-widest relative z-10">{role}</p>
          <p className="text-sm leading-relaxed mb-8 text-cream-50/70 font-light line-clamp-4 relative z-10">
            {description}
          </p>
          
          <div className="flex gap-4 mt-auto relative z-10">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 text-gold-400"
              >
                <FiLinkedin size={18} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 text-gold-400"
              >
                <FiMail size={18} />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
