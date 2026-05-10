'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles } from 'lucide-react';
import { personalInfo } from '../../lib/data/personal';
import StatCard from '../ui/StatCard';
import SectionTag from '../ui/SectionTag';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const valueIcons = {
    zap: <Zap className="w-6 h-6 text-gold" />,
    shield: <Shield className="w-6 h-6 text-gold" />,
    sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionTag>About Me</SectionTag>
          <SectionHeading className="mt-4">
            Turning Complex Problems Into
            <br />
            <span className="text-gold italic">Elegant Solutions</span>
          </SectionHeading>
        </div>

        <div className="grid lg:grid-cols-[40fr_60fr] gap-12 lg:gap-16 items-start">
          {/* LEFT - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-cream rounded-3xl p-8 aspect-square flex items-center justify-center">
              {/* Geometric abstract representation */}
              <div className="relative w-full h-full">
                {/* Gold circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gold to-gold-dark opacity-20" />
                </div>
                {/* Code bracket representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-playfair text-8xl text-gold/30 font-bold">{'{'}</span>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-gold/10" />
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gold/10" />
                <div className="absolute top-1/3 left-4 w-8 h-8 rounded-full bg-gold/20" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Bio */}
            <div className="mb-10">
              <h3 className="font-playfair text-2xl font-semibold text-navy mb-4">
                Who Am I?
              </h3>
              <p className="text-text-muted leading-relaxed mb-4">
                {personalInfo.bio}
              </p>
              <p className="text-text-muted leading-relaxed">
                {personalInfo.currentRole}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <StatCard value="10+" label="Projects" index={0} />
              <StatCard value="2+" label="Years Coding" index={1} />
              <StatCard value="15+" label="Tech Stack" index={2} />
            </div>

            {/* Values */}
            <div>
              <h4 className="text-sm font-semibold text-text-light uppercase tracking-wider mb-4">
                Core Values
              </h4>
              <div className="flex flex-wrap gap-4">
                {personalInfo.values.map((value, index) => (
                  <motion.div
                    key={value.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-cream px-4 py-3 rounded-xl"
                  >
                    {valueIcons[value.icon]}
                    <div>
                      <span className="block text-sm font-medium text-navy">
                        {value.label}
                      </span>
                      <span className="text-xs text-text-light">
                        {value.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}