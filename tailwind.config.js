/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f1ea',
          100: '#ece3d6',
          500: '#c4a574',
          600: '#a8895c',
          700: '#8a6e48',
          900: '#2a241c',
          accent: '#c4a574',
          gold: '#c4a574',
          emerald: '#8aa38b'
        },
        dark: {
          bg: '#0c0b0a',
          surface: '#141312',
          card: '#1b1a18',
          border: '#2a2926',
          hover: '#22211e'
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
