'use client';

import { personalInfo } from '../../lib/data/personal';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-playfair text-white/50 text-sm">
          {personalInfo.name}
        </span>
        <span className="text-white/30 text-sm">
          {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  );
}
