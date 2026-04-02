import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import data from '../../data.json';
import { Heart, PartyPopper } from 'lucide-react';
import Sprinkles from '../Sprinkles';
import StoryScroll, { StoryScrollItem } from '../StoryScroll';

const TOTAL_CANDLES = 5;

// Candle: renders a single candle with a flickering flame
function Candle({ blown, onClick, index }) {
  const colors = ['#fbcfe8', '#f9a8d4', '#f472b6', '#fdf2f8', '#fbcfe8', '#fce7f3', '#fdf2f8'];
  const candleColor = colors[index % colors.length];

  return (
    <motion.button
      onClick={onClick}
      disabled={blown}
      whileHover={!blown ? { scale: 1.15, y: -4 } : {}}
      whileTap={!blown ? { scale: 0.9 } : {}}
      className="flex flex-col items-center cursor-pointer disabled:cursor-default focus:outline-none"
      title={blown ? 'Blown out!' : 'Click to blow!'}
    >
      {/* Flame */}
      <div className="relative w-6 h-8 flex items-end justify-center mb-0.5">
        <AnimatePresence>
          {!blown ? (
            <motion.div
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: 1,
                y: [0, -2, 1, -1, 0],
              }}
              exit={{ scale: 0, opacity: 0, y: -10 }}
              transition={{
                scale: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' },
                y: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' },
                exit: { duration: 0.3 },
              }}
              className="absolute bottom-0"
            >
              {/* Outer flame */}
              <div
                className="w-5 h-7 rounded-tl-full rounded-tr-full rounded-bl-full"
                style={{
                  background: 'radial-gradient(ellipse at 50% 80%, #fbbf24, #f97316, #dc2626)',
                  boxShadow: '0 0 12px 4px rgba(251,191,36,0.6)',
                  clipPath: 'ellipse(50% 100% at 50% 100%)',
                }}
              />
              {/* Inner flame */}
              <div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 50% 100%, #fef3c7, #fde68a, transparent)',
                  clipPath: 'ellipse(50% 100% at 50% 100%)',
                }}
              />
            </motion.div>
          ) : (
            // Smoke puff after blown
            <motion.div
              key="smoke"
              initial={{ opacity: 0.8, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -20, scale: 2 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-0 w-3 h-3 bg-white/40 rounded-full blur-sm"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Candle body */}
      <div
        className="w-4 h-14 rounded-t-sm rounded-b-sm shadow-md relative overflow-hidden border border-black/5"
        style={{ background: `linear-gradient(to right, ${candleColor}, ${candleColor}dd, ${candleColor}aa)` }}
      >
        {/* Wax drip */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 rounded-b-full bg-white/40"
        />
        {/* Shine */}
        <div className="absolute top-2 left-1 w-1 h-8 bg-white/60 rounded-full" />
      </div>

      {/* Wick */}
      <div className="w-px h-2 bg-slate-800 -mt-px" />
    </motion.button>
  );
}

// The main Birthday Cake mini-game
export default function Gift() {
  const [blown, setBlown] = useState(Array(TOTAL_CANDLES).fill(false));
  const [phase, setPhase] = useState('game'); // 'game' | 'blowing' | 'done'
  const [showMessage, setShowMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const doneTriggered = useRef(false);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blownCount = blown.filter(Boolean).length;
  const allBlown = blownCount === TOTAL_CANDLES;

  // Handle candle blown
  const blowCandle = (i) => {
    if (blown[i]) return;
    const next = [...blown];
    next[i] = true;
    setBlown(next);
  };

  // Trigger celebration when all blown
  useEffect(() => {
    if (allBlown && !doneTriggered.current) {
      doneTriggered.current = true;
      setTimeout(() => {
        setPhase('done');
        setTimeout(() => setShowMessage(true), 600);
      }, 500);
    }
  }, [allBlown]);

  const resetGame = () => {
    setBlown(Array(TOTAL_CANDLES).fill(false));
    setPhase('game');
    setShowMessage(false);
    doneTriggered.current = false;
  };

  return (
    <section id="gift" className="py-28 bg-white/20 backdrop-blur-sm relative overflow-hidden">
      <Sprinkles set="default" />
      {phase === 'done' && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={['#a855f7', '#f472b6', '#fcd34d', '#60a5fa', '#34d399', '#fb923c']}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <StoryScroll className="mb-12">

          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6">
            <PartyPopper className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Gift</span>
          </div>

          <h2 className="text-4xl text-3d md:text-5xl font-black text-white drop-shadow-md mb-3">
            Make a Wish!
          </h2>
          <p className="text-white/70 text-lg">
            {allBlown
              ? 'Permintaanmu akan segera terkabul! ✨'
              : `Tiup semua ${TOTAL_CANDLES} lilin — ${TOTAL_CANDLES - blownCount} tersisa!`}
          </p>
        </StoryScroll>

        {/* Cake */}
        <StoryScrollItem delay={0.2} className="flex flex-col items-center mt-8 drop-shadow-2xl">
          {/* Candles row */}
          <div className="flex items-end justify-center gap-3 md:gap-5 mb-0 relative z-30">
            {blown.map((b, i) => (
              <Candle key={i} index={i} blown={b} onClick={() => blowCandle(i)} />
            ))}
          </div>

          {/* Top tier */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Frosting drips */}
            <div className="flex w-52 md:w-64 justify-around overflow-hidden z-20 absolute -top-1" style={{ height: '30px' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 rounded-b-full bg-white shadow-[0_2px_2px_rgba(0,0,0,0.05)]"
                  style={{ height: `${12 + (i % 3) * 6}px` }}
                />
              ))}
            </div>

            <div
              className="w-56 md:w-72 h-24 flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
                borderRadius: '8px 8px 0 0',
                boxShadow: 'inset -5px -5px 15px rgba(244,114,182,0.2), inset 5px 5px 15px rgba(255,255,255,0.7)',
                borderTop: '2px solid white',
              }}
            >
              <div className="absolute top-1/2 left-0 w-full flex justify-around opacity-70 px-4 -mt-3">
                {[...Array(6)].map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-white shadow-[0_2px_4px_rgba(244,114,182,0.2)]"></div>)}
              </div>
              <span className="text-pink-400 font-bold text-lg md:text-xl z-10 italic font-serif">
                Happy Birthday!
              </span>
            </div>
          </div>

          {/* Bottom tier */}
          <div className="relative z-10 flex flex-col items-center -mt-2">
            {/* Frosting drips between tiers */}
            <div className="flex w-[260px] md:w-[330px] justify-around overflow-hidden z-20 absolute -top-1" style={{ height: '36px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-7 rounded-b-full bg-pink-50 shadow-[0_3px_5px_rgba(0,0,0,0.08)]"
                  style={{ height: `${16 + (i % 4) * 5}px` }}
                />
              ))}
            </div>

            <div
              className="w-72 md:w-96 h-32 flex items-center justify-center relative overflow-hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #fff0f6 50%, #fce7f3 100%)',
                borderRadius: '6px 6px 12px 12px',
                boxShadow: 'inset -8px -8px 20px rgba(244,114,182,0.15), inset 8px 8px 15px rgba(255,255,255,0.9)',
                borderBottom: '4px solid #fbcfe8'
              }}
            >
              {/* Bottom tier decor - Pearls */}
              <div className="absolute bottom-2 left-0 w-full flex justify-around px-3">
                {[...Array(14)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-pink-100/80 shadow-[inset_-2px_-2px_4px_rgba(244,114,182,0.4),0_2px_4px_rgba(0,0,0,0.1)]"></div>)}
              </div>

              <span className="text-pink-400 font-bold text-lg md:text-xl z-10 italic font-serif">
                Maulidiya Salsabila ♡
              </span>
            </div>
          </div>

          {/* Cake Stand */}
          <div className="relative flex flex-col items-center z-[-1] mt-[-4px]">
            <div
              className="w-[320px] md:w-[440px] h-8 z-10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(to right, #f8fafc, #ffffff, #f1f5f9)',
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                borderBottom: '2px solid #cbd5e1',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>
            </div>
            <div
              className="w-[280px] md:w-[380px] h-10"
              style={{
                background: 'linear-gradient(to right, #e2e8f0, #f8fafc, #cbd5e1)',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                borderBottom: '3px solid #94a3b8'
              }}
            ></div>
          </div>
        </StoryScrollItem>

        {/* Progress bar */}
        <StoryScrollItem delay={0.4} className="mt-10 max-w-xs mx-auto">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>Lilin yang ditiup</span>
            <span>{blownCount} / {TOTAL_CANDLES}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(blownCount / TOTAL_CANDLES) * 100}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #f2e5ffff, #f472b6, #f2e5ffff)' }}
            />
          </div>
        </StoryScrollItem>
      </div>

      {/* Success Message Overlay */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_60px_-15px_rgba(244,114,182,0.5)] max-w-md w-full text-center border-[3px] border-white/80 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background gradient blooms */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-6xl mb-6 drop-shadow-lg"
              >
                ✨
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 drop-shadow-sm pb-1">
                Wish Granted!
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium relative z-10">
                {data.giftMessage}
              </p>

              <button
                onClick={resetGame}
                className="relative inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(236,72,153,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_15px_40px_-10px_rgba(236,72,153,0.8)] active:scale-95"
              >
                <span>Play Again</span>
                <div className="absolute inset-0 rounded-full ring-2 ring-white/50 pointer-events-none" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
