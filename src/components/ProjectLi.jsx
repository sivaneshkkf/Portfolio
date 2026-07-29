import { memo } from "react";
import { motion } from "motion/react";
import { useReveal } from "../hooks/useReveal";
import TechPill from "./TechPill";
import CtaButton from "./Buttons/CtaButton";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

// Stable reference so components that don't pass `metadata` don't defeat
// memoization below with a fresh [] on every parent render.
const EMPTY_METADATA = [];

const STATUS_STYLES = {
  Featured: "bg-gradient-to-r from-hero-primary to-hero-secondary text-white",
  Completed: "bg-hero-success text-white",
  "In Progress": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Production Ready":
    "bg-gradient-to-r from-hero-primary to-hero-accent text-white",
  "Open Source":
    "bg-gradient-to-r from-hero-accent to-hero-secondary text-white",
};

const METADATA_ICONS = {
  Responsive: "📱",
  "Fast Performance": "⚡",
  Authentication: "🔒",
  "Cloud Ready": "☁️",
  "Dark Mode": "🌙",
  Dashboard: "📊",
};

const CARD_ENTRANCE = (delay = 0) => ({
  hidden: { opacity: 1, y: 32, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay, ease: [0.25, 0.25, 0.25, 0.75] },
  },
});

function ProjectLi({
  name,
  disc,
  img,
  techs,
  link,
  ghLink,
  tagline,
  status,
  featured,
  metadata = EMPTY_METADATA,
  delay = 0,
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.li
      ref={ref}
      variants={CARD_ENTRANCE(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -4, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative motion-reduce:!transform-none h-full ${
        featured ? "lg:col-span-3" : ""
      }`}
    >
      {/* decorative floating glow orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-hero-secondary/20 dark:bg-hero-secondary/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-float-slow"
      />

      {/* gradient border shimmer wrapper */}
      <div
        className={`relative rounded-[24px] p-px overflow-hidden bg-gradient-to-r from-hero-primary/30 via-hero-secondary/30 to-hero-accent/30 bg-[length:200%_200%] group-hover:animate-gradient-shimmer transition-shadow duration-500 group-hover:shadow-[0_5px_10px_rgba(0,0,0,.45)] h-full ${
          featured ? "ring-1 ring-hero-primary/40" : ""
        }`}
      >
        <div
          className={`relative flex flex-col overflow-hidden rounded-[23px] bg-white dark:bg-[#111827] h-full ${
            featured ? "lg:flex-row" : ""
          }`}
        >
          {/* inner soft glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent"
          />

          {status && (
            <span
              className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold shadow-md animate-glow-pulse ${
                STATUS_STYLES[status] || "bg-hero-primary text-white"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              {status}
            </span>
          )}

          {/* image with browser-window chrome */}
          <div
            className={`relative flex flex-col ${featured ? "lg:w-1/2" : ""}`}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/[0.04] dark:bg-white/5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <img
                src={img}
                alt={`${name} screenshot`}
                loading="lazy"
                className="h-full w-full min-h-[200px] lg:min-h-[280px] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:!transform-none"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex gap-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${name} live demo`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-hero-bg transition-transform duration-300 hover:scale-110"
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </a>
                  <a
                    href={ghLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${name} source code on GitHub`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-hero-bg transition-transform duration-300 hover:scale-110"
                  >
                    <GitHubIcon fontSize="small" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* content */}
          <div
            className={`relative flex flex-1 flex-col gap-3 p-5 sm:p-6 ${featured ? "lg:w-1/2" : ""}`}
          >
            <div>
              <h4
                className={`font-manrope font-extrabold text-textHead dark:text-dark-textHead ${featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
              >
                {name}
              </h4>
              {tagline && (
                <p className="mt-1 text-sm font-medium text-hero-primary">
                  {tagline}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-textpara dark:text-dark-textpara line-clamp-3">
              {disc}
            </p>

            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>

            {metadata.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-2.5 py-1 text-[11px] font-medium text-textpara dark:text-dark-textpara transition-transform duration-300 hover:-translate-y-0.5 hover:text-hero-primary"
                  >
                    {METADATA_ICONS[tag] || "✓"} {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-textpara dark:text-dark-textpara border-t border-black/5 dark:border-white/10 pt-3">
              <span>🛠 {techs.length} Technologies</span>
              <span>🌐 Live</span>
              <span>📂 Open Source</span>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
              {link ? (
                <CtaButton
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  icon={<LaunchRoundedIcon fontSize="small" />}
                  className="!px-4 !py-2.5 !text-xs !rounded-xl"
                >
                  Live Demo
                </CtaButton>
              ) : (
                <CtaButton
                  as="button"
                  type="button"
                  disabled
                  variant="primary"
                  className="!px-4 !py-2.5 !text-xs !rounded-xl opacity-50 cursor-not-allowed hover:!translate-y-0 hover:!shadow-lg"
                >
                  Coming Soon
                </CtaButton>
              )}
              <CtaButton
                as="a"
                href={ghLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<GitHubIcon fontSize="small" />}
                className="!px-4 !py-2.5 !text-xs !rounded-xl !text-textHead dark:!text-dark-textHead !bg-black/[0.03] dark:!bg-white/5 !border-black/10 dark:!border-white/15"
              >
                GitHub Repository
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default memo(ProjectLi);
