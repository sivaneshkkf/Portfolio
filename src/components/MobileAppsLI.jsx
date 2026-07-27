import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ScreenSizeContext } from "../context/ScreenSizeContext";
import { mobileAppMeta, mobileAppTechIcons } from "../data/mobileAppMeta";
import { FadeIn } from "../varients/varientAnim";
import TechPill from "./TechPill";
import AboutStatCard from "./AboutStatCard";
import CtaButton from "./Buttons/CtaButton";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MemoryIcon from "@mui/icons-material/Memory";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import ChecklistIcon from "@mui/icons-material/Checklist";

function MobileAppsLi({ imgs, name, disc, techs, link, ghLink }) {
  const meta = mobileAppMeta[name] || {};

  const { ScreenSize } = useContext(ScreenSizeContext);
  const [xVal, setXval] = useState(getResponsiveXvalue());

  function getResponsiveXvalue() {
    const width = window.innerWidth;

    if (ScreenSize === "xl") {
      // lg (1024px and up)
      return { xl: -145, xr: 145 };
    } else if (ScreenSize === "lg") {
      // md (768px and up)
      return { xl: -138, xr: 138 };
    } else if (ScreenSize === "md") {
      // sm (640px and up)
      return { xl: -135, xr: 135 };
    } else {
      // Default for screens smaller than 640px
      return { xl: -90, xr: 90 };
    }
  }

  useEffect(() => {
    // Set initial xVal on mount
    if (ScreenSize) {
      setXval(getResponsiveXvalue());
    }
  }, [ScreenSize]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm p-6 sm:p-10 lg:p-14 max-w-6xl mx-auto">
      {/* decorative background specific to this showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-hero-primary/10 blur-[90px]"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-hero-secondary/10 blur-[90px]"></div>
        <span className="hidden sm:block absolute top-8 right-10 text-hero-success/10 text-4xl select-none">
          $
        </span>
        <span className="hidden sm:block absolute bottom-10 left-10 text-hero-accent/10 text-3xl select-none">
          %
        </span>
      </div>

      <motion.div
        variants={FadeIn("up", 0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 mb-8 shadow-sm"
      >
        <span className="text-sm">⭐</span>
        <span className="text-xs font-semibold bg-gradient-to-r from-hero-primary to-hero-secondary bg-clip-text text-transparent">
          Featured Project
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        {/* mobile mockups - 40% */}
        <motion.div
          variants={FadeIn("left", 0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-2 relative flex items-center justify-center p-10"
          style={{ perspective: "1000px" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-hero-primary/20 via-hero-secondary/15 to-hero-accent/15 blur-3xl"
          ></div>

          {/* Left phone */}
          <motion.span
            className="absolute z-0 drop-shadow-2xl"
            initial={{ x: 0, rotateY: 0 }}
            whileInView={{ x: xVal.xl, rotateY: -20, scale: 1.05 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={imgs[0]}
              alt="Expense Tracker app screen"
              className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
              style={{ willChange: "transform" }}
            />
          </motion.span>

          {/* Center phone */}
          <motion.span
            className="z-10 drop-shadow-2xl"
            initial={{ rotateY: 0 }}
            whileInView={{ scale: 1.2 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={imgs[1]}
              alt="Expense Tracker app screen"
              className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
              style={{ willChange: "transform" }}
            />
          </motion.span>

          {/* Right phone */}
          <motion.span
            className="absolute z-0 drop-shadow-2xl"
            initial={{ x: 0, rotateY: 0 }}
            whileInView={{ x: xVal.xr, rotateY: 20, scale: 1.05 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={imgs[2]}
              alt="Expense Tracker app screen"
              className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
              style={{ willChange: "transform" }}
            />
          </motion.span>
        </motion.div>

        {/* project information - 60% */}
        <motion.div
          variants={FadeIn("right", 0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <div>
            <h3 className="font-manrope text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1] text-textHead dark:text-dark-textHead">
              Expense{" "}
              <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent bg-clip-text text-transparent">
                Tracker App
              </span>
            </h3>
            {meta.tagline && (
              <p className="mt-2 text-sm sm:text-base font-semibold text-hero-primary">
                {meta.tagline}
              </p>
            )}
          </div>

          <p className="max-w-[600px] text-sm sm:text-base leading-relaxed text-textpara dark:text-dark-textpara">
            {disc}
          </p>

          {meta.features && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {meta.features.map((f, i) => (
                <motion.div
                  key={f.label}
                  variants={FadeIn("up", 0.1 + i * 0.05, 0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3.5 py-2.5 transition-shadow duration-300 hover:shadow-md"
                >
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-textHead dark:text-dark-textHead">
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <TechPill key={tech} name={tech} iconMap={mobileAppTechIcons} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <AboutStatCard
              icon={<MemoryIcon fontSize="small" />}
              value={techs.length}
              label="Technologies"
              delay={0.1}
            />
            <AboutStatCard
              icon={<PhotoLibraryIcon fontSize="small" />}
              value={imgs.length}
              label="Screens Previewed"
              delay={0.2}
            />
            <AboutStatCard
              icon={<WifiOffIcon fontSize="small" />}
              value={100}
              suffix="%"
              label="Offline Capable"
              delay={0.3}
            />
            <AboutStatCard
              icon={<ChecklistIcon fontSize="small" />}
              value={meta.features?.length || 0}
              suffix="+"
              label="Key Features"
              delay={0.4}
            />
          </div>

          {meta.architecture && (
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-textpara dark:text-dark-textpara">
              {meta.architecture.map((layer, i) => (
                <span key={layer} className="flex items-center gap-3">
                  <span className="rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1.5">
                    {layer}
                  </span>
                  {i < meta.architecture.length - 1 && (
                    <span className="text-hero-primary">→</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {(meta.role || meta.status) && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-textpara dark:text-dark-textpara border-t border-black/5 dark:border-white/10 pt-4">
              {meta.role && (
                <span>
                  <span className="font-semibold text-textHead dark:text-dark-textHead">
                    Role:
                  </span>{" "}
                  {meta.role}
                </span>
              )}
              {meta.status && (
                <span>
                  <span className="font-semibold text-textHead dark:text-dark-textHead">
                    Status:
                  </span>{" "}
                  {meta.status}
                </span>
              )}
            </div>
          )}

          {meta.highlights && (
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-hero-primary/[0.04] via-hero-secondary/[0.04] to-hero-accent/[0.04] p-5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-textHead dark:text-dark-textHead mb-3">
                <AutoAwesomeIcon
                  fontSize="small"
                  className="text-hero-primary"
                />
                Highlights
              </h4>
              <ul className="space-y-2">
                {meta.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs sm:text-sm text-textpara dark:text-dark-textpara"
                  >
                    <span className="text-hero-success mt-0.5">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {link ? (
              <CtaButton
                as="a"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon={<LaunchRoundedIcon fontSize="small" />}
                className="!px-5 !py-3 !text-sm !rounded-xl"
              >
                Live Demo
              </CtaButton>
            ) : (
              <CtaButton
                as="button"
                type="button"
                disabled
                variant="primary"
                className="!px-5 !py-3 !text-sm !rounded-xl opacity-50 cursor-not-allowed hover:!translate-y-0 hover:!shadow-lg"
              >
                Coming Soon
              </CtaButton>
            )}
            {ghLink ? (
              <CtaButton
                as="a"
                href={ghLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<GitHubIcon fontSize="small" />}
                className="!px-5 !py-3 !text-sm !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15"
              >
                GitHub Repository
              </CtaButton>
            ) : (
              <CtaButton
                as="button"
                type="button"
                disabled
                variant="secondary"
                className="!px-5 !py-3 !text-sm !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15 opacity-50 cursor-not-allowed hover:!translate-y-0"
              >
                Coming Soon
              </CtaButton>
            )}
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}

export default MobileAppsLi;
