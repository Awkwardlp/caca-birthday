import React from 'react';

export default function FlowerVector({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 3D gradient — light source from top-left */}
        <radialGradient id="loveGrad3D" cx="38%" cy="32%" r="62%" fx="38%" fy="32%">
          <stop offset="0%" stopColor="#ffd6e8" />   {/* highlight */}
          <stop offset="35%" stopColor="#ffadd6" />   {/* light pink */}
          <stop offset="70%" stopColor="#f472b6" />   {/* mid pink */}
          <stop offset="100%" stopColor="#be185d" />   {/* deep shadow */}
        </radialGradient>

        {/* Soft inner shadow for depth */}
        <radialGradient id="loveShadow" cx="55%" cy="68%" r="55%">
          <stop offset="0%" stopColor="#be185d" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#be185d" stopOpacity="0" />
        </radialGradient>

        {/* Specular highlight */}
        <radialGradient id="loveSpec" cx="34%" cy="28%" r="28%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <filter id="loveDrop" x="-15%" y="-15%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000ff" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#loveDrop)">
        {/* Main heart shape — filled with 3D gradient */}
        <path
          d="M50 80
             C 20 62, 6 46, 6 31
             C 6 17, 16 8, 28 8
             C 37 8, 44 13, 50 20
             C 56 13, 63 8, 72 8
             C 84 8, 94 17, 94 31
             C 94 46, 80 62, 50 80 Z"
          fill="url(#loveGrad3D)"
        />

        {/* Inner shadow for bottom depth */}
        <path
          d="M50 80
             C 20 62, 6 46, 6 31
             C 6 17, 16 8, 28 8
             C 37 8, 44 13, 50 20
             C 56 13, 63 8, 72 8
             C 84 8, 94 17, 94 31
             C 94 46, 80 62, 50 80 Z"
          fill="url(#loveShadow)"
        />

        {/* Specular gloss — top-left shine */}
        <path
          d="M50 80
             C 20 62, 6 46, 6 31
             C 6 17, 16 8, 28 8
             C 37 8, 44 13, 50 20
             C 56 13, 63 8, 72 8
             C 84 8, 94 17, 94 31
             C 94 46, 80 62, 50 80 Z"
          fill="url(#loveSpec)"
        />

        {/* Thin rim light on left edge */}
        <path
          d="M28 8 C 16 8, 6 17, 6 31 C 6 42, 14 53, 26 63"
          fill="none"
          stroke="#fce7f3"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Small sharp highlight dot */}
        <ellipse cx="34" cy="23" rx="6" ry="4" fill="white" opacity="0.38" transform="rotate(-20 34 23)" />
      </g>
    </svg>
  );
}
