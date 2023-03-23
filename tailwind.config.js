module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: 'Pacifico',
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      screens: {
        xsm: '370px',
      },
    },
  },
  plugins: [],
};
