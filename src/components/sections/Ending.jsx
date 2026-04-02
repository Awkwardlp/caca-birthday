import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Clock } from 'lucide-react';
import data from '../../data.json';
import Sprinkles from '../Sprinkles';
import StoryScroll, { StoryScrollItem } from '../StoryScroll';

/* ── Calculate exact age from birthDate ──────────────────── */
function calcAge(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { years, months, days, hours, minutes, seconds };
}

/* ── Animated number card ────────────────────────────────── */
function CountCard({ value, label, color }) {
  return (
    <motion.div
      key={value}
      initial={{ scale: 0.92, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center"
    >
      <div
        className="rounded-2xl flex items-center justify-center font-black text-white shadow-lg mb-2"
        style={{
          background: color,
          minWidth: '72px',
          height: '72px',
          fontSize: '2rem',
          boxShadow: `0 8px 24px ${color}55`,
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

/* ── Separator dot ───────────────────────────────────────── */
function Sep() {
  return <span className="text-white/30 font-black text-2xl self-center pb-5">·</span>;
}

/* ── Twinkling stars background decoration ───────────────── */
function StarField() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.floor(Math.random() * 100)}%`,
    top: `${Math.floor(Math.random() * 100)}%`,
    delay: i * 0.3,
    size: Math.random() > 0.6 ? 16 : 12,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-200/30"
          style={{ left: s.left, top: s.top, fontSize: s.size }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 3 + i % 4, delay: s.delay }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}

/* ── Age Counter Section ─────────────────────────────────── */
function AgeCounter() {
  const [age, setAge] = useState(() => calcAge(data.birthDate));

  useEffect(() => {
    const id = setInterval(() => setAge(calcAge(data.birthDate)), 1000);
    return () => clearInterval(id);
  }, []);

  const mainUnits = [
    { value: age.years, label: 'Tahun', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
    { value: age.months, label: 'Bulan', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
    { value: age.days, label: 'Hari', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  ];

  const timeUnits = [
    { value: age.hours, label: 'Jam', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
    { value: age.minutes, label: 'Menit', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
    { value: age.seconds, label: 'Detik', color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <Sprinkles set="alt" />
      <StarField />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Header */}
        <StoryScroll className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6">
            <Clock className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Age Counter</span>
          </div>
          <h2 className="text-4xl text-3d md:text-5xl font-black text-white drop-shadow-lg mb-3">
            Maulidiya Salsabila
          </h2>
          <p className="text-white/60 text-lg">
            Tepat saat ini, kamu sudah hidup selama…
          </p>
        </StoryScroll>

        {/* Big units: years · months · days */}
        <StoryScrollItem delay={0.2} distance={40} className="bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-8 md:p-10 shadow-2xl mb-6">
          {/* Text summary */}
          {/* <p className="text-center text-white/70 text-base md:text-lg mb-8 leading-relaxed">
            <span className="text-white font-white text-xl">{age.years} tahun</span>
            {', '}
            <span className="text-white font-white text-xl">{age.months} bulan</span>
            {', '}
            <span className="text-white font-white text-xl">{age.days} hari</span>
          </p> */}

          <p className="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-5">
            Current age
          </p>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {mainUnits.map(({ value, label, color }, i) => (
              <React.Fragment key={label}>
                <CountCard value={value} label={label} color={color} />
                {i < mainUnits.length - 1 && <Sep />}
              </React.Fragment>
            ))}
          </div>
        </StoryScrollItem>

        {/* Live time units: hours · minutes · seconds */}
        <StoryScrollItem delay={0.35} distance={30} className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl p-6 shadow-xl mb-6">
          <p className="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-5">
            Real-time
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {timeUnits.map(({ value, label, color }, i) => (
              <React.Fragment key={label}>
                <CountCard value={value} label={label} color={color} />
                {i < timeUnits.length - 1 && <Sep />}
              </React.Fragment>
            ))}
          </div>
        </StoryScrollItem>

        {/* Ending */}
        <StoryScrollItem delay={0.5} distance={30} className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl p-6 shadow-xl">

          {/* <h2 className="text-center text-3xl md:text-4xl font-[Poppins] text-white drop-shadow-lg mb-6 leading-tight">
            Selamat Ulang Tahun ✨
          </h2> */}

          <p className="text-center text-white/75 text-lg leading-relaxed mb-8">
            {data.endingMessage}
          </p>

          {/* Sender signature */}
          <div className="text-center border-t border-white/20 pt-6 mt-2">
            <div className="inline-flex items-center gap-2 text-white/70 italic font-semibold text-base">
              {data.endingSender}
            </div>
          </div>
        </StoryScrollItem>

      </div>
    </section>
  );
}

/* ── Combined Export ─────────────────────────────────────── */
export default function Ending() {
  return (
    <>
      <AgeCounter />
    </>
  );
}
