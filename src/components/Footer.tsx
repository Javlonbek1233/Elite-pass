import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setIsSubscribed(true);
    setNewsEmail('');
  };

  return (
    <footer id="main-site-footer" className="bg-neutral-900 border-t border-neutral-805 py-16 text-neutral-400 font-sans text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Col 1 Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-sans font-black text-neutral-950 text-lg">E</div>
            <div>
              <span className="block font-sans font-bold tracking-wider text-xs">ELITE PASS</span>
              <span className="block font-sans text-[8px] text-amber-500 tracking-wider">TICKETING</span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
            High-fidelity ticket procurement systems built for extreme luxury event configurations, performance venues, and classical masterworks.
          </p>
        </div>

        {/* Col 2 Exploration */}
        <div className="space-y-3">
          <h4 className="text-white text-xs uppercase tracking-wider font-bold">Explorations</h4>
          <div className="flex flex-col space-y-2 text-xs">
            <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="hover:text-amber-500 transition-colors text-left cursor-pointer">Main Hub</button>
            <button onClick={() => { setActiveTab('events'); window.scrollTo(0,0); }} className="hover:text-amber-500 transition-colors text-left cursor-pointer">Select Showcases</button>
            <button onClick={() => { setActiveTab('tickets'); window.scrollTo(0,0); }} className="hover:text-amber-500 transition-colors text-left cursor-pointer">Procement Passes</button>
            <button onClick={() => { setActiveTab('gallery'); window.scrollTo(0,0); }} className="hover:text-amber-500 transition-colors text-left cursor-pointer">Visual Archive</button>
          </div>
        </div>

        {/* Col 3 Integrity */}
        <div className="space-y-3">
          <h4 className="text-white text-xs uppercase tracking-wider font-bold">Infrastructures</h4>
          <div className="flex flex-col space-y-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Audited SSL Security
            </span>
            <span>PCI-DSS Ticketing Compliant</span>
            <span>Dynamic Seat Grid Reservation</span>
          </div>
        </div>

        {/* Col 4 Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white text-xs uppercase tracking-wider font-bold">The Inner Circle</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Register your secure email credentials to collect invitations to pre-sale opportunities and backstage pass drops.
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="news-form"
                onSubmit={handleSubscribe}
                className="flex items-center bg-neutral-950 rounded-xl border border-neutral-800 p-1 pl-3"
                id="newsletter-form"
              >
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@service.com"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full bg-transparent px-2.5 py-2 text-xs text-white focus:outline-none placeholder-neutral-600"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-button"
                  className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-0.5" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="news-subscribed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-amber-500/10 border border-amber-500/20 text-neutral-300 rounded-xl text-xs flex items-center space-x-2"
                id="newsletter-success-message"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Invited! Welcome to the premium inner circle list.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-neutral-805/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600">
        <p>© 2026 Elite Pass Official Ltd. All simulated rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <span className="hover:text-neutral-400 cursor-pointer">Security Terms</span>
          <span className="hover:text-neutral-400 cursor-pointer">Refund Policies</span>
        </div>
      </div>
    </footer>
  );
}
