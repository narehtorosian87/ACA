/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand color — sage green. Change these five/six weights
        // and the whole site's primary color updates everywhere at once.
        primary: {
          50: "#f4f6f1",
          100: "#e6ebdf",
          200: "#d2ddc4",
          300: "#b9c9a5",
          400: "#9fb388",
          500: "#8a9a80",
          600: "#708266",
          700: "#5f7057",
          800: "#4a5844",
          900: "#384333",
        },
        // Secondary / accent color — warm clay, used sparingly for emphasis.
        secondary: {
          50: "#fbf1ec",
          100: "#f5ddd1",
          200: "#ecc0a9",
          300: "#dfa080",
          400: "#d08d68",
          500: "#c1785a",
          600: "#a86449",
          700: "#a15f45",
          800: "#7c4a37",
          900: "#5e392a",
        },
        // Neutral scale — warm cream through ink, used for backgrounds,
        // borders, and text instead of pure black/white/gray.
        sand: {
          50: "#faf8f4",
          100: "#f7f4ee",
          200: "#efe9dc",
          300: "#ded6c3",
          400: "#c2b8a3",
          500: "#a49a86",
          600: "#857c6b",
          700: "#6d6a62",
          800: "#4c493f",
          900: "#3d3a34",
        },
      },
      fontFamily: {
        heading: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        body: ["Jost", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(61, 58, 52, 0.08)",
      },
      borderRadius: {
        xl2: "18px",
      },
      maxWidth: {
        content: "1080px",
      },
    },
  },
  plugins: [],
};
