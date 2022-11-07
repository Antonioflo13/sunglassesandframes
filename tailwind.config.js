/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "23/100": "23%",
        "50/100": "50%",
        "100/100": "100%",
      },
      colors: {
        "sunglassesandframes-red": "#800000",
        "sunglassesandframes-grey": "#f0f0f0",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
    },
  },
  plugins: [],
};
