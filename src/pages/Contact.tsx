import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon } from '../components/SocialIcons';
import { RESTAURANT_CONFIG } from '../config/restaurant';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please provide your name and message.');
      return;
    }
    setError('');

    const msg = encodeURIComponent(
      `💬 *General Inquiry — The Urban Plate*\n\n` +
      `*Name:* ${form.name}\n` +
      `${form.email ? `*Email:* ${form.email}\n` : ''}` +
      `${form.phone ? `*Phone:* ${form.phone}\n` : ''}` +
      `*Message:* ${form.message}\n`
    );

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D211E]">
            Contact Us
          </h1>
          <p className="text-[#77766F] text-sm sm:text-base mt-3">
            We'd love to hear from you. Visit us or drop a message anytime.
          </p>
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)] space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1D211E]">
                Restaurant Info
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#77766F] tracking-wider mb-1">
                      Our Location
                    </h3>
                    <p className="text-sm font-medium text-[#1D211E]">
                      {RESTAURANT_CONFIG.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#77766F] tracking-wider mb-1">
                      Call Us
                    </h3>
                    <a
                      href={`tel:+${RESTAURANT_CONFIG.whatsappPhone}`}
                      className="text-sm font-medium text-[#1D211E] hover:text-[#C76B3C] transition-colors"
                    >
                      +{RESTAURANT_CONFIG.whatsappPhone} (Demo)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#77766F] tracking-wider mb-1">
                      Email Us
                    </h3>
                    <p className="text-sm font-medium text-[#1D211E]">
                      {RESTAURANT_CONFIG.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#77766F] tracking-wider mb-1">
                      Opening Hours
                    </h3>
                    <p className="text-sm font-medium text-[#1D211E]">
                      {RESTAURANT_CONFIG.openingHours.display}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${encodeURIComponent('Hello! I would like to inquire about The Urban Plate.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>

              {/* Follow Us */}
              <div className="pt-4 border-t border-[#ECE3D8]">
                <h3 className="text-xs uppercase font-semibold text-[#77766F] tracking-wider mb-3">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: InstagramIcon, label: 'Instagram' },
                    { icon: FacebookIcon, label: 'Facebook' },
                    { icon: TwitterIcon, label: 'Twitter' },
                    { icon: YoutubeIcon, label: 'YouTube' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#C76B3C] text-[#252823] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#D6CCC2]"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)]">
              <h2 className="font-serif text-2xl font-bold text-[#1D211E] mb-2">
                Send a Message
              </h2>
              <p className="text-xs text-[#77766F] mb-6">
                Have a special catering request, event query, or feedback? Send us a message and we’ll reply promptly.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1D211E] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-xs text-[#77766F] max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you for reaching out. WhatsApp has been opened with your inquiry. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="bg-[#C76B3C] text-white px-6 py-2 rounded-full text-xs font-semibold hover:bg-[#b5602f] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your question, feedback, or private event request here..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C76B3C] hover:bg-[#b5602f] text-white py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── MAP SECTION ──────────────────────────────── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)]">
          <div className="p-6 bg-[#FAF7F2] border-b border-[#D6CCC2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1D211E]">
                Find Us in {RESTAURANT_CONFIG.city}
              </h3>
              <p className="text-xs text-[#77766F]">
                {RESTAURANT_CONFIG.address}
              </p>
            </div>
            <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
              📍 Fictional Demo Location
            </span>
          </div>

          <div className="relative h-80 w-full bg-[#E5E0D8]">
            <iframe
              title="Restaurant Location Map"
              src="https://maps.google.com/maps?q=Sector%2017,%20Chandigarh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
