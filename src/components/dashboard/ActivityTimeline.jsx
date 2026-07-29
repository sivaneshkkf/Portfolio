import { useMemo } from "react";
import { motion } from "motion/react";
import { UseFetchCollection } from "../../firebase/config";
import { normalizeLocation, relativeTime, toDate } from "../../utils/dashboardHelpers";
import ChartCard from "./ChartCard";
import EmptyState from "./EmptyState";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ForumIcon from "@mui/icons-material/Forum";
import PublicIcon from "@mui/icons-material/Public";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const EVENT_THEMES = {
  message: {
    badge: "from-[#8B5CF6] to-[#A78BFA]",
    chip: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  feedback: {
    badge: "from-[#EC4899] to-[#F472B6]",
    chip: "bg-[#EC4899]/10 text-[#EC4899]",
  },
  visitor: {
    badge: "from-[#14B8A6] to-[#2DD4BF]",
    chip: "bg-[#14B8A6]/10 text-[#14B8A6]",
  },
};

function ActivityTimeline() {
  const messages = UseFetchCollection("messages");
  const feedback = UseFetchCollection("feedback");
  const locations = UseFetchCollection("locations");

  const events = useMemo(() => {
    const items = [
      ...messages.map((m) => ({
        id: `msg-${m.id}`,
        type: "message",
        tag: "Message",
        title: "New contact message",
        subtitle: m.name || "Anonymous",
        time: m.createdAt,
        icon: <MailOutlineIcon sx={{ fontSize: 14 }} className="text-white" />,
      })),
      ...feedback.map((f) => ({
        id: `fb-${f.id}`,
        type: "feedback",
        tag: "Feedback",
        title: "New feedback received",
        subtitle: f.feedbackName || "Anonymous",
        time: f.createdAt,
        icon: <ForumIcon sx={{ fontSize: 14 }} className="text-white" />,
      })),
      ...locations.map((l) => {
        const info = normalizeLocation(l);
        return {
          id: `loc-${l.id}`,
          type: "visitor",
          tag: "Visitor",
          title: "New visitor",
          subtitle: info.country || info.city || "Unknown location",
          time: l.createdAt,
          icon: <PublicIcon sx={{ fontSize: 14 }} className="text-white" />,
        };
      }),
    ];

    return items
      .filter((e) => toDate(e.time))
      .sort((a, b) => toDate(b.time) - toDate(a.time))
      .slice(0, 14);
  }, [messages, feedback, locations]);

  return (
    <ChartCard
      title="Activity Timeline"
      subtitle="Latest engagement across your portfolio"
    >
      {events.length === 0 ? (
        <EmptyState
          icon={<HistoryToggleOffIcon />}
          title="No activity yet"
          description="Recent visitor, message, and feedback events will appear here."
        />
      ) : (
        <ol className="themed-scrollbar max-h-[420px] overflow-y-auto pr-2">
          {events.map((event, index) => {
            const theme = EVENT_THEMES[event.type] || EVENT_THEMES.visitor;
            const isLast = index === events.length - 1;
            return (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex gap-3 rounded-xl px-1.5 py-2 transition-colors duration-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
              >
                <span className="flex shrink-0 flex-col items-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-md ${theme.badge}`}
                  >
                    {event.icon}
                  </span>
                  {!isLast && (
                    <span className="mt-1 w-px flex-1 bg-gradient-to-b from-black/10 to-transparent dark:from-white/10"></span>
                  )}
                </span>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-textHead dark:text-hero-text">
                      {event.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${theme.chip}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-textpara dark:text-hero-muted">
                    {event.subtitle}
                  </p>
                  <p className="mt-0.5 text-[10px] text-textpara/60 dark:text-hero-muted/60">
                    {relativeTime(event.time)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      )}
    </ChartCard>
  );
}

export default ActivityTimeline;
