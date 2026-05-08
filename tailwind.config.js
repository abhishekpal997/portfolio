export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        dark: "#050816",
        glass: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.35)",
      },
    },
  },
  plugins: [],
};