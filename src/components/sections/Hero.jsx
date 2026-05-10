'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, FolderOpen, MapPin, GraduationCap } from 'lucide-react';
import { personalInfo, techLogos } from '../../lib/data/personal';
import GoldButton from '../ui/GoldButton';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' } },
});

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = `/${personalInfo.cvFile}`;
    link.download = personalInfo.cvFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { value: personalInfo.stats.projects, label: 'Projects' },
    { value: personalInfo.stats.gpa,      label: 'GPA' },
    { value: personalInfo.stats.yearsCoding, label: 'Yrs Coding' },
    { value: personalInfo.stats.certificates, label: 'Certificates' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-cream"
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-gold/12 via-gold/5 to-transparent translate-x-1/2 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-navy/5 to-transparent -translate-x-1/3 translate-y-1/3" />
        {/* Subtle grid dots */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(#1A1A2E 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ══════════════════════════════
              LEFT — Text content
          ══════════════════════════════ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className="order-2 lg:order-1 flex flex-col"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp(0)} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-gold-dark uppercase bg-gold/8 border border-gold/20 rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {personalInfo.tagline}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp(0.05)}
              className="font-playfair font-bold leading-[1.1] text-navy mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
            >
              Crafting Digital<br />
              <span className="text-gold italic">Experiences</span><br />
              That Matter
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              variants={fadeUp(0.1)}
              className="text-text-muted text-lg leading-relaxed mb-4 max-w-md"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* Location line */}
            <motion.div
              variants={fadeUp(0.12)}
              className="flex items-center gap-2 text-sm text-text-light mb-8"
            >
              <MapPin className="w-4 h-4 text-gold" />
              <span>{personalInfo.location}</span>
              <span className="w-1 h-1 rounded-full bg-text-light/40" />
              <GraduationCap className="w-4 h-4 text-gold" />
              <span>Universitas Gunadarma</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp(0.15)}
              className="flex flex-wrap gap-3 mb-10"
            >
              <GoldButton size="lg" onClick={scrollToProjects}>
                <FolderOpen className="w-5 h-5" />
                View My Work
              </GoldButton>
              <GoldButton size="lg" variant="outline" onClick={downloadCV}>
                <Download className="w-5 h-5" />
                Download CV
              </GoldButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp(0.18)}
              className="flex flex-wrap gap-6 pb-8 mb-8 border-b border-border-light"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-playfair text-2xl font-bold text-navy">{s.value}</span>
                  <span className="text-xs text-text-light mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Tech pills */}
            <motion.div variants={fadeUp(0.2)} className="flex flex-wrap gap-2">
              {techLogos.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-white/70 border border-border-light rounded-full text-xs text-text-muted hover:border-gold hover:text-gold transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════
              RIGHT — Profile photo
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative" style={{ width: 320 }}>

              {/* Gold glow blob behind photo */}
              <div
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 300, height: 300,
                  top: '10%', left: '50%', transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)',
                  zIndex: 0,
                }}
              />

              {/* Outer dashed decorative ring */}
              <div
                className="absolute rounded-[2rem] border border-dashed border-gold/25"
                style={{ inset: -18, zIndex: 1 }}
              />

              {/* Solid gold accent ring */}
              <div
                className="absolute rounded-[1.75rem] border border-gold/40"
                style={{ inset: -8, zIndex: 1 }}
              />

              {/* ─ Photo card ─ */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  zIndex: 2,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.16), 0 0 0 2px rgba(201,162,39,0.45)',
                }}
              >
                {/* 3:4 portrait ratio */}
                <div style={{ aspectRatio: '3/4' }}>
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: '42%',
                    background: 'linear-gradient(to top, rgba(26,26,46,0.78) 0%, transparent 100%)',
                  }}
                />

                {/* Name badge at bottom of photo */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"
                    style={{ boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy truncate leading-tight">{personalInfo.name}</p>
                    <p className="text-xs text-text-muted truncate leading-tight">{personalInfo.title}</p>
                  </div>
                </div>
              </div>

              {/* ─ Floating badge: top-right ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="absolute flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-border-light animate-float"
                style={{ top: 20, right: -24, zIndex: 10 }}
              >
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs font-bold text-navy leading-none">2+ Years</p>
                  <p className="text-xs text-text-muted leading-none mt-0.5">Experience</p>
                </div>
              </motion.div>

              {/* ─ Floating badge: left-middle ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="absolute flex items-center gap-2 bg-gold text-white rounded-2xl px-3 py-2 shadow-lg animate-float"
                style={{ top: '38%', left: -28, zIndex: 10, animationDelay: '0.6s' }}
              >
                <span className="text-lg">✦</span>
                <div>
                  <p className="text-xs font-bold leading-none">10+ Projects</p>
                  <p className="text-xs leading-none mt-0.5 opacity-80">Delivered</p>
                </div>
              </motion.div>

              {/* ─ Floating badge: bottom-right ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
                className="absolute flex items-center gap-2 bg-navy text-white rounded-2xl px-3 py-2 shadow-lg animate-float"
                style={{ bottom: 90, right: -24, zIndex: 10, animationDelay: '1.2s' }}
              >
                <span className="text-lg">🎓</span>
                <div>
                  <p className="text-xs font-bold leading-none">GPA 3.60</p>
                  <p className="text-xs leading-none mt-0.5 opacity-70">Gunadarma</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-text-light tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
