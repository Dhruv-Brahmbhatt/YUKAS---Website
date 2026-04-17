import { useState, useMemo } from 'react';
import { galleryImages, galleryCategories } from '../data/dummyGallery';
import usePageTitle from '../hooks/usePageTitle';
import Lightbox from '../components/gallery/Lightbox';

export default function Gallery() {
  usePageTitle('Gallery');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxData, setLightboxData]     = useState({ isOpen: false, index: 0 });

  const filteredImages = useMemo(() =>
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox  = idx  => setLightboxData({ isOpen: true, index: idx });
  const closeLightbox = ()   => setLightboxData(p => ({ ...p, isOpen: false }));
  const showNext      = ()   => setLightboxData(p => ({ ...p, index: (p.index + 1) % filteredImages.length }));
  const showPrev      = ()   => setLightboxData(p => ({ ...p, index: (p.index - 1 + filteredImages.length) % filteredImages.length }));

  return (
    <div className="min-h-screen bg-cream-50">

      {/* ── Header ── */}
      <div className="pt-40 pb-28 px-6 lg:px-12 text-center bg-gradient-to-br from-navy-950 to-navy-800 border-b border-gold-500/10 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">Gallery</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl mb-8 tracking-tight">
            Memoirs of <em className="text-gold-300 italic font-light pr-2">YUKAS</em>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-cream-50/60 font-light">
            Relive the debates, innovations, and leadership moments from our conferences across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

        {/* ── Category Filters ── */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {galleryCategories.map(cat => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-500 font-mono shadow-sm ${
                  active 
                    ? 'bg-gradient-to-br from-navy-800 to-navy-900 text-gold-400 border border-gold-500/30 shadow-xl shadow-navy-900/20 -translate-y-1' 
                    : 'bg-white text-navy-800 border border-cream-200 hover:border-gold-300 hover:bg-cream-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Grid ── */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-white border border-cream-200 shadow-xl shadow-navy-900/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 hover:shadow-2xl hover:shadow-navy-900/10 animate-fade-in"
              >
                <div className="aspect-[4/3] overflow-hidden bg-cream-100">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent">
                  <h3 className="text-white font-bold text-xl leading-tight font-mono tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {img.city}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold-400/50" />
                    <span className="text-xs font-bold uppercase tracking-widest text-cream-50/60">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[2rem] border border-cream-200 shadow-xl shadow-navy-900/5">
            <div className="text-7xl mb-8 opacity-60">📸</div>
            <p className="text-2xl text-slate-500 font-light font-display">No highlights found for this category yet.</p>
          </div>
        )}
      </div>

      {lightboxData.isOpen && filteredImages.length > 0 && (
        <Lightbox
          image={filteredImages[lightboxData.index]}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </div>
  );
}
