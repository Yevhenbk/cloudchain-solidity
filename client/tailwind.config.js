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
        white: '#ffffff',
        secondary: '#EEF2F5',
        dark: '#1D1D29',
        input: 'rgb(248, 248, 248)',
        headerWhite: '#ffffff65',
        disabledWhite: '#ffff',
        backgroundButton: '#471932',
        grey: '#d6dadd',
        gold: '#EBDD74',
        goldShadow: '#D4B629'
      },
      boxShadow: {
        xl: 'rgba(108, 108, 112, 0.05) 0px 7px 29px 0px' ,
        inner: 'inset 0 -7px 9px -7px rgba(0,0,0,0.3)'
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
