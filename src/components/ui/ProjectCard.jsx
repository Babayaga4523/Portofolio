'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const openModal = () => {
    setCurrentImg(0);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onClick={openModal}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-transparent hover:border-gold/20 transition-all duration-300 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-cream-alt">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tech Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-navy shadow-sm">
            {project.tech[0]}
          </div>

          {/* AI Badge */}
          {(project.title.includes('Rental') || project.title.includes('Computer Vision') || project.title.includes('AI')) && (
            <div className="absolute top-4 left-4 bg-gold/20 backdrop-blur-sm text-gold-dark px-3 py-1.5 rounded-full text-xs font-bold border border-gold/40">
              AI Powered
            </div>
          )}

          {/* Image count badge */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-navy/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {project.images.length} photos
            </div>
          )}

          {/* Arrow Icon on Hover */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-navy" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-playfair text-xl font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium text-text-muted bg-cream px-3 py-1 rounded-full border border-border-light group-hover:border-gold group-hover:text-gold transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-medium text-gold">+{project.tech.length - 3}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <a
              href="https://github.com/Babayaga4523"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </motion.div>

      {/* ─── PROJECT DETAIL MODAL ─── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(26,26,46,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── LEFT: Image Gallery ── */}
              <div
                className="relative bg-cream-alt flex-shrink-0 lg:w-[55%] overflow-hidden"
                style={{ maxHeight: 'min(45vh, 400px)' }}
              >
                <div className="w-full h-full relative" style={{ minHeight: 220 }}>
                  <img
                    src={project.images[currentImg]}
                    alt={`${project.title} screenshot ${currentImg + 1}`}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: 'min(45vh, 400px)', minHeight: 220 }}
                  />

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Nav Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImg}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-gold hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImg ? 'bg-gold w-5' : 'bg-white/70 w-1.5'}`}
                          />
                        ))}
                      </div>

                      {/* Image counter */}
                      <div className="absolute top-4 left-4 bg-navy/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {currentImg + 1}/{project.images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Content (always scrollable) ── */}
              <div className="flex-1 flex flex-col min-h-0 lg:max-h-[92vh]">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                  {/* Title & Description */}
                  <div className="mb-5">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                      {project.category === 'desktop' ? 'Desktop App' : 'Web Development'}
                    </span>
                    <h2 className="font-playfair text-xl lg:text-2xl font-bold text-navy mt-1 mb-3">
                      {project.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2.5">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-cream text-navy text-xs rounded-full border border-border-light font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Action Buttons at bottom */}
                <div className="flex-shrink-0 border-t border-border-light p-5 flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gold text-white rounded-full text-sm font-semibold hover:bg-gold-dark transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href="https://github.com/Babayaga4523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 border border-navy text-navy rounded-full text-sm font-semibold hover:bg-navy hover:text-white transition-colors ${project.link ? '' : 'flex-1'}`}
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

