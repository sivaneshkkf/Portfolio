import { motion } from "motion/react";
import { FadeIn } from "../varients/varientAnim";

function FooterSkillBar({ svg, name, percent, delay = 0 }) {
  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-hero-text">
          {svg && (
            <span
              className="h-4 w-4 shrink-0"
              dangerouslySetInnerHTML={{ __html: svg }}
            ></span>
          )}
          {name}
        </span>
        <span className="text-xs font-semibold text-hero-muted">{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

export default FooterSkillBar;
