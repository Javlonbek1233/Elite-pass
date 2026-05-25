import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isComplete: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days, id: 'days' },
    { label: 'Hours', value: timeLeft.hours, id: 'hours' },
    { label: 'Minutes', value: timeLeft.minutes, id: 'minutes' },
    { label: 'Seconds', value: timeLeft.seconds, id: 'seconds' },
  ];

  if (timeLeft.isComplete) {
    return (
      <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-sans font-bold text-sm uppercase tracking-widest animate-pulse">
        <span>● EVENT COMMENCED</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-3 sm:space-x-4 py-2" id="countdown-wrapper">
      {units.map((unit) => (
        <div key={unit.id} className="flex flex-col items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-md overflow-hidden group">
            {/* Ambient inner shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/10 to-transparent pointer-events-none"></div>
            
            {/* Half line divider simulating traditional split flip */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-neutral-950/80 z-10"></div>
            
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${unit.id}-${unit.value}`}
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="font-mono text-xl sm:text-2xl md:text-3xl font-black text-amber-400 tracking-tight select-none"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            {/* Glowing bottom indicator */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover:via-amber-400/80 transition-all duration-300"></div>
          </div>
          <span className="font-sans text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-widest mt-2">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
