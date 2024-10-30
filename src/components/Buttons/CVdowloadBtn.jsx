import { Repeat } from "@mui/icons-material";
import { duration } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

function CVdownloadBtn({ rotateX, rotateY, progressValue }) {
  return (
    <motion.button
      style={{ perspective: "2000px" }}
      className="absolute sm:-bottom-8 sm:right-6 -bottom-6 right-4"
      initial={{ scale: 0.3 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, type: "spring", delay: 0.2 }}
    >
      <motion.div
        className=""
        style={{
          rotateX,
          rotateY,
          transform: "translateZ(1000px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative sm:w-14 sm:h-14 w-10 h-10 z-0">
          <div className="absolute sm:-inset-2 -inset-1 -z-10 bg-accent rounded-full opacity-30 shadow-2xl shadow-black"></div>
          <div
            className={`absolute -z-10 rounded-full transition-all duration-500 ${
              progressValue > 0 ? "sm:-inset-[4px] -inset-[2px]" : "inset-0"
            }`}
            style={{
              backgroundImage: `conic-gradient(
                    #ffffff ${progressValue}%, /* Primary color for filled progress */
                    #000000 ${0}% /* Background color for unfilled progress */
                  )`,
            }}
          ></div>
          <div className="absolute inset-0 rounded-full bg-dark-primary flex flex-col justify-center items-center z-10 overflow-hidden shadow-md shadow-black">
            <AnimatePresence>
              <motion.svg
                className="text-white absolute text-xs sm:text-sm"
                key="checkmark" // Key is important for AnimatePresence to track this element
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                animate={progressValue === 100 ? { y: 0 } : { y: -50 }}
                exit={{ y: 50, opacity: 0 }} // Exit animation moving down and fading out
                transition={{ duration: 0.8, type: "spring", ease: "easeOut" }}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m2.75 8.75l3.5 3.5l7-7.5"
                ></path>
              </motion.svg>
            </AnimatePresence>
            <motion.span
              className="text-white"
              animate={progressValue > 0 ? { scale: 1.2 } : { scale: 1 }}
            >
              <motion.svg
                className="w-4 h-4 sm:w-6 sm:h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                animate={
                  progressValue > 0 && progressValue < 100
                    ? { y: [1, 10, 10, 1] } // Animate when progress is greater than 0
                    : progressValue === 100
                    ? { y: 80 } // Set position when progress is complete
                    : { y: 0 } // Reset position when progress is 0
                }
                transition={{
                  duration: 0.8, // Apply duration only when animating
                  repeat: progressValue > 0 && progressValue < 100 ? Infinity : 0, // Repeat only when progress is greater than 0
                }}
              >
                <path
                  fill="currentColor"
                  d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1"
                ></path>
              </motion.svg>
            </motion.span>
            <motion.p
              className="text-white text-xs sm:text-sm sm:font-semibold font-medium"
              initial={{ y: 0 }}
              animate={
                progressValue > 0
                  ? { y: 100 }
                  : { y: 0 }
              }
              transition={{ duration: 1.5, type: "spring" }}
            >
              CV
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default CVdownloadBtn;
