import { motion } from "framer-motion";
import { FadeIn } from "../../varients/varientAnim";
import { useReveal } from "../../hooks/useReveal";

function ChartCard({ title, subtitle, action, children, delay = 0, className = "" }) {
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`rounded-[20px] border border-black/5 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-6 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-manrope text-base font-bold text-textHead dark:text-hero-text sm:text-lg">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-textpara dark:text-hero-muted">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

export default ChartCard;
