import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
 *  ScrollBaseAnimation
 *  Props:
 *    children       — teks yang ditampilkan
 *    baseVelocity  — kecepatan dasar (negatif = kiri, positif = kanan)
 *    clasname       — className tambahan untuk teks (typo sengaja mengikuti referensi)
 *    delay          — delay awal sebelum animasi mulai (ms, tidak dipakai secara real-time)
 * ───────────────────────────────────────────────────────────────── */
export default function ScrollBaseAnimation({
  children,
  baseVelocity = -5,
  clasname = '',
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /* wrap(-20, -45) means the translate will cycle between -20% and -45% */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /* If scroll velocity goes in opposite direction → reverse */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  /* Repeat the text 4× so the strip never shows a gap */
  const repeated = [children, children, children, children];

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={`flex whitespace-nowrap flex-nowrap ${clasname}`}
        style={{ x }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="block mr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
