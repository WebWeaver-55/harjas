import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Phone } from 'lucide-react';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// All 7 locations in Bidholi area — update names/details as needed
const locations = [
  {
    id: 1,
    name: 'Harjas Hostel — Block A',
    address: 'Near UPES Main Gate, Bidholi, Dehradun',
    type: 'Boys & Girls',
    rooms: '120+ Rooms',
    distance: '2 min walk',
    isMain: true,
  },
  {
    id: 2,
    name: 'Harjas Hostel — Block B',
    address: 'Bidholi Village Road, Dehradun',
    type: 'Boys',
    rooms: '80+ Rooms',
    distance: '3 min walk',
    isMain: false,
  },
  {
    id: 3,
    name: 'Harjas Hostel — Block C',
    address: 'Lane 3, Bidholi, Near UPES Back Gate',
    type: 'Girls',
    rooms: '60+ Rooms',
    distance: '4 min walk',
    isMain: false,
  },
  {
    id: 4,
    name: 'Harjas Hostel — Block D',
    address: 'Bidholi Chowk, Dehradun, Uttarakhand',
    type: 'Boys & Girls',
    rooms: '100+ Rooms',
    distance: '5 min walk',
    isMain: false,
  },
  {
    id: 5,
    name: 'Harjas Hostel — Block E',
    address: 'Upper Bidholi, Dehradun, Uttarakhand',
    type: 'Boys',
    rooms: '70+ Rooms',
    distance: '6 min walk',
    isMain: false,
  },
  {
    id: 6,
    name: 'Harjas Hostel — Block F',
    address: 'Bidholi Main Road, Dehradun — 248007',
    type: 'Girls',
    rooms: '55+ Rooms',
    distance: '7 min walk',
    isMain: false,
  },
  {
    id: 7,
    name: 'Harjas Hostel — Block G',
    address: 'Near Bidholi Temple, Dehradun, Uttarakhand',
    type: 'Boys & Girls',
    rooms: '90+ Rooms',
    distance: '5 min walk',
    isMain: false,
  },
];

const typeColors = {
  'Boys': 'bg-blue-50 text-blue-700 border-blue-200',
  'Girls': 'bg-pink-50 text-pink-700 border-pink-200',
  'Boys & Girls': 'bg-purple-50 text-purple-700 border-purple-200',
};

function LocationCard({ loc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-2xl border transition-all duration-300 group
        ${loc.isMain
          ? 'bg-gradient-to-br from-gold/15 to-gold/5 border-gold/40 hover:border-gold/70'
          : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/8'
        }`}
    >
      {/* Main badge */}
      {loc.isMain && (
        <span className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-gold text-teal-primary shadow-md">
          ★ Main Campus
        </span>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className={`font-display font-bold text-lg leading-tight mb-1 transition-colors duration-300
            ${loc.isMain ? 'text-gold' : 'text-white group-hover:text-white/90'}`}>
            {loc.name}
          </h3>
          <div className="flex items-start gap-1.5 text-white/50 text-sm">
            <MapPin size={13} className="mt-0.5 flex-shrink-0 text-gold/60" />
            <span>{loc.address}</span>
          </div>
        </div>
      </div>

      {/* Info chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-white/8 text-white/70 border-white/15">
          {loc.type}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-gold/10 text-gold border-gold/20">
          {loc.rooms}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-white/5 text-white/50 border-white/10">
          {loc.distance} from UPES
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={() => scrollToSection('contact')}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
          ${loc.isMain
            ? 'bg-gold text-teal-primary hover:bg-gold/90'
            : 'bg-white/8 text-white/70 border border-white/15 hover:bg-white/15 hover:text-white'
          }`}
      >
        Enquire Now
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

export default function Locations() {
  return (
    <section id="locations" className="section-padding bg-teal-primary relative overflow-hidden">
      {/* Subtle bg decoration — no blur-3xl (perf) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/4 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-sm font-medium mb-5">
            <MapPin size={14} />
            All in Bidholi, Dehradun
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            7 Hostels,{' '}
            <span className="gradient-text">One Neighbourhood</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every Harjas property is within walking distance of UPES — pick the block that suits you best.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-xl mx-auto"
        >
          {[
            { value: '7', label: 'Blocks' },
            { value: '575+', label: 'Total Rooms' },
            { value: '2–7', label: 'Min from UPES' },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-display text-2xl font-bold text-gold">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {locations.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Not sure which block to pick?</p>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
          >
            Talk to Us — We&apos;ll Help You Choose
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}