import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // The "Beacon" colors - representing the signal in the dark
        beacon: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Primary Amber
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
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
