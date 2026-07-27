import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

function ContactDetailCard({ icon, label, value, href, copyable, delay = 0 }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const Wrapper = copyable ? motion.button : motion.a;
  const wrapperProps = copyable
    ? { type: "button", onClick: handleCopy }
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 300px 0px" }}
    >
      <Wrapper
        {...wrapperProps}
        whileHover={{ y: -3 }}
        className="group flex w-full items-center gap-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 py-3.5 text-left transition-all duration-300 hover:border-hero-primary/40 hover:shadow-[0_10px_24px_-12px_rgba(59,130,246,0.4)]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hero-primary/15 to-hero-secondary/15 text-hero-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-textpara dark:text-dark-textpara">
            {label}
          </span>
          <span className="truncate text-sm font-semibold text-textHead dark:text-dark-textHead">
            {value}
          </span>
        </span>
        {copyable && (
          <span className="ml-auto shrink-0 text-textpara dark:text-dark-textpara">
            {copied ? (
              <CheckIcon fontSize="small" className="text-hero-success" />
            ) : (
              <ContentCopyIcon
                fontSize="small"
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </span>
        )}
      </Wrapper>
    </motion.div>
  );
}

export default ContactDetailCard;
