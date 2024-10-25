import React, { useEffect, useState } from "react";

const ToggleSwitch = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setTheme;
    else if (window.matchMedia("prefers-color-scheme : dark").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  });

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  console.log(theme);

  return (
    <div className="fixed bottom-3 right-5 z-50">
      <div
        className=" w-14 h-7 cursor-pointer"
        onClick={handleToggle} // Handle click on the entire div
      >
        {/* Background of the Toggle */}
        <div
          className={`w-full h-full shadow-cardShadow  rounded-full flex ${
            theme === "light" ? "bg-white" : "bg-zinc-600"
          } transition-all duration-300 flex items-center p-[2px]`}
        >
          <div
            className={`w-[23px] h-[23px] flex items-center justify-center absolute rounded-full shadow-md 
          transition-all duration-300 
          ${theme === "dark" ? "translate-x-7 bg-zinc-400" : " bg-zinc-300"}`}
          >
            <span className={`${theme === "light" && "hidden"} text-[#5f99f6]`}>
              <svg
                className="glow-effect"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  fillOpacity="0"
                  d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"
                  fill="currentColor"
                >
                  <animate
                    id="lineMdSunnyFilledLoopToMoonFilledLoopTransition0"
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.6s;lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+6s"
                    dur="0.4s"
                    values="0;1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.2s"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
                <path
                  fillOpacity="0"
                  d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
                  fill="currentColor"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3s"
                    dur="0.4s"
                    values="0;1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.2s"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
                <path
                  fillOpacity="0"
                  d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
                  fill="currentColor"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+0.4s"
                    dur="0.4s"
                    values="0;1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.8s"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
                <path
                  fillOpacity="0"
                  d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"
                  fill="currentColor"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3.4s"
                    dur="0.4s"
                    values="0;1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.6s"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                >
                  <g>
                    <path
                      strokeDasharray="2"
                      strokeDashoffset="4"
                      d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.2s"
                        values="4;2"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray="2"
                      strokeDashoffset="4"
                      d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.2s"
                        dur="0.2s"
                        values="4;2"
                      ></animate>
                    </path>
                    <set
                      fill="freeze"
                      attributeName="opacity"
                      begin="0.5s"
                      to="0"
                    ></set>
                  </g>
                  <path
                    fill="currentColor"
                    d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
                    opacity="0"
                  >
                    <set
                      fill="freeze"
                      attributeName="opacity"
                      begin="0.5s"
                      to="1"
                    ></set>
                  </path>
                </g>
                <mask id="lineMdSunnyFilledLoopToMoonFilledLoopTransition1">
                  <circle cx="12" cy="12" r="12" fill="#fff"></circle>
                  <circle cx="22" cy="2" r="3" fill="#fff">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      begin="0.1s"
                      dur="0.4s"
                      values="22;18"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="cy"
                      begin="0.1s"
                      dur="0.4s"
                      values="2;6"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="r"
                      begin="0.1s"
                      dur="0.4s"
                      values="3;12"
                    ></animate>
                  </circle>
                  <circle cx="22" cy="2" r="1">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      begin="0.1s"
                      dur="0.4s"
                      values="22;18"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="cy"
                      begin="0.1s"
                      dur="0.4s"
                      values="2;6"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="r"
                      begin="0.1s"
                      dur="0.4s"
                      values="1;10"
                    ></animate>
                  </circle>
                </mask>
                <circle
                  cx="12"
                  cy="12"
                  r="6"
                  mask="url(#lineMdSunnyFilledLoopToMoonFilledLoopTransition1)"
                  fill="currentColor"
                >
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.1s"
                    dur="0.4s"
                    values="6;10"
                  ></animate>
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.5s"
                    to="0"
                  ></set>
                </circle>
              </svg>
            </span>

            <span className={`${theme === "dark" && "hidden"} text-orange-100`}>
              <svg
                className="glow-effect"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                >
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <path
                    strokeDasharray="2"
                    strokeDashoffset="2"
                    d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
                  >
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="1.2s"
                      dur="0.2s"
                      values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.2s"
                      dur="0.2s"
                      values="2;0"
                    ></animate>
                  </path>
                  <path
                    strokeDasharray="2"
                    strokeDashoffset="2"
                    d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="1.4s"
                      dur="0.2s"
                      values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.4s"
                      dur="0.2s"
                      values="2;0"
                    ></animate>
                  </path>
                  <animateTransform
                    attributeName="transform"
                    dur="30s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  ></animateTransform>
                </g>
                <g fill="currentColor">
                  <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
                    <animate
                      fill="freeze"
                      attributeName="fill-opacity"
                      dur="0.4s"
                      values="1;0"
                    ></animate>
                  </path>
                  <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
                    <animate
                      fill="freeze"
                      attributeName="fill-opacity"
                      begin="0.2s"
                      dur="0.4s"
                      values="1;0"
                    ></animate>
                  </path>
                </g>
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
                >
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.6s"
                    to="0"
                  ></set>
                </path>
                <mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
                  <circle cx="12" cy="12" r="12" fill="#fff"></circle>
                  <circle cx="18" cy="6" r="12" fill="#fff">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      begin="0.6s"
                      dur="0.4s"
                      values="18;22"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="cy"
                      begin="0.6s"
                      dur="0.4s"
                      values="6;2"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="r"
                      begin="0.6s"
                      dur="0.4s"
                      values="12;3"
                    ></animate>
                  </circle>
                  <circle cx="18" cy="6" r="10">
                    <animate
                      fill="freeze"
                      attributeName="cx"
                      begin="0.6s"
                      dur="0.4s"
                      values="18;22"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="cy"
                      begin="0.6s"
                      dur="0.4s"
                      values="6;2"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="r"
                      begin="0.6s"
                      dur="0.4s"
                      values="10;1"
                    ></animate>
                  </circle>
                </mask>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
                  opacity="0"
                  fill="currentColor"
                >
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.6s"
                    dur="0.4s"
                    values="10;6"
                  ></animate>
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.6s"
                    to="1"
                  ></set>
                </circle>
              </svg>
            </span>
          </div>

          <span
            className={`${
              theme === "dark" && "hidden"
            } ml-auto mr-1 text-gray-400`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fillOpacity="0"
                d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"
                fill="currentColor"
              >
                <animate
                  id="lineMdSunnyFilledLoopToMoonFilledLoopTransition0"
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="0.6s;lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+6s"
                  dur="0.4s"
                  values="0;1"
                ></animate>
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.2s"
                  dur="0.4s"
                  values="1;0"
                ></animate>
              </path>
              <path
                fillOpacity="0"
                d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
                fill="currentColor"
              >
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3s"
                  dur="0.4s"
                  values="0;1"
                ></animate>
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.2s"
                  dur="0.4s"
                  values="1;0"
                ></animate>
              </path>
              <path
                fillOpacity="0"
                d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
                fill="currentColor"
              >
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+0.4s"
                  dur="0.4s"
                  values="0;1"
                ></animate>
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.8s"
                  dur="0.4s"
                  values="1;0"
                ></animate>
              </path>
              <path
                fillOpacity="0"
                d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"
                fill="currentColor"
              >
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3.4s"
                  dur="0.4s"
                  values="0;1"
                ></animate>
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.6s"
                  dur="0.4s"
                  values="1;0"
                ></animate>
              </path>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
              >
                <g>
                  <path
                    strokeDasharray="2"
                    strokeDashoffset="4"
                    d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.2s"
                      values="4;2"
                    ></animate>
                  </path>
                  <path
                    strokeDasharray="2"
                    strokeDashoffset="4"
                    d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.2s"
                      dur="0.2s"
                      values="4;2"
                    ></animate>
                  </path>
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.5s"
                    to="0"
                  ></set>
                </g>
                <path
                  fill="currentColor"
                  d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
                  opacity="0"
                >
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.5s"
                    to="1"
                  ></set>
                </path>
              </g>
              <mask id="lineMdSunnyFilledLoopToMoonFilledLoopTransition1">
                <circle cx="12" cy="12" r="12" fill="#fff"></circle>
                <circle cx="22" cy="2" r="3" fill="#fff">
                  <animate
                    fill="freeze"
                    attributeName="cx"
                    begin="0.1s"
                    dur="0.4s"
                    values="22;18"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="cy"
                    begin="0.1s"
                    dur="0.4s"
                    values="2;6"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.1s"
                    dur="0.4s"
                    values="3;12"
                  ></animate>
                </circle>
                <circle cx="22" cy="2" r="1">
                  <animate
                    fill="freeze"
                    attributeName="cx"
                    begin="0.1s"
                    dur="0.4s"
                    values="22;18"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="cy"
                    begin="0.1s"
                    dur="0.4s"
                    values="2;6"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.1s"
                    dur="0.4s"
                    values="1;10"
                  ></animate>
                </circle>
              </mask>
              <circle
                cx="12"
                cy="12"
                r="6"
                mask="url(#lineMdSunnyFilledLoopToMoonFilledLoopTransition1)"
                fill="currentColor"
              >
                <animate
                  fill="freeze"
                  attributeName="r"
                  begin="0.1s"
                  dur="0.4s"
                  values="6;10"
                ></animate>
                <set
                  fill="freeze"
                  attributeName="opacity"
                  begin="0.5s"
                  to="0"
                ></set>
              </circle>
            </svg>
          </span>

          <span
            className={`${
              theme === "light" && "hidden"
            } mr-auto ml-1 text-gray-400`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
              >
                <path
                  strokeDasharray="2"
                  strokeDashoffset="2"
                  d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    begin="1.2s"
                    dur="0.2s"
                    values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1.2s"
                    dur="0.2s"
                    values="2;0"
                  ></animate>
                </path>
                <path
                  strokeDasharray="2"
                  strokeDashoffset="2"
                  d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    begin="1.4s"
                    dur="0.2s"
                    values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1.4s"
                    dur="0.2s"
                    values="2;0"
                  ></animate>
                </path>
                <animateTransform
                  attributeName="transform"
                  dur="30s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                ></animateTransform>
              </g>
              <g fill="currentColor">
                <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
                <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.2s"
                    dur="0.4s"
                    values="1;0"
                  ></animate>
                </path>
              </g>
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
              >
                <set
                  fill="freeze"
                  attributeName="opacity"
                  begin="0.6s"
                  to="0"
                ></set>
              </path>
              <mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
                <circle cx="12" cy="12" r="12" fill="#fff"></circle>
                <circle cx="18" cy="6" r="12" fill="#fff">
                  <animate
                    fill="freeze"
                    attributeName="cx"
                    begin="0.6s"
                    dur="0.4s"
                    values="18;22"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="cy"
                    begin="0.6s"
                    dur="0.4s"
                    values="6;2"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.6s"
                    dur="0.4s"
                    values="12;3"
                  ></animate>
                </circle>
                <circle cx="18" cy="6" r="10">
                  <animate
                    fill="freeze"
                    attributeName="cx"
                    begin="0.6s"
                    dur="0.4s"
                    values="18;22"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="cy"
                    begin="0.6s"
                    dur="0.4s"
                    values="6;2"
                  ></animate>
                  <animate
                    fill="freeze"
                    attributeName="r"
                    begin="0.6s"
                    dur="0.4s"
                    values="10;1"
                  ></animate>
                </circle>
              </mask>
              <circle
                cx="12"
                cy="12"
                r="10"
                mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
                opacity="0"
                fill="currentColor"
              >
                <animate
                  fill="freeze"
                  attributeName="r"
                  begin="0.6s"
                  dur="0.4s"
                  values="10;6"
                ></animate>
                <set
                  fill="freeze"
                  attributeName="opacity"
                  begin="0.6s"
                  to="1"
                ></set>
              </circle>
            </svg>
          </span>
        </div>

        {/* Toggle Knob */}
      </div>
    </div>
  );
};

export default ToggleSwitch;
