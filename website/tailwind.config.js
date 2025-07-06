/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        darkBg: "#12131a",
        darkCard: "#191a23",
        darkBorder: "#23243a",
        darkAccent: "#6366f1",
        darkAccent2: "#22d3ee",
        darkText: "#f4f4f5",
        darkSubtle: "#a1a1aa",
        glass: "rgba(30,34,54,0.7)",
      },
      boxShadow: {
        glass:
          "0 4px 32px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(80,80,255,0.04)",
        accent: "0 2px 24px 0 #6366f1aa",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)",
        "card-glass":
          "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.10) 100%)",
      },
    },
  },
  plugins: [],
};
