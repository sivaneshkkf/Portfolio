import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NavLi from "./NavLi";
import CtaButton from "./Buttons/CtaButton";
import SocialButton from "./SocialButton";
import sectionIDS from "../data/SectionIDS";
import { SocialLinks } from "../data/SocialLinks";
import { FadeIn } from "../varients/varientAnim";
import { HeadingContext } from "../context/HeadingContext";
import { ScrolContext } from "../context/ScrolContext";

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
  // const { setScrollEnable } = useContext(ScrolContext);

  // const [isScrolled, setIsScrolled] = useState(false);
  // const [mobileOpen, setMobileOpen] = useState(false);

  // useEffect(() => {
  //   const handleScrollShadow = () => setIsScrolled(window.scrollY > 12);
  //   handleScrollShadow();
  //   window.addEventListener("scroll", handleScrollShadow);
  //   return () => window.removeEventListener("scroll", handleScrollShadow);
  // }, []);

  // useEffect(() => {
  //   document.body.style.overflow = mobileOpen ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [mobileOpen]);

  // const handleClick = (e, navId, secId) => {
  //   e.preventDefault();
  //   e.currentTarget.blur();
  //   setScrollEnable(false);
  //   setVisibleSection({ sectionId: secId, navLiId: navId });
  //   setMobileOpen(false);
  // };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3">
      Sivanesh v1
    </div>
  );
}

export default TheNaveBar;
