import type { ReactNode } from "react";
import { Smartphone, Zap, Code2, Layers } from "lucide-react";

interface StatEntry {
  icon: ReactNode;
  label: string;
  caption: string;
}

interface ProjectStatsProps {
  techCount: number;
}

// Universally-true descriptive stats for a completed project in this
// portfolio (every entry here is responsive, deployed, and source-visible)
// -- not measured metrics, so no specific/unverifiable claims like a
// license name are asserted.
function ProjectStats({ techCount }: ProjectStatsProps) {
  const stats: StatEntry[] = [
    { icon: <Smartphone size={13} />, label: "Responsive", caption: "All Devices" },
    { icon: <Zap size={13} />, label: "Fast Performance", caption: "Optimized" },
    { icon: <Code2 size={13} />, label: "Open Source", caption: "Source Available" },
    { icon: <Layers size={13} />, label: `${techCount}+ Technologies`, caption: "Modern Stack" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 px-2.5 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400">
            {s.icon}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[11px] font-bold leading-tight text-textHead dark:text-dark-textHead">
              {s.label}
            </span>
            <span className="truncate text-[10px] leading-tight text-textpara dark:text-dark-textpara">
              {s.caption}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProjectStats;
