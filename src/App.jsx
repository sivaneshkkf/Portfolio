import React, { useEffect, useRef, useState } from "react";
import TheNaveBar from "./components/TheNaveBar";
import AboutMe from "./pages/AboutMe";
import Indroduction from "./pages/Indroduction";
import SKills from "./pages/Skills";
import { HeadingContext } from "./context/HeadingContext";
import sectionID from "./data/sectionIdData"
import Projects from "./pages/Projects";

function App() {
  const [visibleSection, setVisibleSection] = useState(null);

  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectRef = useRef(null);

  const sections = [
    { ref: introRef, id: sectionID.home },
    { ref: aboutRef, id: sectionID.aboutME },
    { ref: skillsRef, id: sectionID.skills },
    { ref: projectRef, id: sectionID.project},
  ];

  const handleScroll = () => {
    sections.forEach(section => {
      const { ref, id } = section;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.8; // Check if section is in view

        if (isVisible) {
          setVisibleSection(id); // Update visible section
          //console.log(`${id} is visible`); // Perform action when section is visible
        }
      }
    });
  };

  

  function handleONclick() {
    const element = document.getElementById("MYSKILLS")
    console.log(element)
    console.log(sectionID.skills)
    element.scrollIntoView({ behavior: 'smooth' });
  }
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <HeadingContext.Provider value={{ visibleSection, setVisibleSection }}>
        <TheNaveBar />
        <div ref={introRef} id={sectionID.home}>
          <Indroduction />
        </div>
        <div ref={aboutRef} id={sectionID.aboutME} onClick={handleONclick}>
          <AboutMe />
        </div>
        <div ref={skillsRef} id={sectionID.skills}>
          <SKills />
        </div>
        <div ref={projectRef} id={sectionID.project}>
          <Projects />
        </div>
      </HeadingContext.Provider>
    </div>
  );
}

export default App;
