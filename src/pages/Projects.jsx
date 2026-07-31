import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { ProjectData, MobileAppData } from "../data/ProjectData";
import { projectsMeta } from "../data/projectsMeta";
import MobileAppsLi from "../components/MobileAppsLI";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectGridCard from "../components/projects/ProjectGridCard";
import { FadeIn } from "../varients/varientAnim";

const featuredProject =
  ProjectData.find((p) => projectsMeta[p.name]?.featured) || ProjectData[0];
const restProjects = ProjectData.filter((p) => p !== featuredProject);

// Self-contained fractal-noise texture, scoped to this section only rather
// than a global CSS class, so it can't affect any other page.
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Projects() {
  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-[#020617] dark:via-hero-bg dark:to-hero-bg2 py-20 sm:py-28 lg:py-36 px-5">
      {/* premium background: subtle grid/noise/blob texture that adapts to
          the site's light/dark toggle, same tokens the rest of the app
          uses. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.15]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{ backgroundImage: NOISE_BG }}
        />
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[180px] dark:animate-blob" />
        <div className="absolute bottom-0 right-1/4 translate-y-1/3 w-[32rem] h-[32rem] rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-[180px] dark:animate-blobSlow" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-400/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 dark:border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md px-4 py-1.5 mb-5"
          >
            <Sparkles size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h2
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
            className="font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Work
            </span>
          </motion.h2>

          <motion.div
            variants={FadeIn("up", 0.25, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
            className="mx-auto mt-4 h-[3px] w-16 origin-left rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
          />

          <motion.p
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
            className="mt-5 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            Crafting modern digital experiences through clean design and
            scalable code.
          </motion.p>
        </div>

        {/* featured project */}
        <div className="mb-8 sm:mb-10">
          <ProjectCard
            name={featuredProject.name}
            subtitle={projectsMeta[featuredProject.name]?.tagline}
            description={featuredProject.disc}
            image={featuredProject.image}
            video={featuredProject.video}
            category={projectsMeta[featuredProject.name]?.category}
            techs={featuredProject.techs}
            liveUrl={featuredProject.link}
            githubUrl={featuredProject.ghLink}
          />
        </div>

        {/* remaining projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restProjects.map((li, index) => {
            const meta = projectsMeta[li.name] || {};
            return (
              <ProjectGridCard
                key={li.name}
                name={li.name}
                disc={li.disc}
                img={li.image}
                techs={li.techs}
                link={li.link}
                ghLink={li.ghLink}
                status={meta.status}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl mt-20 sm:mt-28 px-0 sm:px-4">
        {MobileAppData.map((li, index) => (
          <MobileAppsLi
            imgs={li.imgs}
            name={li.name}
            disc={li.disc}
            techs={li.techs}
            link={li.link}
            ghLink={li.ghLink}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
