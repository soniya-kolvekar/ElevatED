/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eggshell: "#faf3dd",
        jungle: "#4a7c59",
        mutedTeal: "#528a7e",
        tropicalTeal: "#006d77",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      }
    },
  },
  plugins: [],
};
