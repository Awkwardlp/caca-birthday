import React from 'react';
import { motion } from 'framer-motion';

export default function StoryScroll({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StoryScrollItem({ children, delay = 0, distance = 40, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
