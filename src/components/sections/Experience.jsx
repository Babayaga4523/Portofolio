'use client';

import { motion } from 'framer-motion';
import { experiences } from '../../lib/data/experience';
import SectionTag from '../ui/SectionTag';
import SectionHeading from '../ui/SectionHeading';
import { MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionTag>Experience</SectionTag>
          <SectionHeading className="mt-4">
            Professional <span className="text-gold italic">Journey</span>
          </SectionHeading>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            From internships to real-world projects, here&apos;s my professional journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold/30" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-cream shadow-md z-10">
                    <span className="absolute inset-0 rounded-full bg-gold animate-ping" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:text-right' : ''
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                      {/* Header */}
                      <div className={`flex flex-wrap items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${exp.type === 'work'
                            ? 'bg-gold/10 text-gold-dark'
                            : exp.type === 'education'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                          }
                        `}>
                          {exp.type === 'work' ? 'Work' : exp.type === 'education' ? 'Education' : 'Certificate'}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-light">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Company & Role */}
                      <h3 className="font-playfair text-xl font-semibold text-navy mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-text-muted font-medium mb-2">{exp.company}</p>
                      <p className="flex items-center gap-1 text-xs text-text-light mb-4">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </p>

                      {/* Description */}
                      <ul className={`space-y-2 mb-4 text-sm text-text-muted ${isLeft ? 'md:text-right' : ''}`}>
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gold mt-2 ${isLeft ? 'md:order-1 md:ml-2' : 'mr-2'}`} />
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-cream rounded-full text-xs text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}