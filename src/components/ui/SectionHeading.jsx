'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  children: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  children,
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`
        font-playfair font-semibold leading-tight
        text-3xl md:text-4xl lg:text-5xl
        ${light ? 'text-white' : 'text-navy'}
        ${className}
      `}
    >
      {children}
    </motion.h2>
  );
}