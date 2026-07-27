import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";

function StatCard({ icon, value, label, delay = 0 }) {
  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
      whileHover={{ y: -4 }}
      className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md transition-colors duration-300 hover:border-hero-primary/40 sm:gap-2.5 sm:px-3 sm:py-2"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-hero-primary/20 to-hero-secondary/20 text-hero-accent sm:h-7 sm:w-7">
        {icon}
      </span>
      <span className="flex flex-col justify-center leading-tight">
        <span className="whitespace-nowrap font-manrope text-sm font-extrabold text-hero-text sm:text-base">
          {value}
        </span>
        <span className="w-fit whitespace-nowrap text-[9px] font-medium text-hero-muted sm:text-[10px]">
          {label}
        </span>
      </span>
    </motion.div>
  );
}

export default StatCard;
