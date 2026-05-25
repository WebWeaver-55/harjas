import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { heroSlides } from '../data/siteData';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow — will-change for GPU compositing */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].url})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-dark/75" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          src="/images/harjas-logo.png"
          alt="Harjas Hostel"
          className="h-16 md:h-20 w-auto mb-6 drop-shadow-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm mb-6"
        >
          <span className="text-gold text-sm">✦</span>
          <span className="text-white/90 text-sm font-medium tracking-wide">Trusted by 500+ UPES Students</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6"
        >
          Premium Student Living
          <br />
          <span className="gradient-text">Near UPES Dehradun</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-white/70 text-lg md:text-xl font-light tracking-wider mb-2">Safe · Modern · Comfortable</p>
          <p className="text-white/50 text-sm md:text-base">Separate Boys & Girls Hostel Facilities</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollToSection('rooms')}
            className="btn-primary text-base"
          >
            Explore Rooms
            <ChevronDown size={18} className="rotate-[-90deg]" />
          </button>
          <a
            href="https://wa.me/+917983366239?text=Hi, I'm interested in Harjas Hostel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline border-gold text-white text-base group"
          >
            <MessageCircle size={18} className="text-[#25D366]" />
            WhatsApp Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex gap-2 mt-10"
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentSlide ? 'w-8 bg-gold' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection('rooms')}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}