'use client';

import { motion } from 'framer-motion';

interface SectionTagProps {
  children: string;
  light?: boolean;
  className?: string;
}

export default function SectionTag({
  children,
  light = false,
  className = '',
}: SectionTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        inline-block text-xs font-semibold tracking-widest uppercase
        ${light ? 'text-gold-light' : 'text-gold-dark'}
        ${className}
      `}
    >
      {children}
    </motion.span>
  );
}