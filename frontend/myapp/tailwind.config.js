/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#252422",
          light: "#43413e",
          dark: "#0d0d0c",
        },
        secondary: {
          DEFAULT: "#EB5E28",
          light: "#f45a16",
          dark: "#e34d0b",
        },
        assets: {
          dark: {
            background: "#0C0C0C",
            text: "#151515",
          }
        },
      },
      fontFamily: {
        sans: ["Manrope", "Calbri", "Arial", "sans-serif"],
        serif: ["Noto Serif", "serif"],
        cursive: ["Great Vibes", "cursive"],
        custom: ["Calibri", "Open Sans", "sans-serif"],
        customB: ["Open Sans", "sans-serif"],
      },
    },
  },
  // plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [],
  // },
};
