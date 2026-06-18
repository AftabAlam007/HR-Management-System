
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",                // Scans index.html for Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}",  // Scans all JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'rgb-text-glow': 'rgb-text-glow 2s linear infinite',
        'rgb-blink': 'rgb-blink 1.5s linear infinite',
        'rgb-border-glow': 'rgb-border-glow 4s linear infinite',
        'icon-blink': 'icon-blink 2s ease-in-out infinite',
      },
      keyframes: {
        'rgb-text-glow': {
          '0%, 100%': { textShadow: '0 0 3px #059669, 0 0 5px #06b6d4' },
          '33%': { textShadow: '0 0 3px #ec4899, 0 0 5px #f97316' },
          '66%': { textShadow: '0 0 3px #8b5cf6, 0 0 5px #3b82f6' },
        },
        'rgb-blink': {
          '0%, 100%': { boxShadow: '0 0 15px #064e3b, 0 0 30px #1e3a8a', textShadow: '0 0 5px #064e3b, 0 0 10px #1e3a8a', backgroundImage: 'linear-gradient(to right, #ec4899, #eab308)', color: '#ffffff' },
          '33%': { boxShadow: '0 0 15px #831843, 0 0 30px #7c2d12', textShadow: '0 0 5px #831843, 0 0 10px #7c2d12', backgroundImage: 'linear-gradient(to right, #eab308, #ec4899)', color: '#ffffff' },
          '66%': { boxShadow: '0 0 15px #4c1d95, 0 0 30px #1e3a8a', textShadow: '0 0 5px #4c1d95, 0 0 10px #1e3a8a', backgroundImage: 'linear-gradient(to right, #ec4899, #eab308)', color: '#ffffff' },
        },
        'rgb-border-glow': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(5, 150, 105, 0.6)' },
            '25%': { boxShadow: '0 0 12px 2px rgba(236, 72, 153, 0.6)' },
            '50%': { boxShadow: '0 0 10px 2px rgba(234, 179, 8, 0.6)' },
            '75%': { boxShadow: '0 0 12px 2px rgba(139, 92, 246, 0.6)' },
        },
        'icon-blink': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.7, transform: 'scale(0.9)' },
        }
      }
    },
  },
  plugins: [],
};