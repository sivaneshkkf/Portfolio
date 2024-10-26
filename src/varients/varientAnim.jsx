import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const FadeIn = (direction, delay, opacity) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "right" ? 40 : direction === "left" ? -40 : 0,
      opacity: opacity,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export function SuccessMessage({ showMessage }) {
  return (
    <div className={`${showMessage.anim ? "block" : "hidden"}`}>
     {showMessage.anim && (
        <DotLottieReact
          src="./src/animation/messageSentAnim.lottie"
          autoplay
        />
      )}
      <motion.p
        className="text-sm font-semibold text-textHead dark:text-dark-textHead text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={
          showMessage.text ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
        }
        transition={{ duration: 0.5, delay: 3 }}
      >
        Message Sent Successfully
      </motion.p>
    </div>
  );
}
