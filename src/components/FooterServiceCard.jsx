import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";

function FooterServiceCard({ icon, title, delay = 0 }) {
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -4 }}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3.5 transition-shadow duration-300 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.5)]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/20 to-hero-secondary/20 text-base">
        {icon}
      </span>
      <span className="text-xs font-semibold text-hero-text">{title}</span>
    </motion.div>
  );
}

export default FooterServiceCard;
