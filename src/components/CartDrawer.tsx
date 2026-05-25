import React from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckoutClick: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  onCheckoutClick,
}: CartDrawerProps) {
  const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-neutral-900 border-l border-neutral-800 text-white shadow-2xl flex flex-col justify-between"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h3 className="font-sans font-bold text-lg">Your Reserved Passes</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                id="cart-close-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-neutral-520 text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-955 border border-neutral-800 flex items-center justify-center text-neutral-500">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-white text-sm">No Active Reservations</h4>
                    <p className="text-xs text-neutral-500 max-w-[200px] mx-auto mt-1 leading-relaxed">
                      Go to Tickets to customize a custom VIP experience pass.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 uppercase font-mono">SELECTED REPERTOIRE</span>
                    <button
                      onClick={onClearCart}
                      className="text-[#ef4444] hover:underline font-semibold cursor-pointer"
                      id="clear-cart-button"
                    >
                      Clear All
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-neutral-950 border border-neutral-850 flex items-start gap-4"
                      id={`cart-item-${item.id}`}
                    >
                      <img
                        src={item.eventImage}
                        alt={item.eventTitle}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl shrink-0 border border-neutral-800"
                      />

                      <div className="flex-1 space-y-1 w-full overflow-hidden text-left">
                        <span className="block font-sans font-extrabold text-xs text-white truncate">
                          {item.eventTitle}
                        </span>
                        
                        <div className="flex items-center justify-between text-[11px] text-neutral-400">
                          <span className="text-amber-500 font-semibold">{item.tierName}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>

                        {/* Extra packages badges tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.options.customLanyard && (
                            <span className="text-[8px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-neutral-400 uppercase">Lanyard</span>
                          )}
                          {item.options.digitalAccessPass && (
                            <span className="text-[8px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-neutral-400 uppercase">VR Link</span>
                          )}
                          {item.options.valetParking && (
                            <span className="text-[8px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-neutral-400 uppercase">Valet</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-850/60 mt-1.5">
                          <strong className="text-xs font-mono text-amber-400">${item.totalPrice}</strong>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            id={`trash-item-${item.id}`}
                            className="p-1 rounded text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors cursor-pointer"
                            aria-label="Remove reservation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & simulated check */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
                <div className="flex justify-between items-center text-sm font-sans">
                  <span className="text-neutral-400">Total Value:</span>
                  <strong className="font-mono text-amber-400 text-xl font-bold">${totalAmount}</strong>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Audited ticketing connection system</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onCheckoutClick();
                  }}
                  id="cart-drawer-checkout"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-sans font-bold text-xs uppercase tracking-widest cursor-pointer text-center"
                >
                  Configure & Book Interactive Seat
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
