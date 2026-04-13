import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import data from '../../data.json';
import ScrollBaseAnimation from '../ui/ScrollBaseAnimation';

export default function Moments() {
  return (
    <section
      id="moments"
      className="relative bg-white/10 backdrop-blur-sm border-t border-white/20"
      style={{ overflowX: 'clip' }}
    >
      {/* ── Marquee Header ── */}
      <div className="pt-16 pb-16 relative z-10 select-none">
        <ScrollBaseAnimation
          baseVelocity={-3}
          clasname="font-black tracking-[-0.07em] leading-[90%] text-5xl md:text-7xl text-white/70 drop-shadow-lg"
        >
          Happy Birthday ✦ Maulidiya Salsabila ✦
        </ScrollBaseAnimation>

        <div className="mt-3" />

        <ScrollBaseAnimation
          baseVelocity={3}
          clasname="font-black tracking-[-0.07em] leading-[90%] text-5xl md:text-7xl text-white/30"
        >
          Moments ✦ Our Moments ✦ Video ✦
        </ScrollBaseAnimation>
      </div>

      {/* ── Cinematic Video ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 max-w-4xl mx-auto px-6 pb-32"
      >
        <div className="flex flex-col items-center">

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
