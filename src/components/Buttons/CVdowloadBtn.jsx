import { AnimatePresence, motion } from "framer-motion";

function CVdownloadBtn({ progressValue }) {
  const isDownloading = progressValue > 0 && progressValue < 100;
  const isDone = progressValue === 100;

  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <AnimatePresence mode="wait">
        {isDone ? (
          <motion.svg
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="m2.75 8.75l3.5 3.5l7-7.5"
            ></path>
          </motion.svg>
        ) : isDownloading ? (
          <motion.svg
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              rotate: { duration: 0.8, repeat: Infinity, ease: "linear" },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 3a9 9 0 1 0 9 9"
            ></path>
          </motion.svg>
        ) : (
          <motion.svg
            key="download"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1"
            ></path>
          </motion.svg>
        )}
      </AnimatePresence>
    </span>
  );
}

export default CVdownloadBtn;
