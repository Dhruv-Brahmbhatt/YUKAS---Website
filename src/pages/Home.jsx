import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiUsers, FiGlobe, FiAward, FiCalendar,
  FiChevronLeft, FiChevronRight, FiTarget, FiZap,
} from 'react-icons/fi';
import { dummyEvents } from '../data/dummyEvents';
import { testimonials } from '../data/dummyTestimonials';
import EventCard from '../components/events/EventCard';
import usePageTitle from '../hooks/usePageTitle';

const stats = [
  { count: '500+', label: 'Youth Leaders',    icon: FiUsers    },
  { count: '20+',  label: 'Events Hosted',    icon: FiCalendar },
  { count: '10+',  label: 'Cities Covered',   icon: FiGlobe    },
  { count: '98%',  label: 'Satisfaction Rate', icon: FiAward   },
];

const pillars = [
  {
    icon: FiTarget,
    title: 'Lead',
    desc: 'Step into roles of real responsibility. Run committees, shape policy, and command rooms with confidence through structured leadership programmes across India.',
  },
  {
    icon: FiUsers,
    title: 'Collaborate',
    desc: 'Connect with 500+ bright minds from premier institutions. Build a network that opens doors — in boardrooms, embassies, and startups — long after the conference ends.',
  },
  {
    icon: FiZap,
    title: 'Grow',
    desc: 'Sharpen public speaking, critical thinking, and strategic decision-making. These are the skills that define great leaders in every field — from policy to technology.',
  },
];

export default function Home() {
  usePageTitle('Home');
  const featured = dummyEvents.filter(e => e.featured);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setTIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTIdx(i => (i + 1) % testimonials.length);

  return (
    <div className="bg-cream-50 overflow-x-hidden">

      {/* ══════════════════════════════════════════════ HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1920"
            alt="YUKAS Conference"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-navy-800/95" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32">
          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 animate-fade-up bg-gold-600/10 border border-gold-500/30 backdrop-blur-sm shadow-xl shadow-gold-500/5">
              <span className="w-2 h-2 rounded-full animate-pulse bg-gold-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-gold-300">
                India's Premier Youth Leadership Platform
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-display font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8 animate-fade-up delay-100">
              Where Tomorrow's
              <br />
              <em className="text-gold-300 italic pr-2 font-light">Leaders</em> 
              Are Born.
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-cream-50/70 leading-relaxed mb-12 animate-fade-up delay-200 max-w-2xl font-light">
              YUKAS organizes world-class Model UNs, tech summits, and leadership workshops across India — shaping confident, compassionate decision-makers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 animate-fade-up delay-300">
              <Link to="/events">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-sm md:text-base font-bold text-navy-900 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-xl shadow-gold-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/30 font-mono">
                  Explore Events <FiArrowRight size={18} />
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-sm md:text-base font-bold text-white rounded-full bg-white/5 border border-white/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 font-mono">
                  Join YUKAS
                </button>
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-50">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-gold-400 font-mono">SCROLL</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ STATS */}
      <section className="bg-navy-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map(({ count, label, icon: Icon }, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gold-500/10 border border-gold-500/20 transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-gold-500/20">
                  <Icon size={28} className="text-gold-400" />
                </div>
                <p className="text-5xl md:text-6xl font-display font-bold mb-3 text-gold-300 drop-shadow-lg">
                  {count}
                </p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-cream-50/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ MISSION */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/5 border border-gold-500/20">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-600">Our Mission</span>
            </div>
            <h2 className="font-display font-bold text-navy-800 text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Building Tomorrow's<br />
              <em className="font-light italic text-gold-500 pr-2">Decision Makers</em>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
              Every conference is a stepping stone. Every committee is a classroom. Every connection is a catalyst for lasting change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group p-10 md:p-12 rounded-3xl bg-cream-50 border border-cream-200 transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 hover:shadow-2xl hover:shadow-gold-500/10"
              >
                <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 shadow-lg shadow-navy-900/20 transition-transform duration-500 group-hover:scale-110">
                  <Icon size={28} className="text-gold-400" />
                </div>
                <h3 className="text-3xl font-bold text-navy-900 mb-5 font-mono">
                  {title}
                </h3>
                <p className="text-lg text-slate-500 leading-relaxed font-light">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ FEATURED EVENTS */}
      <section className="py-32 bg-cream-50 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/5 border border-gold-500/20">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-600">Upcoming</span>
              </div>
              <h2 className="font-display font-bold text-navy-800 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Featured Events
              </h2>
            </div>
            <Link to="/events" className="group inline-flex items-center gap-3 text-base md:text-lg font-bold text-navy-700 transition-colors duration-300 hover:text-gold-500 font-mono">
              View All Events <FiArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {featured.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ TESTIMONIALS */}
      <section className="py-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-400/10 border border-gold-400/20 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">Testimonials</span>
            </div>
            <h2 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl">
              Voices of Change
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Quote mark */}
            <div className="mb-8 select-none text-[8rem] leading-none font-display font-black text-gold-500/10">
              "
            </div>

            <div key={tIdx} className="animate-fade-in min-h-[16rem]">
              <p className="text-2xl md:text-4xl leading-relaxed italic mb-12 font-display text-cream-50/90 font-light">
                {testimonials[tIdx].quote}
              </p>
              <div className="flex items-center gap-6">
                <img
                  src={testimonials[tIdx].photo}
                  alt={testimonials[tIdx].name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-gold-500/40 shadow-lg shadow-gold-500/10"
                />
                <div>
                  <p className="text-xl font-bold text-white font-mono mb-1">
                    {testimonials[tIdx].name}
                  </p>
                  <p className="text-base text-cream-50/60 font-light">
                    {testimonials[tIdx].role}
                  </p>
                  <p className="text-sm mt-1 text-gold-400 uppercase tracking-widest font-bold text-opacity-80">
                    {testimonials[tIdx].college}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/10">
              <div className="flex gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIdx(i)}
                    className={`rounded-full transition-all duration-500 h-2 ${i === tIdx ? 'w-10 bg-gold-400 shadow-md shadow-gold-400/20' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Go to slide ${i+1}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-400 text-white"
                  aria-label="Previous testimonial"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 text-gold-400 shadow-lg shadow-gold-500/10"
                  aria-label="Next testimonial"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ CTA */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display font-bold text-navy-800 text-5xl md:text-6xl lg:text-[4.5rem] leading-tight mb-8">
            Ready to Make<br />
            Your <em className="text-gold-500 italic pr-2 font-light">Mark?</em>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            Join hundreds of students who've launched careers, built lifelong friendships, and changed the world through YUKAS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/events">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 text-base font-bold text-white rounded-full shadow-2xl shadow-navy-900/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-navy-900/30 bg-gradient-to-br from-navy-800 to-navy-900 font-mono">
                Browse Events <FiArrowRight size={20} />
              </button>
            </Link>
            <a href="mailto:hello@yukas.in">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 text-base font-bold rounded-full transition-all duration-500 hover:-translate-y-1 border-2 border-slate-200 text-navy-800 hover:border-navy-800 hover:bg-navy-50 font-mono">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
