import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import ProjectVideo from "./ProjectVideo";
import ProjectBadges from "./ProjectBadges";
import TechStack from "./TechStack";
import ProjectStats from "./ProjectStats";
import ProjectButtons from "./ProjectButtons";
import type { ProjectCardProps } from "./types";

// Large featured project showcase card: video/image preview on the left,
// project info on the right (stacks on mobile/tablet). Matches the
// reference design -- badges, gradient subtitle, tech chips with overflow,
// two-line stat cards, and three action buttons.
function ProjectCard({
  name,
  subtitle,
  description,
  image,
  video,
  category,
  techs,
  liveUrl,
  githubUrl,
  delay = 0,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? undefined : { y: -10 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="group/card relative"
    >
      {/* border glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[30px] bg-gradient-to-r from-indigo-500/40 via-blue-500/30 to-indigo-500/40 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative overflow-hidden rounded-[30px] border border-black/[0.08] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] transition-shadow duration-300 group-hover/card:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-[#0B1120] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:min-h-[550px] lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-10">
          <ProjectVideo
            image={image}
            video={video}
            name={name}
            isCardHovering={isHovering}
          />

          <div className="flex flex-col gap-5">
            <ProjectBadges category={category} />

            <div>
              <h3 className="font-manrope text-2xl font-extrabold leading-tight tracking-tight text-textHead dark:text-dark-textHead lg:text-[42px]">
                {name}
              </h3>
              {subtitle && (
                <p className="mt-1.5 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-base font-semibold text-transparent sm:text-lg">
                  {subtitle}
                </p>
              )}
            </div>

            <p className="max-w-[90%] text-sm leading-[1.8] text-textpara dark:text-dark-textpara sm:sm">
              {description}
            </p>

            <TechStack techs={techs} showAll />

            <ProjectStats techCount={techs.length} />

            <ProjectButtons liveUrl={liveUrl} githubUrl={githubUrl} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
