import { useContext } from "react";
import { ArrowUpRight, ArrowRight, Lock } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LoginStatus } from "../../context/LoginFormContext";

interface ProjectButtonsProps {
  liveUrl?: string;
  githubUrl?: string;
}

function ProjectButtons({ liveUrl, githubUrl }: ProjectButtonsProps) {
  const { loginStatus } = useContext(LoginStatus);
  // Repo links stay locked until the site owner signs in (same admin
  // LoginStatus used for the dashboard elsewhere in this app).
  const canViewRepo = loginStatus && Boolean(githubUrl);
  // "View Details" must never fall back to the raw githubUrl while it's
  // still gated -- that would leak the repo link around the lock above.
  const detailsUrl = liveUrl || (canViewRepo ? githubUrl : null);

  return (
    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
        >
          Live Demo
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-textpara dark:text-slate-500">
          <ArrowUpRight size={16} /> Coming Soon
        </span>
      )}

      {canViewRepo ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-textHead dark:text-dark-textHead transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/[0.08]"
        >
          <GitHubIcon sx={{ fontSize: 16 }} />
          GitHub Repository
        </a>
      ) : (
        <span
          title="Sign in to view repository"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-textpara dark:text-slate-500"
        >
          <Lock size={16} />
          GitHub Repository
        </span>
      )}

      {detailsUrl && (
        <a
          href={detailsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-textHead dark:text-dark-textHead transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/[0.08] sm:ml-auto"
        >
          View Details
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </a>
      )}
    </div>
  );
}

export default ProjectButtons;
