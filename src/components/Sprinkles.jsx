import React from 'react';
import { motion } from 'framer-motion';

/* ── Per-set of sprinkle positions (different sets for variety) ── */
const SETS = {
  default: [
    { top: '8%',  left: '6%',  size: 13, delay: 0,   dur: 2.2 },
    { top: '15%', left: '22%', size: 9,  delay: 1.3, dur: 3.0 },
    { top: '5%',  left: '42%', size: 15, delay: 0.6, dur: 2.7 },
    { top: '12%', left: '68%', size: 10, delay: 2.1, dur: 2.4 },
    { top: '7%',  left: '87%', size: 14, delay: 0.3, dur: 3.3 },
    { top: '32%', left: '3%',  size: 10, delay: 1.8, dur: 2.8 },
    { top: '28%', left: '92%', size: 12, delay: 0.9, dur: 2.1 },
    { top: '50%', left: '8%',  size: 8,  delay: 2.5, dur: 3.5 },
    { top: '48%', left: '94%', size: 11, delay: 1.1, dur: 2.6 },
    { top: '65%', left: '14%', size: 14, delay: 0.4, dur: 2.9 },
    { top: '70%', left: '80%', size: 9,  delay: 1.7, dur: 2.3 },
    { top: '78%', left: '38%', size: 12, delay: 0.8, dur: 3.1 },
    { top: '82%', left: '62%', size: 10, delay: 2.3, dur: 2.5 },
    { top: '88%', left: '5%',  size: 11, delay: 1.5, dur: 2.7 },
    { top: '90%', left: '90%', size: 13, delay: 0.2, dur: 3.4 },
    { top: '38%', left: '50%', size: 8,  delay: 3.0, dur: 2.2 },
    { top: '20%', left: '78%', size: 10, delay: 1.0, dur: 2.9 },
    { top: '55%', left: '55%', size: 7,  delay: 2.7, dur: 3.6 },
  ],
  alt: [
    { top: '10%', left: '10%', size: 11, delay: 0.5, dur: 2.5 },
    { top: '18%', left: '35%', size: 8,  delay: 1.8, dur: 3.2 },
    { top: '4%',  left: '55%', size: 14, delay: 0.2, dur: 2.8 },
    { top: '9%',  left: '75%', size: 9,  delay: 2.4, dur: 2.3 },
    { top: '6%',  left: '92%', size: 12, delay: 0.7, dur: 3.0 },
    { top: '30%', left: '2%',  size: 8,  delay: 1.3, dur: 2.6 },
    { top: '35%', left: '96%', size: 11, delay: 0.4, dur: 2.9 },
    { top: '52%', left: '5%',  size: 9,  delay: 2.0, dur: 3.4 },
    { top: '58%', left: '91%', size: 13, delay: 1.6, dur: 2.2 },
    { top: '68%', left: '18%', size: 10, delay: 0.1, dur: 3.1 },
    { top: '72%', left: '77%', size: 8,  delay: 2.8, dur: 2.7 },
    { top: '80%', left: '42%', size: 14, delay: 1.1, dur: 2.4 },
    { top: '84%', left: '65%', size: 9,  delay: 0.9, dur: 3.3 },
    { top: '89%', left: '8%',  size: 12, delay: 1.9, dur: 2.5 },
    { top: '93%', left: '88%', size: 10, delay: 0.6, dur: 3.6 },
    { top: '42%', left: '48%', size: 7,  delay: 2.2, dur: 2.1 },
    { top: '22%', left: '82%', size: 11, delay: 1.4, dur: 2.8 },
    { top: '60%', left: '60%', size: 8,  delay: 0.3, dur: 3.5 },
  ],
};

/**
 * Sprinkles — scattered twinkling ✦ stars overlay
 * @param {'default'|'alt'} set - which position set to use (alternate between sections)
 */
export default function Sprinkles({ set = 'default' }) {
  const items = SETS[set] ?? SETS.default;
  return (
    <>
      {items.map((s, i) => (
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
    </>
  );
}
