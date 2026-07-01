import type { Config } from "tailwindcss";

/**
 * Palette derived from the IC Robotics logo:
 *  - brand  = the logo blues (deep #0a5ca0 · mid #489ae8 · light #95cefc/#aed5f1)
 *  - accent = the logo yellow ring (#fff200 / #f4f24f)
 *  - grape  = a rich indigo-blue used as the gradient partner to brand
 *  - flag   = the logo red pop (#ff002b / #890326) for small highlights
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        brand: {
          50: "#edf6fd",
          100: "#d3e9fb",
          200: "#aed5f1",
          300: "#86c3f2",
          400: "#4c99e3",
          500: "#2b83db",
          600: "#1a6cc0",
          700: "#0a5ca0",
          800: "#0b4a80",
          900: "#0d3d69",
        },
        accent: {
          50: "#fffdea",
          100: "#fff8b8",
          200: "#fff180",
          300: "#ffe94f",
          400: "#ffde12",
          500: "#f5c400",
          600: "#d19a00",
          700: "#a67400",
        },
        grape: {
          50: "#eaf0fb",
          100: "#cfddf7",
          200: "#a6bdee",
          300: "#7897e2",
          400: "#4a6bd2",
          500: "#2b4fb8",
          600: "#1a3d97",
          700: "#122e72",
        },
        flag: {
          50: "#fff0f2",
          100: "#ffd6dc",
          200: "#ffadb9",
          300: "#ff7488",
          400: "#ff3355",
          500: "#ff002b",
          600: "#c40021",
          700: "#890326",
        },
        ink: "#0d1b34",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(10, 92, 160, 0.20)",
        glow: "0 0 60px -10px rgba(43, 79, 184, 0.35)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(8deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
