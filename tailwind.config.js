/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B",
        secondary: "#fb923c",
      },
    },
  },
  plugins: [],
};
