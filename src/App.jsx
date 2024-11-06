import React, { useContext, useEffect, useRef, useState } from "react";
import TheNaveBar from "./components/TheNaveBar";
import AboutMe from "./pages/AboutMe";
import Indroduction from "./pages/Indroduction";
import SKills from "./pages/Skills";
import { HeadingContext, Theme } from "./context/HeadingContext";
import sectionIDS from "./data/SectionIDS";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import ThemeBtn from "./components/ThemeBtn";
import FeedBackForm from "./components/FeedBackForm";
import { ScrolContext } from "./context/scrolContext";
import { FeedbackFormContext } from "./context/FeedBackFormContext";
import { useScrollPosition } from "./Utils/ScrollValues";
import Dashboard from "./pages/DashBoard";
import { LoginFormContext, LoginStatus } from "./context/LoginFormContext";
import LoginForm from "./components/LoginForm";
import { DashBoardContext } from "./context/DashBoardContext";
import DashBordWindow from "./components/DashBoardWindow";
import getUserLocation from "./Utils/GetUserLocation";
import useUserLocation from "./Utils/GetUserLocation";

function App() {
  const [visibleSection, setVisibleSection] = useState({
    navLiId: sectionIDS.home.navId,
    sectionId: sectionIDS.home.sectionId,
  });

  const [scrolEnable, setScrollEnable] = useState(true);

  const [feedbackFormOpen, setFeedbackFormOpen] = useState({
    open: false,
    once: false,
  });

  const [dashboardOpen, setDashboardOpen] = useState(false);

  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const { scrollPosition, setScrollPosition } = useScrollPosition();

  const [loginStatus, setLoginStatus] = useState(false);

  const [theme, setTheme] = useState("light");

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
          const isVisible =
            rect.top >= 0 && rect.top < window.innerHeight * 0.4;

          if (isVisible) {
            setVisibleSection({ navLiId: navId, sectionId: sectionId });
          }
        }
      });
    }
  };

  // Scroll to the current section based on visibleSection changes
  useEffect(() => {
    if (!scrolEnable) {
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

    const handleTouch = (e) => {
      if (e.target != "navBar") {
        setScrollEnable(true);
      }
    };

    document.addEventListener("wheel", handleWheelScroll);

    document.addEventListener("touchstart", handleTouch);

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

  // feedback form open
  useEffect(() => {
    if (scrollPosition === "end") {
      const isFirstVisit = localStorage.getItem("feedbackFormOpened");
      if (!isFirstVisit) {
        setFeedbackFormOpen({ open: true, once: true });
        localStorage.setItem("feedbackFormOpened", "true");
      }
    }
  }, [scrollPosition]);

  // scroll off function when i am open dashboard
  useEffect(() => {
    if (dashboardOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }
    return () => {
      document.body.style.overflow = ""; // Reset on component unmount
    };
  }, [dashboardOpen]);

  useEffect(() => {
    const userId = localStorage.getItem("portfolioUserId");
    if (userId === "kCNccaH0HmbLWK6E6K1ChzXuvbf1") {
      setLoginStatus(true);
    }

   
  }, [loginStatus]);

 


  

  return (
    <LoginFormContext.Provider value={{ loginFormOpen, setLoginFormOpen }}>
      <DashBoardContext.Provider value={{ dashboardOpen, setDashboardOpen }}>
        <FeedbackFormContext.Provider
          value={{ feedbackFormOpen, setFeedbackFormOpen }}
        >
          <LoginStatus.Provider value={{ loginStatus, setLoginStatus }}>
            <div className="relative overflow-x-hidden">
              <Theme.Provider value={{ theme, setTheme }}>
                <ScrolContext.Provider value={{ scrolEnable, setScrollEnable }}>
                  <HeadingContext.Provider
                    value={{ visibleSection, setVisibleSection }}
                  >
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
                    <ThemeBtn />
                    <FeedBackForm />
                    <LoginForm />
                    <div className="relative overflow-hidden">
                      <DashBordWindow />
                    </div>
                  </HeadingContext.Provider>
                </ScrolContext.Provider>
              </Theme.Provider>
            </div>
          </LoginStatus.Provider>
        </FeedbackFormContext.Provider>
      </DashBoardContext.Provider>
    </LoginFormContext.Provider>
  );
}

export default App;
