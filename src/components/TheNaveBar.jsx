import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import NavLi from "./NavLi";
import sectionIDS from "../data/SectionIDS";
import { HeadingContext } from "../context/HeadingContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrolContext } from "../varients/ScrolContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faIdBadge, faUserGear, faFileCode, faSheetPlastic, faAddressBook } from '@fortawesome/free-solid-svg-icons'

function TheNaveBar() {
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);

  const [dimensions, setDimensions] = useState({
    width: 0,
    x: 0,
    preX: 0,
    left: 0,
  });

  const {scrolEnable, setScrollEnable } = useContext(ScrolContext)

  // useLayoutEffect(() => {
  //   if (activeLi || visibleSection) {

  //     // console.log(document.getElementById(activeLi))
  //     //   const rect = document
  //     //     .getElementById(sectionID.home)
  //     //     .getBoundingClientRect();
  //     //   const actWidth = Math.floor(rect.width);
  //     //   setDimensions({
  //     //     width: actWidth,
  //     //     x: e.clientX,
  //     //     preX: dimensions.left,
  //     //     left: rect.left,
  //     //   });

  //   }
  // }, [activeLi, visibleSection]); // Re-run effect on activeLi, visibleSection, or id change

  useLayoutEffect(() => {
      const el = document.getElementById(visibleSection.navLiId);
      const rectDefault = el.getBoundingClientRect();
      const actWidth = Math.floor(rectDefault.width);
    setDimensions({
      width: actWidth,
      x: rectDefault.x,
      preX: rectDefault.x, // Set preX to match the initial x position
      left: rectDefault.left,
    });
    
  }, [visibleSection.navLiId]);

  const handleClick = (e, navId, secId) => {
    e.preventDefault();

    setScrollEnable(false)

    setVisibleSection((pre) => ({
      sectionId:secId,
      navLiId: navId,
    })); // Update the active section

  };

  console.log(dimensions);

  console.log(visibleSection.navLiId, sectionIDS.home.navId)

  // useEffect(() => {
  //   setActiveLi(visibleSection);
  // }, [visibleSection]);

  return (
    <div className=" bg-white dark:bg-dark-primary fixed top-0 left-0 right-0 z-50 overflow-hidden">
      <div className=" py-3 sm:px-4 md:px-10 flex items-center gap-4 relative">
        <div className="hidden sm:flex items-center gap-4 flex-1">
          <p className="text-textHead dark:text-dark-textHead text-xl font-black md:text-2xl">
            Web
            <span className="text-accent text-xl font-black md:text-2xl">
              Developer
            </span>
          </p>
          <img src="../src/images/logo.png" alt="" className="w-14" />
        </div>

        <div className="flex gap-6 items-center w-full sm:w-fit">
          <ul className="flex items-end sm:gap-4 text-textHead text-sm font-bold w-full justify-around">
            <NavLi
              name="Home"
              onClick={(e) => handleClick(e, sectionIDS.home.navId,sectionIDS.home.sectionId)}
              id={sectionIDS.home.navId}
            >
              <span className="sm:hidden">
               
              <FontAwesomeIcon icon={faHouse} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.home.navId ? "w-8 h-8" : "w-6 h-6"}`}/>

              </span>
            </NavLi>
            <NavLi
              name="About Me"
              onClick={(e) => handleClick(e, sectionIDS.aboutME.navId,sectionIDS.aboutME.sectionId)}
              id={sectionIDS.aboutME.navId}
            >
              <span className="sm:hidden">
                   
                <FontAwesomeIcon icon={faIdBadge} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.aboutME.navId ? "w-8 h-8" : "w-6 h-6"}`}/>
              </span>
            </NavLi>
            <NavLi
              name="Skills"
              onClick={(e) => handleClick(e, sectionIDS.skills.navId,sectionIDS.skills.sectionId)}
              id={sectionIDS.skills.navId}
            >
              <span className="sm:hidden">
               
                <FontAwesomeIcon icon={faUserGear} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.skills.navId ? "w-8 h-8" : "w-6 h-6"}`}/>
              </span>
            </NavLi>
            <NavLi
              name="Projects"
              onClick={(e) => handleClick(e, sectionIDS.projects.navId,sectionIDS.projects.sectionId)}
              id={sectionIDS.projects.navId}
            >
              <span className="sm:hidden">
                
                <FontAwesomeIcon icon={faFileCode} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.projects.navId ? "w-8 h-8" : "w-6 h-6"}`}/>
              </span>
            </NavLi>
            <NavLi
              name="Resume"
              onClick={(e) => handleClick(e, sectionIDS.resume.navId,sectionIDS.resume.sectionId)}
              id={sectionIDS.resume.navId}
            >
              <span className="sm:hidden">
                
                <FontAwesomeIcon icon={faSheetPlastic} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.resume.navId ? "w-8 h-8" : "w-6 h-6"}`}/>
              </span>
            </NavLi>
            <NavLi
              name="Contact"
              onClick={(e) => handleClick(e, sectionIDS.contact.navId,sectionIDS.contact.sectionId)}
              id={sectionIDS.contact.navId}
            >
              <span className="sm:hidden">
               
                <FontAwesomeIcon icon={faAddressBook} className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.contact.navId ? "w-8 h-8" : "w-6 h-6"}`}/>
              </span>
            </NavLi>
          </ul>
          <a
            href="https://github.com/sivaneshkkf?tab=repositories"
            target="blank"
            className="hidden sm:block"
          >
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
      <motion.div
        className="sm:hidden absolute h-1 bg-accent bottom-0 left-0"
        style={{ width: `${dimensions.width}px` }}
        initial={{ x: dimensions.preX }} // Start from the previous x position
        animate={{ x: dimensions.left }} // Animate to the current x position
        transition={{ duration: 0.5 }} // Optional: Add smooth animation timing
      ></motion.div>
    </div>
  );
}

export default TheNaveBar;
