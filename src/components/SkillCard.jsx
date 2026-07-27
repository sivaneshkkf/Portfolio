import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { FadeIn } from "../varients/varientAnim";

function SkillCard({
  name,
  svg,
  brandColor,
  description,
  level,
  proficiency,
  experience,
  featured,
  delay = 0,
}) {
  return (
    // <Tooltip
    //   arrow
    //   title={
    //     <div className="py-1">
    //       <p className="font-semibold text-sm">{name}</p>
    //       {description && <p className="text-xs mt-1 opacity-90">{description}</p>}
    //       {experience && (
    //         <p className="text-[11px] mt-1 opacity-70">{experience} experience</p>
    //       )}
    //     </div>
    //   }
    // >
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      tabIndex={0}
      aria-label={`${name}${level ? `, ${level} level` : ""}${
        experience ? `, ${experience} experience` : ""
      }`}
      style={{ "--glow": `${brandColor}4d` }}
      className="group relative flex flex-col gap-3 rounded-[20px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-5 shadow-sm transition-shadow duration-300 cursor-pointer hover:shadow-[0_0_35px_var(--glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-primary"
    >
      {featured && (
        <span className="absolute -top-2.5 -right-2.5 rounded-full bg-gradient-to-r from-hero-primary to-hero-secondary px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
          Featured
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.03] dark:bg-white/5 p-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          dangerouslySetInnerHTML={{ __html: svg }}
        ></span>
        <h4 className="font-bold text-sm sm:text-base text-textHead dark:text-dark-textHead">
          {name}
        </h4>
      </div>

      {description && (
        <p className="text-xs text-textpara dark:text-dark-textpara line-clamp-2">
          {description}
        </p>
      )}

      {typeof proficiency === "number" && (
        <div>
          <div className="flex items-center justify-between text-[11px] font-medium text-textpara dark:text-dark-textpara mb-1">
            <span>{level}</span>
            <span>{proficiency}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: brandColor }}
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiency}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: delay + 0.2,
                ease: "easeOut",
              }}
            ></motion.div>
          </div>
        </div>
      )}

      {experience && (
        <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-hero-primary/10 via-hero-secondary/10 to-hero-accent/10 px-2.5 py-1 text-[10px] font-semibold text-textHead dark:text-dark-textHead">
          {experience}
        </span>
      )}
    </motion.div>
    // </Tooltip>
  );
}

export default SkillCard;
