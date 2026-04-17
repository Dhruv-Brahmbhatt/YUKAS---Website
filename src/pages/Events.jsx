import { useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { dummyEvents, categories, cities } from '../data/dummyEvents';
import EventCard from '../components/events/EventCard';
import usePageTitle from '../hooks/usePageTitle';

export default function Events() {
  usePageTitle('Events');
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [city, setCity]         = useState('All');
  const [sort, setSort]         = useState('date');

  const filtered = useMemo(() => {
    let list = [...dummyEvents];
    if (search.trim())
      list = list.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
      );
    if (category !== 'All') list = list.filter(e => e.category === category);
    if (city !== 'All')     list = list.filter(e => e.city === city);
    if (sort === 'date')    list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sort === 'seats')
      list.sort((a, b) => (b.seats - b.filled) - (a.seats - a.filled));
    return list;
  }, [search, category, city, sort]);

  return (
    <div className="min-h-screen bg-cream-50">

      {/* ── Page Header ── */}
      <div className="pt-40 pb-28 px-6 lg:px-12 text-center bg-gradient-to-br from-navy-950 to-navy-800 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">All Events</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl mb-8 tracking-tight">
            Explore <em className="text-gold-300 italic font-light pr-2">Conferences</em>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-cream-50/60 font-light">
            Browse MUNs, tech summits, and leadership workshops happening across India.
            Find your event and take the next step.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

        {/* ── Filters ── */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 mb-16 border border-cream-200 shadow-xl shadow-navy-900/5">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">

            {/* Search */}
            <div className="flex-1 w-full relative group">
              <label htmlFor="events-search" className="block text-xs font-bold uppercase tracking-[0.15em] mb-3 text-navy-800">
                Search
              </label>
              <div className="relative">
                <FiSearch size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500 z-10" />
                <input
                  id="events-search"
                  type="text"
                  placeholder="Search events or cities…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl py-4 pl-12 pr-5 text-base font-medium text-navy-900 transition-all duration-300 focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 hover:border-gold-300"
                />
              </div>
            </div>

            {/* Selects */}
            {[
              {
                label: 'Category', value: category, setter: setCategory,
                opts: categories.map(c => ({ value: c, label: c === 'All' ? 'All Categories' : c })),
              },
              {
                label: 'City', value: city, setter: setCity,
                opts: cities.map(c => ({ value: c, label: c === 'All' ? 'All Cities' : c })),
              },
              {
                label: 'Sort By', value: sort, setter: setSort,
                opts: [{ value: 'date', label: 'By Date' }, { value: 'seats', label: 'By Seats Available' }],
              },
            ].map(({ label, value, setter, opts }) => (
              <div key={label} className="w-full md:w-56">
                <label className="block text-xs font-bold uppercase tracking-[0.15em] mb-3 text-navy-800">
                  {label}
                </label>
                <select
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl py-4 px-5 text-base font-medium text-navy-900 cursor-pointer appearance-none transition-all duration-300 focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 hover:border-gold-300"
                >
                  {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-12 text-base font-medium text-slate-500">
          <FiFilter size={18} className="text-gold-500" />
          Showing <span className="text-navy-900 font-bold">{filtered.length}</span> event{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {filtered.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[2rem] border border-cream-200 shadow-xl shadow-navy-900/5">
            <div className="text-7xl mb-8 opacity-80">🔍</div>
            <h3 className="font-mono text-3xl font-bold mb-4 text-navy-900">
              No events found
            </h3>
            <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto font-light">
              Try adjusting your filters or search query to find more events.
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setCity('All'); }}
              className="px-10 py-4 text-base font-bold rounded-2xl text-white transition-all duration-300 bg-gradient-to-br from-navy-800 to-navy-900 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/20 font-mono"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
