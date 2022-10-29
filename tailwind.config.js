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
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        mono: ["Space Mono", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        white: '#ffffff',
        headerWhite: '#ffffff65',
        disabledWhite: '#ffffff95',
        backgroundButton: '#F56184'
      }
    },
  },
  plugins: [],
}
