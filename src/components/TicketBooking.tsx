import React, { useState } from 'react';
import { ShieldAlert, CreditCard, Check, Sparkles, User, Mail, Compass, Layers, QrCode, ArrowLeftRight, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, TicketTier, CartItem } from '../types';
import { TICKET_TIERS } from '../data';

interface TicketBookingProps {
  events: Event[];
  preSelectedEventId: string | null;
  onAddTicketToCart: (item: CartItem) => void;
}

export default function TicketBooking({ events, preSelectedEventId, onAddTicketToCart }: TicketBookingProps) {
  // Pre-selected event or default to first event
  const initialEvent = events.find((e) => e.id === preSelectedEventId) || events[0];
  const [selectedEvent, setSelectedEvent] = useState<Event>(initialEvent);
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[0]);
  const [quantity, setQuantity] = useState<number>(1);
  
  // Custom premium extras
  const [lanyard, setLanyard] = useState<boolean>(false);
  const [digitalStream, setDigitalStream] = useState<boolean>(false);
  const [valet, setValet] = useState<boolean>(false);

  // Seat map state
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'seatmap' | 'payment' | 'success'>('idle');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketID, setTicketID] = useState('');

  // Handle change in active event
  const handleEventChange = (eventId: string) => {
    const ev = events.find((e) => e.id === eventId);
    if (ev) {
      setSelectedEvent(ev);
      setSelectedSeats([]);
    }
  };

  // Base price per ticket
  const extraCost = 
    (selectedTier.id === 'tier-vip' ? 150 : 0) + 
    (selectedTier.id === 'tier-elite' ? 450 : 0);
  
  const addOnsCost =
    (lanyard ? 15 : 0) +
    (digitalStream ? 25 : 0) +
    (valet ? 50 : 0);
  
  const unitPrice = selectedEvent.basePrice + extraCost + addOnsCost;
  const totalPrice = unitPrice * quantity;

  // Handles starting checkout
  const startCheckout = () => {
    setCheckoutStep('form');
  };

  // Simulated seats grid
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = [1, 2, 3, 4, 5, 6, 7];

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < quantity) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        // Replace first selected seat
        setSelectedSeats([...selectedSeats.slice(1), seatId]);
      }
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail) return;
    setCheckoutStep('seatmap');
  };

  const handleSeatConfirm = () => {
    if (selectedSeats.length === 0) return;
    setCheckoutStep('payment');
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      const generatedID = 'EP-' + Math.floor(100000 + Math.random() * 900000);
      setTicketID(generatedID);
      
      // Auto-populate cart reservation as well
      onAddTicketToCart({
        id: `${selectedEvent.id}_${selectedTier.id}_${Date.now()}`,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        eventImage: selectedEvent.image,
        tierId: selectedTier.id,
        tierName: selectedTier.name,
        quantity: quantity,
        basePrice: selectedEvent.basePrice + extraCost,
        options: {
          customLanyard: lanyard,
          digitalAccessPass: digitalStream,
          valetParking: valet
        },
        totalPrice: totalPrice,
      });

      setCheckoutStep('success');
    }, 1500);
  };

  return (
    <section id="ticket-booking-workspace" className="py-24 bg-neutral-950 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Sections description */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">DYNAMIC TICKETING BUILDER</span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">Configure Your VIP Experience Pass</h2>
          <p className="font-sans text-neutral-400 text-sm max-w-xl mx-auto">
            Choose your premium concert event, select the perfect administrative access tier, bundle luxury add-ons, and book your verified VIP seats instantly.
          </p>
        </div>

        {checkoutStep === 'idle' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Build pass configurations */}
            <div className="col-span-1 lg:col-span-7 space-y-8 select-none" id="ticket-config-left">
              
              {/* Step 1: choosing Event */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                  <Compass className="w-4 h-4" /> 1. SELECT SPECTACULAR MAIN EVENT
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {events.map((evt) => {
                    const isSelected = selectedEvent.id === evt.id;
                    return (
                      <button
                        key={evt.id}
                        id={`builder-select-evt-${evt.id}`}
                        onClick={() => handleEventChange(evt.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none flex flex-col justify-between h-28 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span className="text-[10px] font-mono leading-none text-neutral-500">EVENT CHOICE</span>
                        <span className="font-semibold text-xs leading-snug line-clamp-2 mt-2">{evt.title}</span>
                        <span className="text-[10px] font-semibold text-amber-500 mt-2">FROM ${evt.basePrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: choosing Ticket Access tier */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4" /> 2. CHOOSE ACCESS LEVEL TIER
                </label>
                <div className="space-y-3">
                  {TICKET_TIERS.map((tier) => {
                    const priceMark = selectedEvent.basePrice + (tier.id === 'tier-vip' ? 150 : tier.id === 'tier-elite' ? 450 : 0);
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        id={`builder-select-tier-${tier.id}`}
                        onClick={() => setSelectedTier(tier)}
                        className={`w-full p-5 rounded-2xl border text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all cursor-pointer focus:outline-none relative overflow-hidden ${
                          isSelected
                            ? 'bg-amber-500/5 border-amber-500 text-white'
                            : 'bg-neutral-900 border-neutral-850 hover:border-neutral-750 text-neutral-300'
                        }`}
                      >
                        {tier.badge && (
                          <div className={`absolute -right-16 top-4 rotate-45 px-16 py-1 text-[8px] font-black uppercase text-center tracking-widest leading-none bg-amber-500 text-neutral-950`}>
                            {tier.badge}
                          </div>
                        )}
                        
                        <div className="space-y-1.5 max-w-md">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              tier.color === 'rose' ? 'bg-rose-500' : tier.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                            <h4 className="font-sans font-bold text-sm tracking-wide">{tier.name}</h4>
                          </div>
                          <p className="font-sans text-xs text-neutral-400 leading-relaxed pr-6">{tier.description}</p>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <div className="text-xs text-neutral-500 font-semibold uppercase font-mono">PRICE PER TICKET</div>
                          <div className="text-xl font-bold text-amber-400">${priceMark}</div>
                          <div className="text-[10px] text-neutral-500">{tier.remaining} remaining</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Bundle VIP Add-ons */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> 3. ADD LUXURY PASS EXPERIENCES (OPTIONAL)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setLanyard(!lanyard)}
                    id="addon-lanyard-toggle"
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between hover:scale-101 cursor-pointer focus:outline-none ${
                      lanyard ? 'bg-amber-500/5 border-amber-500' : 'bg-neutral-900 border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">LED Lanyard</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${lanyard ? 'bg-amber-500 border-amber-500 text-neutral-950' : 'border-neutral-600'}`}>
                        {lanyard && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="font-semibold text-xs mt-3 block text-neutral-300">Custom Wearable Light Collar</span>
                    <span className="text-xs font-bold text-amber-400 mt-1">+$15 / pass</span>
                  </button>

                  <button
                    onClick={() => setDigitalStream(!digitalStream)}
                    id="addon-stream-toggle"
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between hover:scale-101 cursor-pointer focus:outline-none ${
                      digitalStream ? 'bg-amber-500/5 border-amber-500' : 'bg-neutral-900 border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Virtual Stream</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${digitalStream ? 'bg-amber-500 border-amber-500 text-neutral-950' : 'border-neutral-600'}`}>
                        {digitalStream && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="font-semibold text-xs mt-3 block text-neutral-300">Infinite VR Cloud Live Web Access</span>
                    <span className="text-xs font-bold text-amber-400 mt-1">+$25 / pass</span>
                  </button>

                  <button
                    onClick={() => setValet(!valet)}
                    id="addon-valet-toggle"
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between hover:scale-101 cursor-pointer focus:outline-none ${
                      valet ? 'bg-amber-500/5 border-amber-500' : 'bg-neutral-900 border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Valet Spot</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${valet ? 'bg-amber-500 border-amber-500 text-neutral-950' : 'border-neutral-600'}`}>
                        {valet && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="font-semibold text-xs mt-3 block text-neutral-300">Dedicated Underground Parking</span>
                    <span className="text-xs font-bold text-amber-400 mt-1">+$50 / pass</span>
                  </button>
                </div>
              </div>

              {/* Step 4: Quantities input */}
              <div className="flex items-center justify-between bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-sm text-neutral-200">Quantity of Passes</h4>
                  <p className="text-xs text-neutral-500">Secure up to 10 passes per checkout sequence</p>
                </div>
                
                <div className="flex items-center space-x-3 bg-neutral-950 border border-neutral-800 rounded-full px-4 py-2">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all text-lg focus:outline-none cursor-pointer"
                    id="quantity-decrease"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all text-lg focus:outline-none cursor-pointer"
                    id="quantity-increase"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Price Summary & checkout trigger */}
            <div className="col-span-1 lg:col-span-5 relative" id="ticket-summary-panel">
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 md:p-8 space-y-6 sticky top-28 shadow-xl">
                
                <div className="space-y-1">
                  <span className="font-mono text-[9px] font-bold text-amber-500 tracking-widest uppercase">CONFIGURATION RECEIPT</span>
                  <h3 className="font-sans font-bold text-xl text-white">Summary Bill</h3>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-start text-xs text-neutral-400">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white">{selectedEvent.title}</span>
                      <p className="font-mono text-[10px] text-neutral-500">{selectedTier.name} x {quantity}</p>
                    </div>
                    <span className="font-mono text-white font-semibold">${(selectedEvent.basePrice + extraCost) * quantity}</span>
                  </div>

                  {/* Addons summary */}
                  {(lanyard || digitalStream || valet) && (
                    <div className="space-y-1 border-t border-neutral-850/60 pt-2">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest block">Add-ons Pack:</span>
                      {lanyard && (
                        <div className="flex justify-between items-center text-xs text-neutral-400">
                          <span>Custom LED Lanyard x {quantity}</span>
                          <span className="font-mono text-white">${15 * quantity}</span>
                        </div>
                      )}
                      {digitalStream && (
                        <div className="flex justify-between items-center text-xs text-neutral-400">
                          <span>VR Digital Access Stream x {quantity}</span>
                          <span className="font-mono text-white">${25 * quantity}</span>
                        </div>
                      )}
                      {valet && (
                        <div className="flex justify-between items-center text-xs text-neutral-400">
                          <span>Valet Spotted Parking Spot x {quantity}</span>
                          <span className="font-mono text-white">${50 * quantity}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center border-t border-neutral-800 pt-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Subtotal</span>
                    <strong className="font-mono text-amber-400 text-2xl">${totalPrice}</strong>
                  </div>
                </div>

                {/* Benefits lists of choice */}
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-850 space-y-3">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500">What is included in this purchase:</span>
                  <div className="space-y-1.5 text-xs text-neutral-400">
                    {selectedTier.benefits.slice(0, 3).map((bn, bIdx) => (
                      <div key={bIdx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-amber-500" />
                        <span>{bn}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startCheckout}
                  id="checkout-trigger-button"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-sans font-extrabold tracking-widest uppercase transition-all cursor-pointer text-center text-xs shadow-lg"
                >
                  Configure & Register Seat
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Multi-step Checkout simulation Modal Flow */
          <div className="max-w-xl mx-auto rounded-3xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl space-y-6">
            
            {/* Steps tracker indicators */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <button
                className="text-neutral-500 hover:text-white flex items-center gap-1 text-xs cursor-pointer focus:outline-none"
                onClick={() => {
                  if (checkoutStep === 'form') setCheckoutStep('idle');
                  else if (checkoutStep === 'seatmap') setCheckoutStep('form');
                  else if (checkoutStep === 'payment') setCheckoutStep('seatmap');
                  else if (checkoutStep === 'success') {
                    setCheckoutStep('idle');
                    setCheckoutName('');
                    setCheckoutEmail('');
                    setPaymentDone(false);
                    setSelectedSeats([]);
                  }
                }}
              >
                ← Back
              </button>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase">
                <span className={checkoutStep === 'form' ? 'text-amber-500 font-bold' : ''}>1. Name</span>
                <span className="text-neutral-600">›</span>
                <span className={checkoutStep === 'seatmap' ? 'text-amber-500 font-bold' : ''}>2. Seats</span>
                <span className="text-neutral-600">›</span>
                <span className={checkoutStep === 'payment' ? 'text-amber-500 font-bold' : ''}>3. Pay</span>
                <span className="text-neutral-600">›</span>
                <span className={checkoutStep === 'success' ? 'text-amber-500 font-bold' : ''}>4. Pass</span>
              </div>
            </div>

            {/* Step 1: Attendee Information */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4 text-left" id="checkout-form-details">
                <h3 className="font-sans font-bold text-lg">Attendee Core Registration</h3>
                <p className="text-xs text-neutral-400 mb-4">Provide details for verified official communication and certificate generation.</p>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" /> Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    placeholder="e.g. Alexis Thorne"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" /> Verified Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    placeholder="alexis@example.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                  />
                </div>

                <button
                  type="submit"
                  id="checkout-form-submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest cursor-pointer mt-4"
                >
                  Proceed to Interactive Seat Choice
                </button>
              </form>
            )}

            {/* Step 2: Interactive seat selection */}
            {checkoutStep === 'seatmap' && (
              <div className="space-y-6 text-left" id="checkout-seatmap">
                <h3 className="font-sans font-bold text-lg">Select Your Premium Seats</h3>
                <p className="text-xs text-[#a3a3a3]">
                  Configure and lock <span className="text-amber-500 font-extrabold">{quantity} seats</span>. Click on the grid circles below to choose:
                </p>

                {/* Stage symbol representation */}
                <div className="w-full py-2 bg-neutral-950 rounded-xl border border-neutral-800 text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                  MAIN ACOUSTIC PLATFORM / STAGE
                </div>

                {/* Grid */}
                <div className="flex flex-col items-center space-y-3 pt-4 bg-neutral-950/60 p-5 rounded-2xl border border-neutral-850">
                  {rows.map((r) => (
                    <div key={r} className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-neutral-600 font-bold w-4">{r}</span>
                      {columns.map((c) => {
                        const seatId = `${r}${c}`;
                        const isSelected = selectedSeats.includes(seatId);
                        
                        // Pseudo busy seats for realistic immersion
                        const isPhysicallyBusy = (r === 'C' && (c === 3 || c === 4)) || (r === 'A' && c === 1);

                        return (
                          <button
                            key={c}
                            disabled={isPhysicallyBusy}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                              isPhysicallyBusy
                                ? 'bg-neutral-850 border border-neutral-800 text-neutral-700 cursor-not-allowed'
                                : isSelected
                                ? 'bg-amber-500 text-neutral-950 text-[10px] font-black shadow-md border border-amber-400'
                                : 'bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 text-neutral-400'
                            }`}
                            id={`seat-${seatId}`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legends */}
                <div className="flex items-center justify-center space-x-6 text-[10px] font-mono text-neutral-500">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800"></span>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Selected ({selectedSeats.length}/{quantity})</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-850 border border-neutral-800"></span>
                    <span>Occupied</span>
                  </div>
                </div>

                <button
                  disabled={selectedSeats.length !== quantity}
                  onClick={handleSeatConfirm}
                  id="seatmap-confirm-button"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer ${
                    selectedSeats.length === quantity
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {selectedSeats.length === quantity 
                    ? `Confirm Selected Seats (${selectedSeats.join(', ')})`
                    : `Please Select ${quantity - selectedSeats.length} More Seat(s)`}
                </button>
              </div>
            )}

            {/* Step 3: Payment form */}
            {checkoutStep === 'payment' && (
              <div className="space-y-6 text-left" id="checkout-payment-panel">
                <h3 className="font-sans font-bold text-lg">Integrated Premium Checkout</h3>
                <p className="text-xs text-neutral-400">Your connection is fully audited with high-tier security protocols. Confirm your ticket checkout details:</p>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Event:</span>
                    <span className="font-bold text-white text-right max-w-[200px] truncate">{selectedEvent.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Pass Level:</span>
                    <span className="text-amber-500">{selectedTier.name} x {quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Allocated Seats:</span>
                    <span className="font-mono text-white">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-neutral-800 pt-2 font-bold text-sm">
                    <span className="text-neutral-300">Total charge:</span>
                    <span className="font-mono text-amber-400">${totalPrice}</span>
                  </div>
                </div>

                {/* Mock Card form Inputs */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-amber-500" /> Credit Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value="••••  ••••  ••••  2026"
                        className="w-full bg-neutral-950 border border-neutral-805 rounded-xl px-4 py-3 text-sm text-neutral-400 focus:outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase font-mono">SIMULATION ON</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">CIV Code</span>
                      <input
                        type="text"
                        disabled
                        value="***"
                        className="w-full bg-neutral-950 border border-neutral-805 rounded-xl px-4 py-3 text-sm text-neutral-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Validity</span>
                      <input
                        type="text"
                        disabled
                        value="12 / 2030"
                        className="w-full bg-neutral-950 border border-neutral-805 rounded-xl px-4 py-3 text-sm text-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-neutral-400 text-[11px] leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>By clicking authorize below, you confirm that this is a simulated order and the respective reservation will be added to local cache records.</span>
                </div>

                <button
                  onClick={simulatePayment}
                  id="checkout-pay-button"
                  disabled={isProcessing}
                  className="w-full py-4.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Authorizing Secure Escrow Protocol...</span>
                    </div>
                  ) : (
                    <span>Simulate payment & Issue Ticket</span>
                  )}
                </button>
              </div>
            )}

            {/* Step 4: Checkout Success & Printable Ticket */}
            {checkoutStep === 'success' && (
              <div className="space-y-6 text-center animate-fade-in" id="checkout-success-pass">
                
                {/* Visual Header confirmation */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6 stroke-[3px]" />
                  </div>
                  <h3 className="font-sans font-black text-xl text-white">Payment Authorized Successfully</h3>
                  <p className="text-xs text-neutral-400 max-w-sm">
                    Success! Your premium access reservation is safe. We have generated the following verified pass code.
                  </p>
                </div>

                {/* Printable Ticket Pass UI */}
                <div className="border border-neutral-850 rounded-2xl overflow-hidden bg-neutral-950/80 shadow-inner relative" id="physical-printable-ticket">
                  
                  {/* Outer cut circles on sides of ticket card simulating perforation */}
                  <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-900 border-r border-neutral-850 z-10"></div>
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-900 border-l border-neutral-850 z-10"></div>

                  <div className="p-6 md:p-8 space-y-6 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-800/80 pb-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase font-bold text-neutral-500">EVENT BRAND OFFICIAL</span>
                        <div className="font-sans font-black text-xs text-white">ELITE EXPERIENCE PASS</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded">
                        {checkoutName.split(' ')[0]?.toUpperCase() || 'ELITE'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block">Curated Event</span>
                        <h4 className="font-sans font-extrabold text-sm text-neutral-100 leading-snug">{selectedEvent.title}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block">Scheduled Date</span>
                          <span className="font-sans font-semibold text-neutral-200">{selectedEvent.date}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block">Allocated Seats</span>
                          <span className="font-mono font-bold text-amber-400">{selectedSeats.join(', ')}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block">Access Tier</span>
                          <span className="font-sans font-semibold text-neutral-200 text-amber-500">{selectedTier.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block">Registry Code</span>
                          <span className="font-mono text-neutral-200 font-bold">{ticketID}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase block mb-1">Verify Entry Scanner Details</span>
                        <p className="text-[10px] text-neutral-400 leading-relaxed max-w-xs">
                          Show the digital QR index code at venue check-in. Doors open exactly 90 minutes beforehand. Enjoy!
                        </p>
                      </div>

                      {/* Mock barcode block */}
                      <div className="bg-white p-2.5 rounded-lg shrink-0 overflow-hidden relative group">
                        <QrCode className="w-16 h-16 text-neutral-950" />
                        <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply rounded-lg"></div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCheckoutStep('idle');
                      setCheckoutName('');
                      setCheckoutEmail('');
                      setPaymentDone(false);
                      setSelectedSeats([]);
                    }}
                    className="flex-1 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Finish & Book Another
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Print Event Pass
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
