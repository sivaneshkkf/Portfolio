import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { FadeIn } from "../../varients/varientAnim";

const KPI_THEMES = {
  blue: {
    bar: "from-[#3B82F6] to-[#60A5FA]",
    badge: "from-[#3B82F6]/25 to-[#60A5FA]/10",
    icon: "text-[#3B82F6]",
    blob: "bg-[#3B82F6]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(59,130,246,0.55)]",
  },
  green: {
    bar: "from-[#22C55E] to-[#4ADE80]",
    badge: "from-[#22C55E]/25 to-[#4ADE80]/10",
    icon: "text-[#22C55E]",
    blob: "bg-[#22C55E]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(34,197,94,0.55)]",
  },
  purple: {
    bar: "from-[#8B5CF6] to-[#A78BFA]",
    badge: "from-[#8B5CF6]/25 to-[#A78BFA]/10",
    icon: "text-[#8B5CF6]",
    blob: "bg-[#8B5CF6]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(139,92,246,0.55)]",
  },
  cyan: {
    bar: "from-[#06B6D4] to-[#22D3EE]",
    badge: "from-[#06B6D4]/25 to-[#22D3EE]/10",
    icon: "text-[#06B6D4]",
    blob: "bg-[#06B6D4]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(6,182,212,0.55)]",
    spark: "#06B6D4",
  },
  pink: {
    bar: "from-[#EC4899] to-[#F472B6]",
    badge: "from-[#EC4899]/25 to-[#F472B6]/10",
    icon: "text-[#EC4899]",
    blob: "bg-[#EC4899]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(236,72,153,0.55)]",
  },
  amber: {
    bar: "from-[#F59E0B] to-[#FBBF24]",
    badge: "from-[#F59E0B]/25 to-[#FBBF24]/10",
    icon: "text-[#F59E0B]",
    blob: "bg-[#F59E0B]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(245,158,11,0.55)]",
  },
  teal: {
    bar: "from-[#14B8A6] to-[#2DD4BF]",
    badge: "from-[#14B8A6]/25 to-[#2DD4BF]/10",
    icon: "text-[#14B8A6]",
    blob: "bg-[#14B8A6]",
    glow: "hover:shadow-[0_0_44px_-12px_rgba(20,184,166,0.55)]",
  },
};

function KpiCard({ icon, label, value, delta, delay = 0, color = "blue" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const theme = KPI_THEMES[color] || KPI_THEMES.blue;

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
    const duration = 1000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const hasDelta = typeof delta === "number" && !Number.isNaN(delta);
  const isPositive = hasDelta && delta > 0;
  const isNegative = hasDelta && delta < 0;

  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[20px] border border-black/5 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 ${theme.glow}`}
    >
      <span
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-25 ${theme.blob}`}
      ></span>
      <span
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${theme.bar}`}
      ></span>

      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm ${theme.badge} ${theme.icon}`}
        >
          {icon}
        </span>
        {hasDelta && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold ${
              isPositive
                ? "bg-hero-success/15 text-hero-success"
                : isNegative
                ? "bg-red-500/15 text-red-400"
                : "bg-black/5 text-textpara dark:bg-white/5 dark:text-hero-muted"
            }`}
          >
            {isPositive ? "↑" : isNegative ? "↓" : "•"} {Math.abs(delta)}
          </span>
        )}
      </div>

      <p className="relative mt-4 font-manrope text-3xl font-extrabold tracking-tight text-textHead dark:text-hero-text">
        {count.toLocaleString()}
      </p>
      <p className="relative mt-1 text-sm font-medium text-textpara dark:text-hero-muted">
        {label}
      </p>
    </motion.div>
  );
}

export default KpiCard;
