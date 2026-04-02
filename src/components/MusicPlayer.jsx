import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import data from '../data.json';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const onCanPlay = () => setAudioReady(true);
    audio.addEventListener('canplay', onCanPlay);

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setBlocked(false);
      } catch {
        setIsPlaying(false);
        setBlocked(true);
      }
    };

    tryPlay();
    return () => audio.removeEventListener('canplay', onCanPlay);
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setBlocked(false);
      } catch (err) {
        console.error('Audio play failed:', err);
        setBlocked(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2">
      <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}${data.musicPath}`} preload="auto" />

      {/* ── Tap to play card ──────────────────────────── */}
      <AnimatePresence>
        {blocked && (
          <motion.button
            initial={{ opacity: 0, x: 40, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={togglePlay}
            className="group relative overflow-hidden flex items-center gap-3 pr-4 pl-3 py-2.5 rounded-2xl shadow-2xl border border-white/30 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(168,85,247,0.18) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            {/* Animated vinyl disc */}
            <motion.div
              animate={{ rotate: audioReady ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg"
              style={{
                background: 'conic-gradient(from 0deg, #f472b6, #f472b6, #ffffffff, #f472b6)',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-white shadow-inner" />
            </motion.div>

            {/* Text */}
            <div className="text-left leading-tight">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/50">
                🎵 Music
              </p>
              <p className="text-sm font-black text-white drop-shadow">
                {audioReady ? 'Tap to play' : 'Loading...'}
              </p>
            </div>

            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Main music toggle button ───────────────────── */}
      <div className="relative">
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              style={{ background: 'rgba(255, 179, 223, 1)' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.4, ease: 'easeOut' }}
              style={{ background: 'rgba(255, 162, 210, 1)' }}
            />
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={togglePlay}
          disabled={!audioReady && !isPlaying}
          aria-label="Toggle music"
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 overflow-hidden"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(243,232,255,0.95))'
              : audioReady
                ? 'linear-gradient(135deg, #ff95faff, #f472b6, #ff95faff)'
                : 'linear-gradient(135deg, #f472b6, #f472b6)',
            boxShadow: isPlaying
              ? '0 8px 32px rgba(255, 126, 212, 1), inset 0 1px 0 rgba(255,255,255,0.8)'
              : audioReady
                ? '0 8px 32px rgba(255, 126, 212, 1), 0 0 0 1px rgba(255,255,255,0.8)'
                : 'none',
            border: isPlaying ? '2px solid rgba(255, 150, 250, 0.25)' : '2px solid rgba(255,255,255,0.2)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: isPlaying
                ? 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), transparent 65%)'
                : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), transparent 65%)',
            }}
          />

          <motion.div
            key={isPlaying ? 'playing' : 'paused'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isPlaying
              ? <Volume2 size={22} className="text-pink-400 relative z-10" />
              : <VolumeX size={22} className="text-white relative z-10" />
            }
          </motion.div>
        </motion.button>
      </div>

      {/* ── Floating music notes when playing ─────────── */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[72px] right-0 flex flex-col items-end gap-0.5 pointer-events-none"
          >
            {[
              { note: '♪', color: '#ffffffff', delay: 0, x: -4 },
              { note: '♫', color: '#f472b6', delay: 0.3, x: 6 },
              { note: '♪', color: '#ffffffff', delay: 0.6, x: -2 },
            ].map(({ note, color, delay, x }, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -18, -36], opacity: [0, 1, 0], x: [0, x, x * 2] }}
                transition={{ repeat: Infinity, duration: 2, delay, ease: 'easeOut' }}
                className="text-base font-black leading-none select-none"
                style={{ color, textShadow: `0 0 8px ${color}80` }}
              >
                {note}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
