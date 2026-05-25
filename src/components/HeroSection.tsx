import React from 'react';
import { Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../types';
import CountdownTimer from './CountdownTimer';

interface HeroSectionProps {
  events: Event[];
  selectedEvent: Event;
  setSelectedEvent: (event: Event) => void;
  onBookClick: (eventId: string) => void;
}

export default function HeroSection({ events, selectedEvent, setSelectedEvent, onBookClick }: HeroSectionProps) {
  return (
    <section id="hero-banner" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-950 pt-24 pb-12">
      {/* Background image slider with crossfade and subtle zoom animation */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedEvent.image})` }}
          />
        </AnimatePresence>
        {/* Layer gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Main detail content */}
        <div className="col-span-1 lg:col-span-7 text-left flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEvent.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Category flag */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-sans font-bold text-xs uppercase tracking-widest">
                <span>✦ {selectedEvent.category} CATEGORY</span>
              </div>

              {/* Title */}
              <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-tight">
                {selectedEvent.title}
              </h1>

              {/* Tagline */}
              <p className="font-sans text-amber-500/90 text-lg md:text-xl font-medium tracking-wide">
                {selectedEvent.subtitle}
              </p>

              {/* Summary Description */}
              <p className="font-sans text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Quick specifications */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 text-neutral-300 font-sans text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{selectedEvent.date} • {selectedEvent.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Call to Actions buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onBookClick(selectedEvent.id)}
                  id={`hero-cta-book-${selectedEvent.id}`}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-sans font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98 transition-all cursor-pointer focus:outline-none flex items-center gap-2"
                >
                  Configure Tickets
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live Countdown Card */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-sm rounded-3xl bg-neutral-900/60 backdrop-blur-lg border border-neutral-800/80 p-6 sm:p-8 space-y-6 text-center shadow-2xl relative"
            id="hero-countdown-card"
          >
            {/* Ambient indicator lights */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neutral-950 border border-neutral-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 absolute left-4"></span>
              <span className="font-mono text-[9px] text-neutral-400 font-bold tracking-widest uppercase">LIVE COUNTDOWN</span>
            </div>

            <p className="font-sans text-xs text-neutral-400 uppercase tracking-widest font-bold pt-2">TIME UNTIL SECURING CLOSES</p>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <CountdownTimer targetDate={selectedEvent.countdownTarget} />
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-neutral-800/80 pt-6 flex items-center justify-center space-x-3 text-neutral-400 font-sans text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Official elite ticketing partner system</span>
            </div>
          </motion.div>

          {/* Event Toggle Thumbnails / Selector buttons */}
          <div className="mt-8 flex items-center space-x-3 bg-neutral-900/40 p-1.5 rounded-2xl border border-neutral-800/50">
            {events.map((evt) => {
              const worksAsActive = selectedEvent.id === evt.id;
              return (
                <button
                  key={evt.id}
                  id={`hero-toggle-${evt.id}`}
                  onClick={() => setSelectedEvent(evt)}
                  className={`relative p-1 rounded-xl transition-all cursor-pointer focus:outline-none ${
                    worksAsActive ? 'border border-amber-500' : 'border border-transparent'
                  }`}
                >
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className={`w-14 h-10 object-cover rounded-lg transition-all ${
                      worksAsActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                    }`}
                  />
                  {worksAsActive && (
                    <div className="absolute inset-0 bg-amber-500/10 rounded-lg pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
