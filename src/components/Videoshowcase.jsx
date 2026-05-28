import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VIDEOS = [
  {
    src: 'https://res.cloudinary.com/dcl9muhaa/video/upload/q_auto/f_auto/v1779741099/harjas-tour_jsfmvh.mp4',
    poster: '../../images/video-poster.jpg',
    label: 'Full Tour',
    caption: 'Walk through every room & common space',
  },
  {
    src: 'https://res.cloudinary.com/dcl9muhaa/video/upload/q_auto/f_auto/v1779741099/harjas-tour_jsfmvh.mp4',
    poster: '../../images/video-poster-2.jpg',
    label: 'Rooms',
    caption: 'Cozy beds, clean linens, ample storage',
  },
  {
    src: 'https://res.cloudinary.com/dcl9muhaa/video/upload/q_auto/f_auto/v1779741099/harjas-tour_jsfmvh.mp4',
    poster: '../../images/video-poster-3.jpg',
    label: 'Facilities',
    caption: 'Kitchen, bathrooms & lounge areas',
  },
];

function VideoCard({ video, index }) {
  const videoRef    = useRef(null);
  const cardRef     = useRef(null);
  const [ready, setReady]       = useState(false);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded]     = useState(false);

  /* ensure video element is muted on mount (React doesn't reliably set the muted attribute) */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  /* lazy-load: switch preload mode when card enters viewport */
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

  /* progress bar */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress((vid.currentTime / vid.duration) * 100 || 0);
    vid.addEventListener('timeupdate', onTime);
    return () => vid.removeEventListener('timeupdate', onTime);
  }, []);

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

  const seekTo = (e) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    vid.currentTime = pct * vid.duration;
    setProgress(pct * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      {/* label */}
      <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-2">
        {video.label}
      </p>

      {/* portrait player — 9:16 ratio */}
      <div className="relative rounded-xl overflow-hidden shadow-xl bg-black" style={{ aspectRatio: '9/16' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover block"
          poster={video.poster}
          preload="none"
          playsInline
          loop
          onEnded={() => setPlaying(false)}
          onCanPlay={() => setReady(true)}
        >
          <source src={video.src} type="video/mp4" />
        </video>

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

        {/* controls bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
          <div
            className="w-full h-1 bg-white/20 rounded-full mb-2 cursor-pointer group"
            onClick={seekTo}
          >
            <div
              className="h-full bg-gold rounded-full relative transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors">
              {playing
                ? <Pause size={16} fill="currentColor" />
                : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="flex-1" />
            <button onClick={openFullscreen} aria-label="Fullscreen"
              className="w-7 h-7 flex items-center justify-center text-white hover:text-gold transition-colors">
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
      <p className="text-white/40 text-xs mt-2">{video.caption}</p>
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

        {/* mobile: 1 col  |  md+: 3 col side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((vid, i) => (
            <VideoCard key={i} video={vid} index={i} />
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          HD tours · filmed on location at Harjas Hostel
        </p>
      </div>
    </section>
  );
}