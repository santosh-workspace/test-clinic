import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13231F",
        paper: "#F1F4F2",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#1F4D43",
          dark: "#123028",
          light: "#2E6B5D",
        },
        accent: {
          DEFAULT: "#C98A2C",
          dark: "#A8721F",
        },
        line: "#D8DDD9",
        muted: "#5B6864",
        success: "#3F7D58",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        card: "0.875rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(19,35,31,0.04), 0 8px 24px rgba(19,35,31,0.06)",
      },
      keyframes: {
        drawArc: {
          "0%": { strokeDashoffset: "340" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "draw-arc": "drawArc 1.6s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
