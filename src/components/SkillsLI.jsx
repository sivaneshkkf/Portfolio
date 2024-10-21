import { useState } from "react";

function SkillsLi({ svg, name, hoverCol, svgCol }) {

  return (
    <li className="flex flex-col items-center z-10 justify-center shadow-cardShadow rounded-lg p-4 w-44 h-48 gap-2 group relative overflow-hidden">
        
      <span
        dangerouslySetInnerHTML={{ __html: svg }}
      />{" "}
      {/* This will render the SVG */}
      <p className="text-textHead text-sm font-bold text-center group-hover:text-white">
        {name}
      </p>
      <div
        className={
          `w-0 h-0 -z-10 absolute transition-all duration-200 rounded-full ` +
          "group-hover:w-full group-hover:h-full group-hover:rounded-none"
        }
        style={{ background: `${hoverCol}` }}
      ></div>
    </li>
  );
}

export default SkillsLi;
