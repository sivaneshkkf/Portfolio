import { AnimatePresence, motion } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function ConfirmDeleteModal({ open, title, description, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            aria-hidden="true"
            onClick={onCancel}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25 }}
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-[24px] border border-black/10 bg-white p-6 text-center shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-hero-bg2/95"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
              <DeleteOutlineIcon />
            </span>
            <h4 className="mt-4 font-manrope text-lg font-bold text-textHead dark:text-hero-text">
              {title}
            </h4>
            {description && (
              <p className="mt-1.5 text-sm text-textpara dark:text-hero-muted">
                {description}
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-black/10 bg-black/5 py-2.5 text-sm font-semibold text-textHead transition-colors duration-300 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-hero-text dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-xl disabled:opacity-70"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDeleteModal;
