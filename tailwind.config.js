/* eslint-disable */
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      DEFAULT: "0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    extend: {
      colors: {
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
