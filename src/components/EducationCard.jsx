import { memo } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";

function EducationCard({ edu, delay = 0 }) {
  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md pl-4 pr-4 py-3.5 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-hero-primary to-hero-secondary"
      ></span>
      <div className="flex items-start gap-2">
        <span className="text-base">🎓</span>
        <div>
          <h4 className="text-sm font-bold text-textHead dark:text-dark-textHead">
            {edu.title}
          </h4>
          <span className="inline-block mt-0.5 rounded-full bg-hero-primary/10 px-2 py-0.5 text-[10px] font-semibold text-hero-primary">
            {edu.year}
          </span>
          <p className="text-xs text-textpara dark:text-dark-textpara mt-1.5">
            {edu.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(EducationCard);
