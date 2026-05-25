import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ShieldCheck, Sparkles, Sliders, ArrowRight, HeartHandshake, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENTS } from './data';
import { CartItem, Event } from './types';

// Importing custom submodules
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventShowcase from './components/EventShowcase';
import TicketBooking from './components/TicketBooking';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event>(EVENTS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [preSelectedTicketId, setPreSelectedTicketId] = useState<string | null>(null);
  
  // Notification Toast state
  const [toast, setToast] = useState<string | null>(null);

  // Load cart from localStorage on init
  useEffect(() => {
    try {
      const cached = localStorage.getItem('elite_booking_cart_v1');
      if (cached) {
        setCart(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to load cached cart', e);
    }
  }, []);

  // Sync cart to localStorage
  const syncCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('elite_booking_cart_v1', JSON.stringify(updatedCart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  };

  // Add Item to cart
  const handleAddTicketToCart = (item: CartItem) => {
    const existingIdx = cart.findIndex((i) => i.id === item.id || (i.eventId === item.eventId && i.tierId === item.tierId));
    if (existingIdx > -1) {
      const copy = [...cart];
      copy[existingIdx].quantity += item.quantity;
      copy[existingIdx].totalPrice = copy[existingIdx].quantity * copy[existingIdx].basePrice;
      syncCart(copy);
    } else {
      syncCart([...cart, item]);
    }
    showToast(`Successfully added ${item.quantity}x ${item.tierName} to secure passes list!`);
  };

  // Remove Item
  const handleRemoveCartItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    syncCart(updated);
    showToast('Secure pass booking removed from reservations.');
  };

  // Clear Cart
  const handleClearCart = () => {
    syncCart([]);
    showToast('All active reservations cleared.');
  };

  // Helper to trigger custom visual toast notifications
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handles clicking "Book passes" on various highlights
  const routeToTicketBooking = (eventId: string) => {
    setPreSelectedTicketId(eventId);
    const targetEvent = EVENTS.find((e) => e.id === eventId);
    if (targetEvent) {
      setSelectedEvent(targetEvent);
    }
    setActiveTab('tickets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles clicking "View Timeline"
  const routeToTimeline = (eventId: string) => {
    const targetEvent = EVENTS.find((e) => e.id === eventId);
    if (targetEvent) {
      setSelectedEvent(targetEvent);
    }
    // We scroll down to the timeline component on the homepage
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('interactive-timeline-block');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 flex flex-col justify-between overflow-x-hidden antialiased">
      
      {/* Top persistent Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Floating dynamic toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 text-center"
            id="toast-notification"
          >
            <div className="bg-neutral-900 border border-amber-500/30 shadow-2xl p-4 rounded-2xl flex items-center space-x-3 text-left">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                ✦
              </div>
              <p className="font-sans text-xs font-semibold text-neutral-100 leading-normal flex-1">
                {toast}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Side Sheet */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setActiveTab('tickets');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Primary Orchestration Router Switch */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              id="home-page-layout"
            >
              {/* Premium Slider Hero */}
              <HeroSection
                events={EVENTS}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                onBookClick={routeToTicketBooking}
              />

              {/* Luxury statistics bento display */}
              <section className="py-20 bg-neutral-950 border-t border-neutral-900" id="home-bento-stats">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 flex flex-col justify-between space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-left">
                      <strong className="block text-2xl font-bold font-mono text-amber-400">99.8%</strong>
                      <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Acoustic Precision Calibration</span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                        Every performance hall environment undergoes 48-hour acoustic simulation sweeps using state-of-the-art diagnostic nodes.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 flex flex-col justify-between space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-left">
                      <strong className="block text-2xl font-bold font-mono text-amber-400">10,000+</strong>
                      <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Elite VIP Admissions Booked</span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                        A global repertoire representing elite patrons who seek exclusive old-world orchestra galas and hyper-cybernetic raves alike.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 flex flex-col justify-between space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-left">
                      <strong className="block text-2xl font-bold font-mono text-amber-400">4-Hour</strong>
                      <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Concierge Guarantee</span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                        Bypass standard helpline ticket systems. Any inquiry receives personal, direct oversight within 4 operational hours.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Interactive Timeline section */}
              <TimelineSection
                events={EVENTS}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
              />

              {/* Call to action mid banner */}
              <section className="py-24 bg-gradient-to-b from-neutral-950 to-neutral-900 relative overflow-hidden" id="home-commitment-banner">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                  <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">THE LUXURIOUS STANDARD</span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">Our Premium Experience Procurement Ecosystem</h3>
                  <p className="font-sans text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
                    Rather than mass-producing generic ticket vouchers, Elite Pass treats every concert and art biennale booking as an bespoke contract arrangement. Customize everything from LED-wearables to personal drop spot parking today.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => { setActiveTab('events'); window.scrollTo(0,0); }}
                      className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      Browse curations library
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              key="events-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-24 min-h-[80vh]"
            >
              <EventShowcase
                events={EVENTS}
                onSelectEvent={setSelectedEvent}
                onBookClick={routeToTicketBooking}
                onScheduleClick={routeToTimeline}
              />
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-24 min-h-[80vh]"
            >
              <TicketBooking
                events={EVENTS}
                preSelectedEventId={preSelectedTicketId}
                onAddTicketToCart={handleAddTicketToCart}
              />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-24 min-h-[80vh]"
            >
              <GallerySection />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-24 min-h-[80vh]"
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Bottom Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
