import { icon } from "@fortawesome/fontawesome-svg-core";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9FAFB",
        secondary: "#E3E9F0",
        accent: "#FF0051",
        textHead: "#1F3F4A",
        textpara: "#7E919A",
        gradient1: "rgba(37,46,58,0.8)",
        gradient2: "rgba(55,72,92,0.95)",
        icon: "#A5A7A9",
        codingBg: "#FFFFFF",
        codingOuterBg: "#E3E9F0",
        codingTextBase: "#616161",
        codingTextHl: "#96261E",
        dark: {
          primary: "#212428",
          secondary: "#333333",
          accent: "#FF0051",
          textHead: "#E4E3E3",
          textpara: "#7E7E7E",
          gradient1: "rgb(52, 52, 52,0.8)",
          gradient2: "rgba(63, 63, 63,0.95)",
          icon: "#626668",
          codingBg: "#1F1F1F",
          codingOuterBg: "#212428",
          codingTextBase: "#86DAFA",
          codingTextHl: "#C5854C",
        },
        hero: {
          bg: "#0F172A",
          bg2: "#111827",
          bg3: "#1E293B",
          primary: "#3B82F6",
          secondary: "#8B5CF6",
          accent: "#06B6D4",
          success: "#22C55E",
          text: "#F8FAFC",
          muted: "#94A3B8",
        },
      },

      fontFamily: {
        poppins: "Poppins, sans-serif",
        manrope: ["Manrope", "sans-serif"],
      },

      boxShadow: {
        cardShadow:
          "2px 2px 25px rgba(0, 0, 0, 0.1), 2px 2px 25px rgba(0, 0, 0, 0.05)",
      },

      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 25px) scale(0.95)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        floatYSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "75%": { opacity: 0 },
          "100%": { transform: "translateY(14px)", opacity: 0 },
        },
      },
      animation: {
        blob: "blob 12s infinite ease-in-out",
        blobSlow: "blob 16s infinite ease-in-out",
        float: "floatY 6s ease-in-out infinite",
        "float-slow": "floatYSlow 8s ease-in-out infinite",
        "scroll-dot": "scrollDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
