import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviewsData, trustStats } from '../data/siteData';

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] p-6 rounded-2xl bg-white border-y border-r border-teal-primary/10 border-l-4 border-l-gold shadow-sm hover:shadow-lg hover:shadow-gold/10 transition-all duration-500">
      {/* Quote Icon */}
      <Quote size={32} className="text-gold mb-4" />

      {/* Review Text */}
      <p className="text-teal-primary/80 text-sm leading-relaxed mb-6 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Student Info */}
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/20"
        />
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

      {/* Since */}
      <p className="text-teal-primary/50 text-xs mt-3 pt-3 border-t border-teal-primary/10">
        Staying since {review.since}
      </p>
    </div>
  );
}

export default function Reviews() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isAutoScrolling) return;

    let scrollSpeed = 0.5;
    const animate = () => {
      el.scrollLeft += scrollSpeed;
      // Reset to beginning when reaching the end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      updateScrollState();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoScrolling, updateScrollState]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 400;
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    setTimeout(updateScrollState, 400);
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
            Loved by{' '}
            <span className="accent-underline">UPES Students</span>
          </h2>
          <p className="text-teal-primary/70 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from students who call Harjas Hostel home.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll(-1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-teal-primary/10 flex items-center justify-center hover:bg-gold hover:text-teal-primary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll(1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-teal-primary/10 flex items-center justify-center hover:bg-gold hover:text-teal-primary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            onTouchEnd={() => setIsAutoScrolling(true)}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate cards for infinite scroll illusion */}
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
