import { useContext, useState, useEffect } from "react";
import emoji from "../images/emoji.png";
import { motion } from "framer-motion";
import { AddFeedBack, UseFetchCollection } from "../firebase/config";
import { DashBoardContext } from "../context/DashBoardContext";
import Dashboard from "../pages/DashBoard";
import FeedbackList from "./FeedBackList";

function DashBordWindow() {
  const { dashboardOpen, setDashboardOpen } = useContext(DashBoardContext);

  return (
    <div
      className={`fixed w-full h-screen flex justify-center items-center inset-0 z-50 dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 ${
        dashboardOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-20 bottom-20">
        <motion.div
          className="p-8 rounded-lg bg-primary dark:bg-dark-primary flex flex-col items-center justify-center md:mx-20 m-2 relative overflow-hidden"
          animate={dashboardOpen ? { y: [400, 0] } : { y: 400 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="w-full">
            <h4 className="text-center text-textHead dark:text-white font-semibold">
              DASHBOARD
            </h4>
            <div className="w-full h-[1px] bg-dark-icon"></div>
          </div>

          <Dashboard className="text-textHead dark:text-dark-textpara" />

          <FeedbackList />

          <span
            className="text-lg p-3 cursor-pointer text-dark-textpara absolute top-1 right-1"
            onClick={() => setDashboardOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
              ></path>
            </svg>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default DashBordWindow;
