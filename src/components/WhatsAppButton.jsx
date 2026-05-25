import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in Harjas Hostel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 whatsapp-pulse group"
          >
            <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-sm">Chat with Us</span>
          </a>
          {/* Powered by badge */}
          <div className="text-center mt-1.5">
            <span className="text-[10px] text-white/30">
              Powered by Harjas Hostel
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
