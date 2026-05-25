import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

// Building 1: 7 imgs | Building 2: 7 imgs | Building 3: 5 imgs | Building 4: 6 imgs
const buildings = [
  {
    id: 'b1',
    name: 'Building 1',
    label: 'Boys Hostel',
    images: [
      { src: '../../images/building1/img-11.jpeg', alt: 'Building 1 - Room 1' },
      { src: '../../images/building1/img-5.jpeg', alt: 'Building 1 - Common Area' },
      { src: '../../images/building1/img-6.jpeg', alt: 'Building 1 - Dining' },
      { src: '../../images/building1/img-3.jpeg', alt: 'Building 1 - Single Room' },
      { src: '../../images/building1/img-7.jpeg', alt: 'Building 1 - Study Hall' },
      { src: '../../images/building1/img-1.jpeg', alt: 'Building 1 - Study Hall' },
      { src: '../../images/building1/img-4.jpeg', alt: 'Building 1 - Exterior' },
      { src: '../../images/building1/imgr-1.jpeg', alt: 'Building 1 - Exterior' },
    ],
  },
  {
    id: 'b2',
    name: 'Building 2',
    label: 'Boys Hostel',
    images: [
      { src: '../../images/building2/img11.jpeg', alt: 'Building 2 - Room' },
      { src: '../../images/building2/img-1.jpeg', alt: 'Building 2 - Lounge' },
      { src: '../../images/building2/img-6.jpeg', alt: 'Building 2 - Kitchen' },
      { src: '../../images/building2/img-7.jpeg', alt: 'Building 2 - Terrace' },
      { src: '../../images/building2/img-2.jpeg', alt: 'Building 2 - Exterior' },
      { src: '../../images/building2/img-5.jpeg', alt: 'Building 2 - Exterior' },
      { src: '../../images/building2/img-3.jpeg', alt: 'Building 2 - Twin Room' },
      { src: '../../images/building2/img-4.jpeg', alt: 'Building 2 - Corridor' },
      { src: '../../images/building2/imgr-2.jpeg', alt: 'Building 2 - Corridor' },
    ],
  },
  {
    id: 'b3',
    name: 'Building 3',
    label: 'Girls Hostel',
    images: [
      { src: '../../images/building3/img-4.jpeg', alt: 'Building 3 - Room' },
      { src: '../../images/building3/img-5.jpeg', alt: 'Building 3 - Common Room' },
      { src: '../../images/building3/img-3.jpeg', alt: 'Building 3 - Dining' },
      { src: '../../images/building3/img-1.jpeg', alt: 'Building 3 - Study Area' },
      { src: '../../images/building3/img-2.jpeg', alt: 'Building 3 - Exterior' },
      { src: '../../images/building3/imgr-3.jpeg', alt: 'Building 3 - Exterior' },
    ],
  },
  {
    id: 'b4',
    name: 'Building 4',
    label: 'Girls Hostel',
    images: [
      { src: '../../images/building4/img-5.jpeg', alt: 'Building 4 - Room' },
      { src: '../../images/building4/img-2.jpeg', alt: 'Building 4 - Lounge' },
      { src: '../../images/building4/img-3.jpeg', alt: 'Building 4 - Garden' },
      { src: '../../images/building4/img-4.jpeg', alt: 'Building 4 - Study Room' },
      { src: '../../images/building4/img-6.jpeg', alt: 'Building 4 - Exterior' },
      { src: '../../images/building4/img-1.jpeg', alt: 'Building 4 - Triple Room' },
    ],
  },
];

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Lightbox always uses object-contain so full image is visible */}
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[85vh] max-w-4xl w-full object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={22} />
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

const BuildingCarousel = memo(function BuildingCarousel({ building }) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = building.images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Preload adjacent images to eliminate flicker on slide change
  const preloadIndices = [
    (current + 1) % total,
    (current - 1 + total) % total,
  ];

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-teal-primary/10 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-shadow duration-300">

        {/* Image area */}
        <div className="relative aspect-[16/10] overflow-hidden group">

          {/* Hidden preload images */}
          {preloadIndices.map((idx) => (
            <img
              key={building.images[idx].src}
              src={building.images[idx].src}
              alt=""
              aria-hidden="true"
              className="hidden"
            />
          ))}

          {/*
            Blurred background layer (Instagram-style):
            Same image, heavily blurred + scaled up to fill any letterbox gaps.
            This means no black bars and no cropping — the photo fills itself.
          */}
          <img
            key={`bg-${building.images[current].src}`}
            src={building.images[current].src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300"
            style={{ filter: 'blur(18px) brightness(0.75) saturate(1.2)' }}
            loading="lazy"
            decoding="async"
          />

          {/* Actual image on top — fully visible, no cropping */}
          <img
            key={building.images[current].src}
            src={building.images[current].src}
            alt={building.images[current].alt}
            className="relative w-full h-full object-contain transition-opacity duration-300"
            loading="lazy"
            decoding="async"
          />

          {/* Hover overlay with zoom trigger */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="Open fullscreen"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40"
            >
              <ZoomIn size={20} />
            </button>
          </div>

          {/* Prev / Next — visible on hover */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={16} />
          </button>

          {/* Slide counter badge */}
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white tabular-nums">
            {current + 1}/{total}
          </span>
        </div>

        {/* Card footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-teal-primary">{building.name}</p>
            <p className="text-teal-primary/50 text-xs mt-0.5">{building.label}</p>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 items-center">
            {building.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 bg-gold'
                    : 'w-1.5 bg-teal-primary/20 hover:bg-teal-primary/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={building.images}
          index={current}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setCurrent((c) => (c - 1 + total) % total)}
          onNext={() => setCurrent((c) => (c + 1) % total)}
        />
      )}
    </>
  );
});

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-teal-primary mb-4">
            A Look <span className="accent-underline">Inside</span>
          </h2>
          <p className="text-teal-primary/70 text-lg max-w-2xl mx-auto">
            Explore every corner of Harjas Hostel — from cozy rooms to vibrant common spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {buildings.map((building, i) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <BuildingCarousel building={building} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}