import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import FlowerVector from './FlowerVector';

export default function ScrollDecorations() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax layers (different depth map)
  const yFastUp = useTransform(scrollYProgress, [0, 1], ['0vh', '-90vh']);
  const ySlowDown = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);
  const ySlowDown2 = useTransform(scrollYProgress, [0, 1], ['0vh', '-10vh']);
  const yMediumUp = useTransform(scrollYProgress, [0, 1], ['0vh', '-80vh']);

  const rotateSlow = useTransform(scrollYProgress, [0, 1], [-15, 20]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [15, -20]);

  return (
    <>
      {/* ── Top Scroll Progress Line (The Sequence Thread) ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] z-[100] origin-left border-b border-white/20"
        style={{
          scaleX,
          background: '#ffbbebff',
          // boxShadow: '0 0 15px 2px rgba(244,114,182,0.8), 0 0 5px 1px rgba(251,191,36,0.6)',
        }}
      />

      {/* ── Background Parallax Drama ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">

        {/* Glow Orbs - Berpindah perlahan ke arah berlawanan */}
        <motion.div
          style={{ y: yFastUp }}
          className="absolute top-[20%] -left-[10%] w-[50vh] h-[50vh] bg-pink-300/10 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: ySlowDown }}
          className="absolute top-[10%] -right-[20%] w-[60vh] h-[60vh] bg-purple-400/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: ySlowDown2 }}
          className="absolute top-[20%] -right-[20%] w-[30vh] h-[30vh] bg-purple-400/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: yMediumUp }}
          className="absolute bottom-[20%] left-[30%] w-[40vh] h-[40vh] bg-yellow-200/5 rounded-full blur-[80px]"
        />

        {/* Floating Flowers (Parallax Effect) */}
        <motion.div
          style={{ y: yFastUp, rotate: rotateSlow }}
          className="absolute top-[40%] left-[8%] opacity-100 drop-shadow-xl"
        >
          <FlowerVector className="w-20 h-20 blur-[2.5px]" />
        </motion.div>

        <motion.div
          style={{ y: yMediumUp, rotate: rotateReverse }}
          className="absolute top-[70%] right-[10%] opacity-100 drop-shadow-2xl"
        >
          <FlowerVector className="w-28 h-28 blur-[3px]" />
        </motion.div>

        <motion.div
          style={{ y: ySlowDown, rotate: rotateSlow }}
          className="absolute top-[15%] right-[25%] opacity-100"
        >
          <FlowerVector className="w-12 h-12 blur-[1.2px]" />
        </motion.div>

        <motion.div
          style={{ y: ySlowDown2, rotate: rotateSlow }}
          className="absolute top-[85%] right-[84%] opacity-100"
        >
          <FlowerVector className="w-12 h-12 blur-[1.2px]" />
        </motion.div>
      </div>
    </>
  );
}
