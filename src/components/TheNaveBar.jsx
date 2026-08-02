import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import NavLi from "./NavLi";
import CtaButton from "./Buttons/CtaButton";
import sectionIDS from "../data/SectionIDS";
import { HeadingContext } from "../context/HeadingContext";
import { ScrolContext } from "../context/ScrolContext";
import { useIsIOS } from "../hooks/useIsIOS";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const navItems = [
  { label: "Home", icon: HomeIcon, ...sectionIDS.home },
  { label: "About", icon: PersonOutlineIcon, ...sectionIDS.aboutME },
  { label: "Skills", icon: AutoAwesomeIcon, ...sectionIDS.skills },
  { label: "Projects", icon: FolderOpenIcon, ...sectionIDS.projects },
  { label: "Resume", icon: DescriptionIcon, ...sectionIDS.resume },
  { label: "Contact", icon: EmailIcon, ...sectionIDS.contact },
];

function TheNaveBar() {
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);
  const { scrolEnable, setScrollEnable } = useContext(ScrolContext);

  const isIOS = useIsIOS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let hideTimer;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 12);

      // While a nav-click-triggered scroll is animating (scrolEnable is
      // false during that window -- see ScrolContext/App.jsx), don't let
      // the auto-hide-on-scroll-down heuristic below hide the navbar out
      // from under the user: it can't distinguish "user scrolled down" from
      // "we're smooth-scrolling them to the section they just clicked",
      // and hiding mid-navigation made every link after the first
      // effectively unclickable.
      if (!scrolEnable) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 50 || currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      }
      lastScrollY.current = currentScrollY;

      // If the user stops scrolling while the nav is showing (e.g. after
      // scrolling up), don't leave it visible forever -- hide it again once
      // they've been idle for a few seconds, same as it would on scroll-down.
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (window.scrollY > 50) {
          setIsHidden(true);
        }
      }, 3000);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimer);
    };
  }, [scrolEnable]);

  const handleClick = (e, navId, secId) => {
    e.preventDefault();
    e.currentTarget.blur();
    setScrollEnable(false);
    setVisibleSection({ sectionId: secId, navLiId: navId });
  };

  return (
    <>
      {/* desktop top navbar */}
      <div
        className={`hidden md:block ${
          isIOS ? "sticky" : "ios-fixed-chrome fixed left-0 right-0"
        } top-0 z-50 px-2 pt-2 transition-transform duration-500 sm:px-3 sm:pt-3 ${
          isHidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto max-w-[1400px] overflow-hidden border border-white/10 bg-hero-bg/90 backdrop-blur-md dark:backdrop-blur-2xl transition-all duration-300 dark:bg-hero-bg/75 ${
            isScrolled
              ? "rounded-2xl shadow-xl shadow-black/40 sm:rounded-[20px]"
              : "rounded-2xl shadow-md shadow-black/20 sm:rounded-[24px]"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 px-3 transition-all duration-300 sm:px-5 lg:px-7 ${
              isScrolled ? "py-2" : "py-2.5 sm:py-3"
            }`}
          >
            {/* logo */}
            <motion.a
              href="#"
              onClick={(e) =>
                handleClick(
                  e,
                  sectionIDS.home.navId,
                  sectionIDS.home.sectionId,
                )
              }
              whileHover="hover"
              initial="rest"
              className="group flex items-center gap-2.5 sm:gap-3"
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-hero-primary to-hero-secondary opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-90"
                ></span>
                <motion.span
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: -8, scale: 1.06 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary to-hero-secondary font-manrope text-base font-extrabold text-white shadow-lg shadow-hero-primary/30 sm:text-lg"
                >
                  S
                </motion.span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-manrope text-lg font-extrabold text-hero-text sm:text-xl">
                  Sivanesh
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-hero-muted sm:block">
                  Full Stack Developer
                </span>
              </span>
            </motion.a>

            {/* nav links */}
            <ul className="relative hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <NavLi
                  key={item.navId}
                  label={item.label}
                  isActive={visibleSection.navLiId === item.navId}
                  onClick={(e) => handleClick(e, item.navId, item.sectionId)}
                />
              ))}
            </ul>

            {/* right side */}
            <div className="hidden items-center gap-2.5 md:flex lg:gap-3">
              <CtaButton
                as="button"
                type="button"
                variant="primary"
                onClick={(e) =>
                  handleClick(
                    e,
                    sectionIDS.contact.navId,
                    sectionIDS.contact.sectionId,
                  )
                }
                icon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
                className="!rounded-full !px-5 !py-2.5 !text-sm"
              >
                Let&apos;s Talk
              </CtaButton>
            </div>
          </div>
        </div>
      </div>

      {/* mobile bottom tab bar */}
      <nav
        aria-label="Mobile navigation"
        className="ios-fixed-chrome fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-1 rounded-full border border-white/10 bg-hero-bg2/90 px-2 py-2 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = visibleSection.navLiId === item.navId;
          return (
            <button
              key={item.navId}
              type="button"
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onClick={(e) => handleClick(e, item.navId, item.sectionId)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                active
                  ? "bg-white/15 text-hero-text"
                  : "text-hero-muted hover:text-hero-text"
              }`}
            >
              <Icon fontSize="small" />
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default TheNaveBar;
