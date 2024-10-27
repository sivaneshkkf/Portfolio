import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import RoadMapLi from "./RoadMapLi";
import { motion } from "framer-motion";
import codingLaptop from "../images/codingLaptop.png";
import CircularSlider from '@fseehawer/react-circular-slider';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { RoadMapIcons } from "../data/RoadMapData";
import { useContext, useState } from "react";
import { Theme } from "../context/HeadingContext";

function RoadMap() {
  const [sliderVal, setSliderVal] = useState(0)

  const {theme, setTheme} = useContext(Theme)
  

  return (
    <div className="sm:pt-14 pt-5 px-10">
      <div className="px-10 pt-10 w-fit rounded-t-full relative mx-auto">
        <div className="w-fit sm:pt-3 sm:px-9 pt-2 px-5 overflow-hidden dark:bg-dark-secondary bg-secondary flex justify-center items-end rounded-t-full">
          <img
            src={codingLaptop}
            alt="aboutMeDesk"
            className="sm:max-w-56 max-w-32"
          />
        </div>

        <div className="absolute sm:w-[400px] w-[233px] sm:h-52 h-[125px]  text-sm font-bold bottom-0 left-1/2 transform -translate-x-1/2 saturate-200">
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

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:w-[300px] w-[150px] sm:h-40 h-[130px] overflow-hidden">
        <CircularProgressbar
            className="-rotate-90 duration-300"
            value={25}
            text={``}
            strokeWidth={0.5}
            styles={buildStyles({
              // Path color (progress bar color)
              pathColor:"#FF0051",
              textColor: theme === "dark" ? "#fff" : "#000",
              // Trail color (background path color)
              trailColor: "rgba(255,255,255,0.2)",
              textSize: "24px",
            })}
          />
        </div>

        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ rotate: 180, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }} // Rotates the half-circle 180 degrees
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            className="relative flex justify-center items-center sm:w-[400px] sm:h-[100px] w-[200px] h-[105px]" // Adjust width for half-circle
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
