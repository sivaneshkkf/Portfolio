import { motion } from "framer-motion";
import BreakLine from "../components/BreakLine";
import TheHeading from "../components/TheHeading";
import JourneyTimeline from "../components/JourneyTimeline";
import TechChip from "../components/TechChip";
import AboutStatCard from "../components/AboutStatCard";
import sectionIDS from "../data/SectionIDS";
import aboutImg from "../images/about.png";
import skillsData from "../data/skillsData.json";
import { ProjectData, MobileAppData } from "../data/ProjectData";
import { FadeIn } from "../varients/varientAnim";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MemoryIcon from "@mui/icons-material/Memory";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function AboutMe() {
  const totalProjects = ProjectData.length + MobileAppData.length;
  const totalTechnologies = skillsData.length;

  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-[#020617] dark:via-hero-bg dark:to-hero-bg2 py-20 sm:py-28 lg:py-36 px-5">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-primary/10 dark:bg-hero-primary/25 blur-[200px] dark:animate-blob"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-secondary/10 dark:bg-hero-secondary/25 blur-[200px] dark:animate-blobSlow"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 mb-4"
          >
            <span className="text-sm">👋</span>
            <span className="text-xs font-semibold text-textpara dark:text-dark-textpara">
              Get To Know Me
            </span>
          </motion.div>

          <TheHeading heading="ABOUT ME" id={sectionIDS.aboutME.sectionId} />

          <motion.h2
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="mt-4 font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Crafting Modern{" "}
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
              Web Experiences
            </span>
          </motion.h2>

          <motion.p
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="mt-4 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            Passionate about building scalable, user-friendly, and
            high-performance web applications.
          </motion.p>
        </div>

        {/* intro + illustration */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={FadeIn("left", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            whileHover={{ y: -4 }}
            className="rounded-[20px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-500 p-8 sm:p-10 max-w-[650px] mx-auto lg:mx-0"
          >
            <p className="text-base sm:text-lg leading-[1.8] text-textpara dark:text-dark-textpara">
              I’m a dedicated web developer with a passion for crafting clean,
              efficient, and visually appealing websites. With a strong
              foundation in{" "}
              <span className="font-semibold text-hero-primary">HTML</span>,{" "}
              <span className="font-semibold text-hero-secondary">CSS</span>,
              and{" "}
              <span className="font-semibold text-hero-accent">JavaScript</span>
              , and frameworks like{" "}
              <span className="font-semibold text-hero-primary">React</span>, I
              specialize in creating responsive, user-centric designs that
              enhance functionality and user experience. Constantly learning and
              adapting to new technologies.
            </p>
          </motion.div>

          <motion.div
            variants={FadeIn("right", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="relative flex justify-center"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-hero-primary/25 via-hero-secondary/20 to-hero-accent/20 blur-2xl"
            ></div>
            <span
              aria-hidden="true"
              className="hidden sm:flex absolute -top-4 -left-4 h-10 w-10 items-center justify-center rounded-xl bg-white/80 dark:bg-dark-primary/80 backdrop-blur-md shadow-md text-hero-primary text-sm font-mono animate-float"
            >
              {"</>"}
            </span>
            <span
              aria-hidden="true"
              className="hidden sm:flex absolute -bottom-3 -right-3 h-10 w-10 items-center justify-center rounded-xl bg-white/80 dark:bg-dark-primary/80 backdrop-blur-md shadow-md text-hero-secondary text-sm font-mono animate-float-slow"
            >
              {"{ }"}
            </span>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl p-[2px] bg-gradient-to-br from-hero-primary via-hero-secondary to-hero-accent shadow-2xl shadow-black/10"
            >
              <div className="rounded-3xl bg-white dark:bg-dark-primary p-6">
                <img
                  src={aboutImg}
                  alt="Illustration of a developer working at a desk"
                  className="max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] mx-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* journey timeline */}
        <div className="mt-24 sm:mt-32">
          <motion.h3
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="text-center font-manrope text-2xl sm:text-3xl font-bold text-textHead dark:text-dark-textHead mb-12 sm:mb-16"
          >
            My Journey
          </motion.h3>
          <JourneyTimeline />
        </div>

        {/* tech chips */}
        <div className="mt-20 sm:mt-24">
          <motion.h3
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="text-center font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead mb-8"
          >
            Technologies I Work With
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skillsData.map((skill, index) => (
              <TechChip key={skill.name} delay={index * 0.05}>
                {skill.name}
              </TechChip>
            ))}
          </div>
        </div>

        {/* experience stats */}
        <div className="mt-20 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <AboutStatCard
            icon={<SchoolIcon fontSize="small" />}
            value={1}
            suffix="+"
            label="Years Learning"
            delay={0.1}
          />
          <AboutStatCard
            icon={<AssignmentTurnedInIcon fontSize="small" />}
            value={totalProjects}
            suffix="+"
            label="Projects Completed"
            delay={0.2}
          />
          <AboutStatCard
            icon={<MemoryIcon fontSize="small" />}
            value={totalTechnologies}
            suffix="+"
            label="Technologies"
            delay={0.3}
          />
          <AboutStatCard
            icon={<FavoriteIcon fontSize="small" />}
            value={100}
            suffix="%"
            label="Passion for Learning"
            delay={0.4}
          />
        </div>

        {/* philosophy quote */}
        <motion.div
          variants={FadeIn("up", 0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mt-20 sm:mt-24 max-w-3xl mx-auto rounded-3xl p-[1.5px] bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent"
        >
          <div className="rounded-3xl bg-white/90 dark:bg-dark-primary/90 backdrop-blur-md px-8 sm:px-12 py-10 text-center">
            <FormatQuoteIcon
              sx={{ fontSize: "2.5rem" }}
              className="text-hero-primary/40"
            />
            <p className="italic text-base sm:text-lg text-textHead dark:text-dark-textHead leading-relaxed">
              I believe great software is built by combining clean code,
              thoughtful design, and continuous learning.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 sm:mt-24">
        <BreakLine />
      </div>
    </div>
  );
}

export default AboutMe;
