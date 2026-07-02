import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm espresso — replaces the old green-black "night" with a tone
        // that actually sits well against the building's brick and gold light.
        night: "#1B140F",
        nightSoft: "#2B2018",
        sand: "#F8F2E6",
        sandDeep: "#EDE0C6",
        clay: "#B4552F",
        clayDeep: "#8C4023",
        palm: "#2E6B44",
        palmDeep: "#1F4C31",
        gold: "#C89A46",
        goldSoft: "#E4C888",
        ivory: "#FBF8F1",
        // Togo flag red — reserved for flag/badge accents only, never as a
        // primary UI color, so it doesn't fight with the terracotta/gold palette.
        flagRed: "#D21034",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 20px 60px -20px rgba(27, 20, 15, 0.4)",
        glow: "0 0 0 1px rgba(200, 154, 70, 0.25), 0 20px 40px -16px rgba(27, 20, 15, 0.5)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        kenburns: "kenburns 6s ease-out forwards",
        pulseRing: "pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
