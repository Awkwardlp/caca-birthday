import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

/* ── Animated floating hearts background ── */
function FloatingDots() {
  const dots = Array.from({ length: 12 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    dur: 3 + Math.random() * 4,
    size: 4 + Math.random() * 6,
    opacity: 0.08 + Math.random() * 0.12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            bottom: '-10px',
            width: d.size,
            height: d.size,
            background: '#f9a8d4',
            opacity: d.opacity,
          }}
          animate={{ y: [0, -800], opacity: [0, d.opacity, d.opacity, 0] }}
          transition={{ repeat: Infinity, duration: d.dur, delay: d.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ── Shared slide wrapper ── */
const slideVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

function Slide({ children }) {
  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center text-center px-6 gap-4"
    >
      {children}
    </motion.div>
  );
}

/* ── Button styles ── */
function PrimaryBtn({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-full font-bold text-white text-sm tracking-wide shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
        boxShadow: '0 8px 24px rgba(236,72,153,0.35)',
      }}
    >
      {children}
    </motion.button>
  );
}

function OutlineBtn({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-full font-bold text-pink-500 text-sm tracking-wide border-2 border-pink-300 bg-white shadow-sm"
    >
      {children}
    </motion.button>
  );
}

/* ── Cat sticker image ── */
function CatSticker({ src, size = 200 }) {
  return (
    <motion.img
      src={`${BASE}${src}`}
      alt=""
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
      style={{ width: size, height: size, objectFit: 'contain' }}
    // className="drop-shadow-lg"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   INTRO COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function Intro({ onEnter }) {
  // 'greeting' → 'ready' → 'angry' (if no) / 'birthday' (if yes) → enter
  const [step, setStep] = useState('greeting');

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: '#ffffff',
      }}
    >
      <FloatingDots />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {/* ── Step 1: Greeting ── */}
          {step === 'greeting' && (
            <Slide key="greeting">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-black text-slate-800 mb-1"
              >
                Hi
              </motion.div>
              <CatSticker src="cat-hi.png" size={180} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-slate-700 mt-2"
              >
                Halooww, Cantikkku 🥰
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <PrimaryBtn onClick={() => setStep('ready')}>
                  tap disinii &lt;3
                </PrimaryBtn>
              </motion.div>
            </Slide>
          )}

          {/* ── Step 2: Ready? ── */}
          {step === 'ready' && (
            <Slide key="ready">
              <CatSticker src="cat-excited.png" size={200} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-slate-700 mt-2"
              >
                are you readyy to open thisss?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-2"
              >
                <PrimaryBtn onClick={() => setStep('birthday')}>
                  yess
                </PrimaryBtn>
                <OutlineBtn onClick={() => setStep('angry')}>
                  noo
                </OutlineBtn>
              </motion.div>
            </Slide>
          )}

          {/* ── Step 2b: Angry (if "noo") ── */}
          {step === 'angry' && (
            <Slide key="angry">
              <CatSticker src="cat-angry.png" size={200} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-black text-slate-800 mt-2 uppercase px-4"
              >
                OH GITU SEKARANG KAMU SAMA AKU?😡
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <PrimaryBtn onClick={() => setStep('ready')}>
                  back
                </PrimaryBtn>
              </motion.div>
            </Slide>
          )}

          {/* ── Step 3: Birthday reveal ── */}
          {step === 'birthday' && (
            <Slide key="birthday">
              <CatSticker src="cat-happy.png" size={200} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 px-4"
              >
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-snug">
                  Today, this pretty girl turns 20!
                </p>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-snug">
                  happy birthday, my love 🩷
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <PrimaryBtn onClick={onEnter}>
                  open it &lt;3
                </PrimaryBtn>
              </motion.div>
            </Slide>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
