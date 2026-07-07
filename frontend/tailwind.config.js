/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18212f",
        mint: "#0f766e",
        coral: "#e76f51"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(24, 33, 47, 0.08)"
      }
    }
  },
  plugins: []
};
