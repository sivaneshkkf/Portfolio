import { motion } from "framer-motion";
import { FadeIn } from "../varients/varientAnim";
import GlowCircle from "./GlowCircle";

function ProjectLi({ name, disc, img, techs, bg, link, ghLink }) {
  return (
    // <li className="bg-white shadow-cardShadow sm:p-4 p-3 flex flex-col justify-between rounded-lg">
    //   <a href="#" className="flex flex-col h-full">
    //     <div className="flex-grow">
    //       <img
    //         src={img}
    //         alt="Music Player"
    //         className="w-full object-cover rounded"
    //       />
    //     </div>
    //     <div className="flex-grow">
    //       <h4 className="text-accent lg:text-lg text-sm font-semibold">{name}</h4>
    //       <p className="text-textpara sm:text-xs text-[10px] mt-2">{disc}</p>
    //     </div>
    //     <div className="mt-4 flex sm:items-center items-end justify-between">
    //       <ul className="flex flex-wrap md:gap-2 gap-1">
    //         {techs.map((li, index) => {
    //           return (
    //             <li className="md:py-1 md:px-2 py-[2px] px-1 border-2 bg-primary md:text-xs text-[10px] font-semibold text-textHead rounded" key={index}>
    //               {li}
    //             </li>
    //           );
    //         })}

    //       </ul>
    //       <span className="text-accent">
    //         <svg
    //           className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="2em"
    //           height="2em"
    //           viewBox="0 0 15 15"
    //         >
    //           <path
    //             fill="currentColor"
    //             fillRule="evenodd"
    //             d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
    //             clipRule="evenodd"
    //           ></path>
    //         </svg>
    //       </span>
    //     </div>
    //   </a>
    // </li>

    <motion.li
      className="bg-white group shadow-cardShadow flex flex-col md:rounded-3xl rounded-xl overflow-hidden backdrop-blur-lg backdrop-saturate-0 bg-opacity-100 relative"
      style={{ backgroundImage: `url(${bg})` }}
      variants={FadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false }}
    >
      {/* Blurred Background using an absolute div */}
      <div
        className="absolute -inset-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          filter: "blur(20px)", // This applies the blur
          zIndex: -1,
        }}
      ></div>

       
        <GlowCircle
        className="group-hover:bottom-1/2 group-hover:opacity-100 group-hover:scale-100"
        link={link}/>
      
        
    

      <div
        className=" group flex flex-col h-full relative"
      >
        <div className="relative flex-1 flex justify-center items-center bg-cover bg-center transition-all duration-300 group-hover:scale-[1.02]">
          {/* Main content */}
          <img
            src={img}
            alt={name}
            className="object-cover object-center relative"
          />
        </div>

        {/* Content section */}
        <div className="bottom-0 bg-white p-5 w-full h-full bg-blend-color-burn backdrop-blur-lg bg-opacity-[0.05]">
          <div className="flex-grow">
            <h4 className="text-accent lg:text-lg text-sm font-semibold">
              {name}
            </h4>
            <p className="text-gray-200 dark:text-gray-400 sm:text-xs text-[10px] mt-2">
              {disc}
            </p>
          </div>

          <div className="mt-4 flex sm:items-center items-end justify-between">
            <ul className="flex flex-wrap md:gap-2 gap-1">
              {techs.map((li, index) => (
                <li
                  className="md:py-1 md:px-2 py-[2px] px-1 border dark:border-gray-600 bg-primary dark:bg-dark-primary md:text-xs text-[10px] font-semibold text-textHead dark:text-dark-textHead rounded"
                  key={index}
                >
                  {li}
                </li>
              ))}
            </ul>
            <div>
              <a href={ghLink} className="text-accent" target="blank">
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
    </motion.li>
  );
}

export default ProjectLi;
