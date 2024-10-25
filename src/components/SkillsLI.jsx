import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim"; 

function SkillsLi({ svg, name, hoverCol, svgCol }) {

  return (
    <motion.li className="dark:bg-dark-primary flex flex-col items-center z-10 justify-center shadow-cardShadow rounded-lg p-2 gap-2 group relative overflow-hidden w-24 h-24 sm:w-36 sm:h-36"
    variants={FadeIn("up",0.2)}
    initial="hidden"
    whileInView={"show"}
    viewport={{once: false}}>
        
      <span
        className="w-10 h-10 sm:w-20 sm:h-20"
        dangerouslySetInnerHTML={{ __html: svg }}>

        </span>{" "}
      {/* This will render the SVG */}
      <p className="text-textHead dark:text-dark-textHead text-xs sm:text-sm font-bold text-center group-hover:text-white">
        {name}
      </p>
      <div
        className={
          `w-0 h-0 -z-10 absolute transition-all duration-200 rounded-full ` +
          "group-hover:w-full group-hover:h-full group-hover:rounded-none"
        }
        style={{ background: `${hoverCol}` }}
      ></div>
    </motion.li>
  );
}

export default SkillsLi;
