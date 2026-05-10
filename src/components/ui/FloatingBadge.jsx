'use client';

import { motion } from 'framer-motion';

export default function FloatingBadge({
  text,
  emoji,
  position,
  delay = 0,
  size = 'md',
}) {
  const positionClasses = {
    'top-right': '-top-5 -right-5',
    'top-left': '-top-5 -left-5',
    'bottom-right': '-bottom-5 -right-5',
    'bottom-left': '-bottom-10 -left-5',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      className={`
        absolute ${positionClasses[position]} z-20
        bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg
        flex items-center gap-2 whitespace-nowrap
        border border-white/80
        animate-float
        ${sizeClasses[size]}
      `}
    >
      {emoji && <span className="text-base leading-none">{emoji}</span>}
      <span className="font-semibold text-navy leading-none">{text}</span>
    </motion.div>
  );
}