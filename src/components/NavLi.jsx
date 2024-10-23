import { useContext, useEffect, useState } from "react";
import { NavLiContext } from "../context/NavLiContext";
import { HeadingContext } from "../context/HeadingContext";

function NavLi({ name, onClick, id }) {
  const { activeLi, setActiveLi } = useContext(NavLiContext);
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);

  // if(visibleSection){
  //   setActiveLi(null)
  // }

  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    if (activeLi === id || visibleSection === id) {
      const timer = setTimeout(() => {
        setShowLine(true); // Show the line after 100ms
      }, 200);
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setShowLine(false); // Hide the line immediately if not active or visible
    }
  }, [activeLi, visibleSection]); // Re-run effect on activeLi, visibleSection, or id change
    

  return (
    <li className="group">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          onClick(); // Call onClick to trigger state change
        }}
        className="hover:text-accent"
      >
        {name}
      </a>

      <div
        className={`h-1 bg-accent transition-all duration-500 ${
          showLine ? "w-full" : "w-0"
        }`}
      ></div>
    </li>
  );
}

export default NavLi;
