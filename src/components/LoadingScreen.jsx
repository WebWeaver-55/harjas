import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-teal-primary flex flex-col items-center justify-center"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="/images/harjas-logo.png"
              alt="Harjas Hostel"
              className="h-20 md:h-28 w-auto loading-logo"
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
            className="h-0.5 bg-gold rounded-full mt-8"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/30 text-xs tracking-[0.3em] uppercase mt-4"
          >
            Your Space. Your Pace.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
