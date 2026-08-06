import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F7FB",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#0E1220",
          soft: "#4B5163",
          muted: "#7B8194",
        },
        brand: {
          50: "#EEF1F8",
          100: "#D6DCEE",
          200: "#AEB9DD",
          300: "#8695C9",
          400: "#5C6DAE",
          500: "#3B4C8C",
          600: "#2B3A6C",
          700: "#202C52",
          800: "#161E3A",
          900: "#0D1226",
        },
        coral: {
          50: "#FFF1EC",
          100: "#FFDCCE",
          200: "#FFB69A",
          300: "#FF9068",
          400: "#FF7A50",
          500: "#FF6B4A",
          600: "#E24F30",
          700: "#B93D24",
          800: "#8A2D1A",
          900: "#5C1E11",
        },
        teal: {
          50: "#E9FBF5",
          100: "#C6F3E3",
          200: "#8FE4C8",
          300: "#54D2AA",
          400: "#22BE8F",
          500: "#14A87C",
          600: "#0F8763",
          700: "#0B664C",
          800: "#084936",
          900: "#052E22",
        },
        line: "#E3E6EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,18,32,0.04), 0 8px 24px -12px rgba(14,18,32,0.12)",
        lift: "0 20px 40px -20px rgba(14,18,32,0.35)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, #E3E6EF 1px, transparent 1px), linear-gradient(to bottom, #E3E6EF 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "dash": {
          "to": { strokeDashoffset: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "dash": "dash 1.6s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
