import { motion } from "framer-motion";

function EmptyState({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-black/10 bg-black/[0.015] px-6 py-14 text-center dark:border-white/10 dark:bg-white/[0.02]"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 text-textpara dark:bg-white/5 dark:text-hero-muted">
        {icon}
      </span>
      <p className="mt-4 font-manrope text-sm font-semibold text-textHead dark:text-hero-text">
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-xs text-xs text-textpara dark:text-hero-muted">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default EmptyState;
