'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { personalInfo, navLinks } from '../../lib/data/personal';
import GoldButton from '../ui/GoldButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Collect all section positions
      const sectionIds = navLinks.map(link => link.href.replace('#', ''));
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12
          transition-all duration-300
          ${scrolled
            ? 'bg-cream/80 backdrop-blur-md border-b border-gold/15 shadow-sm py-3'
            : 'bg-transparent py-5'
          }
        `}
      >
        {/* Logo */}
        <motion.div
          className="cursor-pointer group"
          onClick={() => scrollTo('#home')}
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-playfair text-xl font-bold text-navy">
            {personalInfo.name}
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-sm px-2 py-1.5 rounded-full border border-border-light shadow-sm">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`
                  relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${isActive ? 'text-navy bg-gold/15' : 'text-text-muted hover:text-navy'}
                `}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Hire Me Button */}
        <div className="hidden md:block">
          <GoldButton
            size="sm"
            onClick={() => scrollTo('#contact')}
          >
            Hire Me
          </GoldButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 bg-white/80 rounded-lg border border-border-light shadow-sm"
        >
          <Menu className="w-6 h-6 text-navy" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-light">
                <span className="font-playfair text-base font-bold text-navy">
                  {personalInfo.name}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-cream rounded-lg hover:bg-cream-alt transition-colors"
                >
                  <X className="w-5 h-5 text-navy" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    className={`
                      relative text-left px-4 py-3 rounded-xl text-base font-medium transition-all
                      ${activeSection === link.href.replace('#', '')
                        ? 'text-navy bg-gold/10 border-l-2 border-gold'
                        : 'text-text-muted hover:bg-cream hover:text-navy'
                      }
                    `}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto p-4">
                <GoldButton
                  size="md"
                  className="w-full"
                  onClick={() => scrollTo('#contact')}
                >
                  Hire Me
                </GoldButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
