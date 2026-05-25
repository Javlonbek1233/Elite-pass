import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Image as ImageIcon, Mail, ShoppingCart, Ticket, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo brand */}
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-2 text-white group cursor-pointer focus:outline-none"
          id="nav-logo-button"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center shadow-md relative overflow-hidden">
            <span className="font-sans font-black text-neutral-950 text-xl tracking-tighter">E</span>
            <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay"></div>
          </div>
          <div className="text-left">
            <span className="block font-sans font-bold tracking-wider text-sm text-neutral-100 uppercase">E L I T E</span>
            <span className="block font-sans text-[10px] text-amber-500 tracking-widest font-semibold uppercase -mt-1">P A S S</span>
          </div>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center space-x-1" id="desktop-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors cursor-pointer focus:outline-none flex items-center gap-1.5 rounded-full ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 opacity-75" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side controls (Cart & Mobile toggle) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            id="cart-toggle-button"
            className="relative p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-all cursor-pointer focus:outline-none flex items-center"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {totalCartCount > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-sans font-bold text-[10px] flex items-center justify-center px-1 border border-neutral-950"
                  id="cart-badge-count"
                >
                  {totalCartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-nav-toggle"
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100 md:hidden cursor-pointer focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-neutral-950 border-b border-neutral-800 absolute top-full left-0 x-20 text-left"
            id="mobile-nav-dropdown"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 opacity-80" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
