import React, { useState } from 'react';
import { Calendar, Music, Clock, MapPin, ChevronDown, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, EventTimeline, TimelineItem } from '../types';
import { TIMELINE_DATA } from '../data';

interface TimelineSectionProps {
  events: Event[];
  selectedEvent: Event;
  setSelectedEvent: (event: Event) => void;
}

export default function TimelineSection({ events, selectedEvent, setSelectedEvent }: TimelineSectionProps) {
  const timelines = TIMELINE_DATA[selectedEvent.id] || [];
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const activeTimeline: EventTimeline | undefined = timelines[activeDayIdx];

  const handleDayChange = (idx: number) => {
    setActiveDayIdx(idx);
    setExpandedIndex(null);
  };

  const handleEventChange = (evt: Event) => {
    setSelectedEvent(evt);
    setActiveDayIdx(0);
    setExpandedIndex(null);
  };

  return (
    <section id="interactive-timeline-block" className="py-24 bg-neutral-950 text-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header content description */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">INTERACTIVE EVENT TIMELINE</span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">Main Stage Master Schedule</h2>
          <p className="font-sans text-neutral-400 text-sm max-w-lg mx-auto">
            Select a curated event below to unfold its hour-by-hour acts, acoustic panels, and keynote workshops. Click items to reveal notes.
          </p>
        </div>

        {/* Event Selector Sub-Bar Pill Grid */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-neutral-900/60 p-2 rounded-2xl border border-neutral-805 max-w-xl mx-auto">
          {events.map((evt) => {
            const isSelected = selectedEvent.id === evt.id;
            return (
              <button
                key={evt.id}
                id={`timeline-select-evt-${evt.id}`}
                onClick={() => handleEventChange(evt)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none whitespace-nowrap text-center ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-md'
                    : 'text-neutral-405 hover:text-white hover:bg-neutral-850'
                }`}
              >
                {evt.category === 'Music' ? 'Symphony' : evt.category === 'Gala' ? 'Gala' : 'Biennale'}
              </button>
            );
          })}
        </div>

        {/* Day selection tabs */}
        {timelines.length > 1 && (
          <div className="flex justify-center space-x-3 mb-10" id="day-selector-tabs">
            {timelines.map((day, idx) => (
              <button
                key={idx}
                id={`timeline-day-tab-${idx}`}
                onClick={() => handleDayChange(idx)}
                className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer focus:outline-none ${
                  activeDayIdx === idx
                    ? 'bg-amber-550/10 border-amber-500 text-amber-400'
                    : 'bg-transparent border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {day.dayName}
              </button>
            ))}
          </div>
        )}

        {/* Main timeline listing */}
        {activeTimeline ? (
          <div className="relative border-l border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10" id="timeline-layout">
            
            <AnimatePresence mode="popLayout">
              {activeTimeline.schedule.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                
                return (
                  <motion.div
                    key={`${selectedEvent.id}-${activeDayIdx}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative group text-left cursor-pointer select-none"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    id={`timeline-item-${idx}`}
                  >
                    {/* Circle bulb indicator indicator */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-neutral-950 border-2 border-neutral-800 group-hover:border-amber-500 flex items-center justify-center transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-amber-500 transition-colors"></div>
                    </div>

                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 group-hover:border-neutral-750/70 transition-all duration-300">
                      
                      {/* Meta stats tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 font-mono">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-neutral-200">{item.time}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neutral-950 border border-neutral-805">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span className="text-[10px] text-neutral-400 truncate tracking-wide">{item.stage}</span>
                        </div>
                      </div>

                      {/* Main Act titles */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <h4 className="font-sans font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center space-x-1.5 mt-0.5 text-xs text-neutral-400 font-medium">
                            <User className="w-3.5 h-3.5 text-amber-500" />
                            <span>{item.artist}</span>
                          </div>
                        </div>
                        
                        <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${
                          isExpanded ? 'rotate-180 text-amber-500' : 'group-hover:text-neutral-300'
                        }`} />
                      </div>

                      {/* Expandable sub details notes */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 border-t border-neutral-800/80 mt-2 space-y-3">
                              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                                {item.description}
                              </p>
                              
                              <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>No secondary pass upgrade needed to view</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        ) : (
          <div className="text-center py-10 text-neutral-400">
            <span>No detailed schedules loaded for this choice.</span>
          </div>
        )}

      </div>
    </section>
  );
}
