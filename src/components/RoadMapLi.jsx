import { delay, motion } from "framer-motion";
import { RoadMapIcons } from "../data/RoadMapData";

function RoadMapLi({index, children }) {
  const radius = 200; // Radius for positioning along the half-circle
  const angle = (index / (RoadMapIcons.length - 1)) * 180; // Spread icons across 180 degrees for a half-circle

  // Calculate x and y using trigonometry for semi-circular positioning
  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);

  // Variant to handle the scaling and position animation
  const variants = {
    hidden: { scale: 0, x: 0, y: 0, opacity: 0 },
    show: {
      scale: 1,
      x,
      y,
      rotate: 180,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show" // Trigger animation when in view
      className="absolute text-dark-icon saturate-150 rounded-full bg-dark-primary z-10 hover:bg-white transition-all duration-300"
    >
      <div className="bg-zinc-800 flex justify-center items-center text-xl w-12 h-12 rounded-full">
        {children}
      </div>
      <div className="absolute inset-0 blur-[8px] bg-accent -z-50 rounded-full"></div>
    </motion.div>
  );
}

export default RoadMapLi