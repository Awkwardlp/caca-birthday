import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart } from 'lucide-react';
import data from '../../data.json';
import Sprinkles from '../Sprinkles';

/* ═══════════════════════════════════════════════════════════════
 *  GALLERY CONFIGURATION — Atur semua jarak di sini
 * ═══════════════════════════════════════════════════════════════
 *
 *  CARD_TOP_START     : jarak (px) kartu PERTAMA dari atas viewport.
 *                       Lebih kecil = kartu lebih dekat ke atas layar.
 *                       (rekomendasi: 70 — di bawah navbar)
 *
 *  CARD_STACK_OFFSET  : selisih jarak (px) antar kartu saat menumpuk.
 *                       Lebih besar = tumpukan terlihat lebih bergeser.
 *                       (rekomendasi: 16–28)
 *
 *  CARD_SCROLL_HEIGHT : tinggi scroll area per kartu (vh).
 *                       Lebih kecil = kartu berikutnya muncul lebih CEPAT.
 *                       Lebih besar = scroll lebih LAMA sebelum kartu berikutnya.
 *                       (rekomendasi: 60–100)
 *
 *  HEADER_BOTTOM_GAP  : jarak (px) dari bawah teks header ke kartu pertama.
 *                       (rekomendasi: 8–48)
 * ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  CARD_TOP_START: 100,      // px  — kartu pertama dari atas viewport
  CARD_STACK_OFFSET: 16,   // px  — offset antar kartu tumpukan
  CARD_SCROLL_HEIGHT: 70,  // vh  — tinggi scroll area per kartu
  HEADER_BOTTOM_GAP: 1,   // px  — jarak header ke kartu pertama
};

/* ─── Single stacking card ─────────────────────────────────────── */
function StackCard({ src, caption, index }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const rotations = [-4, 3, -6, 4, -2, 5];
  const rotate = rotations[index % rotations.length];

  // jarak sticky dihitung dari CONFIG
  const topOffset = CONFIG.CARD_TOP_START + index * CONFIG.CARD_STACK_OFFSET;

  return (
    <div
      style={{
        position: 'sticky',
        top: topOffset,
        height: `${CONFIG.CARD_SCROLL_HEIGHT}vh`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: index + 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={
          !isFlipped
            ? { scale: 1.03, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } }
            : {}
        }
        className="relative cursor-pointer"
        style={{
          rotate: `${rotate}deg`,
          width: 'min(300px, 75vw)',
          aspectRatio: '3/4',
          perspective: 1200,
          boxShadow: `0 ${8 + index * 4}px ${28 + index * 8}px rgba(0,0,0,${0.05 + index * 0.01})`,
        }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT — Photo */}
          <div
            className="absolute inset-0 bg-white p-3 pb-14 shadow-xl rounded-sm border border-slate-100 flex flex-col"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* Washi tape */}
            <div
              className="absolute -top-3 left-1/2 w-24 h-8 opacity-80 z-20"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.5)',
                transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-2deg' : '3deg'})`,
              }}
            />
            <div className="overflow-hidden rounded-sm flex-1 bg-slate-100">
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover brightness-95 transition-all duration-500"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-4 left-0 w-full text-center">
              <span className="font-playful text-slate-700 text-lg font-medium tracking-wide opacity-80">
                #{index + 1}
              </span>
            </div>
          </div>

          {/* BACK — Caption */}
          <div
            className="absolute inset-0 bg-[#fdfbf6] p-6 shadow-xl rounded-sm border border-slate-200 flex flex-col items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 27px, #000 27px, #000 28px)',
              }}
            />
            <Heart className="w-8 h-8 text-pink-300 fill-pink-100 mb-6 drop-shadow-sm" />
            <p
              className="text-slate-700 font-serif italic text-xl leading-relaxed text-center drop-shadow-sm z-10 px-2"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
            >
              "{caption}"
            </p>
            <div className="absolute bottom-5 text-pink-400/80 text-xs font-bold tracking-widest uppercase">
              Ketuk untuk menutup
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Side text labels that appear while scrolling gallery ────── */
function GallerySideText({ visible }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const textStyle = {
    fontSize: 'clamp(4rem, 8vw, 7rem)',
    color: '#ffffff',
    textShadow: '0 4px 24px rgba(0,0,0,0.4), 0 8px 48px rgba(0,0,0,0.15)',
    lineHeight: 1,
  };

  /* Render via portal so fixed positioning isn't affected by parent overflow:clip */
  return ReactDOM.createPortal(
    <AnimatePresence>
      {visible && isDesktop && (
        <>
          {/* LEFT — "Happy" */}
          <motion.div
            key="side-happy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed pointer-events-none z-[60]"
            style={{ top: '50%', left: '16%', transform: 'translateY(-50%)' }}
          >
            <span className="font-playful select-none" style={textStyle}>
              Happy
            </span>
          </motion.div>

          {/* RIGHT — "20 th" */}
          <motion.div
            key="side-20th"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed pointer-events-none z-[60]"
            style={{ top: '50%', right: '16%', transform: 'translateY(-50%)' }}
          >
            <span className="font-playful select-none" style={textStyle}>
              20 th
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─── Gallery section ──────────────────────────────────────────── */
export default function Gallery() {
  const stackRef = useRef(null);
  const [isStackVisible, setIsStackVisible] = useState(false);

  /* Track whether the stacking zone is in viewport */
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStackVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      className="relative bg-white/15 border-t border-white/20"
      style={{ overflowX: 'clip' }}
    >
      <Sprinkles set="alt" />

      {/* Side text decorations */}
      <GallerySideText visible={isStackVisible} />

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 pt-25 pb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ paddingBottom: CONFIG.HEADER_BOTTOM_GAP }}
        >
          {/* <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-4">
            <Camera className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Gallery</span>
          </div> */}
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-sm">
            Our Memories
          </h2>
          <p className="text-white/70 text-lg font-medium">
            Scroll ke bawah untuk melihat setiap foto<br />Klik untuk membaliknya.
          </p>
        </motion.div>
      </div>

      {/*
       * ── STACKING ZONE ──────────────────────────────────────────
       * CRITICAL: This <div> is the DIRECT PARENT of all sticky cards.
       * Sticky cards release when THIS div's bottom exits the viewport.
       * The video must be OUTSIDE this div so cards release before video appears.
       */}
      <div ref={stackRef}>
        {data.gallery.map((item, index) => (
          <StackCard
            key={index}
            src={item.src}
            caption={item.caption}
            index={index}
          />
        ))}
      </div>
      {/* ── END STACKING ZONE ────────────────────────────────────── */}
    </section>
  );
}
