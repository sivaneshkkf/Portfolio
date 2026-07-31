import type { FeatureItem } from "./types";

interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3;
}

function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-2.5 ${columns === 3 ? "sm:grid-cols-3" : ""}`}
    >
      {features.map((f) => (
        <div
          key={f.label}
          className="group/feature flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-textHead dark:text-dark-textHead transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400 hover:shadow-[0_8px_20px_-6px_rgba(99,102,241,0.35)]"
        >
          <span className="shrink-0 text-base">{f.icon}</span>
          <span className="truncate">{f.label}</span>
        </div>
      ))}
    </div>
  );
}

export default FeatureGrid;
