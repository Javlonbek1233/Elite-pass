import React, { useState } from 'react';
import { Sparkles, Maximize2, Archive, Calendar, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Concert' | 'Exhibition' | 'Festival' | 'VIP'>('All');
  const [lightboxItemIdx, setLightboxItemIdx] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const categories: ('All' | 'Concert' | 'Exhibition' | 'Festival' | 'VIP')[] = [
    'All',
    'Concert',
    'Exhibition',
    'Festival',
    'VIP',
  ];

  const handlePrev = () => {
    if (lightboxItemIdx === null) return;
    const prevIdx = lightboxItemIdx === 0 ? filteredItems.length - 1 : lightboxItemIdx - 1;
    setLightboxItemIdx(prevIdx);
  };

  const handleNext = () => {
    if (lightboxItemIdx === null) return;
    const nextIdx = lightboxItemIdx === filteredItems.length - 1 ? 0 : lightboxItemIdx + 1;
    setLightboxItemIdx(nextIdx);
  };

  const curLightboxItem = lightboxItemIdx !== null ? filteredItems[lightboxItemIdx] : null;

  return (
    <section id="luxury-media-portfolio" className="py-24 bg-neutral-950 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header specs */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">PREMIUM MEDIA PORTFOLIO</span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">Immersive Visual Archive</h2>
          <p className="font-sans text-neutral-400 text-sm max-w-xl mx-auto">
            Glimpse behind the curtains. High-resolution highlights representing production setups, backstage lounges, orchestral setups, and raw fan energy.
          </p>
        </div>

        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12 bg-neutral-900/40 p-1.5 rounded-full border border-neutral-805 max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-cat-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-md'
                  : 'text-neutral-401 hover:text-white hover:bg-neutral-850/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic masonry/grid columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer text-left shadow-xl"
                onClick={() => setLightboxItemIdx(idx)}
                id={`gallery-card-${item.id}`}
              >
                {/* Photo image */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark overlay with hover details */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="space-y-1.5 transform translate-y-3 sm:translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold uppercase rounded-full tracking-wider leading-none">
                      {item.category} ACCESS
                    </span>
                    <h4 className="font-sans font-extrabold text-sm text-white flex items-center justify-between gap-2">
                      {item.title}
                      <Maximize2 className="w-4 h-4 text-amber-500 hidden sm:block opacity-75 group-hover:opacity-100" />
                    </h4>
                    <p className="font-sans text-[11px] text-neutral-400 leading-normal">
                      {item.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal display */}
        <AnimatePresence>
          {curLightboxItem && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              
              {/* Overlay shadow backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxItemIdx(null)}
                className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md"
              />

              {/* Close Cross */}
              <button
                onClick={() => setLightboxItemIdx(null)}
                className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer focus:outline-none"
                id="lightbox-close-button"
              >
                ✕
              </button>

              {/* Lightbox content block */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full flex flex-col md:flex-row rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl text-left"
                id="lightbox-popup-card"
              >
                {/* Images slide panel */}
                <div className="relative flex-1 bg-neutral-950 flex items-center justify-center aspect-[4/3] md:aspect-auto">
                  <img
                    src={curLightboxItem.image}
                    alt={curLightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Left and Right carousel buttons */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-1.5 rounded-full bg-neutral-950/60 hover:bg-neutral-950 text-neutral-300 hover:text-amber-500 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Previous Photo"
                    id="lightbox-prev-button"
                  >
                    <ArrowLeftCircle className="w-8 h-8" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-1.5 rounded-full bg-neutral-950/60 hover:bg-neutral-950 text-neutral-300 hover:text-amber-500 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Next Photo"
                    id="lightbox-next-button"
                  >
                    <ArrowRightCircle className="w-8 h-8" />
                  </button>
                </div>

                {/* Information detailed sidebar */}
                <div className="w-full md:w-80 p-6 md:p-8 shrink-0 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Archive className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-mono text-xs uppercase text-amber-500 font-bold tracking-widest leading-none">
                        {curLightboxItem.category} CLASSIFICATION
                      </span>
                    </div>

                    <h3 className="font-sans font-black text-xl text-white tracking-tight">
                      {curLightboxItem.title}
                    </h3>

                    <p className="font-sans text-xs text-neutral-350 leading-relaxed">
                      {curLightboxItem.details}
                    </p>

                    <div className="border-t border-neutral-800/80 pt-4 space-y-1 text-xs text-neutral-510 font-sans">
                      <strong className="block text-white text-xs uppercase tracking-wider text-neutral-400">Captured Details</strong>
                      <div className="flex items-center space-x-2 text-neutral-500">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Production Stage Audit • Season 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic prompt reminder */}
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[10px] text-neutral-400 leading-normal flex items-start space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Archived with raw acoustic logging metrics. Fully authorized gallery property.</span>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
