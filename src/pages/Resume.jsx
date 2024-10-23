import TheHeading from "../components/TheHeading";
import sectionID from "../data/sectionIdData.json";
import { JobExperience } from "../data/JobExperience";
import { EducationData } from "../data/EducationData";
import resume from "../images/resume.jpg";
import BreakLine from "../components/BreakLine";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import sivanesh_resume from "../images/SIVANESH-RESUME.pdf"

function Resume() {
  return (
    <div className="pt-5 pb-20 px-10 bg-primary">
      <TheHeading heading="RESUME" id={sectionID.resume} />

      <div className="md:flex md:gap-20 block sm:justify-center">
        <div className="max-w-2xl py-10">
          <h2 className="text-xl font-bold text-center mb-8 text-textHead">
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
                className="relative flex items-start mb-8 pl-14 pr-8 py-4 bg-white shadow-cardShadow rounded-md"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full blur-[5px]"></div>
                <div>
                  <h3 className="text-lg font-bold text-textHead">
                    {edu.title}
                    <span className="text-sm font-semibold">{edu.year}</span>
                  </h3>
                  <p className="text-sm text-textpara">{edu.company}</p>
                  <p className="text-sm text-textpara">{edu.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="px-5 py-8 bg-secondary rounded-lg shadow-cardShadow space-y-5"
          variants={FadeIn("left", 0.2)}
          initial= "hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.1}}
          >
            <div className="">
              <img src={resume} alt="resume" className="w-72 mx-auto" />
            </div>
            <a href={sivanesh_resume} download className="group py-2 px-3 flex gap-2 items-center mx-auto bg-accent rounded text-white text-sm font-semibold text-center w-fit">
              DOWNLOAD RESUME
              <span>
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ y: 0, opacity: 1, scale:1 }}
                  animate={{ y: -10, opacity:0.5 , scale:0.8}}
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
            </a>
          </motion.div>
        </div>

        <div className="max-w-2xl py-10">
          <h2 className="text-xl font-bold text-center mb-8 text-textHead">
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
                className="relative flex items-start mb-8 pl-14 pr-8 py-4 bg-white shadow-cardShadow rounded-md"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full blur-[5px]"></div>
                <div>
                  <h3 className="text-lg font-bold text-textHead">
                    {job.title}
                    <span className="text-sm font-semibold">{job.year}</span>
                  </h3>
                  <p className="text-sm text-textpara">{job.company}</p>
                  <p className="text-sm text-textpara">{job.description}</p>
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
