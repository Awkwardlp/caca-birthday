import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home',    href: '#home',    sectionId: 'home'    },
  { name: 'Gift',    href: '#gift',    sectionId: 'gift'    },
  { name: 'Letter',  href: '#letter',  sectionId: 'letter'  },
  { name: 'Puzzle',  href: '#puzzle',  sectionId: 'puzzle'  },
  { name: 'Gallery', href: '#gallery', sectionId: 'gallery' },
];

const TRANSITION = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };
const SPRING     = { type: 'spring', stiffness: 380, damping: 30 };

export default function Navbar() {
  const [active,  setActive ] = useState('home');
  const [isAtTop, setIsAtTop] = useState(true);

  /* ── Scroll detection ─────────────────────────────────────────
   *  Single rAF-throttled listener.
   *  Active section = last section whose top ≤ 120px from viewport top.
   *  Works for any section height (fixes Gallery/Puzzle inaccuracy).
   */
  useEffect(() => {
    let ticking = false;

    const detect = () => {
      setIsAtTop(window.scrollY < 10);

      let current = navItems[0].sectionId;
      for (const { sectionId } of navItems) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = sectionId;
      }
      setActive(current);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(detect); ticking = true; }
    };

    detect();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    setActive(item.sectionId);
    document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ pointerEvents: 'none' }}
    >
      <motion.nav
        layout
        animate={isAtTop ? 'top' : 'scrolled'}
        variants={{
          top: {
            marginTop: 0,
            borderRadius: 0,
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderWidth: 0,
            borderColor: 'rgba(255,255,255,0)',
          },
          scrolled: {
            marginTop: 16,
            borderRadius: 9999,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.5)',
          },
        }}
        transition={{ layout: TRANSITION, ...TRANSITION }}
        style={{
          pointerEvents: 'auto',
          borderStyle: 'solid',
          width: isAtTop ? '100%' : undefined,
        }}
        className={
          isAtTop
            ? 'flex items-center justify-center sm:justify-between px-6 sm:px-10 lg:px-16 py-4 lg:py-5'
            : 'flex items-center px-4 lg:px-5 py-2 lg:py-2.5'
        }
      >
        {/* mode="wait": old content fades out first, THEN shape morphs, THEN new content fades in */}
        <AnimatePresence mode="wait" initial={false}>
          {isAtTop ? (
            <motion.div
              key="top-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.22, delay: 0.48 }}
              className="flex items-center justify-center sm:justify-between w-full"
            >
              {/* Logo */}
              <span className="hidden sm:block text-white font-bold text-sm lg:text-lg uppercase select-none whitespace-nowrap">
                Maulidiya Salsabila
              </span>

              {/* Menu — text links */}
              <ul className="flex items-center gap-1 sm:gap-2 lg:gap-4">
                {navItems.map((item) => {
                  const isActive = active === item.sectionId;
                  return (
                    <li key={item.href}>
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleClick(e, item)}
                        whileTap={{ scale: 0.93 }}
                        className={[
                          'relative text-[11px] sm:text-[13px] lg:text-[15px] font-semibold tracking-wide select-none transition-colors duration-200 px-3 lg:px-5 py-1.5 lg:py-2',
                          isActive ? 'text-white' : 'text-white/70 hover:text-white',
                        ].join(' ')}
                      >
                        {item.name}
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : (
            /* ── SCROLLED content ── */
            <motion.div
              key="scrolled-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.22, delay: 0.48 }}
              className="flex items-center gap-1 lg:gap-2"
            >
              {navItems.map((item) => {
                const isActive = active === item.sectionId;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleClick(e, item)}
                    whileTap={{ scale: 0.88 }}
                    className={[
                      'relative text-[10px] sm:text-[11px] lg:text-[13px] font-bold uppercase tracking-wider select-none transition-all duration-200 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full whitespace-nowrap',
                      isActive
                        ? 'text-white'
                        : 'text-white/80 hover:bg-white hover:text-black/60',
                    ].join(' ')}
                  >
                    {/* Sliding active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="scrolled-pill"
                        className="absolute inset-0 rounded-full bg-pink-400 shadow-md"
                        style={{ zIndex: -1 }}
                        transition={SPRING}
                      />
                    )}
                    {item.name}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
