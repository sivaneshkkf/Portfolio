import { useMemo } from "react";
import { motion } from "motion/react";

function ConfettiBurst({ count = 16 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 280,
        y: -(Math.random() * 170 + 70),
        rotate: Math.random() * 360,
        color: ["#3B82F6", "#8B5CF6", "#06B6D4", "#22C55E", "#F59E0B"][i % 5],
        delay: Math.random() * 0.2,
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-16 flex justify-center"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute h-2 w-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
        ></motion.span>
      ))}
    </div>
  );
}

export default ConfettiBurst;
