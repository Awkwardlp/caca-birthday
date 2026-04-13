import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Confetti from 'react-confetti';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import BirthdayDecorations, { WaveDivider } from './components/BirthdayDecorations';
import ScrollDecorations from './components/ScrollDecorations';
import Home from './components/sections/Home';
import Gift from './components/sections/Gift';
import Letter from './components/sections/Letter';
import Puzzle from './components/sections/Puzzle';
import Gallery from './components/sections/Gallery';
import Moments from './components/sections/Moments';
import Ending from './components/sections/Ending';
import data from './data.json';

function App() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root options={{
      lerp: 0.06,            // interpolation speed — lower = heavier (default: 0.1)
      wheelMultiplier: 0.4,  // scroll distance per wheel tick — lower = slower
      touchMultiplier: 0.5,  // same for touch/trackpad
      smoothWheel: true,
    }}>

      <div className="font-body text-slate-800 antialiased [overflow-x:clip] relative">

        {/* ── Layer 1: Animated gradient background (body CSS) ── */}
        {/* ── Layer 2: Ghost photo overlay ── */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}${data.backgroundPhoto}")`,
            backgroundSize: 'cover',
            backgroundPosition: '10% 39%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.55,
            filter: 'blur(3px) grayscale(30%)',
            mixBlendMode: 'luminosity',
            transform: 'scale(1.04) translateZ(0)', // hardware acceleration
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />

        {/* ── Layer 3: Vignette edge darkening ── */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        <Navbar />
        <MusicPlayer />
        <BirthdayDecorations />
        <ScrollDecorations />

        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <Confetti
              numberOfPieces={400}
              recycle={false}
              gravity={0.12}
              initialVelocityY={18}
              colors={['#a855f7', '#f472b6', '#fcd34d', '#60a5fa', '#34d399', '#fb923c', '#ffffff']}
            />
          </div>
        )}

        <main className="relative z-10">
          <Home />
          <WaveDivider />
          <Gift />
          <WaveDivider />
          <Puzzle />
          <WaveDivider flip={true} />
          <Letter />
          <WaveDivider />
          <Gallery />
          <WaveDivider />
          <Moments />
          <WaveDivider />
          <Ending />
        </main>

        <footer className="relative z-10 bg-white/10 backdrop-blur-xl text-white py-8 text-center border-t border-white/15">
          <p className="text-white/40 font-medium text-sm">© {new Date().getFullYear()} · Made with 🤍 by Angga Stwn</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
