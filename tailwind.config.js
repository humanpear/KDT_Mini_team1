/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        basic: "0 0 10px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        brand: "#FF385C",
      },
    },
  },
  plugins: [],
};
