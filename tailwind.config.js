module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      screens: {
        xsm: '370px',
      },
      colors: {
        secondary: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#dadadd',
          300: '#b9b9c0',
          400: '#93949d',
          500: '#767781',
          600: '#5f5f6a',
          700: '#52525b',
          800: '#434349',
          900: '#3a3a40',
        },
      },
    },
  },
  plugins: [],
};
