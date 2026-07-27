import { motion } from "framer-motion";

function NavLi({ label, isActive, compact, onClick }) {
  return (
    <li className="relative">
      <a
        href="#"
        onClick={onClick}
        className={`relative z-10 block whitespace-nowrap rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
          compact ? "px-3.5 py-1.5 text-sm" : "px-4 py-2 text-[15px]"
        } ${
          isActive
            ? "text-white"
            : "text-hero-muted hover:bg-white/[0.06] hover:text-hero-text"
        }`}
      >
        {label}
      </a>
      {isActive && (
        <motion.span
          layoutId="navActivePill"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-hero-primary to-hero-secondary shadow-[0_0_18px_-2px_rgba(99,102,241,0.7)]"
        ></motion.span>
      )}
    </li>
  );
}

export default NavLi;
