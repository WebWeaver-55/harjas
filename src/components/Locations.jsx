import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

const locations = [
  // Bidholi village — 2 girls
  {
    id: 1,
    name: 'Harjas Hostel — Bidholi 1',
    address: 'Bidholi Village, Dehradun, Uttarakhand',
    type: 'Girls',
    isMain: true,
  },
  {
    id: 2,
    name: 'Harjas Hostel — Bidholi 2',
    address: 'Bidholi Village, Dehradun, Uttarakhand',
    type: 'Girls',
    isMain: false,
  },
  // Bidholi Chowk, Maggi Point Road — 1 girls
  {
    id: 3,
    name: 'Harjas Hostel — Chowk',
    address: 'Bidholi Chowk, Maggi Point Road, Dehradun',
    type: 'Girls',
    isMain: false,
  },
  // 32 Bigha, 1st Lane — 1 girls
  {
    id: 4,
    name: 'Harjas Hostel — 32 Bigha Lane 1',
    address: '32 Bigha, 1st Lane, Bidholi, Dehradun',
    type: 'Girls',
    isMain: false,
  },
  // 32 Bigha, 2nd Lane — 3 boys, 1 girl (4 total)
  {
    id: 5,
    name: 'Harjas Hostel — 32 Bigha Lane 2A',
    address: '32 Bigha, 2nd Lane, Bidholi, Dehradun',
    type: 'Boys',
    isMain: false,
  },
  {
    id: 6,
    name: 'Harjas Hostel — 32 Bigha Lane 2B',
    address: '32 Bigha, 2nd Lane, Bidholi, Dehradun',
    type: 'Boys',
    isMain: false,
  },
  {
    id: 7,
    name: 'Harjas Hostel — 32 Bigha Lane 2C',
    address: '32 Bigha, 2nd Lane, Bidholi, Dehradun',
    type: 'Boys',
    isMain: false,
  },
  {
    id: 8,
    name: 'Harjas Hostel — 32 Bigha Lane 2D',
    address: '32 Bigha, 2nd Lane, Bidholi, Dehradun',
    type: 'Girls',
    isMain: false,
  },
  // 32 Bigha, 3rd Lane — 1 girl
  {
    id: 9,
    name: 'Harjas Hostel — 32 Bigha Lane 3',
    address: '32 Bigha, 3rd Lane, Bidholi, Dehradun',
    type: 'Girls',
    isMain: false,
  },
];

function LocationCard({ loc, index }) {
  const typeStyle = {
    Boys:   'bg-blue-50 text-blue-700 border-blue-200',
    Girls:  'bg-pink-50 text-pink-700 border-pink-200',
  };

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
      {loc.isMain && (
        <span className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-gold text-teal-primary shadow-md">
          ★ Main Campus
        </span>
      )}

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

      {/* Gender tag */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeStyle[loc.type]}`}>
          {loc.type}
        </span>
      </div>

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
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/4 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-sm font-medium mb-5">
            <MapPin size={14} />
            All in Bidholi, Dehradun
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            9 Hostels,{' '}
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
            { value: '9', label: 'Hostels' },
            { value: '6', label: 'Girls Hostels' },
            { value: '3', label: 'Boys Hostels' },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-display text-2xl font-bold text-gold">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Not sure which hostel to pick?</p>
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