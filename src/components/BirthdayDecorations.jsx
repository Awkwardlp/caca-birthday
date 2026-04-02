import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────
   Cursor Sparkle Trail — satu-satunya dekorasi aktif
──────────────────────────────────────────────────*/
const SPARKLE_COLORS = ['#fcd34d', '#f472b6', '#a855f7', '#60a5fa', '#34d399', '#fb923c'];

function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e) => {
      const newSparkle = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        color: '#ff2cc0',
        size: Math.random() * 10 + 6,
      };
      setSparkles((prev) => [...prev.slice(-15), newSparkle]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1, x: s.x - s.size / 2, y: s.y - s.size / 2 }}
            animate={{ opacity: 0, scale: 0, y: s.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 20 20">
              <path
                d="M10 0 L11.8 7.6 L20 10 L11.8 12.4 L10 20 L8.2 12.4 L0 10 L8.2 7.6 Z"
                fill={s.color}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Wave Divider — kalem, subtle
──────────────────────────────────────────────────*/
export function WaveDivider({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''}`} style={{ height: '48px' }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill="rgba(255,255,255,0.10)"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main Export
──────────────────────────────────────────────────*/
export default function BirthdayDecorations() {
  return <SparkleTrail />;
}
