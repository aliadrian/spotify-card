module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backfaceVisibility: {
        hidden: "hidden",
      },
      animationDelay: {
        200: '0.2s',
        400: '0.4s',
        600: '0.6s',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-200': { 'animation-delay': '0.2s' },
        '.animation-delay-400': { 'animation-delay': '0.4s' },
        '.animation-delay-600': { 'animation-delay': '0.6s' },
      });
    }
  ],
};