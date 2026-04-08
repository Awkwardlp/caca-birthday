import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import data from '../../data.json';
import Sprinkles from '../Sprinkles';
import StoryScroll, { StoryScrollItem } from '../StoryScroll';

/* ── Floating hearts decoration ────────────────────────── */
function FloatingHearts() {
  const hearts = [
    { left: '10%', delay: 0, dur: 3.5, size: 14, color: '#f472b6' },
    { left: '25%', delay: 0.8, dur: 4.2, size: 10, color: '#e879f9' },
    { left: '50%', delay: 0.3, dur: 3.8, size: 16, color: '#fb923c' },
    { left: '70%', delay: 1.2, dur: 4.5, size: 11, color: '#f472b6' },
    { left: '88%', delay: 0.6, dur: 3.2, size: 13, color: '#a855f7' },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: h.left, willChange: 'transform, opacity', WebkitBackfaceVisibility: 'hidden' }}
          animate={{ y: [0, -320], opacity: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: h.dur, delay: h.delay, ease: 'easeOut' }}
        >
          <Heart
            style={{ fill: h.color, color: h.color, width: h.size, height: h.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Envelope Scene ─────────────────────────────────────── */
function EnvelopeScene({ phase, onOpen }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      {/* Perspective wrapper for 3D flap */}
      <div style={{ perspective: '800px' }}>
        <motion.div
          whileHover={phase === 'envelope' ? { y: -6, scale: 1.02 } : {}}
          onClick={onOpen}
          style={{
            position: 'relative',
            width: '320px',
            height: '210px',
            cursor: phase === 'envelope' ? 'pointer' : 'default',
          }}
        >
          {/* ── Envelope body ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #fff7fb 0%, #fce7f3 100%)',
              borderRadius: '10px',
              border: '1.5px solid rgba(244,114,182,0.35)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22), 0 6px 16px rgba(244,114,182,0.18)',
              overflow: 'hidden',
            }}
          >
            {/* Bottom-left V fold */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              borderStyle: 'solid',
              borderWidth: '105px 160px 0 0',
              borderColor: 'rgba(244,114,182,0.12) transparent transparent transparent',
            }} />
            {/* Bottom-right V fold */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              borderStyle: 'solid',
              borderWidth: '0 160px 105px 0',
              borderColor: 'transparent rgba(244,114,182,0.12) transparent transparent',
            }} />
            {/* Stamp */}
            {/* <div style={{
              position: 'absolute', top: '12px', right: '14px',
              width: '36px', height: '42px',
              background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
              borderRadius: '3px',
              border: '2px solid rgba(251,191,36,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>
              💌
            </div> */}
          </div>

          {/* ── Flap (rotates open in 3D) ── */}
          <motion.div
            animate={phase === 'opening' ? { rotateX: -178 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '130px',
              clipPath: 'polygon(0 0, 100% 0, 50% 72%)',
              background: 'linear-gradient(175deg, #fbcfe8 0%, #f9a8d4 60%, #f472b6 100%)',
              transformOrigin: 'top center',
              zIndex: 3,
              borderRadius: '10px 10px 0 0',
              boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.08)',
            }}
          >
            {/* Wax seal on flap */}
            <motion.div
              animate={phase === 'opening' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '22px', left: '50%',
                transform: 'translateX(-50%)',
                width: '46px', height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #9333ea)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(236,72,153,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              <Heart size={20} fill="white" color="white" />
            </motion.div>
          </motion.div>

          {/* ── Letter peeking up during opening ── */}
          <motion.div
            animate={phase === 'opening' ? { y: -55, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '16px', left: '16px', right: '16px',
              height: '80px',
              background: '#fffdf7',
              borderRadius: '4px',
              border: '1px solid rgba(0,0,0,0.07)',
              zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {[40, 70, 55, 80].map((w, i) => (
              <div key={i} style={{ position: 'absolute', left: '20px', top: `${12 + i * 14}px`, width: `${w}%`, height: '1.5px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px' }} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Tap hint */}
      <AnimatePresence>
        {phase === 'envelope' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              <div className="bg-white/30 backdrop-blur-sm border border-white/50 rounded-full px-6 py-2.5 text-white font-semibold text-sm shadow-lg flex items-center gap-2">
                <span>✉️</span>
                <span>Ketuk amplop untuk membuka surat</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/60 text-xs"
            >
              ↑ tap
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Letter Content ─────────────────────────────────────── */
function LetterContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="relative max-w-3xl mx-auto px-6"
    >
      {/* Swaying paper */}
      <motion.div
        animate={{ rotate: [0, 0.4, -0.4, 0.2, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="relative"
        style={{
          background: 'linear-gradient(160deg, #fffdf7 0%, #fef6e8 100%)',
          borderRadius: '12px',
          boxShadow: '0 32px 64px rgba(0,0,0,0.20), 0 8px 24px rgba(244,114,182,0.12)',
        }}
      >
        {/* Margin line */}
        <div className="absolute left-16 top-0 bottom-0 w-px bg-pink-200/60 pointer-events-none" />
        {/* Ruled lines */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: `${56 + i * 42}px`, borderBottom: '1px solid rgba(173,216,230,0.35)' }}
          />
        ))}
        {/* Post-it top-right */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-pink-200/80 shadow-md flex items-center justify-center text-xl"
          style={{ transform: 'rotate(5deg)', borderRadius: '2px 2px 2px 2px', boxShadow: '2px 4px 10px rgba(0,0,0,0.15)' }}
        >
          🩷
        </div>

        {/* Content */}
        <div className="p-8 md:p-14 pl-20 relative z-10">
          {data.letterContent.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.35, duration: 0.6, ease: 'easeOut' }}
              className={
                index === 0
                  ? 'text-2xl font-black text-pink-400 mb-6'
                  : 'text-base md:text-lg text-slate-700 leading-loose mb-4'
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + data.letterContent.length * 0.35, duration: 0.7 }}
          className="px-8 md:px-14 pl-20 pb-10 text-right relative z-10"
        >
          <div className="inline-flex items-center gap-2 text-pink-500 font-bold text-lg italic">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400 shrink-0" />
            {data.letterSender}
          </div>
        </motion.div>
      </motion.div>

      {/* Re-read button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-center mt-8"
      >
        <FloatingHearts />
      </motion.div>
    </motion.div>
  );
}

/* ── Letter Section ─────────────────────────────────────── */
export default function Letter() {
  const [phase, setPhase] = useState('envelope'); // 'envelope' | 'opening' | 'letter'

  const handleOpenEnvelope = () => {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('letter'), 1300);
  };

  return (
    <section id="letter" className="py-28 relative overflow-hidden">
      <Sprinkles set="alt" />
      {/* Floating hearts only on letter phase */}
      {phase === 'letter' && <FloatingHearts />}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <StoryScroll className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6">
            <Mail className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Letter</span>
          </div>

          <h2 className="text-4xl text-3d md:text-5xl font-black text-white drop-shadow-md mb-2">
            A Letter for You
          </h2>
          {phase === 'letter' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/60 text-base"
            >
              Baca pelan-pelan ya 🌸
            </motion.p>
          )}
        </StoryScroll>

        {/* Envelope → Letter transition */}
        <StoryScrollItem delay={0.2} distance={60}>
          <AnimatePresence mode="wait">
            {phase !== 'letter' ? (
              <motion.div key="envelope" exit={{ opacity: 0, scale: 0.9, y: -30 }} transition={{ duration: 0.4 }}>
                <EnvelopeScene phase={phase} onOpen={handleOpenEnvelope} />
              </motion.div>
            ) : (
              <motion.div key="letter">
                <LetterContent />
              </motion.div>
            )}
          </AnimatePresence>
        </StoryScrollItem>
      </div>
    </section>
  );
}
