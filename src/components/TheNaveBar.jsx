import { useContext, useEffect } from "react";
import NavLi from "./NavLi";
import sectionID from "../data/sectionIdData.json";
import { NavLiContext } from "../context/NavLiContext";
import { HeadingContext } from "../context/HeadingContext";

function TheNaveBar() {
  const { activeLi, setActiveLi } = useContext(NavLiContext);
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);

  function handleClick(state) {
    setActiveLi(state); // Update the active section
  }

  useEffect(() => {
    setActiveLi(visibleSection);
  }, [visibleSection]);

  return (
    <div className=" bg-white fixed top-0 left-0 right-0 z-50 overflow-hidden">
      <div className=" py-3 px-4 md:px-10 flex items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <p className="text-textHead text-xl font-black md:text-2xl">
            Web
            <span className="text-accent text-xl font-black md:text-2xl">
              Developer
            </span>
          </p>
          <img src="../src/images/logo.png" alt="" className="w-14" />
        </div>

        <div className="flex gap-6 items-center">
          <ul className="flex gap-4 text-textHead text-sm font-bold">
            <NavLi
              name="Home"
              onClick={() => handleClick(sectionID.home)}
              id={sectionID.home}
            />
            <NavLi
              name="About Me"
              onClick={() => handleClick(sectionID.aboutME)}
              id={sectionID.aboutME}
            />
            <NavLi
              name="Skills"
              onClick={() => handleClick(sectionID.skills)}
              id={sectionID.skills}
            />
            <NavLi
              name="Projects"
              onClick={() => handleClick(sectionID.projects)}
              id={sectionID.project}
            />
            <NavLi
              name="Resume"
              onClick={() => handleClick(sectionID.resume)}
              id={sectionID.resume}
            />
            <NavLi
              name="Contact"
              onClick={() => handleClick(sectionID.contact)}
              id={sectionID.contact}
            />
          </ul>
          <img src="../src/images/github.png" alt="" className="w-8" />
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient1 blur-[2px]"></div>
    </div>
  );
}

export default TheNaveBar;
