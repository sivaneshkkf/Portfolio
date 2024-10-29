import iphone from "../images/iphone.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function MobileAppsLi({ imgs, name, disc, techs, link }) {
  const [xVal, setXval] = useState(getResponsiveXvalue());

  function getResponsiveXvalue() {
    const width = window.innerWidth;

    if (width >= 1024) {
      // lg (1024px and up)
      return { xl: -135, xr: 135 };
    } else if (width >= 768) {
      // md (768px and up)
      return { xl: -135, xr: 135 };
    } else if (width >= 640) {
      // sm (640px and up)
      return { xl: -125, xr: 125 };
    } else {
      // Default for screens smaller than 640px
      return { xl: -85, xr: 85 };
    }
  }

  useEffect(() => {
    // Set initial xVal on mount
    setXval(getResponsiveXvalue());

    // Update xVal on window resize
    const handleResize = () => {
      setXval(getResponsiveXvalue());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="border-2 dark:border-dark-primary border-primary md:px-8 md:pb-5 px-5 pt-8 pb-5 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm bg-black dark:bg-white dark:bg-opacity-10 bg-opacity-10 w-fit h-full flex flex-col justify-between">
      <div
        className="flex items-center justify-center p-10"
        style={{ perspective: "1000px" }}
      >
        {/* Left iPhone */}
        <motion.span
          className="absolute z-0 drop-shadow-2xl"
          initial={{ x: 0, z: 0, rotateY: 0 }}
          whileInView={{ x: xVal.xl, z: 100, rotateY: -20 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src={imgs[0]}
            alt="iphone"
            className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
          />
        </motion.span>

        {/* Center iPhone */}
        <motion.span
          className="z-10 drop-shadow-2xl"
          initial={{ z: 0, rotateY: 0 }}
          whileInView={{ z: 200, rotateY: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src={imgs[1]}
            alt="iphone"
            className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
          />
        </motion.span>

        {/* Right iPhone */}
        <motion.span
          className="absolute z-0 drop-shadow-2xl"
          initial={{ x: 0, z: 0, rotateY: 0 }}
          whileInView={{ x: xVal.xr, z: 100, rotateY: 20 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src={imgs[2]}
            alt="iphone"
            className="lg:max-w-52 sm:max-w-48 max-w-32 drop-shadow-lg"
          />
        </motion.span>
      </div>

      <div>
        <h4 className="text-sm dark:text-dark-textHead text-textHead font-semibold">{name}</h4>
        <p className="dark:text-dark-textpara text-zinc-950 text-xs mt-3">{disc}</p>

        <div className="mt-5 flex justify-between">
          <ul className="flex flex-wrap md:gap-2 gap-1">
            {techs.map((li, index) => (
              <li
                className="md:py-1 md:px-2 py-[2px] px-1 border dark:border-gray-600 bg-primary dark:bg-dark-primary md:text-xs text-[10px] font-semibold text-textHead dark:text-dark-textHead rounded flex justify-center items-center"
                key={index}
              >
                {li}
              </li>
            ))}
          </ul>

          <div>
            <a href={link} className="dark:text-icon" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileAppsLi;
