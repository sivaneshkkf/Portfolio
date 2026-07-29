import { useState } from "react";
import { motion } from "motion/react";
import Tooltip from "@mui/material/Tooltip";
import { FadeIn } from "../varients/varientAnim";

function SocialButton({
  href,
  label,
  icon,
  brand,
  brandDark,
  delay = 0,
  surface = "adaptive",
}) {
  const [ripples, setRipples] = useState([]);
  const isDarkSurface = surface === "dark";

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: rect.width / 2 - size / 2, y: rect.height / 2 - size / 2, size },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
    >
      <Tooltip title={label} arrow>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={handleClick}
          style={{ "--brand": brand, "--brand-dark": brandDark || brand }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.94 }}
          className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full backdrop-blur-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
            isDarkSurface
              ? "border border-white/10 bg-white/5 text-hero-muted hover:border-[var(--brand-dark)]/50 hover:text-[var(--brand-dark)] hover:shadow-[0_0_18px_-2px_var(--brand-dark)]"
              : "border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 text-textpara dark:text-dark-textpara hover:border-[var(--brand)]/50 hover:text-[var(--brand)] hover:shadow-[0_0_18px_-2px_var(--brand)] dark:hover:text-[var(--brand-dark)] dark:hover:border-[var(--brand-dark)]/50"
          }`}
        >
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.4, scale: 0 }}
              animate={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="pointer-events-none absolute rounded-full bg-white/40"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
          <span className="relative z-10">{icon}</span>
        </motion.a>
      </Tooltip>
    </motion.div>
  );
}

export default SocialButton;
