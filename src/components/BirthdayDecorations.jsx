import React from 'react';
import { motion } from 'framer-motion';
import CanvasCursor from './CanvasCursor';

/* ─────────────────────────────────────────────────
   Wave Divider — kalem, subtle
──────────────────────────────────────────────────*/
export function WaveDivider({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''}`} style={{ height: '48px' }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill="rgba(255,255,255,0.10)"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main Export
──────────────────────────────────────────────────*/
export default function BirthdayDecorations() {
  return <CanvasCursor />;
}
