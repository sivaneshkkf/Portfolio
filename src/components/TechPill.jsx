import { projectTechIcons } from "../data/projectTechIcons";

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

export default TechPill;
