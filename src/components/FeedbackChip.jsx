import { motion } from "framer-motion";

function FeedbackChip({ label, selected, onClick, delay = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-pressed={selected}
      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
        selected
          ? "border-transparent bg-gradient-to-r from-hero-primary to-hero-secondary text-white shadow-md shadow-hero-primary/30"
          : "border-white/10 bg-white/5 text-hero-muted hover:border-white/20 hover:text-hero-text"
      }`}
    >
      {label}
    </motion.button>
  );
}

export default FeedbackChip;
