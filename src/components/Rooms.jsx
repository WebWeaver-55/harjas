import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Wifi, Snowflake, Eye, Bath, Wind, Maximize, ArrowRight, Star } from 'lucide-react';
import { roomsData } from '../data/siteData';

const featureIcons = {
  Furnished: Bed,
  WiFi: Wifi,
  AC: Snowflake,
  'Window View': Eye,
  'Attached Bath': Bath,
  Fan: Wind,
  Spacious: Maximize,
};

function RoomCard({ room, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="card-hover group bg-white rounded-2xl overflow-hidden border border-teal-primary/10 hover:border-gold hover:shadow-[0_8px_32px_rgba(232,168,32,0.3)] shadow-sm"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={room.image}
          alt={`${room.type} room at Harjas Hostel`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gold text-teal-primary shadow-lg">
          {room.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl font-bold text-teal-primary">
            {room.type}
          </h3>
          <div className="flex gap-0.5">
            {Array.from({ length: room.stars }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold text-gold" />
            ))}
          </div>
        </div>
        <p className="text-teal-primary/70 text-sm mb-4">{room.tagline}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {room.features.map((feat) => {
            const Icon = featureIcons[feat] || Bed;
            return (
              <div key={feat} className="flex items-center gap-2 text-sm text-teal-primary/80">
                <Icon size={14} className="text-gold flex-shrink-0" />
                <span>{feat}</span>
              </div>
            );
          })}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-teal-primary/10">
          <div>
            <p className="text-xs text-teal-primary/60">Starting</p>
            <p className="text-2xl font-bold text-gold">
              ₹{room.price}
              <span className="text-sm font-normal text-teal-primary/60">/month</span>
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-teal-primary text-white text-sm font-medium hover:bg-gold hover:text-teal-primary transition-all duration-300 group/btn"
          >
            Book
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Rooms() {
  const [activeTab, setActiveTab] = useState('boys');

  const rooms = useMemo(() => roomsData[activeTab], [activeTab]);

  return (
    <section id="rooms" className="section-padding bg-cream">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-teal-primary mb-4">
            Find Your{' '}
            <span className="accent-underline">Perfect Room</span>
          </h2>
          <p className="text-teal-primary/70 text-lg max-w-2xl mx-auto">
            Choose from our carefully designed rooms built for comfort, productivity, and peace of mind.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm">
            {['boys', 'girls'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-gold'
                    : 'text-teal-primary/70 hover:text-teal-primary'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="roomTab"
                    className="absolute inset-0 border-b-2 border-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'boys' ? '🏠 Boys Hostel' : '🏠 Girls Hostel'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Room Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
