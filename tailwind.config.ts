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
        hacien: {
          navy: "#071426",
          blue: "#1457d9",
          sky: "#37a7ff",
          slate: "#41516b",
          violet: "#5b4bff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
