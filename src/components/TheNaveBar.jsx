import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLi from "./NavLi";
import CtaButton from "./Buttons/CtaButton";
import SocialButton from "./SocialButton";
import sectionIDS from "../data/SectionIDS";
import { SocialLinks } from "../data/SocialLinks";
import { FadeIn } from "../varients/varientAnim";
import { HeadingContext } from "../context/HeadingContext";
import { ScrolContext } from "../context/scrolContext";

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

const navSocials = SocialLinks.filter((social) =>
  ["GitHub", "LinkedIn", "Email"].includes(social.name),
);

function TheNaveBar() {
  const { visibleSection, setVisibleSection } = useContext(HeadingContext);
  const { setScrollEnable } = useContext(ScrolContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScrollShadow = () => setIsScrolled(window.scrollY > 12);
    handleScrollShadow();
    window.addEventListener("scroll", handleScrollShadow);
    return () => window.removeEventListener("scroll", handleScrollShadow);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleClick = (e, navId, secId) => {
    e.preventDefault();
    e.currentTarget.blur();
    setScrollEnable(false);
    setVisibleSection({ sectionId: secId, navLiId: navId });
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3">
      <div
        className={`mx-auto max-w-[1400px] overflow-hidden border border-white/10 bg-hero-bg/90 backdrop-blur-md dark:backdrop-blur-2xl transition-all duration-300 dark:bg-hero-bg/75 ${
          isScrolled
            ? "rounded-b-2xl shadow-xl shadow-black/40 sm:rounded-[20px]"
            : "rounded-b-2xl shadow-md shadow-black/20 sm:rounded-[24px]"
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
              handleClick(e, sectionIDS.home.navId, sectionIDS.home.sectionId)
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

          {/* desktop nav */}
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

          {/* desktop right side */}
          <div className="hidden items-center gap-2.5 md:flex lg:gap-3">
            {/* {navSocials.map((social, index) => (
              <SocialButton
                key={social.name}
                href={social.href}
                label={social.name}
                icon={<social.icon fontSize="small" />}
                brand={social.brand}
                brandDark={social.brandDark}
                delay={0.05 * index}
                surface="dark"
              />
            ))} */}
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

          {/* mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-hero-text transition-colors duration-300 hover:bg-white/10 md:hidden"
          >
            <motion.span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </button>
        </div>

        {/* mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.001 } }}
              transition={{ duration: 0.35, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1.5 px-4 py-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = visibleSection.navLiId === item.navId;
                  return (
                    <motion.a
                      key={item.navId}
                      href="#"
                      onClick={(e) =>
                        handleClick(e, item.navId, item.sectionId)
                      }
                      variants={FadeIn("up", 0.04 * index, 0)}
                      initial="hidden"
                      animate="show"
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors duration-300 ${
                        active
                          ? "bg-gradient-to-r from-hero-primary/20 to-hero-secondary/20 text-hero-text"
                          : "text-hero-muted hover:bg-white/5 hover:text-hero-text"
                      }`}
                    >
                      <Icon
                        fontSize="small"
                        className={active ? "text-hero-accent" : ""}
                      />
                      {item.label}
                    </motion.a>
                  );
                })}

                <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-4">
                  {navSocials.map((social, index) => (
                    <SocialButton
                      key={social.name}
                      href={social.href}
                      label={social.name}
                      icon={<social.icon fontSize="small" />}
                      brand={social.brand}
                      brandDark={social.brandDark}
                      delay={0.05 * index}
                      surface="dark"
                    />
                  ))}
                </div>

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
                  className="!mt-3 !w-full !rounded-full !py-3.5 !text-sm"
                >
                  Let&apos;s Talk
                </CtaButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TheNaveBar;
