import { memo } from "react";
import { projectTechIcons } from "../../data/projectTechIcons";

// Premium tech chip for the redesigned Projects section -- same underlying
// icon/color data as TechPill (projectTechIcons), just restyled with a
// gradient surface and a colored glow on hover to match the section's
// glassmorphism language.
function TechChip({ name, size = "md" }) {
  const tech = projectTechIcons[name];
  const glow = `${tech?.color || "#6366F1"}55`;

  return (
    <span
      style={{ "--chip-glow": glow }}
      className={`group/chip inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-gradient-to-b from-black/[0.04] to-black/[0.01] dark:from-white/10 dark:to-white/[0.03] backdrop-blur-md font-semibold text-textHead dark:text-dark-textHead transition-all duration-300 hover:-translate-y-0.5 hover:border-black/10 dark:hover:border-white/20 hover:shadow-[0_0_16px_var(--chip-glow)] ${
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      }`}
    >
      {tech?.svg && (
        <span
          className={`shrink-0 transition-transform duration-300 group-hover/chip:scale-110 ${
            size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
          }`}
          dangerouslySetInnerHTML={{ __html: tech.svg }}
        ></span>
      )}
      {name}
    </span>
  );
}

export default memo(TechChip);
