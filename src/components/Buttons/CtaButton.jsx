import { motion } from "motion/react";
import { useState } from "react";

function CtaButton({
  as = "button",
  variant = "primary",
  icon,
  progress,
  className = "",
  children,
  onClick,
  ...rest
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const id = Date.now();

    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);

    onClick && onClick(e);
  };

  const base =
    "group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg";

  const variants = {
    primary:
      "bg-gradient-to-r from-hero-primary to-hero-secondary text-white shadow-lg shadow-hero-primary/30 hover:shadow-xl hover:shadow-hero-secondary/40 hover:-translate-y-0.5 focus-visible:ring-hero-primary",
    secondary:
      "bg-white/[0.06] text-hero-text border border-white/15 backdrop-blur-md hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 focus-visible:ring-white/40",
  };

  const MotionComp = motion[as] ?? motion.button;

  return (
    <MotionComp
      className={`${base} ${variants[variant]} ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute rounded-full bg-white/50"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}

      <span className="relative z-10 flex items-center gap-2.5">
        {icon}
        {children}
      </span>

      {typeof progress === "number" && (
        <span
          className="absolute bottom-0 left-0 h-[3px] bg-white/80 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}
    </MotionComp>
  );
}

export default CtaButton;
