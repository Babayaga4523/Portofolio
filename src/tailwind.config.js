/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sahara Editorial Minimalism Design System
        primary: {
          DEFAULT: '#c2652a',
          light: '#d4784a',
          dark: '#a54f1e',
        },
        secondary: {
          DEFAULT: '#bd5b39',
          light: '#d4724f',
          dark: '#9e4429',
        },
        surface: {
          DEFAULT: '#fff8f6',
          dim: '#e9d6d1',
          bright: '#faf7f5',
        },
        background: '#fff8f6',
        'on-surface': '#1a110e',
        'on-surface-variant': '#4a3f38',
        'on-surface-muted': '#8a7a72',
        outline: '#e1d0cb',
        'outline-variant': '#f0e9e5',
      },
      fontFamily: {
        display: ['EB Garamond', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
}
