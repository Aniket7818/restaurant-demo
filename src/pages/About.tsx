import { Link } from 'react-router-dom';
import {
  Sparkles,
  Leaf,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Users2
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';

export default function About() {
  const values = [
    {
      title: 'Quality Ingredients',
      desc: 'No artificial additives or processed shortcuts. Only fresh produce, high-grade spices, and ethically sourced dairy.',
    },
    {
      title: 'Sustainable Practices',
      desc: 'We minimize food waste through daily preparation cycles and use eco-conscious, biodegradable takeaway packaging.',
    },
    {
      title: 'Exceptional Service',
      desc: 'Every guest is family. Our hospitality team is dedicated to thoughtful attentiveness without being intrusive.',
    },
    {
      title: 'Community Focus',
      desc: 'Collaborating with local farmers and artisans to strengthen our regional food ecosystem.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#77766F] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#C76B3C] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1D211E] font-medium">About</span>
        </nav>

        {/* ── 1. OUR STORY HERO ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block">
              Passion for Food. People. Experiences.
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D211E] leading-[1.15]">
              Our Story
            </h1>
            <p className="text-[#252823] text-base leading-relaxed">
              {RESTAURANT_CONFIG.name} was born from a simple idea — to bring people together through great food. What started as a small kitchen with big dreams has now become a culinary destination for food lovers who appreciate quality, taste, and hospitality.
            </p>
            <p className="text-[#77766F] text-sm leading-relaxed">
              Every recipe on our menu reflects years of culinary exploration, drawing inspiration from time-honored heritage techniques and modern comfort dining. We obsess over the details: the hydration of our pizza dough, the slow infusion of whole spices, and the warmth of a genuine welcome.
            </p>

            {/* 3 Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#ECE6DE]">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] mb-2">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1D211E]">Fresh Ingredients</h4>
                <p className="text-[11px] text-[#77766F]">Locally sourced</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1D211E]">Authentic Flavors</h4>
                <p className="text-[11px] text-[#77766F]">Global inspirations</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C] mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1D211E]">Warm Hospitality</h4>
                <p className="text-[11px] text-[#77766F]">Always with a smile</p>
              </div>
            </div>
          </div>

          {/* Chef Image Plating */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1D211E] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&q=80"
                alt="Head chef carefully garnishing a gourmet plate"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#C76B3C] font-semibold">Craftsmanship</p>
                  <p className="font-serif text-lg font-bold">Chef Vikram & The Kitchen Team</p>
                </div>
                <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white/80">
                  Demo Profile
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. OUR VALUES ────────────────────────────── */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#D6CCC2] shadow-[0_4px_24px_rgba(29,33,30,0.06)] mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Dining Room Photo */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] border border-[#D6CCC2]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                  alt="Elegant dining room at The Urban Plate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Values Copy */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D211E]">
                More Than Just a Restaurant
              </h2>
              <p className="text-[#77766F] text-sm leading-relaxed">
                We are committed to quality, sustainability, and creating memorable dining experiences for our guests.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {values.map((v, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#C76B3C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#1D211E]">{v.title}</h4>
                      <p className="text-xs text-[#77766F] mt-1 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. FOOD PHILOSOPHY ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-3xl border border-[#D6CCC2] shadow-sm">
            <ShieldCheck className="w-10 h-10 text-[#C76B3C] mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#1D211E] mb-2">Zero Preservatives</h3>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              Every dressing, marinade, pasta dough, and stock pot is prepared in-house fresh each day without canned sauces or artificial colorings.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D6CCC2] shadow-sm">
            <Award className="w-10 h-10 text-[#C76B3C] mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#1D211E] mb-2">Time-Honored Techniques</h3>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              From stone ovens fired with seasoned wood to our 14-hour slow braises, we give each culinary technique the time and respect it deserves.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D6CCC2] shadow-sm">
            <Users2 className="w-10 h-10 text-[#C76B3C] mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#1D211E] mb-2">Inclusive Dining</h3>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              We provide wide, balanced selections for vegetarians, vegans, and meat lovers alike with separate prep stations for total peace of mind.
            </p>
          </div>
        </div>

        {/* ── 4. CTA BANNER ────────────────────────────── */}
        <div className="bg-[#1D211E] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4">
            <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block">
              Experience It Yourself
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
              Join us for lunch, dinner, or weekend celebrations at {RESTAURANT_CONFIG.city}.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="bg-[#C76B3C] hover:bg-[#b5602f] text-white px-7 py-3 rounded-full text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-full text-xs font-semibold transition-colors"
              >
                <span>Find Us & Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
