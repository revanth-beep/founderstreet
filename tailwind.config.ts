import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // LEK-inspired Forest Green palette
        green: {
          950: "#0A1F16",
          900: "#1B4332",
          800: "#2D6A4F",
          700: "#40916C",
          600: "#52B788",
          500: "#74C69D",
          400: "#95D5B2",
          300: "#B7E4C7",
          200: "#D8F3DC",
          100: "#EDFAF2",
        },
        grey: {
          950: "#0A0A0A",
          900: "#1A1A1A",
          800: "#2C2C2C",
          700: "#4A4A4A",
          600: "#6B6B6B",
          500: "#8A8A8A",
          400: "#ABABAB",
          300: "#C9C9C9",
          200: "#E0E0DC",
          100: "#F0F0ED",
          50:  "#FAFAF8",
        },
        // Semantic tokens
        primary: {
          DEFAULT: "#1B4332",
          foreground: "#FFFFFF",
          light: "#2D6A4F",
          lighter: "#40916C",
        },
        background: {
          DEFAULT: "#FAFAF8",
          secondary: "#F0F0ED",
          dark: "#0A1F16",
          card: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#1A1A1A",
          muted: "#6B6B6B",
          subtle: "#8A8A8A",
        },
        border: {
          DEFAULT: "#E0E0DC",
          dark: "#2C2C2C",
        },
        accent: {
          DEFAULT: "#40916C",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, hsla(159, 44%, 25%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(159, 44%, 35%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(159, 44%, 20%, 0.08) 0px, transparent 50%)",
        "dot-pattern": "radial-gradient(circle, #D8F3DC 1px, transparent 1px)",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.06)",
        "strong": "0 20px 60px -10px rgba(0, 0, 0, 0.15)",
        "green-glow": "0 4px 20px rgba(27, 67, 50, 0.2)",
        "green-glow-lg": "0 8px 40px rgba(27, 67, 50, 0.25)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
