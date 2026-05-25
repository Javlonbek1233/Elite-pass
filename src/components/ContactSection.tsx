import React, { useState } from 'react';
import { Mail, Phone, MapPin, Compass, Landmark, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [enquiryID, setEnquiryID] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formSubject || !formMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionCompleted(true);
      const generatedID = 'ENQ-' + Math.floor(100000 + Math.random() * 900000);
      setEnquiryID(generatedID);
    }, 1200);
  };

  const officeLocations = [
    { city: 'Tokyo, Japan', address: 'Row-9 Dome Tower, Shinjuku, Tokyo', icon: Compass },
    { city: 'Vienna, Austria', address: 'Sanctuary Hall Office Suite 4B, Vienna', icon: Landmark },
    { city: 'Paris, France', address: 'Lumina Pavillion, Hall 4, Paris', icon: Compass }
  ];

  return (
    <section id="premium-contact-block" className="py-24 bg-neutral-950 text-white font-sans text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header content description */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs font-bold text-amber-500 tracking-widest uppercase">CONCIERGE COMMUNICATION</span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-center">Establish Contact Enquiries</h2>
          <p className="font-sans text-neutral-400 text-sm max-w-lg mx-auto text-center">
            Have private queries regarding group corporate bookings, custom VIP seating arrangements, or ticketing assistance? Connect with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-content-grid">
          
          {/* Left column info */}
          <div className="col-span-1 lg:col-span-5 space-y-8" id="contact-info-panel">
            <div className="space-y-4">
              <h3 className="font-sans font-extrabold text-2xl tracking-tight leading-tight">Elite Booking Concierge</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Our support team guarantees response metrics of less than 4 working hours for registered Elite member accounts. We provide bespoke arrangements.
              </p>
            </div>

            {/* Quick specifications details lists */}
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-550">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 block uppercase">Concert hotline</span>
                  <a href="tel:+81312345678" className="text-sm font-semibold text-neutral-200 hover:text-amber-400 font-sans transition-colors">+81 (0) 3 1234 5678</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-550">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 block uppercase">Email assistance</span>
                  <a href="mailto:concierge@elite-pass.com" className="text-sm font-semibold text-neutral-200 hover:text-amber-400 font-sans transition-colors">concierge@elite-pass.com</a>
                </div>
              </div>
            </div>

            {/* Simulated interactive locations maps list showcase */}
            <div className="space-y-4 pt-6 border-t border-neutral-900">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">Corporate Office Lodges</h4>
              <div className="space-y-3">
                {officeLocations.map((loc, idx) => {
                  const Icon = loc.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-850 flex items-start space-x-3 hover:border-neutral-800 transition-colors">
                      <Icon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <strong className="block text-xs font-bold text-neutral-250 font-sans">{loc.city}</strong>
                        <p className="text-[10px] text-neutral-450 leading-relaxed font-sans">{loc.address}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right column form inquiry */}
          <div className="col-span-1 lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8" id="contact-form-panel">
            <AnimatePresence mode="wait">
              {!submissionCompleted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="font-sans font-bold text-xl mb-4">Direct Inquiry Submission</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Personal Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Alexis Thorne"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="alexis@example.com"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Subject Topic</label>
                    <input
                      type="text"
                      required
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g., Corporate VIP Gala passes request"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Core Inquiry Notes</label>
                    <textarea
                      required
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="State your private ticketing or catering queries in exhaustive details..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-button"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying Communication Security...</span>
                      </div>
                    ) : (
                      <span>Submit Secure Message</span>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="submission-done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6 animate-fade-in"
                  id="contact-success-panel"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <h3 className="font-sans font-extrabold text-xl">Inquiry Logged Securely</h3>

                  <p className="text-neutral-400 text-xs max-w-md mx-auto leading-relaxed">
                    Message received. Your enquiry has bypassed default lines and has been filed directly with our Special Affairs Desk. We will connect shortly.
                  </p>

                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850/80 text-left max-w-sm mx-auto space-y-3.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500">AUDIT ID:</span>
                      <span className="font-bold text-amber-400 ">{enquiryID}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500">SUBJECT:</span>
                      <span className="font-bold text-neutral-100 max-w-[150px] truncate">{formSubject}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-neutral-850/80">
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> QUEUE STATUS:
                      </span>
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">VIP RESPOND</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmissionCompleted(false);
                      setFormName('');
                      setFormEmail('');
                      setFormSubject('');
                      setFormMessage('');
                    }}
                    id="contact-reset-button"
                    className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    File Another Query
                  </button>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
