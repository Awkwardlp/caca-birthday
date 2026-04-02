import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Gift, Mail, Puzzle, Image } from 'lucide-react';

const navItems = [
  {
    name: 'Home',
    Icon: Home,
    href: '#home',
    sectionId: 'home',
    activeBg: 'bg-pink-400',
    hoverBg: 'hover:bg-white',
    activeText: 'text-white',
    idleText: 'text-white/80',
    hoverText: 'hover:text-black/50',
  },
  {
    name: 'Gift',
    Icon: Gift,
    href: '#gift',
    sectionId: 'gift',
    activeBg: 'bg-pink-400',
    hoverBg: 'hover:bg-white',
    activeText: 'text-white',
    idleText: 'text-white/80',
    hoverText: 'hover:text-black/50',
  },
  {
    name: 'Letter',
    Icon: Mail,
    href: '#letter',
    sectionId: 'letter',
    activeBg: 'bg-pink-400',
    hoverBg: 'hover:bg-white',
    activeText: 'text-white',
    idleText: 'text-white/80',
    hoverText: 'hover:text-black/50',
  },
  {
    name: 'Puzzle',
    Icon: Puzzle,
    href: '#puzzle',
    sectionId: 'puzzle',
    activeBg: 'bg-pink-400',
    hoverBg: 'hover:bg-white',
    activeText: 'text-white',
    idleText: 'text-white/80',
    hoverText: 'hover:text-black/50',
  },
  {
    name: 'Gallery',
    Icon: Image,
    href: '#gallery',
    sectionId: 'gallery',
    activeBg: 'bg-pink-400',
    hoverBg: 'hover:bg-white',
    activeText: 'text-white',
    idleText: 'text-white/80',
    hoverText: 'hover:text-black/50',
  },
];

export default function Navbar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observers = [];

    navItems.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(sectionId);
        },
        { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    setActive(item.sectionId);
    const target = document.getElementById(item.sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[80vw] sm:w-[95vw] max-w-lg"
    >
      <div className="bg-white/25 backdrop-blur-xl shadow-2xl shadow-black-500/20 border border-white/50 rounded-full px-2 py-2 flex items-center justify-between gap-2">
        {navItems.map((item) => {
          const isActive = active === item.sectionId;
          const { Icon } = item;

          return (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              whileTap={{ scale: 0.88 }}
              title={item.name}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-300 select-none py-2 px-1',
                isActive
                  ? `${item.activeBg} ${item.activeText} shadow-md`
                  : `${item.idleText} ${item.hoverBg} ${item.hoverText}`,
              ].join(' ')}
            >
              {/* Lucide icon — always visible */}
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />

              {/* Label — visible on sm and up */}
              <span className="hidden sm:block text-[9px] font-black uppercase tracking-wider leading-none">
                {item.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}
