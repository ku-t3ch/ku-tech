/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#07aeef",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
