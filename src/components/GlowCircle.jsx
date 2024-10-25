import { div } from "framer-motion/client";

function GlowCircle({ className, link }) {
  return (
    <a
      className={`absolute left-1/2 bottom-0 z-[1] transform -translate-x-1/2 transition-all duration-500 opacity-0 scale-50 ${className}`}
      href={link}
      target="blank"
    >
      <div className="absolute -inset-[5px] bg-gradient-to-br from-accent to-[#7c0446] rounded-full blur-md saturate-150"></div>
      <div className="absolute -inset-[2px] bg-gradient-to-br from-accent to-[#7c0446] rounded-full saturate-150"></div>
      <div className="relative w-16 h-16 p-2 rounded-full flex justify-center items-center bg-zinc-700 backdrop-saturate-100">
        <div className="font-semibold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
            ></path>
          </svg>
        </div>
      </div>
    </a>
  );
}

export default GlowCircle;
