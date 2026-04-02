import React from 'react';

export default function FlowerVector({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <defs>
        <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(255,255,255,0.6)" />
        </filter>
      </defs>
      <g filter="url(#vectorGlow)">
        {/* 6 Elegant Line-Art Petals */}
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            {/* Outline petal */}
            <path
              d="M50 42 C 30 25, 35 5, 50 2 C 65 5, 70 25, 50 42"
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner detail line */}
            <path
              d="M50 42 L 50 20"
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tiny accent dot */}
            <circle cx="50" cy="12" r="1" fill="#ffffff" />
          </g>
        ))}
        {/* Center Ring */}
        <circle cx="50" cy="50" r="8" stroke="#ffffff" strokeWidth="1" fill="none" />
        {/* Center Dot */}
        <circle cx="50" cy="50" r="3" fill="#ffffff" />
      </g>
    </svg>
  );
}
