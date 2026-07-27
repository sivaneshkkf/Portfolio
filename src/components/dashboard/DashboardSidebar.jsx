import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ForumIcon from "@mui/icons-material/Forum";

export const DASHBOARD_NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: DashboardIcon },
  { key: "visitors", label: "Visitors", icon: PublicIcon },
  { key: "messages", label: "Messages", icon: MailOutlineIcon },
  { key: "feedback", label: "Feedback", icon: ForumIcon },
];

function DashboardSidebar({ active, onChange, counts = {} }) {
  return (
    <nav className="flex flex-col gap-1.5">
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        const count = counts[item.key];
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
              isActive
                ? "bg-gradient-to-r from-hero-primary/20 to-hero-secondary/20 text-textHead dark:text-hero-text"
                : "text-textpara hover:bg-black/5 hover:text-textHead dark:text-hero-muted dark:hover:bg-white/5 dark:hover:text-hero-text"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Icon
                sx={{ fontSize: 18 }}
                className={isActive ? "text-hero-accent" : ""}
              />
              {item.label}
            </span>
            {typeof count === "number" && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-black/10 text-textHead dark:bg-white/10 dark:text-hero-text"
                    : "bg-black/5 text-textpara dark:bg-white/5 dark:text-hero-muted"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default DashboardSidebar;
