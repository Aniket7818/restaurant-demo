import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import ReservationModal from './ReservationModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? 'bg-[#1D211E]/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C] rounded"
              aria-label="The Urban Plate — Home"
            >
              <div className="w-8 h-8 bg-[#C76B3C] rounded-full flex items-center justify-center flex-shrink-0">
                <Utensils className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-white font-serif text-lg font-semibold leading-tight">
                {RESTAURANT_CONFIG.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C] rounded px-1 ${
                      isActive
                        ? 'text-[#C76B3C]'
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C] rounded p-1"
                aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-[#C76B3C] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Reserve button */}
              <button
                onClick={() => setReservationOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 bg-[#C76B3C] hover:bg-[#b5602f] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Reserve a Table
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C76B3C] rounded p-1"
                onClick={() => setMobileOpen(v => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <nav
            className="bg-[#1D211E] border-t border-white/10 px-4 py-4 flex flex-col gap-3"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 px-3 rounded transition-colors ${
                    isActive
                      ? 'text-[#C76B3C] bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setReservationOpen(true); }}
              className="mt-2 bg-[#C76B3C] hover:bg-[#b5602f] text-white text-sm font-semibold py-2.5 rounded-full transition-colors"
            >
              Reserve a Table
            </button>
          </nav>
        </div>
      </header>

      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </>
  );
}
