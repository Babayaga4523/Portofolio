/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* ── CREATIVE COLOR SYSTEM ───────────────── */
      colors: {
        surface: {
          DEFAULT:  '#0B0B10',
          dim:      '#07070A',
          bright:   '#13131A',
          container:'#161622',
          card:     '#1A1A28',
          glass:    'rgba(22, 22, 34, 0.75)',
        },
        brand: {
          violet:  '#8B5CF6',
          fuchsia: '#D946EF',
          cyan:    '#06B6D4',
          pink:    '#EC4899',
          indigo:  '#6366F1',
        },
        'on-surface': '#FAFAFA',
        'on-surface-variant': 'rgba(250,250,250,0.7)',
        'on-surface-muted': 'rgba(250,250,250,0.45)',
        outline: 'rgba(255,255,255,0.12)',
        'outline-subtle': 'rgba(255,255,255,0.06)',
      },

      /* ── TYPOGRAPHY ─────────────────────────── */
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      /* ── CREATIVE SHADOWS & GLOWS ───────────── */
      boxShadow: {
        glow: '0 0 50px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 50px rgba(236, 72, 153, 0.3)',
        'glow-cyan': '0 0 50px rgba(6, 182, 212, 0.3)',
        card: '0 10px 40px rgba(0,0,0,0.6)',
      },

      /* ── CREATIVE ANIMATIONS ─────────────────── */
      animation: {
        'fade-in':     'fadeIn 0.6s cubic-bezier(0,0,0.2,1) both',
        'slide-up':    'slideUp 0.7s cubic-bezier(0,0,0.2,1) both',
        'float-slow':  'floatSlow 6s ease-in-out infinite',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'marquee-left':  'marqueeLeft 28s linear infinite',
        'marquee-right': 'marqueeRight 32s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        floatSlow: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        glowPulse: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
        marqueeLeft: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeRight: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}