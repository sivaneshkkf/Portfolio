import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { UseFetchCollection, deleteDocument } from "../../firebase/config";
import { relativeTime } from "../../utils/dashboardHelpers";
import ChartCard from "./ChartCard";
import EmptyState from "./EmptyState";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MessagesPanel({ seenIds, onMarkSeen }) {
  const messages = UseFetchCollection("messages");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return messages;
    const q = search.trim().toLowerCase();
    return messages.filter((m) =>
      [m.name, m.email, m.message].some((v) => v?.toLowerCase().includes(q))
    );
  }, [messages, search]);

  function handleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id));
    if (!seenIds.has(id)) {
      onMarkSeen(id);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    await deleteDocument("messages", pendingDelete);
    setDeleting(false);
    setPendingDelete(null);
  }

  return (
    <ChartCard
      title="Messages"
      subtitle={`${messages.length} message${
        messages.length === 1 ? "" : "s"
      } from the contact form`}
      action={
        <div className="relative">
          <SearchIcon
            sx={{ fontSize: 16 }}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textpara dark:text-hero-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-48 rounded-xl border border-black/10 bg-black/[0.02] py-2 pl-9 pr-3 text-xs text-textHead outline-none transition-all duration-300 placeholder:text-textpara/60 focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/25 dark:border-white/10 dark:bg-white/5 dark:text-hero-text dark:placeholder:text-hero-muted/60 sm:w-56"
          />
        </div>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState
          icon={<MailOutlineIcon />}
          title="No messages yet"
          description="Messages sent through your contact form will show up here."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((msg, index) => {
            const isUnread = !seenIds.has(msg.id);
            const isOpen = expandedId === msg.id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl border border-black/10 bg-black/[0.02] p-4 transition-colors duration-300 hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
              >
                {isUnread && (
                  <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-hero-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                )}
                <div className="flex items-start gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      msg.name || "?"
                    )}&background=1E293B&color=fff`}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-textHead dark:text-hero-text">
                      {msg.name}
                    </p>
                    <p className="truncate text-xs text-textpara dark:text-hero-muted">
                      {msg.email}
                    </p>
                    <p className="mt-0.5 text-[11px] text-textpara/70 dark:text-hero-muted/70">
                      {relativeTime(msg.createdAt)}
                    </p>
                  </div>
                </div>

                <p
                  className={`mt-3 text-xs leading-relaxed text-textpara dark:text-hero-muted ${
                    isOpen ? "" : "line-clamp-2"
                  }`}
                >
                  {msg.message}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleExpand(msg.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-hero-primary"
                  >
                    {isOpen ? "Show less" : "Read more"}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ExpandMoreIcon sx={{ fontSize: 14 }} />
                    </motion.span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(msg.id)}
                    aria-label="Delete message"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-textpara transition-colors duration-300 hover:bg-red-500/10 hover:text-red-400 dark:text-hero-muted"
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ConfirmDeleteModal
        open={!!pendingDelete}
        title="Delete this message?"
        description="This action can't be undone."
        loading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </ChartCard>
  );
}

export default MessagesPanel;
