import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import NavLi from "./NavLi";
import sectionIDS from "../data/SectionIDS";
import { HeadingContext } from "../context/HeadingContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrolContext } from "../varients/ScrolContext";

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
    <div className=" bg-white fixed top-0 left-0 right-0 z-50 overflow-hidden">
      <div className=" py-3 sm:px-4 md:px-10 flex items-center gap-4 relative">
        <div className="hidden sm:flex items-center gap-4 flex-1">
          <p className="text-textHead text-xl font-black md:text-2xl">
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
                <svg
                  className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.home.navId ? "w-10 h-10" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 20c-4.4 0-8-3.6-8-8s3.6-8 8-8s8 3.6 8 8s-3.6 8-8 8m0-18C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-1 12h2v3h3v-5h2l-6-5l-6 5h2v5h3z"
                  ></path>
                </svg>
              </span>
            </NavLi>
            <NavLi
              name="About Me"
              onClick={(e) => handleClick(e, sectionIDS.aboutME.navId,sectionIDS.aboutME.sectionId)}
              id={sectionIDS.aboutME.navId}
            >
              <span className="sm:hidden">
                <svg
                   className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.aboutME.navId ? "w-10 h-10" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 0 0-9-9m0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m0 14.3a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22"
                  ></path>
                </svg>
              </span>
            </NavLi>
            <NavLi
              name="Skills"
              onClick={(e) => handleClick(e, sectionIDS.skills.navId,sectionIDS.skills.sectionId)}
              id={sectionIDS.skills.navId}
            >
              <span className="sm:hidden">
                <svg
                 className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.skills.navId ? "w-10 h-10" : ""}`}
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                  fill="curentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0002 3C9.23021 3 6.19021 5.95 6.00021 9.66L4.08021 12.19C3.84021 12.5 4.08021 13 4.50021 13H6.00021V16C6.00021 17.11 6.89021 18 8.00021 18H9.00021V21H16.0002V16.31C18.3702 15.19 20.0002 12.8 20.0002 10C20.0002 6.14 16.8802 3 13.0002 3ZM14.0002 14H12.0002V13H14.0002V14ZM15.6002 9.5C15.3339 9.94967 14.9547 10.322 14.5002 10.58V12H11.5002V10.58C10.0702 9.75 9.57021 7.92 10.4002 6.5C11.2302 5.08 13.0702 4.56 14.5002 5.38C15.9302 6.2 16.4302 8.05 15.6002 9.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </NavLi>
            <NavLi
              name="Projects"
              onClick={(e) => handleClick(e, sectionIDS.projects.navId,sectionIDS.projects.sectionId)}
              id={sectionIDS.projects.navId}
            >
              <span className="sm:hidden">
                <svg
                 className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.projects.navId ? "w-10 h-10" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="2em"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  <circle cx="12" cy="6" r="1" fill="currentColor"></circle>
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    d="M6 17h12v2H6zm4-5.17l2.792 2.794l3.932-3.935L18 12V8h-4l1.31 1.275l-2.519 2.519L10 9l-4 4l1.414 1.414z"
                  ></path>
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    d="M19 3h-3.298a5 5 0 0 0-.32-.425l-.01-.012a4.43 4.43 0 0 0-2.89-1.518a2.6 2.6 0 0 0-.964 0a4.43 4.43 0 0 0-2.89 1.518l-.01.012a5 5 0 0 0-.32.424V3H5a3.003 3.003 0 0 0-3 3v14a3.003 3.003 0 0 0 3 3h14a3.003 3.003 0 0 0 3-3V6a3.003 3.003 0 0 0-3-3m1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.55a2.5 2.5 0 0 1 4.9 0H19a1 1 0 0 1 1 1Z"
                  ></path>
                </svg>
              </span>
            </NavLi>
            <NavLi
              name="Resume"
              onClick={(e) => handleClick(e, sectionIDS.resume.navId,sectionIDS.resume.sectionId)}
              id={sectionIDS.resume.navId}
            >
              <span className="sm:hidden">
                <svg
                 className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.resume.navId ? "w-10 h-10" : ""}`}
                  width="1.6em"
                  height="1.9em"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 0H1.5C0.675 0 0 0.675 0 1.5V14.5C0 15.325 0.675 16 1.5 16H13.5C14.325 16 15 15.325 15 14.5V1.5C15 0.675 14.325 0 13.5 0ZM13 14H2V2H13V14ZM4 9H11V10H4V9ZM4 11H11V12H4V11ZM5 4.5C5.00007 4.30295 5.03894 4.10785 5.11441 3.92582C5.18988 3.7438 5.30046 3.57842 5.43984 3.43913C5.57922 3.29984 5.74467 3.18937 5.92675 3.11403C6.10882 3.03868 6.30395 2.99993 6.501 3C6.69805 3.00007 6.89315 3.03894 7.07518 3.11441C7.2572 3.18988 7.42258 3.30046 7.56187 3.43984C7.70116 3.57922 7.81163 3.74467 7.88697 3.92675C7.96232 4.10882 8.00107 4.30395 8.001 4.501C8.00087 4.89896 7.84265 5.28056 7.56116 5.56187C7.27967 5.84317 6.89796 6.00113 6.5 6.001C6.10204 6.00087 5.72044 5.84265 5.43913 5.56116C5.15783 5.27967 4.99987 4.89796 5 4.5ZM7.5 6H5.5C4.675 6 4 6.45 4 7V8H9V7C9 6.45 8.325 6 7.5 6Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </NavLi>
            <NavLi
              name="Contact"
              onClick={(e) => handleClick(e, sectionIDS.contact.navId,sectionIDS.contact.sectionId)}
              id={sectionIDS.contact.navId}
            >
              <span className="sm:hidden">
                <svg
                   className={`transition-all duration-200 ${visibleSection.navLiId === sectionIDS.contact.navId ? "w-10 h-10" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.192 11.192h6.616V6.577h-6.616zm3.308-1.134l-2.461-1.712v-.884L17.5 9.173l2.462-1.711v.884zM2.616 19.616q-.691 0-1.153-.463T1 18V6q0-.69.463-1.153t1.152-.463h18.77q.69 0 1.153.463T23 6v12q0 .69-.462 1.153t-1.153.463zM9 14.23q1.039 0 1.77-.731t.73-1.77t-.73-1.768T9 9.23t-1.77.73t-.73 1.77t.73 1.769t1.77.73m-5.784 4.386h11.569q-1.05-1.356-2.554-2.178T9 15.616t-3.23.822t-2.554 2.178"
                  ></path>
                </svg>
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
