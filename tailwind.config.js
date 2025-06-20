const { plugin } = require("postcss");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwind-scrollbar")],
  theme: {
    extend: {},
  },
};
