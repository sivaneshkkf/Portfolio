import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { UseFetchCollection, deleteDocument } from "../../firebase/config";
import { relativeTime } from "../../utils/dashboardHelpers";
import ChartCard from "./ChartCard";
import EmptyState from "./EmptyState";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function StarRating({ value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) =>
        i < value ? (
          <StarIcon key={i} sx={{ fontSize: 14 }} className="text-amber-400" />
        ) : (
          <StarBorderIcon
            key={i}
            sx={{ fontSize: 14 }}
            className="text-textpara/40 dark:text-hero-muted/40"
          />
        )
      )}
    </div>
  );
}

function FeedbackPanel() {
  const feedback = UseFetchCollection("feedback");
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return feedback;
    const q = search.trim().toLowerCase();
    return feedback.filter((f) =>
      [f.feedbackName, f.message].some((v) => v?.toLowerCase().includes(q))
    );
  }, [feedback, search]);

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    await deleteDocument("feedback", pendingDelete);
    setDeleting(false);
    setPendingDelete(null);
  }

  return (
    <ChartCard
      title="Feedback"
      subtitle={`${feedback.length} response${
        feedback.length === 1 ? "" : "s"
      } from visitors`}
      action={
        <div className="relative">
          <SearchIcon
            sx={{ fontSize: 16 }}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textpara dark:text-hero-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feedback..."
            className="w-48 rounded-xl border border-black/10 bg-black/[0.02] py-2 pl-9 pr-3 text-xs text-textHead outline-none transition-all duration-300 placeholder:text-textpara/60 focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/25 dark:border-white/10 dark:bg-white/5 dark:text-hero-text dark:placeholder:text-hero-muted/60 sm:w-56"
          />
        </div>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState
          icon={<ForumIcon />}
          title="No feedback yet"
          description="Feedback submitted from the site's feedback popup will appear here."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((feed, index) => (
            <motion.div
              key={feed.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 transition-colors duration-300 hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      feed.feedbackName || "?"
                    )}&background=1E293B&color=fff`}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-textHead dark:text-hero-text">
                      {feed.feedbackName}
                    </p>
                    <p className="text-[11px] text-textpara/70 dark:text-hero-muted/70">
                      {relativeTime(feed.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingDelete(feed.id)}
                  aria-label="Delete feedback"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-textpara transition-colors duration-300 hover:bg-red-500/10 hover:text-red-400 dark:text-hero-muted"
                >
                  <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                </button>
              </div>

              {feed.rating && (
                <div className="mt-2">
                  <StarRating value={feed.rating} />
                </div>
              )}

              <p className="mt-2 text-xs leading-relaxed text-textpara dark:text-hero-muted">
                {feed.message}
              </p>

              {feed.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {feed.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-medium text-textpara dark:border-white/10 dark:bg-white/5 dark:text-hero-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        open={!!pendingDelete}
        title="Delete this feedback?"
        description="This action can't be undone."
        loading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </ChartCard>
  );
}

export default FeedbackPanel;
