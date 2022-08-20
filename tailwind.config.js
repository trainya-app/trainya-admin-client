/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#EBF2FF',
          200: '#D6E4FF',
          300: '#99C0FF',
          400: '#478EFF',
          500: '#2176FF',
          600: '#005EF5',
          700: '#00378F',
          800: '#001F52',
          900: '#001029',
        },
        gray: {
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#6C757D',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171932',
        },
        red: {
          50: '#FFF5F5',
          500: '#EF233C',
        },
        green: {
          50: '#F0FFF4',
          500: '#05CA77',
        },
        orange: {
          50: '#FFFAF0',
          500: '#F4A52D',
        },
      },
    },
  },
  plugins: [],
};
