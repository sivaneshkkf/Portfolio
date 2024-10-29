import { AnimatePresence, motion } from "framer-motion";

function DownloadBtn({ progressValue }) {
  const getProgressText = () => {
    if (progressValue === 0) {
      return "DOWNLOAD RESUME";
    } else if (progressValue < 100) {
      return `${progressValue}%`;
    } else if (progressValue === 100) {
      return (
        <AnimatePresence>
          <motion.svg
            key="checkmark" // Key is important for AnimatePresence to track this element
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: 50, opacity: 0 }} // Exit animation moving down and fading out
            transition={{ duration: 0.8, type: "spring", ease: "easeOut" }}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m2.75 8.75l3.5 3.5l7-7.5"
            ></path>
          </motion.svg>
        </AnimatePresence>
      );
    }
  };

  return (
    <div className="relative w-44 h-8 mt-5 rounded-md overflow-hidden flex items-center justify-center mx-auto">
      <div className=" bg-accent absolute inset-0 z-0"></div>
      <div className="absolute flex gap-2 justify-between items-center z-20">
        <p className=" text-white text-xs font-medium">{getProgressText()}</p>
        <span className={`${progressValue > 0 ? "hidden" : "block"}`}>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -10, opacity: 0.5, scale: 0.8 }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse", // Moves up and down
            }}
          >
            <path
              d="M19 6.33301H22.1667V11.083H26.125L19 18.208M19 6.33301H15.8333V11.083H11.875L19 18.208"
              fill="white"
            />
            <path
              d="M19 6.33301H22.1667V11.083H26.125L19 18.208L11.875 11.083H15.8333V6.33301H19Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 26.083H28.5"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
      </div>

      <div
        className={`absolute bg-lime-600 inset-0 z-10 ${progressValue === 0 && "transition-all duration-500"}`}
        style={{
          width: `${progressValue}%`,
        }}
      ></div>
    </div>
  );
}

export default DownloadBtn;
