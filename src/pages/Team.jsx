import { teamMembers, tiers } from '../data/dummyTeam';
import usePageTitle from '../hooks/usePageTitle';
import TeamCard from '../components/team/TeamCard';

export default function Team() {
  usePageTitle('Our Team');
  return (
    <div className="min-h-screen bg-cream-50">

      {/* ── Header ── */}
      <div className="pt-40 pb-28 px-6 lg:px-12 text-center bg-gradient-to-br from-navy-950 to-navy-800 border-b border-gold-500/10 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">Our People</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl mb-8 tracking-tight">
            Meet the <em className="text-gold-300 italic font-light pr-2">Team</em>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-cream-50/60 font-light">
            A collective of debaters, technologists, and organizers driven by one shared purpose — empowering India's next generation of leaders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

        {/* ── Tier sections ── */}
        <div className="space-y-32">
          {tiers.map(tier => {
            const membersInTier = teamMembers.filter(m => m.tier === tier);
            if (!membersInTier.length) return null;
            return (
              <div key={tier} className="animate-fade-up">
                {/* Section heading */}
                <div className="flex items-center gap-8 mb-16">
                  <h2 className="text-3xl font-display font-bold text-navy-900 whitespace-nowrap">
                    {tier}
                  </h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12">
                  {membersInTier.map(member => (
                    <TeamCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Join CTA ── */}
        <div className="mt-40 rounded-[3rem] overflow-hidden relative py-24 px-10 text-center bg-gradient-to-br from-navy-950 to-navy-900 border border-gold-500/20 shadow-2xl shadow-navy-900/40">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          {/* Glow blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">Join Us</span>
            </div>
            <h3 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Want to Join the<br />
              <em className="text-gold-500 italic font-light pr-2">Organizing Committee?</em>
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 text-cream-50/60 font-light">
              Applications for the Winter cohort are now open. Help us build world-class conferences that inspire thousands across India.
            </p>
            <a href="mailto:careers@yukas.in">
              <button className="inline-flex items-center gap-4 px-12 py-5 text-base font-bold rounded-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900 shadow-xl shadow-gold-500/20 font-mono tracking-wide">
                Apply Now <span className="text-xl">→</span>
              </button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
