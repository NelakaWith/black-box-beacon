import sharedConfig from "@repo/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
};
