import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  MapPin,
  UtensilsCrossed,
  Sparkles,
  HeartHandshake,
  ChefHat,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Play
} from 'lucide-react';
import { menuItems } from '../data/menu';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import DishCard from '../components/DishCard';
import ReservationModal from '../components/ReservationModal';

const TODAY_DATE = new Date().toISOString().split('T')[0];

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);

  // In-page reservation form state
  const [inlineForm, setInlineForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '7:00 PM',
    guests: '2',
    requests: '',
  });
  const [inlineSubmitted, setInlineSubmitted] = useState(false);
  const [inlineError, setInlineError] = useState('');

  const signatureDishes = menuItems.filter(item => item.isFeatured).slice(0, 4);

  const categories = [
    {
      id: 'starters',
      name: 'Starters',
      desc: 'Crispy, savory appetisers to start your feast',
      image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80',
    },
    {
      id: 'main',
      name: 'Main Course',
      desc: 'Rich curries, slow-braised meats & gourmet plates',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    },
    {
      id: 'pizza-pasta',
      name: 'Pizza & Pasta',
      desc: 'Handcrafted artisan pizzas & velvety pasta',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      desc: 'Decadent chocolate bakes, lava cakes & sweets',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    },
    {
      id: 'beverages',
      name: 'Beverages',
      desc: 'Craft cold brews, chilled lassis & refreshers',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        'The Truffle Mushroom Pasta was genuinely exceptional, and the atmosphere strikes the perfect balance of cozy sophistication. A new favorite for anniversary dinners!',
      name: 'Aarav Mehta',
      role: 'Verified Food Enthusiast',
      rating: 5,
    },
    {
      id: 2,
      quote:
        'From the warm greeting at the door to the wood-fired Margherita, everything was top tier. The flavors are remarkably authentic and fresh.',
      name: 'Pooja Kashyap',
      role: 'Weekend Diner',
      rating: 5,
    },
    {
      id: 3,
      quote:
        'The molten chocolate lava cake is worth the trip alone! Generous portions, attentive staff, and a stunning interior. Highly recommended.',
      name: 'Rohit Verma',
      role: 'Family Dinner Guest',
      rating: 5,
    },
  ];

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineForm.name.trim() || !inlineForm.phone.trim() || !inlineForm.date) {
      setInlineError('Please fill in your name, phone number, and reservation date.');
      return;
    }
    setInlineError('');

    const msg = encodeURIComponent(
      `🍽️ *Table Reservation Request*\n\n` +
      `*Name:* ${inlineForm.name}\n` +
      `*Phone:* ${inlineForm.phone}\n` +
      `${inlineForm.email ? `*Email:* ${inlineForm.email}\n` : ''}` +
      `*Date:* ${inlineForm.date}\n` +
      `*Time:* ${inlineForm.time}\n` +
      `*Guests:* ${inlineForm.guests}\n` +
      `${inlineForm.requests ? `*Special Requests:* ${inlineForm.requests}\n` : ''}` +
      `\n_This is a reservation request and requires restaurant confirmation._`
    );

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${msg}`, '_blank');
    setInlineSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#252823] overflow-hidden">
      {/* ── 1. HERO SECTION ──────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#1D211E] text-white pt-20 pb-16 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=85"
            alt="Artisanal food plated in warm dining lighting"
            className="w-full h-full object-cover object-center brightness-40 scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D211E] via-[#1D211E]/40 to-[#1D211E]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C76B3C] text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to {RESTAURANT_CONFIG.name}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Good Food. <br />
              <span className="italic font-normal text-[#FAF7F2]/90">Great Company.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl font-light leading-relaxed mb-10">
              Fresh ingredients. Authentic flavors. A memorable dining experience crafted with passion, quality, and hospitality.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C76B3C] hover:bg-[#b5602f] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setReservationOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C76B3C]" />
                <span>Book a Table</span>
              </button>
            </div>
          </motion.div>

          {/* Quick info strip at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C76B3C]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Open Daily</p>
                <p className="text-sm font-semibold text-white">{RESTAURANT_CONFIG.openingHours.weekdays}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C76B3C]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Our Location</p>
                <p className="text-sm font-semibold text-white">{RESTAURANT_CONFIG.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FEATURED / SIGNATURE DISHES ────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
              Chef's Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D211E]">
              Our Signature Dishes
            </h2>
            <p className="text-[#77766F] text-sm sm:text-base mt-2 max-w-xl">
              A carefully curated selection of our most loved dishes, prepared with authentic ingredients and artisanal craftsmanship.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C76B3C] hover:text-[#b5602f] border-b border-[#C76B3C]/30 pb-0.5 transition-colors self-start md:self-auto"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map(item => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── 3. ABOUT PREVIEW ──────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-y border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual with Badge */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-[#1D211E]">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=80"
                  alt="Atmospheric dining room with ambient lighting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/70">Est. 2021</p>
                    <p className="font-serif text-xl font-bold">A Culinary Destination</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#FAF7F2] p-6 rounded-2xl border border-[#D6CCC2] shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C76B3C]/10 flex items-center justify-center text-[#C76B3C]">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-bold text-[#1D211E]">100%</p>
                    <p className="text-xs text-[#77766F]">Fresh artisanal ingredients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-6">
              <div className="inline-block text-[#C76B3C] font-semibold text-xs uppercase tracking-widest">
                Our Story
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D211E] leading-tight">
                A Place Where Food Brings People Together
              </h2>
              <p className="text-[#77766F] text-sm sm:text-base leading-relaxed">
                At The Urban Plate, we believe great food is more than just a meal — it’s a shared celebration. Our journey started with a simple idea: create a warm, welcoming space where delicious recipes, attentive hospitality, and unforgettable memories come together.
              </p>
              <p className="text-[#77766F] text-sm leading-relaxed">
                From slow-simmered hand-ground spice blends to wood-fired artisan pizzas blistered at 450°C, our kitchen combines classic traditions with contemporary finesse.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#ECE3D8]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1D211E]">Fresh & Local</h4>
                  <p className="text-xs text-[#77766F] mt-1">Ethically sourced farm produce</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1D211E]">Artisan Craft</h4>
                  <p className="text-xs text-[#77766F] mt-1">Made from scratch every morning</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#1D211E] hover:bg-[#C76B3C] text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MENU CATEGORIES ────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
            Explore Flavors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D211E]">
            Menu Categories
          </h2>
          <p className="text-[#77766F] text-sm sm:text-base mt-3">
            Handcrafted starters, hearty mains, artisan pizzas, and decadent sweet finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#1D211E] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-xl font-bold mb-1 group-hover:text-[#C76B3C] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#C76B3C] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. THE URBAN PLATE EXPERIENCE ─────────────── */}
      <section className="py-20 bg-[#1D211E] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
              Why Dine With Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              The Urban Plate Experience
            </h2>
            <p className="text-white/70 text-sm sm:text-base mt-3">
              We focus on every subtle nuance — from ambient acoustics to the crunch of each bite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UtensilsCrossed,
                title: 'Fresh Ingredients',
                desc: 'Daily delivered fresh herbs, dairy, and seasonal veggies directly from partner farms.',
              },
              {
                icon: ChefHat,
                title: 'Master Culinary Team',
                desc: 'Executive chefs with years of international & artisanal culinary mastery.',
              },
              {
                icon: Sparkles,
                title: 'Inviting Ambience',
                desc: 'Thoughtfully lit interiors with acoustic comfort, ideal for both dates and group reunions.',
              },
              {
                icon: HeartHandshake,
                title: 'Warm Hospitality',
                desc: 'Attentive, smiling team members who anticipate your dining needs with care.',
              },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C76B3C] flex items-center justify-center mb-6">
                    <exp.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2.5 text-white">{exp.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS (DEMO CONTENT) ───────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D211E]">
            What Our Guests Say
          </h2>
          <p className="text-[#77766F] text-xs mt-2 italic">
            (Sample customer reviews for demonstration purposes)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(29,33,30,0.06)] hover:shadow-xl transition-all duration-300 border border-[#D6CCC2] flex flex-col justify-between relative"
            >
              <div>
                <Quote className="w-10 h-10 text-[#C76B3C]/30 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#252823] text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECE3D8]">
                <h4 className="font-serif font-bold text-base text-[#1D211E]">{t.name}</h4>
                <p className="text-xs text-[#77766F]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. IN-PAGE RESERVATION SECTION ────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF7F2] border-t border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1D211E] rounded-3xl overflow-hidden shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12">
            {/* Left side details */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a302b] to-[#1D211E]">
              <div>
                <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
                  Table Booking
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                  Reserve a Table
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Enjoy a memorable dining experience with us. Whether it is an intimate date or a celebratory family gathering, we have a table ready.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C76B3C] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Quick Confirmation</p>
                      <p className="text-xs text-white/60">Instant WhatsApp routing to restaurant host.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C76B3C] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Flexible Timings</p>
                      <p className="text-xs text-white/60">Lunch and dinner seatings 7 days a week.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C76B3C] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Special Occasions</p>
                      <p className="text-xs text-white/60">Custom dessert notes & anniversary setups.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 text-xs text-white/50">
                ⚠️ Table reservations require restaurant host confirmation via WhatsApp.
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-[#FAF7F2] text-[#252823]">
              {inlineSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1D211E] mb-2">
                    Booking Request Sent!
                  </h3>
                  <p className="text-[#77766F] text-sm max-w-md mx-auto leading-relaxed mb-6">
                    WhatsApp has opened with your reservation request. Our host will confirm your booking details.
                  </p>
                  <button
                    onClick={() => setInlineSubmitted(false)}
                    className="bg-[#C76B3C] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#b5602f] transition-colors cursor-pointer"
                  >
                    Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4">
                  {inlineError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                      {inlineError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aniket Yadav"
                        value={inlineForm.name}
                        onChange={e => setInlineForm({ ...inlineForm, name: e.target.value })}
                        className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={inlineForm.phone}
                        onChange={e => setInlineForm({ ...inlineForm, phone: e.target.value })}
                        className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        min={TODAY_DATE}
                        value={inlineForm.date}
                        onChange={e => setInlineForm({ ...inlineForm, date: e.target.value })}
                        className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        value={inlineForm.time}
                        onChange={e => setInlineForm({ ...inlineForm, time: e.target.value })}
                        className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                      >
                        <option value="12:00 PM">12:00 PM (Lunch)</option>
                        <option value="1:00 PM">1:00 PM (Lunch)</option>
                        <option value="2:00 PM">2:00 PM (Lunch)</option>
                        <option value="7:00 PM">7:00 PM (Dinner)</option>
                        <option value="8:00 PM">8:00 PM (Dinner)</option>
                        <option value="9:00 PM">9:00 PM (Dinner)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                        Guests *
                      </label>
                      <select
                        value={inlineForm.guests}
                        onChange={e => setInlineForm({ ...inlineForm, guests: e.target.value })}
                        className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(n => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Special Requests (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Birthday celebration, window seat, high chair"
                      value={inlineForm.requests}
                      onChange={e => setInlineForm({ ...inlineForm, requests: e.target.value })}
                      className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#C76B3C] hover:bg-[#b5602f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for global reservations */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
}
