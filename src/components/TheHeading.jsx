import { useContext, useEffect } from "react";
import { HeadingContext } from "../context/HeadingContext";

function TheHeading({heading,id}) {

  const {visibleSection,setVisibleSection}= useContext(HeadingContext);

    return ( 
        
      <div className="w-fit mx-auto">
        <h4 className="text-textHead text-md md:text-2xl font-bold text-center">
          {heading}
        </h4>
        <div
        className={`md:h-1 h-[2px] bg-accent transition-all duration-1000 ${visibleSection.sectionId === id ? "w-full" : "w-0"}`}
      ></div>
      </div>
     );
}

export default TheHeading;