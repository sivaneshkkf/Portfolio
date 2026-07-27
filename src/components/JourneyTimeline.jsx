import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JourneyData } from "../data/JourneyData";
import ConfettiBurst from "./ConfettiBurst";

const milestoneStyles = [
  {
    color: "#3B82F6", // HTML & CSS
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    shadow: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    glow: "rgba(59, 130, 246, 0.15)",
    year: "2023",
  },
  {
    color: "#06B6D4", // JavaScript
    gradient: "from-[#06B6D4] to-[#22D3EE]",
    shadow: "shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    glow: "rgba(6, 182, 212, 0.15)",
    year: "2023 - 2024",
  },
  {
    color: "#8B5CF6", // React & Tailwind CSS
    gradient: "from-[#8B5CF6] to-[#A78BFA]",
    shadow: "shadow-[0_0_20px_rgba(139,92,246,0.35)]",
    glow: "rgba(139, 92, 246, 0.15)",
    year: "2024",
  },
  {
    color: "#22C55E", // Node.js & Backend
    gradient: "from-[#22C55E] to-[#4ADE80]",
    shadow: "shadow-[0_0_20px_rgba(34,197,94,0.35)]",
    glow: "rgba(34, 197, 94, 0.15)",
    year: "2025 - 2026",
  },
  {
    color: "#F59E0B", // Current Goal (Rocket)
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    shadow: "shadow-[0_0_25px_rgba(139,92,246,0.5)]",
    glow: "rgba(236, 72, 153, 0.2)",
    year: "Current Goal",
  },
];

