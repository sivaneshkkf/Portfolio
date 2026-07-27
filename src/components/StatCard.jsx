import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";

function StatCard({ icon, value, label, delay = 0 }) {
  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md transition-colors duration-300 hover:border-hero-primary/40 sm:px-5 sm:py-4"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/20 to-hero-secondary/20 text-hero-accent">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-manrope text-lg font-extrabold text-hero-text sm:text-xl">
          {value}
        </span>
        <span className="text-[11px] font-medium text-hero-muted sm:text-xs">
          {label}
        </span>
      </span>
    </motion.div>
  );
}

export default StatCard;
