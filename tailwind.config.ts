import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        grey: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          600: "#525252",
          700: "#404040",
        },
        blue: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          tint: "#EFF6FF",
        },
        success: {
          DEFAULT: "#15803D",
          bg: "#F0FDF4",
        },
        warning: {
          DEFAULT: "#B45309",
          bg: "#FFFBEB",
        },
        danger: {
          DEFAULT: "#B91C1C",
          bg: "#FEF2F2",
        },
        // Legacy aliases → brand tokens
        hacien: {
          navy: "#0A0A0A",
          blue: "#2563EB",
          sky: "#2563EB",
          slate: "#525252",
          violet: "#2563EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['var(--font-archivo-black)', '"Archivo Black"', "Archivo", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "6px",
        xl: "6px",
        "2xl": "6px",
        "3xl": "6px",
      },
    },
  },
  plugins: [],
};

export default config;
