import { motion } from "motion/react";

const RATING_OPTIONS = [
  { value: 1, emoji: "😞", label: "Poor" },
  { value: 2, emoji: "😐", label: "Okay" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😍", label: "Great" },
  { value: 5, emoji: "🚀", label: "Amazing" },
];

function FeedbackRatingPicker({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {RATING_OPTIONS.map((opt) => (
        <motion.button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={opt.label}
          aria-pressed={value === opt.value}
          className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border py-2.5 text-2xl transition-all duration-300 ${
            value === opt.value
              ? "border-hero-primary/60 bg-gradient-to-br from-hero-primary/20 to-hero-secondary/20 shadow-[0_0_16px_-4px_rgba(59,130,246,0.6)]"
              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
          }`}
        >
          <span>{opt.emoji}</span>
          <span className="text-[10px] font-medium text-hero-muted">
            {opt.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default FeedbackRatingPicker;
