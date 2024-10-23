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
import Footer from "./pages/Footer";

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

  // Modified setActiveLi to set visibleSection to null
  const handleSetActiveLi = (id) => {
    setActiveLi(id);
    setVisibleSection(null); // Reset visibleSection when setting activeLi
  };

  // Modified setVisibleSection to set activeLi to null
  const handleSetVisibleSection = (id) => {
    setVisibleSection(id);
    setActiveLi(null); // Reset activeLi when setting visibleSection
  };

  // Function to handle scroll event and update visible section
  const handleScroll = () => {
    sections.forEach((section) => {
      const { ref, id } = section;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.6;

        if (isVisible) {
          handleSetVisibleSection(id);
        }
      }
    });
  };

  useEffect(() => {
    const element = document.getElementById(activeLi);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition;
      const navbarHeight = document.querySelector("#navBar").offsetHeight;

      window.scrollTo({
        top: offsetPosition - navbarHeight - 60,
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
      <HeadingContext.Provider value={{ visibleSection, setVisibleSection: handleSetVisibleSection }}>
        <NavLiContext.Provider value={{ activeLi, setActiveLi: handleSetActiveLi }}>
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
          <Footer />
        </NavLiContext.Provider>
      </HeadingContext.Provider>
    </div>
  );
}

export default App;
