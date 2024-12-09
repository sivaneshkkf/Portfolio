import { useContext, useEffect, useState } from "react";
import { HeadingContext } from "../context/HeadingContext";

function NavLi({ name, onClick, id, children }) {
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);

  // if(visibleSection){
  //   setActiveLi(null)
  // }

  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    if (visibleSection.navLiId === id) {
      setShowLine(true); // Show the line after 100ms
    } else {
      setShowLine(false); // Hide the line immediately if not active or visible
    }
  }, [visibleSection]); // Re-run effect on activeLi, visibleSection, or id change

  return (
    <li className="group w-full sm:w-fit h-10 flex flex-col items-center justify-center" id={id}>
      <a
        href="#"
        onClick={onClick}
        className={`flex flex-col justify-center items-center text-xs md:text-sm font-medium sm:font-bold 
          ${showLine ? "text-accent" : "dark:text-[#565F64]"} 
          hover:sm:text-accent dark:hover:sm:text-accent`}>
            
        {children && children}
        <p className={`${showLine? "hidden sm:block":""} sm:font-bold sm:dark:text-dark-textHead dark:text-[#565F64]`}>{name}</p>
        
      </a>

      <div
        className={`h-1 bg-accent transition-all duration-500 hidden sm:block ${
          showLine ? "w-full" : "w-0"
        }`}
      ></div>
    </li>
  );
}

export default NavLi;
