/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: '#0B3D38',
          dark: '#072E2A',
          light: '#A8C5C2',
        },
        gold: {
          DEFAULT: '#E8A820',
          light: '#F0C050',
          dark: '#C8881A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(245, 197, 24, 0.4), 0 0 20px rgba(245, 197, 24, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(245, 197, 24, 0.6), 0 0 40px rgba(245, 197, 24, 0.3)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
