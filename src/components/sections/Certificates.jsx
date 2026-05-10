'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import SectionTag from '../ui/SectionTag';
import SectionHeading from '../ui/SectionHeading';

const certificates = [
  {
    id: 1,
    title: 'Studi Independen Bersertifikat',
    issuer: 'Kampus Merdeka',
    image: '/certificates/studi independent.png',
    category: 'Program',
  },
  {
    id: 2,
    title: 'Stupen 2 - Studi Pendalaman',
    issuer: 'Kampus Merdeka',
    image: '/certificates/stupen 2.png',
    category: 'Program',
  },
  {
    id: 3,
    title: 'Aptitude Test',
    issuer: 'Professional Assessment',
    image: '/certificates/Aptitude Test.png',
    category: 'Assessment',
  },
  {
    id: 4,
    title: 'Building Website using HTML 5',
    issuer: 'Online Course',
    image: '/certificates/Building Website using HTML 5.png',
    category: 'Web Development',
  },
  {
    id: 5,
    title: 'Creating Business Intelligence',
    issuer: 'Online Course',
    image: '/certificates/Creating Business Intelligence.png',
    category: 'Data',
  },
  {
    id: 6,
    title: 'Data Preparation for Business Processes',
    issuer: 'Online Course',
    image: '/certificates/Data Preparation for Business Processes.png',
    category: 'Data',
  },
  {
    id: 7,
    title: 'Fundamental Desktop Programming',
    issuer: 'Online Course',
    image: '/certificates/FUNDAMENTAL DESKTOP PROGRAMMING.png',
    category: 'Programming',
  },
  {
    id: 8,
    title: 'Fundamental Networking',
    issuer: 'Online Course',
    image: '/certificates/FUNDAMENTAL NETWORKING.png',
    category: 'Networking',
  },
  {
    id: 9,
    title: 'Java for Intermediate',
    issuer: 'Online Course',
    image: '/certificates/JAVA FOR INTERMEDIATE.png',
    category: 'Programming',
  },
  {
    id: 10,
    title: 'Java Programming for Beginner',
    issuer: 'Online Course',
    image: '/certificates/JAVA PROGRAMMING FOR BEGINNER.png',
    category: 'Programming',
  },
  {
    id: 11,
    title: 'Local Area Network using Cisco Router',
    issuer: 'Online Course',
    image: '/certificates/LOCAL AREA NETWORK USING CISCO ROUTER.png',
    category: 'Networking',
  },
  {
    id: 12,
    title: 'Wide Area Network using Cisco Router',
    issuer: 'Online Course',
    image: '/certificates/WIDE AREA NETWORK USING CISCO ROUTER FOR INTERMEDIATE.png',
    category: 'Networking',
  },
  {
    id: 13,
    title: 'Figma Tools',
    issuer: 'Online Course',
    image: '/certificates/figmaa tools.png',
    category: 'Design',
  },
  {
    id: 14,
    title: 'Internet Connection',
    issuer: 'Online Course',
    image: '/certificates/internet connection.png',
    category: 'Networking',
  },
  {
    id: 15,
    title: 'Introduction to Figma',
    issuer: 'Online Course',
    image: '/certificates/introduction figma.png',
    category: 'Design',
  },
  {
    id: 16,
    title: 'Introduction to Looker Studio',
    issuer: 'Online Course',
    image: '/certificates/introduction looker studio.png',
    category: 'Data',
  },
];

const categoryColors = {
  Program: 'bg-gold/10 text-gold-dark border-gold/30',
  Assessment: 'bg-navy/10 text-navy border-navy/20',
  'Web Development': 'bg-blue-50 text-blue-700 border-blue-200',
  Data: 'bg-green-50 text-green-700 border-green-200',
  Programming: 'bg-purple-50 text-purple-700 border-purple-200',
  Networking: 'bg-orange-50 text-orange-700 border-orange-200',
  Design: 'bg-pink-50 text-pink-700 border-pink-200',
};

export default function Certificates() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openModal = (idx) => setSelectedIdx(idx);
  const closeModal = () => setSelectedIdx(null);
  const prev = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i - 1 + certificates.length) % certificates.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i + 1) % certificates.length);
  };

  const selected = selectedIdx !== null ? certificates[selectedIdx] : null;

  return (
    <section id="certificates" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionTag>Achievements</SectionTag>
          <SectionHeading className="mt-4">
            Licences &amp; <span className="text-gold italic">Certificates</span>
          </SectionHeading>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            {certificates.length}+ certificates across web development, networking, data, design, and programming.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => openModal(idx)}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-border-light hover:border-gold/30 transition-all duration-300 cursor-pointer"
            >
              {/* Certificate Thumbnail */}
              <div className="relative aspect-[4/3] bg-cream-alt overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                  <ExternalLink className="w-4 h-4 text-navy" />
                </div>

                {/* Award icon overlay */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gold/90 flex items-center justify-center shadow">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-2 ${categoryColors[cert.category] || 'bg-cream text-text-muted border-border-light'}`}
                >
                  {cert.category}
                </span>
                <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-text-light mt-1">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── CERTIFICATE MODAL ─── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(26,26,46,0.9)', backdropFilter: 'blur(8px)' }}
            onClick={closeModal}
          >
            <motion.div
              key="cert-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative bg-cream-alt">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full object-contain max-h-[65vh]"
                />

                {/* Close */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Prev / Next */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-navy/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {selectedIdx + 1} / {certificates.length}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-2 ${categoryColors[selected.category] || 'bg-cream text-text-muted border-border-light'}`}
                  >
                    {selected.category}
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-navy">{selected.title}</h3>
                  <p className="text-text-muted text-sm mt-1">{selected.issuer}</p>
                </div>
                <Award className="w-10 h-10 text-gold flex-shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
