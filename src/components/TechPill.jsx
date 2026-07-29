import { memo } from "react";
import { projectTechIcons } from "../data/projectTechIcons";

// Rendered many times per page (every project card lists several techs).
// `name` and `iconMap` are always primitives/stable module-level imports at
// every call site in this app, so a shallow prop comparison is safe and
// skips re-rendering pills whose props didn't actually change.
function TechPill({ name, iconMap = projectTechIcons }) {
  const tech = iconMap[name];

  return (
    <span
      style={{ "--glow": `${tech?.color || "#3B82F6"}4d` }}
      className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/10 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-textHead dark:text-dark-textHead transition-shadow duration-300 hover:shadow-[0_0_12px_var(--glow)]"
    >
      {tech?.svg && (
        <span
          className="h-3.5 w-3.5 shrink-0"
          dangerouslySetInnerHTML={{ __html: tech.svg }}
        ></span>
      )}
      {name}
    </span>
  );
}

export default memo(TechPill);
