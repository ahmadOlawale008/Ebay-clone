/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#252422",
          primaryLight: "77746D",
          customPrimary: "#403D39",
          secondary: "#EB5E28",
          secondaryDark: "#983B17",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Montserrat", "sans-serif"],
        custom: ["Montserrat", "sans-serif"],
        petit: ["Petit Formal Script", "cursive"],
      },
    },
  },
  plugins: [],
};