function JourneyTimeline() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineProgress, setLineProgress] = useState(0);
  const [confettiTriggered, setConfettiTriggered] = useState({});
  const shouldReduceMotion = useReducedMotion();

  if (cardRefs.current.length !== JourneyData.length) {
    cardRefs.current = Array(JourneyData.length).fill(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportHeight = window.innerHeight;
      const focusY = viewportHeight * 0.5; // Trigger milestone active at 50% scroll line of screen

      let currentActive = -1;
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.top <= focusY) {
          currentActive = idx;
        }
      });

      setActiveIndex(currentActive);

      // Compute progress line height ratio
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[JourneyData.length - 1];
      if (firstCard && lastCard) {
        const firstRect = firstCard.getBoundingClientRect();
        const lastRect = lastCard.getBoundingClientRect();

        const startY = firstRect.top + window.scrollY;
        const endY = lastRect.top + window.scrollY;
        const currentY = window.scrollY + focusY;

        if (currentY <= startY) {
          setLineProgress(0);
        } else if (currentY >= endY) {
          setLineProgress(1);
        } else {
          setLineProgress((currentY - startY) / (endY - startY));
        }
      }

      // Trigger micro-confetti burst upon milestone completion
      if (currentActive > -1) {
        setConfettiTriggered((prev) => {
          const next = { ...prev };
          let updated = false;
          for (let i = 0; i < currentActive; i++) {
            if (!next[i]) {
              next[i] = true;
              updated = true;
            }
          }
          // Reset confetti triggers for future milestones when scrolling back up
          for (let i = currentActive; i < JourneyData.length; i++) {
            if (next[i]) {
              delete next[i];
              updated = true;
            }
          }
          return updated ? next : prev;
        });
      } else {
        setConfettiTriggered((prev) =>
          Object.keys(prev).length > 0 ? {} : prev,
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Defer initial execution slightly to ensure layout and bounding boxes are ready
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const progressPercent = Math.round(lineProgress * 100);

  return (
    <div
      ref={containerRef}
      className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Journey Progress Indicator Badge */}
      <div className="flex flex-col items-center mb-16 max-w-md mx-auto">
        <div className="flex justify-between w-full mb-2 text-xs font-mono text-textpara dark:text-dark-textpara tracking-wider">
          <span>JOURNEY ROADMAP PROGRESS</span>
          <span className="font-semibold text-hero-primary">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner relative">
          <motion.div
            className="h-full bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-success"
            style={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />
          {/* Shimmer light effect at the edge of the fill bar */}
          <motion.div
            className="absolute top-0 bottom-0 w-2 bg-white blur-[2px] opacity-75"
            style={{ left: `calc(${progressPercent}% - 4px)` }}
          />
        </div>
      </div>

      {/* Decorative Developer-themed Background Symbols */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full bg-hero-primary/5 blur-3xl" />
        <div className="absolute right-1/4 top-2/3 w-80 h-80 rounded-full bg-hero-secondary/5 blur-3xl" />
      </div>

      <div className="relative">
        {/* Background static line */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-[1.5px] md:left-24 md:translate-x-0 top-6 bottom-6 w-[3px] bg-slate-200 dark:bg-slate-800 rounded-full opacity-40"
        />

        {/* Dynamic growing line using anim gradient */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-[1.5px] md:left-24 md:translate-x-0 top-6 w-[3px] rounded-full origin-top bg-gradient-to-b from-[#3B82F6] via-[#06B6D4] via-[#8B5CF6] to-[#22C55E] animate-gradient-shimmer"
          style={{
            height: "calc(100% - 48px)",
            scaleY: lineProgress,
          }}
        />

        {/* Timeline milestones */}
        <div className="space-y-8 md:space-y-12">
          {JourneyData.map((item, index) => {
            const style = milestoneStyles[index];
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <div
                key={item.title}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className="relative flex flex-col items-center md:block md:pl-36"
              >
                {/* Micro confetti burst upon milestone completion */}
                {confettiTriggered[index] && <ConfettiBurst count={24} />}

                {/* Glassmorphic Icon Wrapper */}
                <div className="relative md:absolute md:left-24 md:-translate-x-1/2 md:top-0 z-20 mb-5 md:mb-0">
                  <motion.div
                    className={`relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 text-sm sm:text-base backdrop-blur-md transition-all duration-300 shadow-md ${
                      isActive || isCompleted
                        ? `bg-gradient-to-br ${style.gradient} border-transparent text-white ${style.shadow} ${isActive ? "animate-glow-pulse scale-110" : ""}`
                        : "bg-white/60 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-60"
                    }`}
                    animate={
                      isActive
                        ? { scale: [0.85, 1.08, 1], rotate: [0, 8, 0] }
                        : { scale: isCompleted ? 1 : 0.85 }
                    }
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {/* Glowing highlight aura surrounding active icon */}
                    {isActive && (
                      <span className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-hero-primary via-hero-secondary to-hero-accent -z-10 blur-[8px] opacity-40 animate-pulse" />
                    )}

                    {/* Milestone status icon */}
                    {item.isGoal ? (
                      <motion.span
                        animate={
                          isActive
                            ? {
                                y: [0, -6, 0],
                                rotate: [0, 8, -4, 0],
                              }
                            : {}
                        }
                        transition={
                          isActive
                            ? {
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : {}
                        }
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-base sm:text-lg text-white"
                        />
                      </motion.span>
                    ) : (
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={isActive || isCompleted ? "text-white" : ""}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Milestone Details Card */}
                <motion.div
                  tabIndex={0}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 35, x: 15, scale: 0.96 }
                  }
                  whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 14,
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                  style={{
                    borderColor: isActive ? style.color : undefined,
                    boxShadow: isActive ? `0 0 20px ${style.glow}` : undefined,
                  }}
                  className={`relative z-10 w-full max-w-xl rounded-2xl border bg-white/90 dark:bg-dark-primary/90 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-hero-primary focus:outline-none ${
                    isActive
                      ? "scale-[1.01]"
                      : "border-black/5 dark:border-white/10 shadow-sm"
                  }`}
                >
                  <h4 className="font-manrope text-base sm:text-lg font-extrabold text-textHead dark:text-dark-textHead transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-textpara dark:text-dark-textpara mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JourneyTimeline;
