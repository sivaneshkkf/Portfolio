import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { ScrolContext } from "./context/ScrolContext";
import { FeedbackFormContext } from "./context/FeedBackFormContext";
import { useScrollPosition } from "./utils/ScrollValues";
import { LoginFormContext, LoginStatus } from "./context/LoginFormContext";
import LoginForm from "./components/LoginForm";
import {
  DashBoardContext,
  DashBoardDataContext,
} from "./context/DashBoardContext";
import DashboardScreen from "./pages/DashboardScreen";
import getUserLocation from "./utils/GetUserLocation";
import { DashboardStatsProvider } from "./context/DashboardStatsContext";
import { useLenis } from "lenis/react";
import { useScrollLock } from "./hooks/useScrollLock";

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

  const [dashboardData, setDashboardData] = useState(null);

  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const { scrollPosition, setScrollPosition } = useScrollPosition();
  const lenis = useLenis();

  const [loginStatus, setLoginStatus] = useState(false);

  const [theme, setTheme] = useState("light");

  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  // Refs are stable across renders, and sectionIDS is a static import, so
  // this array never actually needs to change -- building a fresh array (and
  // 6 fresh objects) on every render was pure waste, and gave handleScroll a
  // new identity every render too.
  const sections = useMemo(
    () => [
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
    ],
    [],
  );

  // Tracks the latest visibleSection without forcing handleScroll to change
  // identity (and the scroll listener to be torn down/reattached) every time
  // it updates.
  const visibleSectionRef = useRef(visibleSection);
  useEffect(() => {
    visibleSectionRef.current = visibleSection;
  }, [visibleSection]);

  // Determine which section is active and update state -- but only when the
  // answer actually changed. Previously this called setVisibleSection on
  // every single 'scroll' event for whichever section matched, even when it
  // was the same section as last time, forcing a full App re-render (and
  // everything under it) dozens of times a second while scrolling.
  const handleScroll = useCallback(() => {
    if (!scrolEnable) return;

    let match = null;
    for (const { ref, sectionId, navId } of sections) {
      const el = ref.current;
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.4;
      if (isVisible) {
        match = { navLiId: navId, sectionId };
      }
    }

    if (match && visibleSectionRef.current.navLiId !== match.navLiId) {
      setVisibleSection(match);
    }
  }, [scrolEnable, sections]);

  // Scroll to the current section based on visibleSection changes. Deferred
  // one animation frame: this effect can run in the same commit as closing
  // the mobile nav drawer, which resets `document.body.style.overflow` from
  // "hidden" back to "" (see TheNaveBar's mobileOpen effect). Chromium
  // doesn't reliably treat the page as scrollable again until it has had a
  // chance to process that style change -- calling scrollTo synchronously
  // in the same tick is silently a no-op. One rAF is enough to let that
  // settle before asking the browser to scroll.
  //
  // Uses Lenis's own scrollTo rather than native window.scrollTo: Lenis
  // drives page scroll via its own rAF loop, so a native smooth-scroll
  // animation running at the same time gets fought/overridden by it every
  // frame. Routing through Lenis keeps its internal position in sync.
  useEffect(() => {
    if (scrolEnable) return;

    const rafId = requestAnimationFrame(() => {
      const element = document.getElementById(visibleSection.sectionId);
      if (!element) return;

      const navbarHeight = document.querySelector("#navBar").offsetHeight;
      const offset = -(navbarHeight + 60);

      if (lenis) {
        lenis.scrollTo(element, { offset });
      } else {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = window.pageYOffset + elementPosition;
        window.scrollTo({ top: offsetPosition + offset, behavior: "smooth" });
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [visibleSection.navLiId, lenis]);

  // Enable scrolling when using the mouse wheel
  useEffect(() => {
    const handleWheelScroll = () => {
      setScrollEnable(true); // Enable scrolling when wheel event is triggered
    };

    const handleTouch = () => {
      setScrollEnable(true); // Enable scrolling when touch event is triggered
    };

    document.addEventListener("wheel", handleWheelScroll);
    document.addEventListener("touchstart", handleTouch);

    return () => {
      document.removeEventListener("wheel", handleWheelScroll);
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  // Listen for the scroll event and update visible sections. Raw 'scroll'
  // events can fire far more often than the screen repaints (especially
  // during momentum scrolling on mobile), so handleScroll's layout reads
  // (getBoundingClientRect on every section) are coalesced to at most once
  // per animation frame. { passive: true } tells the browser this listener
  // will never call preventDefault(), so it doesn't have to block scrolling
  // to wait and find out.
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        handleScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

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
  useScrollLock(dashboardOpen);

  useEffect(() => {
    const userId = localStorage.getItem("portfolioUserId");
    if (userId === "kCNccaH0HmbLWK6E6K1ChzXuvbf1") {
      setLoginStatus(true);
    }
  }, []);

  // Track visitor location (skipped for the admin). Lives here (always
  // mounted) rather than inside the dashboard, since the dashboard is now
  // a full-screen view that isn't mounted unless it's open.
  useEffect(() => {
    const userId = localStorage.getItem("portfolioUserId");

    if (userId !== "kCNccaH0HmbLWK6E6K1ChzXuvbf1") {
      const timer = setTimeout(() => {
        getUserLocation().catch((error) => {
          console.error("Error getting location:", error);
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LoginFormContext.Provider value={{ loginFormOpen, setLoginFormOpen }}>
      <DashBoardContext.Provider value={{ dashboardOpen, setDashboardOpen }}>
        <DashBoardDataContext.Provider
          value={{ dashboardData, setDashboardData }}
        >
          <FeedbackFormContext.Provider
            value={{ feedbackFormOpen, setFeedbackFormOpen }}
          >
            <LoginStatus.Provider value={{ loginStatus, setLoginStatus }}>
              <Theme.Provider value={{ theme, setTheme }}>
                <ScrolContext.Provider value={{ scrolEnable, setScrollEnable }}>
                  <HeadingContext.Provider
                    value={{ visibleSection, setVisibleSection }}
                  >
                    <DashboardStatsProvider>
                      {dashboardOpen ? (
                        <DashboardScreen />
                      ) : (
                        <div className="relative">
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
                          <div
                            ref={projectRef}
                            id={sectionIDS.projects.sectionId}
                          >
                            <Projects />
                          </div>
                          <div ref={resumeRef} id={sectionIDS.resume.sectionId}>
                            <Resume />
                          </div>
                          <div
                            ref={contactRef}
                            id={sectionIDS.contact.sectionId}
                          >
                            <Contact />
                          </div>
                          <Footer />
                          <ThemeBtn />
                          <FeedBackForm />
                          <LoginForm />
                        </div>
                      )}
                    </DashboardStatsProvider>
                  </HeadingContext.Provider>
                </ScrolContext.Provider>
              </Theme.Provider>
            </LoginStatus.Provider>
          </FeedbackFormContext.Provider>
        </DashBoardDataContext.Provider>
      </DashBoardContext.Provider>
    </LoginFormContext.Provider>
  );
}

export default App;
