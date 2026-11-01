import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#062956",
        deep: "#031B33",
        ocean: "#087F9B",
        teal: "#079B87",
        tealBright: "#0EC3A6",
        leaf: "#67AD59",
        gold: "#F6B727",
        goldDark: "#c7920f",
        mist: "#F5F7F9",
        ink: "#44566b",
        inkSoft: "#5b6b7a",
        hairline: "#e3e9ee",
        cardline: "#e6ecf1",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-baskerville)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1360px",
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
