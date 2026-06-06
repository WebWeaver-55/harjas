import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviewsData, trustStats } from '../data/siteData';

// ── Gender detection ──────────────────────────────────────────────────────────
const FEMALE_FIRST_NAMES = new Set([
  'ananya','priya','divya','sneha','pooja','neha','isha','riya','kavya','meera',
  'sania','tanvi','anjali','shreya','nisha','diya','swati','ritika','pallavi','simran',
  'komal','mansi','aisha','zara','sana','arti','deepa','vandana','shweta','nandini',
  'lakshmi','saraswati','durga','gayatri','revati','preethi','smitha','rekha','hema','lata',
  'usha','rani','sunita','reena','sheela','mala','veda','yamini','taruna','harini',
]);
const MALE_EXCEPTIONS = new Set([
  'aditya','karma','karna','indra','rudra','shiva','rama','krishna','arjuna',
]);

function isFemale(fullName) {
  const first = fullName.trim().split(/\s+/)[0].toLowerCase();
  if (FEMALE_FIRST_NAMES.has(first)) return true;
  if (!MALE_EXCEPTIONS.has(first) &&
      (first.endsWith('ya') || first.endsWith('vi') ||
       (first.endsWith('a') && !first.endsWith('ra')) ||
       first.endsWith('i'))) return true;
  return false;
}

// ── Avatar SVGs ───────────────────────────────────────────────────────────────
function BoyAvatar() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#dff0ee"/>
      {/* Hair */}
      <path d="M15 16 Q15 9 22 9 Q29 9 29 16" fill="#00645a"/>
      {/* Head */}
      <circle cx="22" cy="17" r="7" fill="#a0d4cc"/>
      {/* Body */}
      <path d="M10 39 Q10 28 22 28 Q34 28 34 39" fill="#00897b"/>
      {/* Collar */}
      <path d="M19 28 L22 32 L25 28" fill="white" opacity="0.6"/>
    </svg>
  );
}

function GirlAvatar() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#fdf3e3"/>
      {/* Long hair sides */}
      <path d="M14 14 Q12 27 14 35" stroke="#c8860a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M30 14 Q32 27 30 35" stroke="#c8860a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Top hair */}
      <path d="M14 13 Q14 7 22 7 Q30 7 30 13" fill="#d4af37"/>
      {/* Head */}
      <circle cx="22" cy="17" r="7" fill="#f5c99a"/>
      {/* Body */}
      <path d="M10 39 Q10 28 22 28 Q34 28 34 39" fill="#d4af37"/>
      {/* Neckline */}
      <path d="M19 28 Q22 31 25 28" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7"/>
    </svg>
  );
}

// ── ReviewCard ────────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const female = isFemale(review.name);
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] p-6 rounded-2xl bg-white border-y border-r border-teal-primary/10 border-l-4 border-l-gold shadow-sm hover:shadow-lg hover:shadow-gold/10 transition-all duration-500">
      <Quote size={32} className="text-gold mb-4" />

      <p className="text-teal-primary/80 text-sm leading-relaxed mb-6 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        {/* Gender-appropriate avatar */}
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/20 flex items-center justify-center">
          {female ? <GirlAvatar /> : <BoyAvatar />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-teal-primary text-sm truncate">{review.name}</p>
          <p className="text-teal-primary/60 text-xs">
            UPES, {review.branch} · {review.year}
          </p>
        </div>

        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-gold text-gold" />
          ))}
        </div>
      </div>

      <p className="text-teal-primary/50 text-xs mt-3 pt-3 border-t border-teal-primary/10">
        Staying since {review.since}
      </p>
    </div>
  );
}

// ── Reviews Section ───────────────────────────────────────────────────────────
const CARD_WIDTH = 400; // px to scroll per arrow click

export default function Reviews() {
  const scrollRef = useRef(null);
  const autoRef   = useRef(null);
  const interactingRef = useRef(false);

  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update arrow visibility
  const updateBtns = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  // Auto-scroll via interval (avoids rAF drift conflict)
  const startAuto = useCallback(() => {
    if (autoRef.current) return;
    autoRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el || interactingRef.current) return;
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      updateBtns();
    }, 16);
  }, [updateBtns]);

  const stopAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = null;
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // Arrow click: pause auto, scroll, resume
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    stopAuto();
    el.scrollBy({ left: dir * CARD_WIDTH, behavior: 'smooth' });
    setTimeout(() => {
      updateBtns();
      startAuto();
    }, 600);
  };

  return (
    <section id="reviews" className="section-padding bg-cream">
      <div className="container-custom">

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-white border border-teal-primary/10 shadow-sm"
            >
              <p className="text-3xl md:text-4xl font-bold text-teal-primary font-display">
                {stat.value}
              </p>
              <p className="text-teal-primary/60 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-teal-primary mb-4">
            Loved by <span className="accent-underline">UPES Students</span>
          </h2>
          <p className="text-teal-primary/70 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from students who call Harjas Hostel home.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll(-1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-teal-primary/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll(1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-teal-primary/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Cards */}
          <div
            ref={scrollRef}
            onScroll={updateBtns}
            onMouseEnter={() => { interactingRef.current = true; }}
            onMouseLeave={() => { interactingRef.current = false; }}
            onTouchStart={() => { interactingRef.current = true; }}
            onTouchEnd={() => { setTimeout(() => { interactingRef.current = false; }, 800); }}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...reviewsData, ...reviewsData].map((review, i) => (
              <ReviewCard key={`${review.name}-${i}`} review={review} />
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-cream to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-cream to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}