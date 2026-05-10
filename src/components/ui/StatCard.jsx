'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  index?: number;
}

export default function StatCard({ value, label, index = 0 }: StatCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [displayValue, setDisplayValue] = useState('0');
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (inView) {
      // Simple counter animation
      const duration = 1500;
      const steps = 30;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
        const current = Math.round(eased * numericPart * 10) / 10;

        if (currentStep < steps) {
          setDisplayValue(numericPart % 1 === 0 ? current.toString() : current.toFixed(1));
        } else {
          setDisplayValue(numericPart % 1 === 0 ? numericPart.toString() : numericPart.toFixed(1));
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView, numericPart]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-cream rounded-2xl p-6 text-center hover:bg-cream-alt transition-colors"
    >
      <span className="block font-playfair text-4xl md:text-5xl font-semibold text-gold mb-2">
        {displayValue}{suffix}
      </span>
      <span className="text-sm text-text-muted">{label}</span>
    </motion.div>
  );
}