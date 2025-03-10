import { useContext, useState, useEffect } from "react";
import emoji from "../images/emoji.png";
import { motion } from "framer-motion";
import { AddFeedBack, AddPreDashboardDetails, UseFetchCollection } from "../firebase/config";
import { DashBoardContext, DashBoardDataContext } from "../context/DashBoardContext";
import Dashboard from "../pages/DashBoard";
import FeedbackList from "./FeedBackList";
import LocationList from "./LocationList";
import getUserLocation from "../Utils/GetUserLocation";
import { LoginStatus } from "../context/LoginFormContext";
import MessageList from "./MessageList";

function DashBordWindow() {
  const { dashboardOpen, setDashboardOpen } = useContext(DashBoardContext);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { loginStatus, setLoginStatus } = useContext(LoginStatus);

  const {dashboardData, setDashboardData} =useContext(DashBoardDataContext)


  // store dashboard data to local storage
  useEffect(() => {

    // if(dashboardData){
    //   localStorage.setItem("dashBoardData",JSON.stringify(dashboardData))
    // }
      // Update the Firestore database with incremented values
      if(dashboardData){
        AddPreDashboardDetails(dashboardData)
        .then((docRef) => {
          console.log("DashBordPreData successfully submitted with ID:", docRef.id);
        })
        .catch((e) => {
          console.error("Failed to send feedback:", e);
        });
      }

  },[dashboardOpen])

  //console.log(dashboardData)

  // screen height update
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //  userLocation
  useEffect(() => {
    const userId = localStorage.getItem("portfolioUserId");

    if (userId !== "kCNccaH0HmbLWK6E6K1ChzXuvbf1") {
      const timer = setTimeout(() => {
        getUserLocation()
          .then((data) => {
            //console.log("Location data:");
            // Handle data as needed, such as saving to Firebase
          })
          .catch((error) => {
            console.error("Error getting location:", error);
          });
      }, 5000);

      // Clear the timer if the component unmounts before 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`fixed w-full flex justify-center items-center inset-0 z-50 dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 ${
        dashboardOpen ? "block" : "hidden"
      }`}
    >
      <motion.div
        className="p-4 w-full rounded-lg bg-primary dark:bg-dark-primary flex flex-col items-center justify-center m-2 relative overflow-hidden"
        animate={dashboardOpen ? { y: [400, 0] } : { y: 400 }}
        transition={{ duration: 0.7, type: "spring" }}
        style={{ height: `${windowHeight - 100}px` }}
      >
        <div className="w-full">
          <h4 className="text-center text-textHead dark:text-white font-semibold">
            DASHBOARD
          </h4>
          <div className="w-full h-[1px] bg-dark-icon"></div>
        </div>

        <div className="pb-8">
          <Dashboard className="text-textHead dark:text-dark-textpara" flex="flex-wrap" />
        </div>

        {dashboardOpen && (
          <div className="hidden-scrollbar overflow-y-auto space-y-5 w-full md:max-w-4xl mx-auto">
            <LocationList />
            <MessageList/>
            <FeedbackList />
          </div>
        )}

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
  );
}

export default DashBordWindow;
