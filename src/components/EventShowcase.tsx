import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Info, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../types';

interface EventShowcaseProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onBookClick: (eventId: string) => void;
  onScheduleClick: (eventId: string) => void;
}

export default function EventShowcase({ events, onSelectEvent, onBookClick, onScheduleClick }: EventShowcaseProps) {
  const [filter, setFilter] = useState<'All' | 'Music' | 'Gala' | 'Exhibition'>('All');
  const [activeQuickView, setActiveQuickView] = useState<Event | null>(null);

  const filteredEvents = events.filter((evt) => {
    if (filter === 'All') return true;
    return evt.category === filter;
  });

  const categories: ('All' | 'Music' | 'Gala' | 'Exhibition')[] = ['All', 'Music', 'Gala', 'Exhibition'];

  return (
    <section id="event-showcase-section" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header of Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">CURATED EXPERIENCES</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">Active Event Showcases</h2>
            <p className="font-sans text-neutral-400 text-sm max-w-lg">
              Explore our select elite events for the 2026 calendar season. Each showcase guarantees top-tier performance standards.
            </p>
          </div>
          
          {/* Filters controls */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-button-${cat}`}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                  filter === cat
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-showcase-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((evt, idx) => {
              const ticketPercent = Math.round((evt.remainingTickets / evt.totalTickets) * 100);
              const isUrgent = ticketPercent < 15; // Show fire emblem if low capacity
              
              return (
                <motion.div
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl bg-neutral-905 border border-neutral-800/80 hover:border-neutral-700/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl relative"
                  id={`event-card-${evt.id}`}
                >
                  <div>
                    {/* Event image card */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                      
                      {/* Price tag */}
                      <span className="absolute top-4 right-4 px-4 py-1.5 bg-neutral-950/80 backdrop-blur-md rounded-full border border-neutral-700/50 font-mono text-amber-400 text-xs font-bold leading-none">
                        TICKETS FROM ${evt.basePrice}
                      </span>
                    </div>

                    {/* Meta and titles */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-widest font-bold">
                        <span className="text-amber-500 font-mono">✦ {evt.category}</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{evt.date}</span>
                        </div>
                      </div>

                      <h3 className="font-sans font-extrabold text-xl group-hover:text-amber-400 transition-colors">
                        {evt.title}
                      </h3>
                      
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>

                      {/* Highlights bullets */}
                      <div className="space-y-1.5 pt-2">
                        {evt.highlights.slice(0, 2).map((hl, itemIdx) => (
                          <div key={itemIdx} className="flex items-center space-x-2 text-xs text-neutral-300">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scarcity indicator and buttons */}
                  <div className="p-6 pt-0 space-y-4">
                    {/* Ticket bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          {isUrgent && <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />}
                          {evt.remainingTickets} OF {evt.totalTickets} SEATS AVAILABLE
                        </span>
                        <span className={isUrgent ? 'text-red-500 font-black' : 'text-amber-400'}>{ticketPercent}% left</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            isUrgent ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-gradient-to-r from-amber-500 to-emerald-400'
                          }`}
                          style={{ width: `${ticketPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setActiveQuickView(evt)}
                        id={`quick-view-${evt.id}`}
                        className="py-2.5 px-3 rounded-xl bg-neutral-905 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                      <button
                        onClick={() => onBookClick(evt.id)}
                        id={`quick-book-${evt.id}`}
                        className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                      >
                        Book Passes
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick View Details Drawer Modal */}
        <AnimatePresence>
          {activeQuickView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveQuickView(null)}
                className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
              />

              {/* Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden text-left"
                id="quick-view-modal"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveQuickView(null)}
                  className="absolute right-4 top-4 z-10 p-2 rounded-full bg-neutral-950/60 hover:bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
                  id="close-quickview-button"
                >
                  ✕
                </button>

                {/* Hero imagery block */}
                <div className="relative aspect-video">
                  <img
                    src={activeQuickView.image}
                    alt={activeQuickView.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>
                  
                  {/* Category badget */}
                  <div className="absolute bottom-4 left-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-sans font-bold text-xs uppercase tracking-widest leading-none">
                    <span>✦ Curated {activeQuickView.category} Experience</span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="font-sans font-black text-2xl tracking-tight text-white mb-2">{activeQuickView.title}</h3>
                    <p className="font-sans text-amber-500 text-sm font-semibold mb-4">{activeQuickView.subtitle}</p>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed">{activeQuickView.longDescription}</p>
                  </div>

                  {/* Core specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-neutral-800/80 py-4 font-sans text-sm text-neutral-400">
                    <div className="space-y-1">
                      <strong className="block text-white text-xs uppercase tracking-wider text-amber-500">Scheduled Time</strong>
                      <span>{activeQuickView.date}</span>
                      <span className="block text-xs">{activeQuickView.time}</span>
                    </div>
                    <div className="space-y-1">
                      <strong className="block text-white text-xs uppercase tracking-wider text-amber-500">Sanctuary Venue</strong>
                      <span>{activeQuickView.venueName}</span>
                      <span className="block text-xs text-neutral-500">({activeQuickView.location})</span>
                    </div>
                  </div>

                  {/* Highlights section list */}
                  <div className="space-y-3">
                    <strong className="block text-white text-xs uppercase tracking-wider font-bold">Exclusive Highlight Benefits:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeQuickView.highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drawer Footer controls */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-800/80">
                    <button
                      onClick={() => {
                        setActiveQuickView(null);
                        onScheduleClick(activeQuickView.id);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold tracking-wider transition-all cursor-pointer text-center"
                    >
                      View Live Schedule Timeline
                    </button>
                    <button
                      onClick={() => {
                        setActiveQuickView(null);
                        onBookClick(activeQuickView.id);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold tracking-widest transition-all cursor-pointer text-center uppercase"
                    >
                      Book Ticket Passes
                    </button>
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
