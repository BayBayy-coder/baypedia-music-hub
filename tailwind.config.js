/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8f3',
          100: '#e6ede0',
          300: '#c5dcb6',
          500: '#8aa38b',
          600: '#6d876e',
          700: '#556d56',
          800: '#425742',
          900: '#2a3d2a',
          accent: '#8aa38b',
          gold: '#d4b5a0',
          emerald: '#8aa38b'
        },
        dark: {
          bg: '#0a0a0b',
          surface: '#121213',
          card: '#18181a',
          border: '#262628',
          hover: '#202022'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
