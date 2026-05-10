'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

// Define Skill type inline
interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
}

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedWidth(skill.percentage);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.percentage, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover border border-transparent hover:border-gold/20 transition-all duration-300 group"
    >
      {/* Skill Name & Level */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-navy group-hover:text-gold transition-colors">
          {skill.name}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full ${
          skill.level === 'Expert' ? 'bg-gold/20 text-gold-dark' :
          skill.level === 'Advanced' ? 'bg-green-100 text-green-700' :
          skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
          'bg-gray-100 text-gray-600'
        }`}>
          {skill.level}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-cream rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${animatedWidth}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>

      {/* Percentage */}
      <span className="text-xs text-text-muted">{skill.percentage}%</span>
    </motion.div>
  );
}
