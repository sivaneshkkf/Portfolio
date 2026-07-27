import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import ExperienceCard from "./ExperienceCard";

function CareerTimelineItem({ job, meta, index }) {
  return (
    <motion.div
      variants={FadeIn("up", index * 0.1, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative lg:pl-14"
    >
      <span
        aria-hidden="true"
        className="hidden lg:flex absolute left-0 top-6 z-10 h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-hero-primary to-hero-secondary ring-4 ring-primary dark:ring-dark-secondary"
      ></span>

      <ExperienceCard job={job} meta={meta} align="left" />
    </motion.div>
  );
}

export default CareerTimelineItem;
