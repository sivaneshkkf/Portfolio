import { motion } from "framer-motion";
import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import ProjectLi from "../components/ProjectLi";
import { ProjectData, MobileAppData } from "../data/projectData";
import { projectsMeta } from "../data/projectsMeta";
import BreakLine from "../components/BreakLine";
import MobileAppsLi from "../components/MobileAppsLI";
import { FadeIn } from "../varients/varientAnim";

function Projects() {
  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-[#020617] dark:via-hero-bg dark:to-hero-bg2 py-20 sm:py-28 lg:py-36 px-5">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 -left-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-primary/10 dark:bg-hero-primary/25 blur-[200px] dark:animate-blob"></div>
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-secondary/10 dark:bg-hero-secondary/25 blur-[200px] dark:animate-blobSlow"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            variants={FadeIn("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 mb-4"
          >
            <span className="text-sm">🚀</span>
            <span className="text-xs font-semibold text-textpara dark:text-dark-textpara">
              Portfolio Showcase
            </span>
          </motion.div>

          <TheHeading
            heading="FEATURED PROJECTS"
            id={sectionIDS.projects.sectionId}
          />

          <motion.h2
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Things{" "}
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
              I&rsquo;ve Built
            </span>
          </motion.h2>

          <motion.p
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            A collection of full-stack applications demonstrating clean
            architecture, responsive design, and scalable development practices.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {ProjectData.map((li, index) => {
            const meta = projectsMeta[li.name] || {};
            return (
              <ProjectLi
                key={li.name}
                name={li.name}
                disc={li.disc}
                img={li.image}
                techs={li.techs}
                link={li.link}
                ghLink={li.ghLink}
                tagline={meta.tagline}
                status={meta.status}
                featured={meta.featured}
                metadata={meta.metadata}
                delay={index * 0.1}
              />
            );
          })}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl mt-20 sm:mt-28 px-0 sm:px-4">
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
      <div className="px-10 mt-20 sm:mt-24">
        <BreakLine />
      </div>
    </div>
  );
}

export default Projects;
