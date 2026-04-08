import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles } from 'lucide-react';
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
          boxShadow: `0 ${8 + index * 4}px ${28 + index * 8}px rgba(0,0,0,${0.22 + index * 0.04})`,
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

/* ─── Gallery section ──────────────────────────────────────────── */
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-white/10 backdrop-blur-sm border-t border-white/20"
      style={{ overflowX: 'clip' }}
    >
      <Sprinkles set="alt" />

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 pt-25 pb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ paddingBottom: CONFIG.HEADER_BOTTOM_GAP }}
        >
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-4">
            <Camera className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Gallery</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-sm text-3d">
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
      <div>
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

      {/* ── Cinematic Video Section (outside stacking zone) ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 max-w-4xl mx-auto px-6 pb-32"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-white/40" />
            <Sparkles className="w-5 h-5 text-white/90 drop-shadow-sm" />
            <h3 className="text-2xl md:text-3xl font-serif italic text-white/90 tracking-wide drop-shadow-lg">
              Moments
            </h3>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-white/40" />
          </div>

          <div className="relative w-full aspect-video p-3 md:p-5 bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(244,114,182,0.2)]">
            <div className="absolute top-0 left-0 w-8 md:w-12 h-8 md:h-12 border-t-2 border-l-2 border-white/60 rounded-tl-[1.2rem] md:rounded-tl-[1.7rem] -translate-x-1 -translate-y-1 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" />
            <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 border-t-2 border-r-2 border-white/60 rounded-tr-[1.2rem] md:rounded-tr-[1.7rem] translate-x-1 -translate-y-1 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            <div className="absolute bottom-0 left-0 w-8 md:w-12 h-8 md:h-12 border-b-2 border-l-2 border-white/60 rounded-bl-[1.2rem] md:rounded-bl-[1.7rem] -translate-x-1 translate-y-1 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2" />
            <div className="absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 border-b-2 border-r-2 border-white/60 rounded-br-[1.2rem] md:rounded-br-[1.7rem] translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />

            <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#111] relative shadow-inner">
              {data.galleryVideo ? (
                data.galleryVideo.includes('youtube.com') || data.galleryVideo.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full"
                    src={
                      data.galleryVideo.includes('youtu.be')
                        ? data.galleryVideo.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
                        : data.galleryVideo.replace('watch?v=', 'embed/')
                    }
                    title="YouTube video"
                    allow="encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video src={data.galleryVideo} controls className="w-full h-full object-cover">
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-6 text-center border-2 border-dashed border-white/10 rounded-xl m-2 bg-white/5">
                  <Camera className="w-10 h-10 mb-4 opacity-40" />
                  <p className="font-serif italic text-lg mb-2">Simpan memori dalam gerak nyata di sini.</p>
                  <p className="text-xs uppercase tracking-widest opacity-60 mt-1">
                    Tambahkan video dengan mengisi{' '}
                    <strong className="text-pink-300">"galleryVideo"</strong> di bagian{' '}
                    <strong className="text-pink-300">data.json</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
