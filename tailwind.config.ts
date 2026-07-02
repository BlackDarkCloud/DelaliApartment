import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#12172B",
        nightdeep: "#0B0E1D",
        clay: "#C1502E",
        clayDark: "#8F3A20",
        gold: "#E3A857",
        goldSoft: "#F2CE93",
        lagoon: "#1F6F5C",
        sand: "#F3E9DA",
        sandDim: "#CBBFA9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "dusk-gradient":
          "linear-gradient(180deg, #0B0E1D 0%, #12172B 45%, #1A2036 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
