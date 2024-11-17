import TheHeading from "../components/TheHeading";
import sectionIDS from "../data/SectionIDS";
import { JobExperience } from "../data/JobExperience";
import { EducationData } from "../data/EducationData";
import resume from "../images/resume.jpg";
import BreakLine from "../components/BreakLine";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import sivanesh_resume from "../images/SIVANESH-RESUME.pdf";
import Btn from "../components/Btn";
import axios from "axios";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DownloadBtn from "../components/Buttons/downloadBtn";
import { AddDashboardDetails, UseFetchCollection } from "../firebase/config";

function Resume() {
  const [progressValue, setProgressValue] = useState(0);         // Actual progress
const [displayedProgress, setDisplayedProgress] = useState(0); // Displayed for animation

const dashbordDetails = UseFetchCollection("dashboard");
const {
  whatsapp = 0,
  url = 0,
  views = 0,
  downloads = 0,
} = dashbordDetails[0] || {};


async function handleDownload(e) {
  try {
    await axios({
      url: sivanesh_resume,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
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


  return (
    <div className="pt-5 px-5 bg-primary dark:bg-dark-secondary">
      <TheHeading heading="RESUME" id={sectionIDS.resume.sectionId} />

      <div className="md:flex md:gap-20 block sm:justify-center">
        <div className="max-w-2xl py-10">
          <h2 className="md:text-xl font-bold md:text-center mb-8 text-textHead dark:text-dark-textHead">
            Education
          </h2>
          <motion.div
            className={
              "relative before:absolute before:top-0 before:bottom-0 before:left-5 before:w-[2px] before:bg-accent before:opacity-80 "
            }
            variants={FadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false }}
          >
            {EducationData.map((edu, index) => (
              <div
                key={index}
                className="relative flex items-start mb-8 pl-14 pr-8 py-4 bg-white dark:bg-dark-primary shadow-cardShadow rounded-md"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full blur-[5px]"></div>
                <div>
                  <h3 className="lg:text-lg text-sm font-bold text-textHead dark:text-dark-textHead">
                    {edu.title}
                    <span className="lg:text-sm font-semibold">{edu.year}</span>
                  </h3>
                  <p className="lg:text-sm text-xs text-textpara dark:text-dark-textpara">
                    {edu.company}
                  </p>
                  <p className="lg:text-sm text-xs text-textpara">{edu.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="px-5 py-8 bg-secondary dark:bg-dark-primary rounded-lg shadow-cardShadow space-y-5"
            variants={FadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="">
              <img src={resume} alt="resume" className="w-52 md:w-72 mx-auto" />
            </div>
            <a href={sivanesh_resume} download onClick={handleDownload}>
              {/* <Btn text={`${progressValue>0 ? "DOWNLOADED" : "DOWNLOAD RESUME"}`}>
                <span className={`${progressValue>0 ? "hidden" : "block"}`}>
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -10, opacity: 0.5, scale: 0.8 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse", // Moves up and down
                    }}
                  >
                    <path
                      d="M19 6.33301H22.1667V11.083H26.125L19 18.208M19 6.33301H15.8333V11.083H11.875L19 18.208"
                      fill="white"
                    />
                    <path
                      d="M19 6.33301H22.1667V11.083H26.125L19 18.208L11.875 11.083H15.8333V6.33301H19Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 26.083H28.5"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
                <div className={`w-8 h-8 text-sm font-bold ${progressValue>0 ? "block" : "hidden"}`}>
                  <CircularProgressbar
                    value={progressValue}
                    text={`${progressValue}%`}
                    styles={buildStyles({
                      // Path color (progress bar color)
                      pathColor: `#ffffff`, // Adjust color as needed
                      // Text color
                      textColor: "#f88",
                      // Trail color (background path color)
                      trailColor: "rgba(255,255,255,0.2)",
                      textSize: "24px"
                    })}
                  />
                </div>
              </Btn> */}
              <DownloadBtn
                progressValue={displayedProgress}/>
            </a>

            
          </motion.div>
        </div>

        <div className="max-w-2xl py-10">
          <h2 className="md:text-xl font-bold text-center mb-8 text-textHead dark:text-dark-textHead">
            Job Experience
          </h2>
          <motion.div
            className={
              "relative before:absolute before:top-0 before:bottom-0 before:left-5 before:w-[2px] before:bg-accent before:opacity-80 "
            }
            variants={FadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false }}
          >
            {JobExperience.map((job, index) => (
              <div
                key={index}
                className="relative flex items-start mb-8 pl-14 pr-8 py-4 bg-white dark:bg-dark-primary shadow-cardShadow rounded-md"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full blur-[5px]"></div>
                <div>
                  <h3 className="text-sm lg:text-lg font-bold text-textHead dark:text-dark-textHead">
                    {job.title}
                    <span className="lg:text-sm font-semibold">{job.year}</span>
                  </h3>
                  <p className="text-xs lg:text-sm text-textpara dark:text-dark-textpara mb-2">
                    {job.company}
                  </p>
                  <p className="text-xs lg:text-sm text-textpara dark:text-dark-textpara">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <BreakLine />
    </div>
  );
}

export default Resume;
