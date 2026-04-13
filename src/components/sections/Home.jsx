import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import data from '../../data.json';

/* ── Static white sprinkle data (stable across re-renders) ── */
const SPRINKLES = [
  { top: '8%', left: '6%', size: 13, delay: 0, dur: 2.2 },
  { top: '15%', left: '22%', size: 9, delay: 1.3, dur: 3.0 },
  { top: '5%', left: '42%', size: 15, delay: 0.6, dur: 2.7 },
  { top: '12%', left: '68%', size: 10, delay: 2.1, dur: 2.4 },
  { top: '7%', left: '87%', size: 14, delay: 0.3, dur: 3.3 },
  { top: '32%', left: '3%', size: 10, delay: 1.8, dur: 2.8 },
  { top: '28%', left: '92%', size: 12, delay: 0.9, dur: 2.1 },
  { top: '50%', left: '8%', size: 8, delay: 2.5, dur: 3.5 },
  { top: '48%', left: '94%', size: 11, delay: 1.1, dur: 2.6 },
  { top: '65%', left: '14%', size: 14, delay: 0.4, dur: 2.9 },
  { top: '70%', left: '80%', size: 9, delay: 1.7, dur: 2.3 },
  { top: '78%', left: '38%', size: 12, delay: 0.8, dur: 3.1 },
  { top: '82%', left: '62%', size: 10, delay: 2.3, dur: 2.5 },
  { top: '88%', left: '5%', size: 11, delay: 1.5, dur: 2.7 },
  { top: '90%', left: '90%', size: 13, delay: 0.2, dur: 3.4 },
  { top: '38%', left: '50%', size: 8, delay: 3.0, dur: 2.2 },
  { top: '20%', left: '78%', size: 10, delay: 1.0, dur: 2.9 },
  { top: '55%', left: '55%', size: 7, delay: 2.7, dur: 3.6 },
];

