import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import RoadMapLi from "./RoadMapLi";
import { motion } from "framer-motion";
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { RoadMapIcons } from "../data/RoadMapData";


function RoadMap() {

  return (
    <div className="pt-10 px-10 ">
      <div className="px-10 pt-10 w-fit rounded-t-full relative mx-auto">
        <div className="w-fit pt-10 px-16 overflow-hidden bg-zinc-800 flex justify-center items-end rounded-t-full">
          <img
            src="./src/images/codingLaptop.png"
            alt="aboutMeDesk"
            className="max-w-48"
          />
        </div>

        <div className="absolute w-[400px] h-52 text-sm font-bold bottom-0 left-1/2 transform -translate-x-1/2 saturate-200">
          <CircularProgressbar
            className="-rotate-90 duration-300"
            value={100}
            text={``}
            strokeWidth={0.2}
            styles={buildStyles({
              // Path color (progress bar color)
              pathColor: "rgba(255,255,255,0.2)", // Adjust color as needed
              // Text color
              textColor: "#f88",
              // Trail color (background path color)
              trailColor: "rgba(255,255,255,0)",
              textSize: "24px",
            })}
          />
        </div>

        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{opacity:0}}
           whileInView={{ rotate: 180, opacity:1}}
           viewport={{once:true, amount:0.5}} // Rotates the half-circle 180 degrees
           transition={{ duration: 2, ease: "easeInOut", delay:0.5 }}
           className="relative flex justify-center items-center w-[400px] h-[100px]" // Adjust width for half-circle
          >
            {RoadMapIcons.map((item, index) => (
              <RoadMapLi key={index} index={index} scale={1}>
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
