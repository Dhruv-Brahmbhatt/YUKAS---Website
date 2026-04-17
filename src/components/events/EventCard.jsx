import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';

const categoryBadge = {
  MUN:      { bg: 'bg-navy-950/90', border: 'border-gold-500/40', text: 'text-gold-300' },
  Tech:     { bg: 'bg-navy-950/90', border: 'border-indigo-500/40', text: 'text-indigo-300' },
  Workshop: { bg: 'bg-navy-950/90', border: 'border-emerald-500/40', text: 'text-emerald-300' },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function EventCard({ event }) {
  const { id, title, city, date, bannerUrl, category, roles, seats, filled } = event;
  const pct   = Math.min(Math.round((filled / seats) * 100), 100);
  const isFull = pct >= 100;
  const badge  = categoryBadge[category] || categoryBadge.MUN;

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden h-full border border-cream-200 shadow-xl shadow-navy-900/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 hover:shadow-2xl hover:shadow-navy-900/10">
      {/* Banner */}
      <div className="relative h-60 overflow-hidden flex-shrink-0">
        <img
          src={bannerUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest backdrop-blur-md border ${badge.bg} ${badge.border} ${badge.text}`}>
          {category}
        </div>

        {isFull && (
          <div className="absolute top-5 right-5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white bg-red-500/90 backdrop-blur-md border border-red-400">
            Sold Out
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-mono font-bold text-2xl leading-snug mb-5 line-clamp-2 text-navy-900 transition-colors duration-300 group-hover:text-gold-600">
          {title}
        </h3>

        <div className="space-y-4 mb-8">
          {[
            { icon: FiMapPin,   text: city },
            { icon: FiCalendar, text: formatDate(date) },
            { icon: FiUsers,    text: `${seats - filled} seats available` },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-4 text-base text-slate-500">
              <Icon size={18} className="text-gold-500 flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {/* Roles */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {roles.map(role => (
            <span key={role} className="px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full bg-cream-50 text-navy-800 border border-cream-200">
              {role}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-3 text-slate-400">
            <span>{filled} registered</span>
            <span>{pct}% filled</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden bg-cream-200">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${pct >= 80 ? 'bg-red-500' : 'bg-gradient-to-r from-gold-500 to-gold-400'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link to={`/events/${id}`}>
          <button
            disabled={isFull}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-[1.25rem] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-xl font-mono disabled:hover:translate-y-0 disabled:hover:shadow-none bg-gradient-to-br from-navy-800 to-navy-900 text-white hover:shadow-navy-900/20 data-[full=true]:bg-slate-100 data-[full=true]:text-slate-400"
            data-full={isFull}
          >
            {isFull ? 'Registration Closed' : <> View Details <FiArrowRight size={20} /> </>}
          </button>
        </Link>
      </div>
    </div>
  );
}
