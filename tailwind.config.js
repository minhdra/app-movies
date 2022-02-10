module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        'fit': 'repeat(auto-fit, minmax(250px,1fr))',
      }
    },
  },
  plugins: [],
}
