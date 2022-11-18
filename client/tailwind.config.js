/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        mono: ["Share Tech Mono", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '',
        secondary: '#EEF2F5',
        white: '#ffffff',
        dark: '#1D1D29',
        grey: '#d6dadd',
        yellow: '#E8D96B',
        blue: '#5A3BF8',
        red: '#E44050',
        pink: '#ffd1f3',
        peach: '#D17F82',
        purple: '#D1D1FF',
        input: '#f8f8f8',
        border: '#e8e7e7',
        cardBorder: '#e1e1e1',
        headerWhite: '#ffffff65',
        disabledWhite: '#ffff'
      },
      boxShadow: {
        xl: 'rgba(108, 108, 112, 0.05) 0px 7px 29px 0px' ,
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
}
