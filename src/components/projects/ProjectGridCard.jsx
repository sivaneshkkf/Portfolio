import { useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Rocket, ArrowRight, Lock } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TechChip from "./TechChip";
import { FadeIn } from "../../varients/varientAnim";
import { LoginStatus } from "../../context/LoginFormContext";

const STATUS_STYLES = {
  Featured: "from-indigo-500 to-purple-500",
  Completed: "from-emerald-500 to-teal-500",
  "In Progress": "from-amber-500 to-orange-500",
  "Production Ready": "from-indigo-500 to-cyan-500",
  "Open Source": "from-cyan-500 to-purple-500",
};

function ProjectGridCard({ name, disc, img, techs, link, ghLink, status, delay = 0 }) {
  const cardRef = useRef(null);
  const { loginStatus } = useContext(LoginStatus);
  // Repo links stay locked until the site owner signs in (same admin
  // LoginStatus used for the dashboard) -- source is only shared once
  // logged in, regardless of whether a ghLink is even set yet.
  const canViewRepo = loginStatus && Boolean(ghLink);

  // Subtle 3D tilt on hover, same idea as the featured card but tighter
  // (+/-3deg) since these cards are much smaller.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-3deg", "3deg"]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      variants={FadeIn("up", delay, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group/card relative motion-reduce:!transform-none"
    >
      {/* gradient border on hover */}
      <div className="relative h-full overflow-hidden rounded-[24px] bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent p-px transition-all duration-500 group-hover/card:from-indigo-500/40 dark:group-hover/card:from-indigo-400/40 group-hover/card:to-purple-500/40 dark:group-hover/card:to-purple-400/40">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative flex h-full flex-col overflow-hidden rounded-[23px] border border-black/5 dark:border-white/[0.06] bg-white dark:bg-hero-bg2 shadow-lg shadow-black/5 dark:shadow-black/20 transition-shadow duration-500 group-hover/card:shadow-2xl group-hover/card:shadow-indigo-500/10"
        >
          {status && (
            <span
              className={`absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold text-white shadow-md ${
                STATUS_STYLES[status] || "from-indigo-500 to-purple-500"
              }`}
            >
              {status}
            </span>
          )}

          {/* screenshot */}
          <div className="relative overflow-hidden">
            <img
              src={img}
              alt={`${name} screenshot`}
              loading="lazy"
              className="h-44 w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-110 motion-reduce:!transform-none"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5 bg-[#0b1220]/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/card:pointer-events-auto group-hover/card:opacity-100">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${name} live demo`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0F172A] transition-transform duration-300 hover:scale-110"
                >
                  <Rocket size={15} />
                </a>
              )}
              {canViewRepo ? (
                <a
                  href={ghLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${name} source code on GitHub`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110"
                >
                  <GitHubIcon sx={{ fontSize: 15 }} />
                </a>
              ) : (
                <span
                  aria-label="Repository locked -- sign in to view"
                  title="Sign in to view repository"
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50"
                >
                  <Lock size={13} />
                </span>
              )}
            </div>
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-2.5 p-5">
            <h4 className="font-manrope text-[19px] font-bold text-textHead dark:text-dark-textHead">
              {name}
            </h4>
            <p className="line-clamp-2 text-xs leading-relaxed text-textpara dark:text-dark-textpara">
              {disc}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {techs.map((tech) => (
                <TechChip key={tech} name={tech} size="sm" />
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-3">
              <div className="flex items-center gap-3 text-[11px] font-medium text-textpara dark:text-slate-500">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-300"
                  >
                    Live
                  </a>
                )}
                {canViewRepo ? (
                  <a
                    href={ghLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-300"
                  >
                    GitHub
                  </a>
                ) : (
                  <span
                    title="Sign in to view repository"
                    className="inline-flex cursor-not-allowed items-center gap-1 opacity-60"
                  >
                    <Lock size={10} /> GitHub
                  </span>
                )}
              </div>

              {(link || canViewRepo) && (
                <a
                  href={link || ghLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1 text-[11px] font-semibold text-textpara dark:text-slate-400 transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  View
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectGridCard;
