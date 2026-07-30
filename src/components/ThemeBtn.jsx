import { useContext, useEffect } from "react";
import { motion } from "motion/react";
import { Theme } from "../context/HeadingContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function ThemeBtn() {
  const { theme, setTheme } = useContext(Theme);
  const isDark = theme === "dark";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function handleToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="ios-fixed-chrome fixed bottom-24 right-5 z-50 flex h-8 w-16 items-center justify-between rounded-full border border-white/10 bg-hero-bg2/85 px-1.5 shadow-lg shadow-black/30 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 md:bottom-3"
    >
      <LightModeIcon
        sx={{ fontSize: 13 }}
        className={`transition-opacity duration-300 ${
          isDark ? "text-hero-muted/40" : "opacity-0"
        }`}
      />
      <DarkModeIcon
        sx={{ fontSize: 13 }}
        className={`transition-opacity duration-300 ${
          isDark ? "opacity-0" : "text-hero-muted/40"
        }`}
      />

      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br shadow-md ${
          isDark
            ? "right-1 from-hero-primary to-hero-secondary shadow-hero-primary/40"
            : "left-1 from-amber-300 to-orange-400 shadow-orange-400/40"
        }`}
      >
        {isDark ? (
          <DarkModeIcon sx={{ fontSize: 13 }} className="text-white" />
        ) : (
          <LightModeIcon sx={{ fontSize: 13 }} className="text-white" />
        )}
      </motion.span>
    </button>
  );
}

export default ThemeBtn;
