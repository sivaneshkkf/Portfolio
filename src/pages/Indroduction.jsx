import {
  motion,
  spring,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FadeIn } from "../varients/varientAnim";
import sivaneshImg from "../images/sivaneshDP.webp";
import CVdownloadBtn from "../components/Buttons/CVdowloadBtn";
import sivanesh_resume from "../images/SIVANESH-RESUME.pdf";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ImageBlurHash from "../utils/ImageBlurHash";
import PopupShareBtn from "../components/Buttons/PopupBtn";
import Dashboard from "./DashBoard";
import { LoginFormContext, LoginStatus } from "../context/LoginFormContext";
import { AddDashboardDetails, UseFetchCollection } from "../firebase/config";
import { NumberFormatter } from "../utils/Formatter";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { span } from "framer-motion/client";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { DashBoardContext } from "../context/DashBoardContext";

function Indroduction() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXspring = useSpring(x);
  const mouseYspring = useSpring(y);

  const rotateX = useTransform(mouseYspring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const rotateY = useTransform(mouseXspring, [-0.5, 0.5], ["12deg", "-12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = (e) => {
    x.set(0);
    y.set(0);
  };

  const [progressValue, setProgressValue] = useState(0); // Actual progress
  const [displayedProgress, setDisplayedProgress] = useState(0); // Displayed for animation
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormContext);
  const { dashboardOpen, setDashboardOpen } = useContext(DashBoardContext);
  const { loginStatus } = useContext(LoginStatus);
  const dashbordDetails = UseFetchCollection("dashboard");
  const {
    whatsapp = 0,
    url = 0,
    views = 0,
    downloads = 0,
  } = dashbordDetails[0] || {};

  // download resume
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
          console.log("Downloads with ID:", docRef.id);
        })
        .catch((e) => {
          console.error("Failed to update download count:", e);
        });

      // Reset both progress values after download completes
      setTimeout(() => {
        setProgressValue(0);
        setDisplayedProgress(0);
      }, 5000);
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
      }, 8); // Adjust timing to control smoothness

      return () => clearInterval(increment);
    }
  }, [progressValue, displayedProgress]);

  // popup state
  const [popupState, setPopupState] = useState(false);

  return (
    <motion.div
      className="bg-[url('../src/images/bg.webp')] bg-cover bg-center h-full w-full relative z-0 mt-10 sm:mt-14"
      onMouseLeave={() => setPopupState(false)}
    >
      <div className="absolute bg-gradient-to-b from-gradient1 to-gradient2 inset-0 -z-10 dark:from-dark-gradient1 dark:to-dark-gradient2"></div>
      <div className=" px-5 py-8 sm:p-10 md:p-20 2xl:px-60">
        <div className="flex gap-4 items-center justify-between">
          <motion.div
            className="space-y-4 flex-1"
            variants={FadeIn("left", 0.8, 0)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-xs sm:text-sm font-bold tracking-widest">
              Welcome to my world
            </p>

            <h3 className="lg:text-5xl sm:text-2xl text-lg md:text-3xl text-white font-semibold w-fit">
              Hi I'm{" "}
              <span className="text-accent font-bold sm:text-2xl lg:text-5xl text-xl md:text-3xl tracking-wide ml-2">
                Sivanesh
              </span>
            </h3>

            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "A Web ",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "A Web Developer.", // Clear the text to retype it
                1000,
                "A Web",
                1000,
              ]}
              wrapper="span"
              speed={10}
              className="lg:text-4xl xl:text-5xl text-md text-white font-semibold mt-10"
              repeat={Infinity}
            />
            <p className="text-[#649aaf] saturate-150 dark:text-[#859aa1] text-xs bg-white rounded sm:text-sm md:text-base lg:text-md font-normal w-fit px-2 py-1 bg-opacity-10 backdrop-blur-0">
              I am currently available for hire
            </p>

            <p className="text-textpara dark:text-dark-textpara text-xs md:font-medium max-w-md pt-5 hidden sm:block">
              I am a passionate web developer and self-learner, skilled in
              building responsive and user-friendly websites. With expertise in
              HTML, CSS, JavaScript, and React, I focus on creating seamless
              digital experiences. Explore my portfolio to see my latest work!
            </p>
          </motion.div>

          <div
            className="flex-1"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="drop-shadow-2xl relative w-fit"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* <img
                alt="pfImg"
                src={sivaneshImg}
                className="md:max-w-80 xl:max-w-sm mx-auto md:rounded-3xl rounded-2xl shadow-2xl border-2 border-zinc-700"
              /> */}
              <ImageBlurHash
                className="md:max-w-80 2xl:max-w-xs sm:max-w-64 xl:max-w-xs mx-auto md:rounded-3xl rounded-2xl shadow-2xl shadow-dark-primary border-2 border-zinc-700"
                src={sivaneshImg}
              />

              <a
                href={sivanesh_resume}
                download
                onClick={handleDownload}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(500px)",
                  willChange: "transform",
                }}
              >
                <CVdownloadBtn
                  rotateX={rotateX}
                  rotateY={rotateY}
                  progressValue={displayedProgress}
                />
              </a>
            </motion.div>
          </div>
        </div>
        <motion.p
          className="text-textpara dark:text-dark-textpara text-xs md:font-medium pt-8 sm:hidden"
          variants={FadeIn("up", 0.9, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
        >
          I am a passionate web developer and self-learner, skilled in building
          responsive and user-friendly websites. With expertise in HTML, CSS,
          JavaScript, and React, I focus on creating seamless digital
          experiences. Explore my portfolio to see my latest work!
        </motion.p>
        <div className="mt-5 sm:mt-10 md:mt-5">
          <p className="text-gray-300 text-xs md:text-sm mb-1 md:mb-2">
            Follow Me
          </p>
          <div className="flex md:gap-4 gap-3 items-center text-white">
            <motion.a
              href="https://www.instagram.com/siva_innocent_soul/profilecard/?igsh=MTV0cGRzZXNzMmw3ZQ== "
              target="blank"
              variants={FadeIn("up", 1, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5em"
                viewBox="0 0 14 14"
                className="hover:text-accent cursor-pointer w-5 md:w-6"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.333 3.644a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5"></path>
                  <path d="M.858 3.431A2.573 2.573 0 0 1 3.431.858h6.862a2.573 2.573 0 0 1 2.573 2.573v6.862a2.573 2.573 0 0 1-2.573 2.573H3.43a2.573 2.573 0 0 1-2.573-2.573V3.43Z"></path>
                  <path d="M4.312 6.862a2.55 2.55 0 1 0 5.1 0a2.55 2.55 0 1 0-5.1 0"></path>
                </g>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sivanesh-raja-2aa575240"
              target="blank"
              variants={FadeIn("up", 1.2, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="hover:text-accent cursor-pointer w-5 md:w-6"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02c3.951 0 4.889 2.118 4.889 6.004V22h-4v-6.312c0-2.213-.535-3.461-1.897-3.461c-1.889 0-2.674 1.345-2.674 3.46V22h-4zM2.57 21.83h4V8.799h-4zM7.143 4.55a2.53 2.53 0 0 1-.753 1.802a2.57 2.57 0 0 1-1.82.748a2.6 2.6 0 0 1-1.818-.747A2.55 2.55 0 0 1 2 4.55c0-.677.27-1.325.753-1.803A2.58 2.58 0 0 1 4.571 2c.682 0 1.336.269 1.819.747s.753 1.126.753 1.803"
                  clipRule="evenodd"
                ></path>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=100005058169350"
              target="blank"
              variants={FadeIn("up", 1.4, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 20 20"
                className="hover:text-accent cursor-pointer w-5 md:w-6"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.578v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99c1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.596-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"
                ></path>
              </svg>
            </motion.a>
            <motion.a
              href="http://Wa.me/+917010037476"
              target="blank"
              variants={FadeIn("up", 1.6, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="hover:text-accent cursor-pointer w-5 md:w-6"
              >
                <g fill="none">
                  <g clipPath="url(#akarIconsWhatsappFill0)">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967s-.47-.148-.669.15c-.198.297-.767.966-.94 1.164c-.174.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.019-.458.13-.606c.134-.133.297-.347.446-.52s.198-.298.297-.497c.1-.198.05-.371-.025-.52c-.074-.149-.668-1.612-.916-2.207c-.241-.579-.486-.5-.668-.51c-.174-.008-.372-.01-.57-.01s-.52.074-.792.372c-.273.297-1.04 1.016-1.04 2.479c0 1.462 1.064 2.875 1.213 3.074s2.095 3.2 5.076 4.487c.71.306 1.263.489 1.694.625c.712.227 1.36.195 1.872.118c.57-.085 1.758-.719 2.006-1.413s.247-1.289.173-1.413s-.272-.198-.57-.347m-5.422 7.403h-.004a9.87 9.87 0 0 1-5.032-1.378l-.36-.214l-3.742.982l.999-3.648l-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.436-9.884 9.889-9.884a9.8 9.8 0 0 1 6.988 2.899a9.82 9.82 0 0 1 2.892 6.992c-.002 5.45-4.436 9.885-9.884 9.885m8.412-18.297A11.82 11.82 0 0 0 11.992 0C5.438 0 .102 5.335.1 11.892a11.86 11.86 0 0 0 1.587 5.945L0 24l6.304-1.654a11.9 11.9 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.48-8.413"
                      clipRule="evenodd"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="akarIconsWhatsappFill0">
                      <path fill="#fff" d="M0 0h24v24H0z"></path>
                    </clipPath>
                  </defs>
                </g>
              </svg>
            </motion.a>

            <motion.a
              href="https://github.com/sivaneshkkf?tab=repositories"
              target="blank"
              variants={FadeIn("up", 1.8, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
            >
              <svg
                className="hover:text-accent cursor-pointer w-6 md:w-7 sm:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                  clipRule="evenodd"
                ></path>
              </svg>
            </motion.a>

            <motion.div
              href="http://Wa.me/+917010037476"
              target="blank"
              variants={FadeIn("up", 1.6, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="absolute top-[25px] left-[60px] sm:static"
            >
              <div className="flex justify-center gap-1 items-center shadow-lg opacity-50 sm:opacity-100">
                <Tooltip title="Views">
                  <div className="flex bg-[#0b1f35] dark:bg-white h-6 sm:h-7 dark:bg-opacity-5 bg-opacity-60 sm:bg-opacity-40 rounded overflow-hidden items-center justify-center">
                    <div className="bg-[#081625] w-6 sm:w-7 flex justify-center items-center dark:bg-dark-primary bg-opacity-40">
                      <IconButton>
                        <VisibilityIcon
                          sx={{ color: "#A5A7A9", fontSize: "1rem" }}
                        />
                      </IconButton>
                    </div>
                    <h4 className="text-zinc-400 text-xs sm:text-sm font-normal px-1 sm:px-3">
                      {NumberFormatter(views)}
                      <span className="text-[9px] sm:text-[10px] sm:ml-1">
                        {" "}
                        Views
                      </span>
                    </h4>
                  </div>
                </Tooltip>
                <div className={`${loginStatus ? "block" : "hidden"}`}>
                  <Tooltip title="Dashboard" onClick={() => setDashboardOpen(true)}>
                    <div className="flex bg-[#0b1f35] dark:bg-white h-6 sm:h-7 dark:bg-opacity-5 bg-opacity-60 sm:bg-opacity-40 rounded overflow-hidden items-center justify-center">
                      <div className="bg-[#081625] w-6 sm:w-7 flex justify-center items-center dark:bg-dark-primary bg-opacity-40">
                        <IconButton>
                          <SpaceDashboardIcon
                            sx={{ color: "#A5A7A9", fontSize: "1rem" }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={FadeIn("up", 1.8, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="ml-auto"
            >
              <PopupShareBtn
                popupState={popupState}
                setPopupState={setPopupState}
              />
            </motion.div>
          </div>
        </div>
        <div className=" w-full h-[1px] bg-secondary md:mt-5 mt-1"></div>

        <div className={`w-full ${loginStatus ? "block" : "hidden"}`}>
          <Dashboard />
        </div>
      </div>

      <div
        className="absolute top-5 sm:top-6 lg:top-8 left-5 sm:w-10 sm:h-10 w-8 h-8 border border-dark-textpara rounded-full flex items-center justify-center opacity-50 hover:opacity-80 cursor-pointer transition-all duration-300"
        onClick={() => setLoginFormOpen(true)}
      >
        <span className="text-dark-textpara">
          <svg
            className="sm:w-5 sm:h-5 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 14 16"
          >
            <path
              fillRule="evenodd"
              d="M7 6.75V12h4V8h1v4c0 .55-.45 1-1 1H7v3l-5.45-2.72c-.33-.17-.55-.52-.55-.91V1c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v3h-1V1H3l4 2v2.25L10 3v2h4v2h-4v2L7 6.75z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

export default Indroduction;
