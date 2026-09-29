import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

const TIME_SLOTS = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
];

const TODAY_DATE = new Date().toISOString().split('T')[0];

export default function ReservationModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', date: '', time: '7:00 PM', guests: '2', requests: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required.';
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(form.phone.trim())) {
      e.phone = 'Enter a valid phone number.';
    }
    if (!form.date) {
      e.date = 'Date is required.';
    } else if (form.date < TODAY_DATE) {
      e.date = 'Date cannot be in the past.';
    }
    if (!form.time) e.time = 'Please select a time slot.';
    const g = parseInt(form.guests);
    if (!form.guests || isNaN(g) || g < 1 || g > 20) {
      e.guests = 'Guests must be between 1 and 20.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const msg = encodeURIComponent(
      `🍽️ *Table Reservation Request*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `${form.email ? `*Email:* ${form.email}\n` : ''}` +
      `*Date:* ${form.date}\n` +
      `*Time:* ${form.time}\n` +
      `*Guests:* ${form.guests}\n` +
      `${form.requests ? `*Special Requests:* ${form.requests}\n` : ''}` +
      `\n_This is a reservation request and requires restaurant confirmation._`
    );

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${msg}`, '_blank');
    setSuccess(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setErrors({});
    }, 300);
  }

  const inputClass = (err?: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-[#252823] placeholder-[#77766F] focus:outline-none focus:ring-2 focus:ring-[#C76B3C] transition-colors ${
      err ? 'border-red-400 bg-red-50' : 'border-[#e8e2d9] bg-white focus:border-[#C76B3C]'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Reserve a Table"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            className="relative bg-[#FAF7F2] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Hero image */}
            <div className="h-36 rounded-t-3xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Restaurant ambience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1D211E]/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white font-serif text-2xl font-semibold">Reserve a Table</h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close reservation form"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-[#1D211E] mb-2">Request Sent!</h3>
                  <p className="text-[#77766F] text-sm leading-relaxed">
                    Your WhatsApp has opened with your reservation details. The restaurant will confirm your booking shortly.
                  </p>
                  <p className="mt-3 text-xs text-[#77766F] bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                    ⚠️ This is a reservation <strong>request</strong> only and requires restaurant confirmation.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 bg-[#C76B3C] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b5602f] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <p className="text-sm text-[#77766F] mb-1">
                    Enjoy a memorable experience with us. Fill in the details below.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-name" className="block text-xs font-semibold text-[#252823] mb-1.5">
                        Your Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Ankit Sharma"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass(errors.name)}
                        aria-required="true"
                        aria-describedby={errors.name ? 'res-name-err' : undefined}
                      />
                      {errors.name && <p id="res-name-err" className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-phone" className="block text-xs font-semibold text-[#252823] mb-1.5">
                        Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputClass(errors.phone)}
                        aria-required="true"
                        aria-describedby={errors.phone ? 'res-phone-err' : undefined}
                      />
                      {errors.phone && <p id="res-phone-err" className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="res-email" className="block text-xs font-semibold text-[#252823] mb-1.5">
                      Email <span className="text-[#77766F] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass()}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-date" className="block text-xs font-semibold text-[#252823] mb-1.5">
                        Date <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={TODAY_DATE}
                        value={form.date}
                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        className={inputClass(errors.date)}
                        aria-required="true"
                        aria-describedby={errors.date ? 'res-date-err' : undefined}
                      />
                      {errors.date && <p id="res-date-err" className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.date}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-time" className="block text-xs font-semibold text-[#252823] mb-1.5">
                        Time <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="res-time"
                        value={form.time}
                        onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        className={inputClass(errors.time)}
                        aria-required="true"
                      >
                        {TIME_SLOTS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-semibold text-[#252823] mb-1.5">
                      Number of Guests <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="res-guests"
                      value={form.guests}
                      onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                      className={inputClass(errors.guests)}
                      aria-required="true"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    {errors.guests && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.guests}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-requests" className="block text-xs font-semibold text-[#252823] mb-1.5">
                      Special Requests <span className="text-[#77766F] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="res-requests"
                      rows={3}
                      placeholder="e.g. Birthday celebration, window seat, etc."
                      value={form.requests}
                      onChange={e => setForm(f => ({ ...f, requests: e.target.value }))}
                      className={`${inputClass()} resize-none`}
                    />
                  </div>

                  <p className="text-xs text-[#77766F] bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    ⚠️ This is a reservation <strong>request</strong> only. You will be redirected to WhatsApp. The restaurant will confirm your booking.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-[#C76B3C] hover:bg-[#b5602f] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Book via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
