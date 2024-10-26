import { motion } from "framer-motion";

function Btn({ text, btnAnim, children }) {
  return (
    <motion.button
      className="group md:py-2 md:px-3 py-2 px-2 mt-5 flex gap-2 items-center mx-auto bg-accent text-white text-xs font-medium md:text-sm md:font-semibold text-center transition-all duration-500 rounded overflow-hidden"
      initial={{ scale: 1, opacity: 1, borderRadius: "4px" }}
      animate={{
        minWidth: btnAnim ? "3.5rem" : "40px", // Animates the width
        minHeight: btnAnim ? "3.5rem" : "40px",
        borderRadius: btnAnim ? "50%" : "4px", // Fixed borderRadius animation
        justifyContent: btnAnim ? "center" : "flex-start", // Fix for justify-content
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.p
        className={`${btnAnim? "hidden" : "block"}`}
        // initial={{  minWidth: "100px" }}
        // animate={{
        //     minWidth: btnAnim ? "0" : "100PX",
        // }}
        // transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {text}
      </motion.p>
      {children}
    </motion.button>
  );
}

export default Btn;
