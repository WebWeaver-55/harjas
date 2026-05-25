import { motion } from 'framer-motion';
import {
  Wifi, Shirt, Camera, UtensilsCrossed, BookOpen, Zap,
  Droplets, Sparkles, Car, ShowerHead
} from 'lucide-react';
import { amenitiesData } from '../data/siteData';

const iconMap = {
  Wifi, Shirt, Camera, UtensilsCrossed, BookOpen, Zap,
  Droplets, Sparkles, Car, ShowerHead
};

function AmenityCard({ amenity, index }) {
  const Icon = iconMap[amenity.icon] || Wifi;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-colors duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-4">
        <Icon size={22} className="text-teal-primary" />
      </div>
      <h3 className="text-white font-semibold text-base mb-1">{amenity.name}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{amenity.desc}</p>
    </motion.div>
  );
}

export default function Amenities() {
  return (
    <section id="amenities" className="section-padding bg-teal-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Thrive</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From lightning-fast WiFi to home-cooked meals — we&apos;ve got every detail covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
          {amenitiesData.map((amenity, i) => (
            <AmenityCard key={amenity.name} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}