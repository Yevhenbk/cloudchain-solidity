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
        dark: '#1D1D29',
        headerWhite: '#ffffff65',
        disabledWhite: '#ffffff95',
        backgroundButton: '#471932',
        grey: '#d6dadd',
        gold: '#EBDD74',
        goldShadow: '#D4B629'
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
