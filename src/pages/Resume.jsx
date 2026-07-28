import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import { JobExperience } from "../data/JobExperience";
import { EducationData } from "../data/EducationData";
import { experienceMeta } from "../data/experienceMeta";
import resume from "../images/resume.jpg";
import BreakLine from "../components/BreakLine";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import sivanesh_resume from "../images/SIVANESH-RESUME.pdf";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddDashboardDetails, UseFetchCollection } from "../firebase/config";
import { HeadingContext } from "../context/HeadingContext";
import { ScrolContext } from "../context/scrolContext";
import skillsData from "../data/skillsData.json";
import CtaButton from "../components/Buttons/CtaButton";
import CVdownloadBtn from "../components/Buttons/CVdowloadBtn";
import AboutStatCard from "../components/AboutStatCard";
import EducationCard from "../components/EducationCard";
import CareerTimelineItem from "../components/CareerTimelineItem";
import { ProjectData, MobileAppData } from "../data/projectData";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MemoryIcon from "@mui/icons-material/Memory";
import BadgeIcon from "@mui/icons-material/Badge";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";

function getRoleTitle(title) {
  return title.split("|")[0].trim();
}

function Resume() {
  const [progressValue, setProgressValue] = useState(0); // Actual progress
  const [displayedProgress, setDisplayedProgress] = useState(0); // Displayed for animation

  const dashbordDetails = UseFetchCollection("dashboard");
  const {
    whatsapp = 0,
    url = 0,
    views = 0,
    downloads = 0,
  } = dashbordDetails[0] || {};

  const { setVisibleSection } = useContext(HeadingContext);
  const { setScrollEnable } = useContext(ScrolContext);

  async function handleDownload(e) {
    try {
      await axios({
        url: sivanesh_resume,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgressValue(percentCompleted); // Update actual progress
        },
      });

      // update dashboard
      const updateDashboard = {
        whatsapp: whatsapp,
        url: url,
        views: views,
        downloads: downloads + 1,
      };
      AddDashboardDetails(updateDashboard)
        .then((docRef) => {
          console.log("Download with ID:", docRef.id);
        })
        .catch((e) => {
          console.error("Failed to update download count:", e);
        });

      // Reset both progress values after download completes
      setTimeout(() => {
        setProgressValue(0);
        setDisplayedProgress(0);
      }, 3000);
    } catch (error) {
      console.error("Download error:", error);
      setProgressValue(0);
      setDisplayedProgress(0);
    }
  }

  // Effect to smoothly animate the displayed progress
  useEffect(() => {
    if (displayedProgress < progressValue) {
      const increment = setInterval(() => {
        setDisplayedProgress((prev) => {
          if (prev >= progressValue) {
            clearInterval(increment); // Stop when displayed progress catches up
            return prev;
          }
          return Math.min(prev + 1, progressValue); // Smoothly increment
        });
      }, 10); // Adjust timing to control smoothness

      return () => clearInterval(increment);
    }
  }, [progressValue, displayedProgress]);

  function handleContactMe() {
    setScrollEnable(false);
    setVisibleSection({
      navLiId: sectionIDS.contact.navId,
      sectionId: sectionIDS.contact.sectionId,
    });
  }

  const totalProjects = ProjectData.length + MobileAppData.length;
  const currentRole = getRoleTitle(JobExperience[0].title);
  const careerPath = [...JobExperience]
    .reverse()
    .map((j) => getRoleTitle(j.title));

  return (
    <div className="relative overflow-hidden bg-primary dark:bg-gradient-to-b dark:from-hero-bg2 dark:via-hero-bg dark:to-[#020617] py-20 sm:py-28 lg:py-36 px-5">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-primary/10 dark:bg-hero-primary/25 blur-[200px] dark:animate-blobSlow"></div>
        <div className="absolute top-1/4 -left-24 -translate-y-1/2 w-96 h-96 rounded-full bg-hero-secondary/10 dark:bg-hero-secondary/25 blur-[200px] dark:animate-blob"></div>
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
            <span className="text-sm">📄</span>
            <span className="text-xs font-semibold text-textpara dark:text-dark-textpara">
              Professional Resume
            </span>
          </motion.div>

          <TheHeading
            heading="CAREER JOURNEY"
            id={sectionIDS.resume.sectionId}
          />

          <motion.h2
            variants={FadeIn("up", 0.2, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="mt-4 font-manrope text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead"
          >
            Resume &{" "}
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
              Professional Experience
            </span>
          </motion.h2>

          <motion.p
            variants={FadeIn("up", 0.3, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="mt-4 text-sm sm:text-base text-textpara dark:text-dark-textpara"
          >
            A timeline of my education, professional growth, and hands-on
            software development experience.
          </motion.p>
        </div>

        {/* career progression flow */}
        <motion.div
          variants={FadeIn("up", 0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-16 sm:mb-20"
        >
          {careerPath.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold ${
                  i === careerPath.length - 1
                    ? "bg-gradient-to-r from-hero-primary to-hero-secondary text-white shadow-md shadow-hero-primary/30"
                    : "border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 text-textHead dark:text-dark-textHead"
                }`}
              >
                {role}
              </span>
              {i < careerPath.length - 1 && (
                <span className="text-hero-primary rotate-90 sm:rotate-0">
                  →
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* left sidebar - 35% */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* resume preview */}
            <motion.div
              variants={FadeIn("up", 0.2, 0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl p-[2px] bg-gradient-to-br from-hero-primary via-hero-secondary to-hero-accent shadow-xl shadow-black/10"
            >
              <div className="rounded-3xl bg-white dark:bg-dark-primary p-5 sm:p-6">
                <img
                  src={resume}
                  alt="Sivanesh's resume preview"
                  loading="lazy"
                  className="w-full max-w-[220px] mx-auto rounded-lg shadow-lg"
                />
                <div className="flex flex-col gap-3 mt-6">
                  <CtaButton
                    as="a"
                    href={sivanesh_resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    icon={<VisibilityIcon fontSize="small" />}
                    className="!px-4 !py-2.5 !text-xs !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15"
                  >
                    Preview Resume
                  </CtaButton>
                  <CtaButton
                    as="a"
                    href={sivanesh_resume}
                    download
                    onClick={handleDownload}
                    variant="primary"
                    icon={<CVdownloadBtn progressValue={displayedProgress} />}
                    progress={
                      progressValue > 0 && progressValue < 100
                        ? displayedProgress
                        : undefined
                    }
                    className="!px-4 !py-2.5 !text-xs !rounded-xl w-full"
                  >
                    Download Resume
                  </CtaButton>
                </div>
              </div>
            </motion.div>

            {/* quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <AboutStatCard
                icon={<WorkHistoryIcon fontSize="small" />}
                value={4}
                suffix="+"
                label="Years Experience"
                delay={0.1}
              />
              <AboutStatCard
                icon={<AssignmentTurnedInIcon fontSize="small" />}
                value={totalProjects}
                suffix="+"
                label="Projects"
                delay={0.2}
              />
              <AboutStatCard
                icon={<MemoryIcon fontSize="small" />}
                value={skillsData.length}
                suffix="+"
                label="Technologies"
                delay={0.3}
              />
              <motion.div
                variants={FadeIn("up", 0.4, 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-3 py-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/15 to-hero-secondary/15 text-hero-primary">
                  <BadgeIcon fontSize="small" />
                </span>
                <span className="font-manrope text-xs sm:text-sm font-extrabold text-textHead dark:text-dark-textHead leading-tight">
                  {currentRole}
                </span>
              </motion.div>
            </div>

            {/* education */}
            <div>
              <h3 className="font-manrope text-lg font-bold text-textHead dark:text-dark-textHead mb-4">
                🎓 Education
              </h3>
              <div className="flex flex-col gap-3">
                {EducationData.map((edu, index) => (
                  <EducationCard
                    key={edu.title}
                    edu={edu}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right - career timeline */}
          <div className="lg:col-span-3">
            <h3 className="font-manrope text-lg font-bold text-textHead dark:text-dark-textHead mb-8">
              💼 Work Experience
            </h3>
            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-hero-primary via-hero-secondary to-hero-accent opacity-30"
              ></div>
              <div className="space-y-8 lg:space-y-10">
                {JobExperience.map((job, index) => (
                  <CareerTimelineItem
                    key={job.title}
                    job={job}
                    meta={experienceMeta[index]}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          variants={FadeIn("up", 0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mt-20 sm:mt-24 max-w-3xl mx-auto rounded-3xl p-[1.5px] bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent"
        >
          <div className="rounded-3xl bg-white/90 dark:bg-dark-primary/90 backdrop-blur-md px-8 sm:px-12 py-10 text-center">
            <h4 className="font-manrope text-xl sm:text-2xl font-bold text-textHead dark:text-dark-textHead">
              Interested in my experience?
            </h4>
            <p className="mt-3 text-sm sm:text-base text-textpara dark:text-dark-textpara max-w-xl mx-auto">
              Download my complete resume to explore my projects, technical
              skills, and professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <CtaButton
                as="a"
                href={sivanesh_resume}
                download
                onClick={handleDownload}
                variant="primary"
                icon={<CVdownloadBtn progressValue={displayedProgress} />}
                progress={
                  progressValue > 0 && progressValue < 100
                    ? displayedProgress
                    : undefined
                }
                className="!px-5 !py-3 !text-sm !rounded-xl w-full sm:w-auto"
              >
                Download Resume
              </CtaButton>
              <CtaButton
                as="button"
                type="button"
                variant="secondary"
                icon={<EmailIcon fontSize="small" />}
                onClick={handleContactMe}
                className="!px-5 !py-3 !text-sm !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15"
              >
                Contact Me
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 sm:mt-24">
        <BreakLine />
      </div>
    </div>
  );
}

export default Resume;
