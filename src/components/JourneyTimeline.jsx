import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JourneyData } from "../data/JourneyData";
import { FadeIn } from "../varients/varientAnim";

function JourneyTimeline() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div
        aria-hidden="true"
        className="absolute left-5 sm:left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-hero-primary via-hero-secondary to-hero-accent opacity-30"
      ></div>

      <div className="space-y-8">
        {JourneyData.map((item, index) => (
          <motion.div
            key={item.title}
            variants={FadeIn("up", index * 0.12, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative pl-14 sm:pl-16 group"
          >
            <span
              className={`absolute left-0 top-0 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 text-sm sm:text-base transition-transform duration-300 group-hover:scale-110 ${
                item.isGoal
                  ? "bg-gradient-to-br from-hero-primary to-hero-secondary text-white border-transparent shadow-lg shadow-hero-primary/30"
                  : item.done
                  ? "bg-white dark:bg-dark-primary text-hero-primary border-hero-primary/50"
                  : "bg-white dark:bg-dark-primary text-textpara dark:text-dark-textpara border-textpara/30 dark:border-dark-textpara/30"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
            </span>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <h4 className="font-bold text-textHead dark:text-dark-textHead">
                {item.title}
              </h4>
              <p className="text-sm text-textpara dark:text-dark-textpara mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default JourneyTimeline;
