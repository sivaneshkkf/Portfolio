import { delay, motion } from "framer-motion";
import { RoadMapIcons } from "../data/RoadMapData";

function RoadMapLi({index, status, children }) {

  function getResponsiveRadius() {
    const width = window.innerWidth;
  
    if (width >= 640) {
      // sm (640px and up)
      return 200;
    } else {
      // Default for screens smaller than 640px
      return 115;
    }
  }
  
  let radius = getResponsiveRadius();
  
  // Optional: Update radius when the window resizes
  window.addEventListener("resize", () => {
    radius = getResponsiveRadius();
    console.log("Updated radius:", radius);
  });
  
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
      className="absolute text-dark-icon saturate-150 rounded-full dark:bg-dark-secondary bg-secondary z-10 hover:bg-white transition-all duration-300"
    >
      <div className="dark:bg-dark-secondary bg-secondary flex justify-center items-center sm:text-xl text-sm sm:w-12 sm:h-12 w-8 h-8 rounded-full border-1 border-blue-600">
        {children}
      </div>

      {
        status && (<div className="absolute inset-0 opacity-80 blur-[4px] sm:blur-[8px] bg-accent  -z-50 rounded-full"></div>)
      }
      
    </motion.div>
  );
}

export default RoadMapLi