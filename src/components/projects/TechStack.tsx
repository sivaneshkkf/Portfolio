import { projectTechIcons } from "../../data/projectTechIcons";

interface TechStackProps {
  techs: string[];
  /** Show every chip instead of truncating with a "+N More" overflow chip. */
  showAll?: boolean;
  maxVisible?: number;
}

function TechStack({ techs, showAll = false, maxVisible = 5 }: TechStackProps) {
  const visible = showAll ? techs : techs.slice(0, maxVisible);
  const extraCount = techs.length - visible.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((name) => {
        const tech = (projectTechIcons as Record<string, { svg: string; color: string }>)[name];
        const glow = `${tech?.color || "#6366F1"}55`;
        return (
          <span
            key={name}
            style={{ "--chip-glow": glow } as React.CSSProperties}
            className="group/chip inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-textHead dark:text-dark-textHead shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_16px_var(--chip-glow)]"
          >
            {tech?.svg && (
              <span
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/chip:scale-110"
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
            )}
            {name}
          </span>
        );
      })}
      {extraCount > 0 && (
        <span className="inline-flex items-center rounded-full border border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-textpara dark:text-dark-textpara">
          +{extraCount} More
        </span>
      )}
    </div>
  );
}

export default TechStack;
