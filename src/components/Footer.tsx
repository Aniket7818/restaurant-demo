import { Link } from 'react-router-dom';
import { Utensils, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';
import { RESTAURANT_CONFIG } from '../config/restaurant';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/cart', label: 'Cart' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#1D211E] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#C76B3C] rounded-full flex items-center justify-center flex-shrink-0">
                <Utensils className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-serif text-lg font-semibold">{RESTAURANT_CONFIG.name}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {RESTAURANT_CONFIG.description} We believe every meal is a story worth savouring.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: InstagramIcon, label: 'Instagram', href: RESTAURANT_CONFIG.social.instagram },
                { icon: FacebookIcon, label: 'Facebook', href: RESTAURANT_CONFIG.social.facebook },
                { icon: TwitterIcon, label: 'Twitter / X', href: RESTAURANT_CONFIG.social.twitter },
                { icon: YoutubeIcon, label: 'YouTube', href: RESTAURANT_CONFIG.social.youtube },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C76B3C] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C]"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/70 hover:text-[#C76B3C] text-sm transition-colors focus:outline-none focus-visible:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">Opening Hours</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#C76B3C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white/80">Mon – Fri</p>
                  <p className="text-white/50">{RESTAURANT_CONFIG.openingHours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#C76B3C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white/80">Sat – Sun</p>
                  <p className="text-white/50">{RESTAURANT_CONFIG.openingHours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#C76B3C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-white/70">{RESTAURANT_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#C76B3C] flex-shrink-0" aria-hidden="true" />
                <a href={`tel:+${RESTAURANT_CONFIG.whatsappPhone}`} className="text-white/70 hover:text-[#C76B3C] transition-colors">
                  +{RESTAURANT_CONFIG.whatsappPhone} (Demo)
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#C76B3C] flex-shrink-0" aria-hidden="true" />
                <span className="text-white/70">{RESTAURANT_CONFIG.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {CURRENT_YEAR} {RESTAURANT_CONFIG.name}. Demo project by{' '}
            <span className="text-[#C76B3C]">Infinvo Tech</span>. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="w-8 h-8 bg-[#C76B3C] hover:bg-[#b5602f] rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowUp className="w-4 h-4 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
