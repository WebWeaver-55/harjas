import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef        = useRef(null);
  const sectionRef      = useRef(null);
  const [ready, setReady]       = useState(false);   // video metadata loaded
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded]     = useState(false);   // has IntersectionObserver fired

  /* ── Lazy-load: only start fetching when section enters viewport ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          setLoaded(true);
          // Kick from preload="none" → "metadata" so the poster + duration appear
          if (videoRef.current) videoRef.current.preload = 'metadata';
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [loaded]);

  /* ── Progress bar update ── */
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
    // First play: switch to full preload so it streams properly
    if (vid.preload !== 'auto') vid.preload = 'auto';
    playing ? vid.pause() : vid.play();
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !muted;
    setMuted((m) => !m);
  };

  const openFullscreen = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen)            vid.requestFullscreen();
    else if (vid.webkitEnterFullscreen)   vid.webkitEnterFullscreen(); // iOS Safari
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
    <section
      id="video-tour"
      ref={sectionRef}
      className="section-padding bg-teal-primary"
    >
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Take a <span className="text-gold">Virtual Tour</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            See Harjas Hostel come alive — walk through every room, common space, and facility.
          </p>
        </motion.div>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        >
          {/* ── Video element ── */}
          <video
            ref={videoRef}
            className="w-full block bg-black"
            poster="../../images/video-poster.jpg"   /* swap with your poster path */
            preload="none"                             /* nothing loads until IntersectionObserver fires */
            muted                                      /* must be muted for autoplay policies */
            playsInline                                /* no iOS fullscreen hijack */
            loop
            onEnded={() => setPlaying(false)}
            onCanPlay={() => setReady(true)}
          >
            {/*
              Put your video file path here.
              mp4 with H.264 codec has the widest browser support.
              If you have a WebM version add it above the mp4 as a <source> —
              WebM is ~30% smaller at the same quality.
            */}
            <source src="https://res.cloudinary.com/dcl9muhaa/video/upload/q_auto/f_auto/v1779741099/harjas-tour_jsfmvh.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* ── Big play button overlay (shown before first play) ── */}
          {!playing && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                <Play size={34} className="text-teal-primary ml-1" fill="currentColor" />
              </div>
            </div>
          )}

          {/* ── Custom controls bar ── */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">

            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group"
              onClick={seekTo}
            >
              <div
                className="h-full bg-gold rounded-full relative transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                {/* Scrubber thumb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-gold transition-colors"
              >
                {playing
                  ? <Pause size={20} fill="currentColor" />
                  : <Play size={20} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-gold transition-colors"
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Fullscreen */}
              <button
                onClick={openFullscreen}
                aria-label="Fullscreen"
                className="w-8 h-8 flex items-center justify-center text-white hover:text-gold transition-colors"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Loading shimmer — shown while video is fetching */}
          {loaded && !ready && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
            </div>
          )}
        </motion.div>

        {/* Caption */}
        <p className="text-center text-white/40 text-sm mt-5">
          HD tour · filmed on location at Harjas Hostel
        </p>
      </div>
    </section>
  );
}