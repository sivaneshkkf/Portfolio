import { div } from "framer-motion/client";

function GlowCircle({ content, className, link }) {
  return (
    <a className={`absolute left-1/2 bottom-0 z-[1] transform -translate-x-1/2 transition-all duration-500 opacity-0 scale-50 ${className}`}
    href={link}
    target="blank">
         <div className="absolute -inset-[5px] bg-gradient-to-br from-accent to-[#7c0446] rounded-full blur-md saturate-150"></div>
         <div className="absolute -inset-[2px] bg-gradient-to-br from-accent to-[#7c0446] rounded-full saturate-150"></div>
      <div className="relative w-16 h-16 p-2 rounded-full flex justify-center items-center bg-zinc-700 backdrop-saturate-100">
        <p className="text-xs text-semibold text-white">{content}</p>
       
      </div>
    </a>
  );
}

export default GlowCircle;
