import { useState } from "react";
import { motion } from "framer-motion";

function BtnForm({ text, className = "", loading, onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      {
        id,
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
    onClick && onClick(e);
  };

  return (
    <motion.button
      type="submit"
      onClick={handleClick}
      disabled={loading}
      whileHover={!loading ? { y: -2, scale: 1.01 } : {}}
      whileTap={{ scale: 0.97 }}
      className={`relative mx-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-hero-primary to-hero-secondary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hero-primary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-hero-secondary/40 disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.4, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        ></motion.span>
      ))}

      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Submitting...
        </>
      ) : (
        text
      )}
    </motion.button>
  );
}

export default BtnForm;
