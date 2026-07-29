import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FadeIn } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";

function AboutStatCard({ icon, value, suffix = "", label, delay = 0 }) {
  const { ref, inView } = useReveal({ amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setCount(value);
      return;
    }

    let frame;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -4 }}
      className="flex flex-col items-center text-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/15 to-hero-secondary/15 text-hero-primary">
        {icon}
      </span>
      <span className="font-manrope text-2xl sm:text-3xl font-extrabold text-textHead dark:text-dark-textHead">
        {count}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm font-medium text-textpara dark:text-dark-textpara">
        {label}
      </span>
    </motion.div>
  );
}

export default AboutStatCard;
