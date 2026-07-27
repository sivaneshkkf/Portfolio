import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { FadeIn } from "../varients/varientAnim";

function SocialIconBtn({ href, label, delay = 0, children }) {
  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
    >
      <Tooltip title={label} arrow>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-11 h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-hero-muted backdrop-blur-md transition-colors duration-300 hover:border-hero-primary/40 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-primary"
        >
          {children}
        </motion.a>
      </Tooltip>
    </motion.div>
  );
}

export default SocialIconBtn;
