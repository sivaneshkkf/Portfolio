import { Star, Globe } from "lucide-react";

interface ProjectBadgesProps {
  category?: string;
}

function ProjectBadges({ category }: ProjectBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1.5 dark:bg-indigo-400/15">
        <Star size={13} className="fill-indigo-500 text-indigo-500 dark:fill-indigo-400 dark:text-indigo-400" />
        <span className="text-[12px] font-semibold text-indigo-600 dark:text-indigo-300">
          Featured Project
        </span>
      </div>
      {category && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 dark:bg-emerald-400/15">
          <Globe size={13} className="text-emerald-600 dark:text-emerald-400" />
          <span className="text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
            {category}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectBadges;
