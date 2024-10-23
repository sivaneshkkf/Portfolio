import { useContext, useEffect } from "react";
import NavLi from "./NavLi";
import sectionID from "../data/sectionIdData.json";
import { NavLiContext } from "../context/NavLiContext";
import { HeadingContext } from "../context/HeadingContext";

function TheNaveBar() {
  const { activeLi, setActiveLi } = useContext(NavLiContext);
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);

  function handleClick(id) {
    setActiveLi(id); // Update the active section
  }

  // useEffect(() => {
  //   setActiveLi(visibleSection);
  // }, [visibleSection]);

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
              id={sectionID.projects}
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
          <a href="https://github.com/sivaneshkkf?tab=repositories" target="blank">
          <span className="text-accent">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient1 blur-[2px]"></div>
    </div>
  );
}

export default TheNaveBar;
