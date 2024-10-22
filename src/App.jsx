import React, { useEffect, useRef, useState } from "react";
import TheNaveBar from "./components/TheNaveBar";
import AboutMe from "./pages/AboutMe";
import Indroduction from "./pages/Indroduction";
import SKills from "./pages/Skills";
import { HeadingContext } from "./context/HeadingContext";
import sectionID from "./data/sectionIdData";
import Projects from "./pages/Projects";
import { NavLiContext } from "./context/NavLiContext";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

function App() {
  const [visibleSection, setVisibleSection] = useState(null);
  const [activeLi, setActiveLi] = useState(sectionID.home);

  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { ref: introRef, id: sectionID.home },
    { ref: aboutRef, id: sectionID.aboutME },
    { ref: skillsRef, id: sectionID.skills },
    { ref: projectRef, id: sectionID.projects },
    { ref: resumeRef, id: sectionID.resume },
    { ref: contactRef, id: sectionID.contact },
  ];

  const handleScroll = () => {
    sections.forEach((section) => {
      const { ref, id } = section;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.1;

        if (isVisible) {
          setVisibleSection(id);
        }
      }
    });
  };

  useEffect(() => {
    const element = document.getElementById(activeLi);
    console.log(element)
    console.log(activeLi)
   
  if (element) {
    // Get the element's position relative to the top of the viewport
    const elementPosition = element.getBoundingClientRect().top;

    

    // Get the current scroll position (how far the user is scrolled from the top of the page)
    const offsetPosition = window.pageYOffset + elementPosition;

    // Calculate the height of the navbar (replace `.navbar-class` with the actual class/ID of your navbar)
    const navbarHeight = document.querySelector("#navBar").offsetHeight; 

    // Scroll to the calculated position minus the navbar height
    window.scrollTo({
      top: offsetPosition - navbarHeight-60,
      behavior: "smooth",
    });
  }
  }, [activeLi]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <HeadingContext.Provider value={{ visibleSection, setVisibleSection }}>
        <NavLiContext.Provider value={{ activeLi, setActiveLi }}>
          <div id="navBar">
            <TheNaveBar />
          </div>
          <div ref={introRef} id={sectionID.home}>
            <Indroduction />
          </div>
          <div ref={aboutRef} id={sectionID.aboutME}>
            <AboutMe />
          </div>
          <div ref={skillsRef} id={sectionID.skills}>
            <SKills />
          </div>
          <div ref={projectRef} id={sectionID.projects}>
            <Projects />
          </div>
          <div ref={resumeRef} id={sectionID.resume}>
            <Resume />
          </div>
          <div ref={contactRef} id={sectionID.contact}>
            <Contact />
          </div>
        </NavLiContext.Provider>
      </HeadingContext.Provider>
    </div>
  );
}

export default App;
