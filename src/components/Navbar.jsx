import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'Amenities', href: 'amenities' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Locations', href: 'locations' },
  { name: 'Reviews', href: 'reviews' },
  { name: 'Contact', href: 'contact' },
];

function scrollToSection(id) {
  // Small timeout ensures mobile menu has closed before scrolling
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 50);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveLink(id);
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-lg shadow-black/20 bg-teal-primary/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex-shrink-0 focus:outline-none"
          aria-label="Go to Home"
        >
          <img
            src="/images/harjas-logo.png"
            alt="Harjas Hostel Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                activeLink === link.href ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
              {activeLink === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6"
          >
            Book Now
          </button>
          {/* Hamburger — large tap target for mobile */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-white/80 hover:text-gold hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-teal-primary/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="container-custom py-3 pb-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  /* Use onPointerDown so it fires before the menu animates closed */
                  onPointerDown={() => handleNavClick(link.href)}
                  className={`flex w-full items-center text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-colors cursor-pointer select-none ${
                    activeLink === link.href
                      ? 'text-gold bg-gold/10'
                      : 'text-white/80 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="pt-3 px-1">
                <button
                  onPointerDown={() => handleNavClick('contact')}
                  className="btn-primary w-full justify-center text-sm cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}