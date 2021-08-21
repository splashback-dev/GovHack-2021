module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        blue: {
          dark: '#001529'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
