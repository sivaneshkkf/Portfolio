import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import FeedbackInput from "./FeedBackInput";
import FeedbackRatingPicker from "./FeedbackRatingPicker";
import FeedbackChip from "./FeedbackChip";
import ConfettiBurst from "./ConfettiBurst";
import BtnForm from "./Buttons/BtnForm";
import { FeedbackFormContext } from "../context/FeedBackFormContext";
import { AddFeedBack } from "../firebase/config";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useScrollLock } from "../hooks/useScrollLock";

const QUICK_TAGS = [
  "✨ Beautiful UI",
  "⚡ Fast",
  "🎯 Easy Navigation",
  "💻 Great Projects",
  "📱 Responsive",
  "🎨 Modern Design",
];

const MESSAGE_MAX = 500;
const FOCUSABLE_SELECTOR =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const schemaValidation = z.object({
  feedbackName: z.string().min(3, { message: "Please enter at least 3 characters" }).max(30),
  feedbackEmail: z.string().email({ message: "Enter a valid email address" }),
  message: z
    .string()
    .min(5, { message: "Tell me a little more (min 5 characters)" })
    .max(MESSAGE_MAX),
});

function FeedBackForm() {
  const { feedbackFormOpen, setFeedbackFormOpen } = useContext(FeedbackFormContext);
  const { open, once } = feedbackFormOpen;
  const isOpen = open || once;
  const prefersReducedMotion = useReducedMotion();

  const modalRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const [showMessage, setShowMessage] = useState({ loading: false, success: false });
  const [rating, setRating] = useState(null);
  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaValidation) });

  const watchedValues = watch();
  const messageLength = watchedValues.message?.length || 0;

  function toggleTag(tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function closeModal() {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setFeedbackFormOpen({ open: false, once: false });
  }

  const sentFormData = (data) => {
    setShowMessage({ loading: true, success: false });

    AddFeedBack({ ...data, rating, tags })
      .then(() => {
        setShowMessage({ loading: false, success: true });
        closeTimeoutRef.current = setTimeout(closeModal, 4000);
      })
      .catch((e) => {
        console.error("Failed to send feedback:", e);
        setShowMessage({ loading: false, success: false });
      });
  };

  // Reset local UI state once the closing animation has finished.
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setShowMessage({ loading: false, success: false });
      setRating(null);
      setTags([]);
      reset();
    }, 300);
    return () => clearTimeout(t);
  }, [isOpen, reset]);

  // Lock background scroll while the modal is open.
  useScrollLock(isOpen);

  // ESC to close + a lightweight focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const firstFocusable = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)[0];
    firstFocusable?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="themed-scrollbar fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            aria-hidden="true"
            onClick={closeModal}
            className="absolute inset-0 bg-[#020617]/75 backdrop-blur-md"
          ></div>

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 60,
              scale: prefersReducedMotion ? 1 : 0.94,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 30,
              scale: prefersReducedMotion ? 1 : 0.96,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="relative w-full max-w-[720px] rounded-t-[28px] bg-gradient-to-br from-hero-primary/40 via-hero-secondary/30 to-hero-accent/30 p-[1.5px] shadow-2xl shadow-black/50 sm:rounded-[28px]"
          >
            <div className="relative flex max-h-[92vh] flex-col overflow-hidden rounded-t-[26px] bg-hero-bg2/90 backdrop-blur-2xl sm:rounded-[26px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-t-[26px] sm:rounded-[26px]"
              >
                <div className="absolute -top-16 -left-10 h-56 w-56 rounded-full bg-hero-primary/20 blur-[90px]"></div>
                <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-hero-secondary/20 blur-[90px]"></div>
              </div>

              <motion.button
                type="button"
                aria-label="Close feedback form"
                onClick={closeModal}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-hero-muted backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/10 hover:text-hero-text hover:shadow-[0_0_16px_-2px_rgba(139,92,246,0.6)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                  <path
                    fill="currentColor"
                    d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
                  ></path>
                </svg>
              </motion.button>

              <AnimatePresence mode="wait">
                {showMessage.success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex flex-col items-center px-6 py-12 text-center sm:px-10"
                  >
                    {!prefersReducedMotion && <ConfettiBurst />}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-hero-success/30 to-hero-primary/20 text-hero-success shadow-[0_0_30px_-6px_rgba(34,197,94,0.6)]"
                    >
                      <CheckCircleIcon sx={{ fontSize: 48 }} />
                    </motion.span>
                    <h3 className="mt-6 font-manrope text-2xl font-extrabold text-hero-text sm:text-3xl">
                      🎉 Thank You!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-hero-muted sm:text-base">
                      Your feedback has been received successfully.
                    </p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-hero-text backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Continue Exploring
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <form
                      onSubmit={handleSubmit(sentFormData)}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <div className="themed-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pt-8 sm:px-10 sm:pt-10">
                        <div className="text-center">
                          <motion.span
                            animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-hero-primary shadow-[0_0_24px_-6px_rgba(59,130,246,0.6)]"
                          >
                            <ChatBubbleOutlineIcon sx={{ fontSize: 28 }} />
                          </motion.span>

                          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
                            <span className="text-xs">⭐</span>
                            <span className="text-[11px] font-semibold text-hero-muted">
                              Takes Less Than 30 Seconds
                            </span>
                          </div>

                          <h3
                            id="feedback-modal-title"
                            className="mt-4 font-manrope text-2xl font-extrabold text-hero-text sm:text-[32px]"
                          >
                            💬 We&apos;d Love Your Feedback
                          </h3>
                          <p className="mt-2 text-sm text-hero-muted sm:text-base">
                            Help me improve this portfolio by sharing your thoughts.
                          </p>
                          <p className="mt-1 text-xs text-hero-muted/80">
                            Your feedback helps me build better experiences and grow as a
                            developer.
                          </p>
                        </div>

                        <div className="mt-8 space-y-6 pb-6">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <FeedbackInput
                              label="Name"
                              id="feedbackName"
                              type="text"
                              icon={<PersonOutlineIcon fontSize="small" />}
                              register={register("feedbackName")}
                              error={errors.feedbackName}
                              success={!errors.feedbackName && !!watchedValues.feedbackName}
                            />
                            <FeedbackInput
                              label="Email"
                              id="feedbackEmail"
                              type="email"
                              icon={<AlternateEmailIcon fontSize="small" />}
                              register={register("feedbackEmail")}
                              error={errors.feedbackEmail}
                              success={!errors.feedbackEmail && !!watchedValues.feedbackEmail}
                            />
                          </div>

                          <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-hero-muted">
                              What best describes your experience?
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {QUICK_TAGS.map((tag, index) => (
                                <FeedbackChip
                                  key={tag}
                                  label={tag}
                                  selected={tags.includes(tag)}
                                  onClick={() => toggleTag(tag)}
                                  delay={0.03 * index}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-hero-muted">
                              Overall Experience
                            </p>
                            <FeedbackRatingPicker value={rating} onChange={setRating} />
                          </div>

                          <div className="space-y-1.5">
                            <label
                              htmlFor="feedbackMessage"
                              className="text-sm font-semibold text-hero-text"
                            >
                              Your Feedback
                            </label>
                            <div className="relative">
                              <textarea
                                id="feedbackMessage"
                                rows={5}
                                maxLength={MESSAGE_MAX}
                                placeholder="Tell me what you liked and what could be improved..."
                                className={`w-full resize-none rounded-2xl border bg-white/5 px-4 py-3.5 pb-7 text-sm text-hero-text outline-none backdrop-blur-md transition-all duration-300 placeholder:text-hero-muted/60 ${
                                  errors.message
                                    ? "border-red-400/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                                    : "border-white/10 focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/25"
                                }`}
                                {...register("message")}
                              ></textarea>
                              <span className="absolute bottom-2.5 right-3.5 text-[11px] font-medium text-hero-muted">
                                {messageLength} / {MESSAGE_MAX}
                              </span>
                            </div>
                            {errors.message && (
                              <span className="flex items-center gap-1 text-xs font-medium text-red-400">
                                {errors.message.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 bg-hero-bg2/95 px-6 py-4 backdrop-blur-xl sm:px-10">
                        <BtnForm text="🚀 Submit Feedback" loading={showMessage.loading} />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FeedBackForm;
