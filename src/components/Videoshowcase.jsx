import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VIDEO = {
  src: 'https://res.cloudinary.com/dcl9muhaa/video/upload/q_auto/f_auto/v1779741099/harjas-tour_jsfmvh.mp4',
  label: 'Full Tour',
  caption: 'Walk through every room & common space',
};

function VideoCard({ video }) {
  const videoRef  = useRef(null);
  const cardRef   = useRef(null);
  const [ready, setReady]     = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(true);
  const [loaded, setLoaded]   = useState(false);

  /* ensure muted attribute is set on mount */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  /* lazy-load when card enters viewport */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !loaded) {
          setLoaded(true);
          if (videoRef.current) videoRef.current.preload = 'metadata';
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loaded]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.preload = 'auto';
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const next = !muted;
    vid.muted = next;
    setMuted(next);
  };

  const openFullscreen = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen)          vid.requestFullscreen();
    else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      {/* label */}
      <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-2 self-start">
        {video.label}
      </p>

      {/* portrait player — 9:16, max-width constrained for laptop */}
      <div
        className="relative rounded-xl overflow-hidden shadow-xl bg-black w-full"
        style={{ aspectRatio: '9/16', maxWidth: '280px' }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover block"
          /* #t=0.001 loads the first frame as a thumbnail without autoplay */
          src={`${video.src}#t=0.001`}
          preload="none"
          playsInline
          loop
          onEnded={() => setPlaying(false)}
          onCanPlay={() => setReady(true)}
        />

        {/* big play overlay */}
        {!playing && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
              <Play size={22} className="text-teal-primary ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {/* controls bar — play/pause, mute, fullscreen only (no seek bar) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors"
            >
              {playing
                ? <Pause size={16} fill="currentColor" />
                : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="flex-1" />
            <button
              onClick={openFullscreen}
              aria-label="Fullscreen"
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* loading spinner */}
        {loaded && !ready && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* caption */}
      <p className="text-white/40 text-xs mt-2 self-start">{video.caption}</p>
    </motion.div>
  );
}

export default function VideoShowcase() {
  return (
    <section id="video-tour" className="section-padding bg-teal-primary">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Take a <span className="text-gold">Virtual Tour</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            See Harjas Hostel come alive — rooms, common spaces, and every facility.
          </p>
        </motion.div>

        {/* centred single video */}
        <div className="flex justify-center">
          <VideoCard video={VIDEO} />
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          HD tour · filmed on location at Harjas Hostel
        </p>
      </div>
    </section>
  );
}