/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        'cream-alt': '#F5F0E8',
        gold: '#C9A227',
        'gold-light': '#E8C85A',
        'gold-dark': '#9B7A1A',
        navy: '#1A1A2E',
        'navy-mid': '#2D2D4E',
        'text-muted': '#4A4A6A',
        'text-light': '#8A8AA8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
