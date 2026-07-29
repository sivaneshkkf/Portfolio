import { motion } from "motion/react";
import BusinessIcon from "@mui/icons-material/Business";
import TechPill from "./TechPill";
import { experienceTechIcons } from "../data/experienceTechIcons";

function getRoleTitle(title) {
  return title.split("|")[0].trim();
}

function splitCompany(company) {
  const parts = company.split(" - ");
  return {
    companyName: parts[0].trim(),
    location: parts[1] ? parts[1].replace(/\.$/, "").trim() : null,
  };
}

function ExperienceCard({ job, meta = {}, align = "left" }) {
  const { companyName, location } = splitCompany(job.company);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 p-5 sm:p-6 text-left ${
        align === "right" ? "lg:text-right" : ""
      }`}
    >
      <div
        className={`flex items-start gap-3 ${
          align === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/15 to-hero-secondary/15 text-hero-primary">
          <BusinessIcon fontSize="small" />
        </span>
        <div className="flex-1">
          <h4 className="font-bold text-sm sm:text-base text-textHead dark:text-dark-textHead">
            {getRoleTitle(job.title)}
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-hero-primary mt-0.5">
            {companyName}
          </p>
          <div
            className={`flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-textpara dark:text-dark-textpara ${
              align === "right" ? "lg:justify-end" : ""
            }`}
          >
            <span>
              {job.title.split("|")[1]?.trim()} {job.year}
            </span>
            {location && <span>📍 {location}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-textpara dark:text-dark-textpara">
        {job.description}
      </p>

      {meta.techs && meta.techs.length > 0 && (
        <div
          className={`flex flex-wrap gap-2 mt-4 ${
            align === "right" ? "lg:justify-end" : ""
          }`}
        >
          {meta.techs.map((tech) => (
            <TechPill key={tech} name={tech} iconMap={experienceTechIcons} />
          ))}
        </div>
      )}

      {meta.achievements && meta.achievements.length > 0 && (
        <div className="mt-4 rounded-xl bg-gradient-to-br from-hero-primary/[0.04] via-hero-secondary/[0.04] to-hero-accent/[0.04] border border-black/5 dark:border-white/10 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-textHead dark:text-dark-textHead mb-2">
            Achievements
          </p>
          <ul className="space-y-1.5">
            {meta.achievements.map((a) => (
              <li
                key={a}
                className={`flex items-start gap-2 text-xs text-textpara dark:text-dark-textpara ${
                  align === "right" ? "lg:flex-row-reverse lg:text-right" : ""
                }`}
              >
                <span className="text-hero-success mt-0.5 shrink-0">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default ExperienceCard;
