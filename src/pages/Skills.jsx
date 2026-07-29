import { motion } from "motion/react";
import TheHeading from "../components/TheHeading";
import SkillCard from "../components/SkillCard";
import LearningChip from "../components/LearningChip";
import AboutStatCard from "../components/AboutStatCard";
import BreakLine from "../components/BreakLine";
import skillsData from "../data/skillsData.json";
import { skillsMeta } from "../data/skillsMeta";
import { LearningData } from "../data/LearningData";
import { ProjectData, MobileAppData } from "../data/ProjectData";
import sectionIDS from "../data/SectionIDS";
import { FadeIn } from "../varients/varientAnim";
import { useReveal } from "../hooks/useReveal";
import MemoryIcon from "@mui/icons-material/Memory";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const CATEGORIES = ["Frontend", "Backend", "Database", "Tools"];

function CategoryHeading({ category }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      variants={FadeIn("up", 0.1, 0)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="flex items-center gap-4 mb-8"
    >
      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead whitespace-nowrap">
        {category}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-r from-hero-primary/40 via-hero-secondary/30 to-transparent"></div>
    </motion.div>
  );
}

function SKills() {
  const enrichedSkills = skillsData.map((skill) => ({
    ...skill,
    ...(skillsMeta[skill.name] || {}),
  }));

  const totalProjects = ProjectData.length + MobileAppData.length;

  const badge = useReveal();
  const heading = useReveal();
  const lead = useReveal();
  const learningHeading = useReveal();

  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-hero-bg2 dark:via-hero-bg dark:to-[#020617] py-20 sm:py-28 lg:py-36 px-5">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 -right-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-primary/10 dark:bg-hero-primary/25 blur-[200px] dark:animate-blobSlow"></div>
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-secondary/10 dark:bg-hero-secondary/25 blur-[200px] dark:animate-blob"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            ref={badge.ref}
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            animate={badge.inView ? "show" : "hidden"}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 mb-4"
          >
            <span className="text-sm">💻</span>
            <span className="text-xs font-semibold text-textpara dark:text-dark-textpara">
              Technical Skills
            </span>
          </motion.div>

          <TheHeading
            heading="MY TECH STACK"
            id={sectionIDS.skills.sectionId}
          />

          <motion.h2
            ref={heading.ref}
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            animate={heading.inView ? "show" : "hidden"}
            className="mt-4 font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Technologies I{" "}
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
              Work With
            </span>
          </motion.h2>

          <motion.p
            ref={lead.ref}
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            animate={lead.inView ? "show" : "hidden"}
            className="mt-4 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            Building scalable and modern full-stack applications using
            industry-standard technologies.
          </motion.p>
        </div>

        {/* categorized skill cards */}
        <div className="space-y-16 sm:space-y-20">
          {CATEGORIES.map((category) => {
            const items = enrichedSkills.filter((s) => s.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <CategoryHeading category={category} />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                  {items.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      svg={skill.svg}
                      brandColor={skill.brandColor}
                      description={skill.description}
                      level={skill.level}
                      proficiency={skill.proficiency}
                      experience={skill.experience}
                      featured={skill.featured}
                      delay={index * 0.08}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* summary stats */}
        <div className="mt-20 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <AboutStatCard
            icon={<MemoryIcon fontSize="small" />}
            value={skillsData.length}
            suffix="+"
            label="Technologies"
            delay={0.1}
          />
          <AboutStatCard
            icon={<WorkHistoryIcon fontSize="small" />}
            value={4}
            suffix="+"
            label="Years Experience"
            delay={0.2}
          />
          <AboutStatCard
            icon={<AssignmentTurnedInIcon fontSize="small" />}
            value={totalProjects}
            suffix="+"
            label="Projects"
            delay={0.3}
          />
          <AboutStatCard
            icon={<AutoAwesomeIcon fontSize="small" />}
            value={100}
            suffix="%"
            label="Continuous Learning"
            delay={0.4}
          />
        </div>

        {/* currently learning */}
        <div className="mt-20 sm:mt-24">
          <motion.h3
            ref={learningHeading.ref}
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            animate={learningHeading.inView ? "show" : "hidden"}
            className="text-center font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead mb-8"
          >
            Currently Learning
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {LearningData.map((item, index) => (
              <LearningChip
                key={item.name}
                name={item.name}
                svg={item.svg}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 sm:mt-24">
        <BreakLine />
      </div>
    </div>
  );
}

export default SKills;
