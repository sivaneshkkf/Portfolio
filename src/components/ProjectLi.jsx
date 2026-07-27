import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import TechPill from "./TechPill";
import CtaButton from "./Buttons/CtaButton";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

const STATUS_STYLES = {
  Featured: "bg-gradient-to-r from-hero-primary to-hero-secondary text-white",
  Completed: "bg-hero-success text-white",
  "In Progress": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Production Ready": "bg-gradient-to-r from-hero-primary to-hero-accent text-white",
  "Open Source": "bg-gradient-to-r from-hero-accent to-hero-secondary text-white",
};

const METADATA_ICONS = {
  Responsive: "📱",
  "Fast Performance": "⚡",
  Authentication: "🔒",
  "Cloud Ready": "☁️",
  "Dark Mode": "🌙",
  Dashboard: "📊",
};

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
  metadata = [],
  delay = 0,
}) {
  return (
    <motion.li
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-[22px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-2xl overflow-hidden ${
        featured ? "lg:col-span-3 lg:flex-row" : ""
      }`}
    >
      {status && (
        <span
          className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold shadow-md ${
            STATUS_STYLES[status] || "bg-hero-primary text-white"
          }`}
        >
          {status}
        </span>
      )}

      {/* image with browser-window chrome */}
      <div className={`relative flex flex-col ${featured ? "lg:w-1/2" : ""}`}>
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
            className="h-full w-full min-h-[200px] lg:min-h-[280px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
      <div className={`flex flex-1 flex-col gap-3 p-5 sm:p-6 ${featured ? "lg:w-1/2" : ""}`}>
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-textHead dark:text-dark-textHead">
            {name}
          </h4>
          {tagline && (
            <p className="mt-1 text-sm font-medium text-hero-primary">
              {tagline}
            </p>
          )}
        </div>

        <p className="text-xs sm:text-sm text-textpara dark:text-dark-textpara line-clamp-3">
          {disc}
        </p>

        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <TechPill key={tech} name={tech} />
          ))}
        </div>

        {metadata.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-textpara dark:text-dark-textpara">
            {metadata.map((tag) => (
              <span key={tag}>
                {METADATA_ICONS[tag] || "✓"} {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 text-[11px] text-textpara dark:text-dark-textpara border-t border-black/5 dark:border-white/10 pt-3">
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
    </motion.li>
  );
}

export default ProjectLi;