const FlowerVector = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <defs>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
        </filter>
      </defs>
      <g filter="url(#softGlow)">
        {[0, 72, 144, 216, 288].map(angle => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            {/* Elegant petal shape */}
            <path d="M50 50 C 20 20, 35 -10, 50 5 C 65 -10, 80 20, 50 50 Z" fill="#ffffff" />
            <path d="M50 5 C 50 15, 50 35, 50 50" stroke="rgba(240,240,240,0.5)" strokeWidth="1" fill="none" />
          </g>
        ))}
        {/* Flower Center */}
        <circle cx="50" cy="50" r="10" fill="#f472b6" />
        <circle cx="50" cy="50" r="7" fill="#f472b6" />
      </g>
    </svg>
  );
};
/* ── Cursor-origin ripple CTA button ──────────────────────────── */
function RippleCTA({ onClick }) {
  const btnRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

  const capture = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={(e) => { capture(e); setHovered(true); }}
      onMouseLeave={(e) => { capture(e); setHovered(false); }}
      className="relative overflow-hidden bg-white/15 backdrop-blur-md border border-white/50 px-8 py-4 rounded-full font-bold text-base shadow-lg inline-flex items-center gap-2"
      style={{ isolation: 'isolate' }}
    >
      {/* Dark circle — expands from cursor position */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          minWidth: '225%',
          minHeight: '225%',
          aspectRatio: '1 / 1',
          left: origin.x,
          top: origin.y,
          transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0})`,
          transition: 'transform 0.5s ease-out',
          backgroundColor: '#ff39bdff',
          zIndex: 0,
        }}
      />
      {/* Text + icon — colour transition */}
      <span
        className="relative z-10 flex items-center gap-2"
        style={{
          color: hovered ? '#ffffffff' : '#ffffffff',
          transition: 'color 0.3s ease-out',
        }}
      >
        Maulidiya Salsabila
        <Heart
          className="w-4 h-4"
          style={{
            fill: hovered ? '#ffffffff' : '#ffffffff',
            color: hovered ? '#ffffffff' : '#ffffffff',
            transition: 'fill 0.3s ease-out, color 0.3s ease-out',
          }}
        />
      </span>
    </motion.button>
  );
}


export default function Home() {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    // Touch device = no hover, so show flowers always
    const checkTouch = () => setIsMobile(window.matchMedia('(hover: none)').matches);
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const scrollToGift = () => {
    document.getElementById('gift')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">

      {/* Soft blurred blobs — kalem, ambient */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }} />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full filter blur-3xl pointer-events-none" style={{ transform: 'translateZ(0) translate(-50%, -50%)', willChange: 'transform' }} />

      {/* White blinking sprinkles scattered across the section */}
      {SPRINKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none text-white"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            lineHeight: 1,
            textShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.4)',
            zIndex: 2,
            willChange: 'transform, opacity',
            WebkitBackfaceVisibility: 'hidden',
          }}
          animate={{
            opacity: [0, 0.9, 0.2, 1, 0],
            scale: [0.6, 1.2, 0.8, 1.1, 0.6],
            rotate: [0, 45, -20, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: s.dur,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* Main Content */}
      <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:text-left"
        >
          {/* Date badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/30 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span className="text-white/90 font-semibold text-sm tracking-widest uppercase">{data.heroDate}</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-white text-3d text-7xl md:text-8xl font-black mb-6 leading-tight">
            Happy Birthday<br />{data.name}!
          </h1>

          {/* Subtitle */}
          <p className="text-md text-white/100 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
            {data.heroSubtitle}
          </p>

          {/* CTA Button — cursor-origin ripple */}
          <RippleCTA onClick={scrollToGift} />
        </motion.div>

        {/* Right — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex justify-center relative"
        >
          {/* Soft glow behind image */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute w-80 h-80 md:w-96 md:h-96 bg-white/20 rounded-full filter blur-3xl pointer-events-none"
            style={{ willChange: 'transform', WebkitBackfaceVisibility: 'hidden' }}
          />

          {/* Photo Group Container */}
          <motion.div
            whileHover="hover"
            initial="initial"
            animate={isMobile ? 'hover' : undefined}
            className="relative z-10 w-72 h-72 md:w-80 md:h-80 group cursor-pointer"
          >
            {/* Main bobbing animation applies to the whole group */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-full h-full relative"
            >
              {/* Main Hero Photo */}
              <img
                src={`${import.meta.env.BASE_URL}${data.heroPhoto}`}
                alt={data.name}
                className="w-full h-full backdrop-blur-xs object-cover border-[1.7px] border-white/70 shadow-2xl relative z-20 transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ borderRadius: '15%' }}
              />

              {/* Floating Hover Flowers (Appears around hero photo on hover) */}
              {[...Array(4)].map((_, index) => {
                const positions = [
                  { top: '-10%', left: '-20%', rotate: -18, size: 'w-24 h-24 md:w-32 md:h-32' },
                  { top: '-15%', right: '-15%', rotate: 15, size: 'w-20 h-20 md:w-28 md:h-28' },
                  { bottom: '5%', right: '-25%', rotate: 32, size: 'w-28 h-28 md:w-36 md:h-36' },
                  { bottom: '-10%', left: '-10%', rotate: -25, size: 'w-20 h-20 md:w-24 md:h-24' },
                ];
                const pos = positions[index];

                return (
                  <motion.div
                    key={index}
                    className={`absolute z-10 ${pos.size} pointer-events-none drop-shadow-[0_8px_15px_rgba(255,255,255,0.4)]`}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      right: pos.right,
                      bottom: pos.bottom,
                    }}
                    variants={{
                      initial: { opacity: 0, scale: 0.3, rotate: 0 },
                      hover: {
                        opacity: 1,
                        scale: 1,
                        rotate: pos.rotate,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                          delay: index * 0.08
                        }
                      }
                    }}
                  >
                    <FlowerVector className="w-full h-full" />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
