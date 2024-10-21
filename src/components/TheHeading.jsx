import { useContext, useEffect } from "react";
import { HeadingContext } from "../context/HeadingContext";

function TheHeading({heading}) {

  const {visibleSection,setVisibleSection}= useContext(HeadingContext);

    return ( 
        
      <div className="w-fit mx-auto">
        <h4 className="text-textHead text-2xl font-bold text-center">
          {heading}
        </h4>
        <div
        className={`h-1 bg-accent transition-all duration-500 ${visibleSection === heading ? "w-full" : "w-0"}`}
      ></div>
      </div>
     );
}

export default TheHeading;