import { motion } from "motion/react";
import { FadeIn } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";

function QuickStatCard({ icon, text, delay = 0 }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -3 }}
      className="flex items-center gap-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-3.5 py-3 transition-shadow duration-300 hover:shadow-md"
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="text-xs font-medium leading-snug text-textpara dark:text-dark-textpara">
        {text}
      </span>
    </motion.div>
  );
}

export default QuickStatCard;
