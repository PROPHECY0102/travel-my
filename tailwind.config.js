/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{html,js}",
    "./kl/**/*.{html,js}",
    "./petronas_twin_towers/**/*.{html,js}",
    "./explore/**/*.{html,js}",
    "./itinerary/**/*.{html,js}",
    "./packages/**/*.{html,js}",
    "./information/**/*.{html,js}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
