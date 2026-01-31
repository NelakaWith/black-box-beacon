import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // The "Beacon" colors - representing the signal in the dark
        beacon: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Primary Signal Blue (Sky 500)
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // The "Black Box" colors - the sturdy, dark foundation
        background: "#0a0a0a", // Deeper than standard neutral-950
        surface: "#171717",
        border: "#262626",
      },
      fontFamily: {
        // Mono for that "Flight Recorder / Terminal" feel
        mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
