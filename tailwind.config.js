// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinScale: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.3)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      animation: {
        'spin-scale': 'spinScale 2s ease-in-out',
      },
    },
  },
  plugins: [],
};
