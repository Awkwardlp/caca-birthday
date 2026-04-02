import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles } from 'lucide-react';
import data from '../../data.json';
import Sprinkles from '../Sprinkles';

function PhotoCard({ src, caption, index }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const rotations = [-6, 4, -8, 5, -3, 7];
  const mt = ['mt-0', 'mt-12', 'mt-4', 'mt-16', 'mt-2', 'mt-10'];

  const initialRotate = rotations[index % rotations.length];
  const margin = mt[index % mt.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: initialRotate - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: initialRotate }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
      className={`relative w-64 md:w-72 aspect-[3/4] ${margin} cursor-pointer group`}
      style={{ perspective: 1200 }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={!isFlipped ? {
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : { zIndex: 50 }}
      animate={{ zIndex: isFlipped ? 50 : 1 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE (Photo) */}
        <div
          className="absolute inset-0 bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-xl rounded-sm border border-slate-100 flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Washi Tape Decoration */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm opacity-80 z-20"
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
              transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-2deg' : '3deg'})`
            }}
          />
          <div className="overflow-hidden rounded-sm flex-1 bg-slate-100">
            <img
              src={src}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-500"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-4 left-0 w-full text-center">
            <span className="font-playful text-slate-700 text-lg md:text-xl font-medium tracking-wide opacity-80">
              #{index + 1}
            </span>
          </div>
        </div>

        {/* BACK FACE (Caption) */}
        <div
          className="absolute inset-0 bg-[#fdfbf6] p-6 shadow-xl rounded-sm border border-slate-200 flex flex-col items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Subtle paper grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #000 27px, #000 28px)' }} />

          <Heart className="w-8 h-8 text-pink-300 fill-pink-100 mb-6 drop-shadow-sm" />

          <p className="text-slate-700 font-serif italic text-xl md:text-2xl leading-relaxed text-center drop-shadow-sm z-10 px-2"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}>
            "{caption}"
          </p>

          <div className="absolute bottom-5 text-pink-400/80 text-xs font-bold tracking-widest uppercase">
            Ketuk untuk menutup
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 relative overflow-hidden bg-white/10 backdrop-blur-sm border-t border-white/20">

      <Sprinkles set="alt" />

      {/* Background slice removed to let global gradient shine */}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6">
            <Camera className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Gallery</span>
          </div>

          <h2 className="text-5xl text-3d md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-sm">
            Our Memories
          </h2>
          <p className="text-white/70 text-lg font-medium">Klik foto untuk membalikan fotonya.</p>
        </motion.div>

        {/* Polaroids Container */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4">
          {data.gallery.map((item, index) => (
            <PhotoCard key={index} src={item.src} caption={item.caption} index={index} />
          ))}
        </div>

        {/* Cinematic Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 max-w-4xl mx-auto px-4"
        >
          <div className="flex flex-col items-center">
            {/* Elegant Header for Video */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-white/40"></div>
              <Sparkles className="w-5 h-5 text-white/90 drop-shadow-sm" />
              <h3 className="text-2xl md:text-3xl font-serif italic text-white/90 tracking-wide drop-shadow-lg">Moments</h3>
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-white/40"></div>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video p-3 md:p-5 bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(244,114,182,0.2)]">

              {/* Decorative Corner Borders */}
              <div className="absolute top-0 left-0 w-8 md:w-12 h-8 md:h-12 border-t-2 border-l-2 border-white/60 rounded-tl-[1.2rem] md:rounded-tl-[1.7rem] -translate-x-1 -translate-y-1 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
              <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 border-t-2 border-r-2 border-white/60 rounded-tr-[1.2rem] md:rounded-tr-[1.7rem] translate-x-1 -translate-y-1 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"></div>
              <div className="absolute bottom-0 left-0 w-8 md:w-12 h-8 md:h-12 border-b-2 border-l-2 border-white/60 rounded-bl-[1.2rem] md:rounded-bl-[1.7rem] -translate-x-1 translate-y-1 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
              <div className="absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 border-b-2 border-r-2 border-white/60 rounded-br-[1.2rem] md:rounded-br-[1.7rem] translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>

              {/* The Video Element */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#111] relative shadow-inner">
                {data.galleryVideo ? (
                  data.galleryVideo.includes("youtube.com") || data.galleryVideo.includes("youtu.be") ? (
                    <iframe
                      className="w-full h-full"
                      src={
                        data.galleryVideo.includes("youtu.be")
                          ? data.galleryVideo.replace("https://youtu.be/", "https://www.youtube.com/embed/")
                          : data.galleryVideo.replace("watch?v=", "embed/")
                      }
                      title="YouTube video"
                      // frameBorder="0"
                      allow="encrypted-media"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={data.galleryVideo}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-6 text-center border-2 border-dashed border-white/10 rounded-xl m-2 bg-white/5">
                    <Camera className="w-10 h-10 mb-4 opacity-40" />
                    <p className="font-serif italic text-lg mb-2">
                      Simpan memori dalam gerak nyata di sini.
                    </p>
                    <p className="text-xs uppercase tracking-widest opacity-60 mt-1">
                      Tambahkan video dengan mengisi{" "}
                      <strong className="text-pink-300">"galleryVideo"</strong> di bagian{" "}
                      <strong className="text-pink-300">data.json</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
