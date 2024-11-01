import { motion } from "framer-motion";
function SendBtn({ showMessage, text }) {
  return (
    <motion.button
      className="mx-auto relative overflow-hidden cursor-pointer bg-accent"
      initial={{ width: 130, height: 32, borderRadius: "5px" }}
      animate={
        showMessage.btnAnim && { width: 45, height: 45, borderRadius: "50%" }
      }
    >
      <div className="flex justify-center items-center px-2 gap-1">
        <p
          className={`text-white text-xs ${
            showMessage.btnAnim ? "hidden" : "block"
          }`}
        >
          {text || "SEND MESSAGE"}
        </p>
        <span
          className={`text-white absolute left-1/2 transform -translate-x-1/2 ${
            showMessage.btnAnim ? "block" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.8em"
            height="2.8em"
            viewBox="0 0 24 24"
            className="animate-spin"
          >
            <g fill="none" fillRule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="currentColor"
                d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12"
                opacity=".1"
              ></path>
              <path
                fill="currentColor"
                d="M12 4.5a7.46 7.46 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.46 10.46 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3"
              ></path>
            </g>
          </svg>
        </span>
        <motion.span
          className="text-white"
          animate={showMessage.btnAnim ?  { x:50, y:-50} : { x:0, y:0 }}
          transition={{
            duration: 2,
            delay:1,
            ease: "linear",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1.846 7.151a.75.75 0 0 0-.228 1.376l6.517 3.915l6.22-4.355a.75.75 0 0 1 .86 1.229l-6.22 4.355l1.45 7.463a.75.75 0 0 0 1.372.256L22.792 3.94a.75.75 0 0 0-.793-1.133z"
              clipRule="evenodd"
            ></path>
          </svg>
        </motion.span>
      </div>
    </motion.button>
  );
}

export default SendBtn;
