/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 50px 25px -24px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [],
};
