import React, { useEffect, useRef, useState } from "react";
import TheNaveBar from "./components/TheNaveBar";
import AboutMe from "./pages/AboutMe";
import Indroduction from "./pages/Indroduction";
import SKills from "./pages/Skills";
import { HeadingContext } from "./context/HeadingContext";
import sectionIDS from "./data/SectionIDS";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { ScrolContext } from "./varients/ScrolContext";
import ThemeBtn from "./components/ThemeBtn";

function App() {
  const [visibleSection, setVisibleSection] = useState({
    navLiId: sectionIDS.home.navId,
    sectionId: sectionIDS.home.sectionId,
  });

  const [scrolEnable, setScrollEnable] = useState(true);

  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    {
      ref: introRef,
      sectionId: sectionIDS.home.sectionId,
      navId: sectionIDS.home.navId,
    },
    {
      ref: aboutRef,
      sectionId: sectionIDS.aboutME.sectionId,
      navId: sectionIDS.aboutME.navId,
    },
    {
      ref: skillsRef,
      sectionId: sectionIDS.skills.sectionId,
      navId: sectionIDS.skills.navId,
    },
    {
      ref: projectRef,
      sectionId: sectionIDS.projects.sectionId,
      navId: sectionIDS.projects.navId,
    },
    {
      ref: resumeRef,
      sectionId: sectionIDS.resume.sectionId,
      navId: sectionIDS.resume.navId,
    },
    {
      ref: contactRef,
      sectionId: sectionIDS.contact.sectionId,
      navId: sectionIDS.contact.navId,
    },
  ];

  // Function to handle scroll event and update visible section
  const handleScroll = () => {
    if (scrolEnable) {
      sections.forEach((section) => {
        const { ref, sectionId, navId } = section;
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.4;

          if (isVisible) {
            setVisibleSection({ navLiId: navId, sectionId: sectionId });
          }
        }
      });
    }
  };

  // Scroll to the current section based on visibleSection changes
  useEffect(() => {

    if(!scrolEnable){
      const element = document.getElementById(visibleSection.sectionId);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = window.pageYOffset + elementPosition;
        const navbarHeight = document.querySelector("#navBar").offsetHeight;
  
        window.scrollTo({
          top: offsetPosition - navbarHeight - 60,
          behavior: "smooth",
        });
      }
    }
   
  }, [visibleSection.navLiId]);

  // Enable scrolling when using the mouse wheel
  useEffect(() => {
    const handleWheelScroll = () => {
      setScrollEnable(true); // Enable scrolling when wheel event is triggered
    };

    document.addEventListener("wheel", handleWheelScroll);

    return () => {
      document.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  // Listen for the scroll event and update visible sections
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolEnable]);

  return (
    <div>
      <ScrolContext.Provider value={{ scrolEnable, setScrollEnable }}>
        <HeadingContext.Provider value={{ visibleSection, setVisibleSection }}>
          <div id="navBar">
            <TheNaveBar />
          </div>
          <div ref={introRef} id={sectionIDS.home.sectionId}>
            <Indroduction />
          </div>
          <div ref={aboutRef} id={sectionIDS.aboutME.sectionId}>
            <AboutMe />
          </div>
          <div ref={skillsRef} id={sectionIDS.skills.sectionId}>
            <SKills />
          </div>
          <div ref={projectRef} id={sectionIDS.projects.sectionId}>
            <Projects />
          </div>
          <div ref={resumeRef} id={sectionIDS.resume.sectionId}>
            <Resume />
          </div>
          <div ref={contactRef} id={sectionIDS.contact.sectionId}>
            <Contact />
          </div>
          <Footer />
          <ThemeBtn/>
        </HeadingContext.Provider>
      </ScrolContext.Provider>
    </div>
  );
}

export default App;
