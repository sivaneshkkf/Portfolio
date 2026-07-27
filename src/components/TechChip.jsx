import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";

function TechChip({ children, delay = 0 }) {
  return (
    <motion.span
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -3, scale: 1.06 }}
      className="inline-flex items-center rounded-full border border-black/5 dark:border-white/10 bg-gradient-to-r from-hero-primary/10 via-hero-secondary/10 to-hero-accent/10 px-4 py-2 text-xs sm:text-sm font-semibold text-textHead dark:text-dark-textHead transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] cursor-default"
    >
      {children}
    </motion.span>
  );
}

export default TechChip;
