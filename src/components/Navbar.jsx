import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'Rooms', href: 'rooms' },
  { name: 'Amenities', href: 'amenities' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Locations', href: 'locations' },
  { name: 'Reviews', href: 'reviews' },
  { name: 'Contact', href: 'contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
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
        scrolled ? 'shadow-lg shadow-black/20 bg-teal-primary/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <button onClick={() => handleNavClick('home')} className="flex-shrink-0">
          <img src="/images/harjas-logo.png" alt="Harjas Hostel Logo" className="h-10 md:h-12 w-auto object-contain" />
        </button>

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

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6"
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-teal-primary/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeLink === link.href ? 'text-gold bg-gold/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="pt-2 px-4">
                <button onClick={() => handleNavClick('contact')} className="btn-primary w-full justify-center text-sm">
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