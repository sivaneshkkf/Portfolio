import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import RoadMapLi from "./RoadMapLi";
import { motion } from "framer-motion";
import codingLaptop from "../images/codingLaptop.png";
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { RoadMapIcons } from "../data/RoadMapData";
import { useContext, useEffect, useState } from "react";
import { Theme } from "../context/HeadingContext";
import { set } from "zod";

function RoadMap() {
  const [sliderVal, setSliderVal] = useState(0)

  const {theme, setTheme} = useContext(Theme)


  const [progressValue, setProgressValue] = useState(0);

  return (
    <div className="sm:pt-14 pt-5">
      <div className="px-10 pt-10 w-fit rounded-t-full relative mx-auto">
        <div className="w-fit sm:pt-3 sm:px-9 pt-2 px-5 overflow-hidden dark:bg-dark-secondary bg-secondary flex justify-center items-end rounded-t-full">
          <p className="text-center absolute sm:top-12 top-[46px] sm:text-xs text-[8px] text-textHead dark:text-dark-textHead">Learning . . .</p>
          <img
            src={codingLaptop}
            alt="aboutMeDesk"
            className="sm:max-w-56 max-w-32 object-end"
          />
        </div>

        <div className="absolute sm:w-[385px] w-[230px] sm:h-48 h-[118px]  text-sm font-bold bottom-0 left-1/2 transform -translate-x-1/2 saturate-200">
          <CircularProgressbar
            className="-rotate-90 duration-300"
            value={100}
            text={``}
            strokeWidth={0.2}
            styles={buildStyles({
              // Path color (progress bar color)
              pathColor:
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)",
              textColor: theme === "dark" ? "#fff" : "#000",
              // Trail color (background path color)
              trailColor: "rgba(255,255,255,0)",
              textSize: "24px",
            })}
          />
        </div>

        <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:w-[300px] w-[170px] sm:h-[150px] h-[86px] overflow-hidden"
        onViewportEnter={() => setProgressValue(25)}
        onViewportLeave={() => setProgressValue(0)}>
        <CircularProgressbar
            className="-rotate-90 duration-1000"
            value={progressValue}
            text={``}
            strokeWidth={1}
            styles={buildStyles({
              // Path color (progress bar color)
              pathColor:"#FF0051",
              textColor: theme === "dark" ? "#fff" : "#000",
              // Trail color (background path color)
              trailColor: "rgba(0,0,0,0.3)",
              textSize: "24px",
            })}
          />
        </motion.div>

        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ rotate: 180, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }} // Rotates the half-circle 180 degrees
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="relative flex justify-center items-center sm:w-[400px] sm:h-[90px] w-[200px] h-[95px]" // Adjust width for half-circle
          >
            {RoadMapIcons.map((item, index) => (
              <RoadMapLi key={index} index={index} status={item.status}>
                {item.svg ? item.svg() : <FontAwesomeIcon icon={item.icon} />}
              </RoadMapLi>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default RoadMap;
