import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";

function LearningChip({ name, svg, delay = 0 }) {
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -4 }}
      className="relative flex min-w-[120px] flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/15 bg-white/50 dark:bg-white/5 px-5 py-4 transition-colors duration-300 hover:border-hero-primary/50"
    >
      <span className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-hero-accent px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
        </span>
        Learning
      </span>
      <span
        className="h-8 w-8"
        dangerouslySetInnerHTML={{ __html: svg }}
      ></span>
      <span className="text-xs font-semibold text-textHead dark:text-dark-textHead">
        {name}
      </span>
    </motion.div>
  );
}

export default LearningChip;
