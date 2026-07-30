import { motion } from "motion/react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRipple } from "../../hooks/useRipple";

function SendBtn({ showMessage, text }) {
  const { ripples, addRipple } = useRipple();

  return (
    <motion.button
      type="submit"
      onClick={addRipple}
      className="group relative mx-auto flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-hero-primary to-hero-secondary text-white shadow-lg shadow-hero-primary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-hero-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-primary focus-visible:ring-offset-2"
      initial={{ width: 190, height: 48, borderRadius: 9999 }}
      animate={{
        width: showMessage.btnAnim ? 48 : 190,
        height: 48,
        borderRadius: 9999,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.25, 0.25, 0.75] }}
      whileHover={!showMessage.btnAnim ? { y: -2, scale: 1.02 } : {}}
      whileTap={{ scale: 0.96 }}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute rounded-full bg-white/50"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}

      <span
        className={`flex items-center gap-2 px-6 text-sm font-semibold tracking-wide transition-opacity duration-200 ${
          showMessage.btnAnim ? "opacity-0" : "opacity-100"
        }`}
      >
        {text || "Send Message"}
        <motion.span
          className="flex"
          animate={
            showMessage.btnAnim
              ? { x: 60, y: -60, opacity: 0 }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          <SendRoundedIcon fontSize="small" />
        </motion.span>
      </span>

      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          showMessage.btnAnim ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="h-5 w-5 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </span>
    </motion.button>
  );
}

export default SendBtn;
