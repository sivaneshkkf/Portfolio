import { div } from "framer-motion/client";
import TheHeading from "../components/TheHeading";
import { UseFetchCollection } from "../firebase/config";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import FeedbackIcon from "@mui/icons-material/Feedback";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NumberFormatter } from "../utils/Formatter";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useContext, useEffect, useState } from "react";
import {
  DashBoardContext,
  DashBoardDataContext,
} from "../context/DashBoardContext";

function Dashboard({ className = "" }) {

  const feedBackData = UseFetchCollection("feedback");
  const feedBackLength = feedBackData.length;

  const { dashboardData, setDashboardData } = useContext(DashBoardDataContext);
  const [dashboardBadge, setDashboardBadge] = useState({
    whatsapp: 0,
    url: 0,
    views: 0,
    downloads: 0,
    feedbacks:0,
  });
  const { dashboardOpen, setDashboardOpen } = useContext(DashBoardContext);


  const dashbordDetails = UseFetchCollection("dashboard");
  const {
    whatsapp = 0,
    url = 0,
    views = 0,
    downloads = 0,
  } = dashbordDetails[0] || {}; // Handle the case where dashbordDetails is empty


  // Update dashboard data in context when fetched
  useEffect(() => {
    if (dashbordDetails.length > 0) {
      setDashboardData({...dashbordDetails[0],feedbacks:feedBackLength});
    }
  }, [dashbordDetails, setDashboardData,feedBackLength]);


  // Calculate badge values based on localStorage
  const preDashbordDetails = UseFetchCollection("dashboardPreData");
  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("dashBoardData")) || [];
    // const localData = storedData || {}; // Ensure the structure is consist
    const data = preDashbordDetails[0] || ""
    setDashboardBadge({
      whatsapp: whatsapp - data.whatsapp,
      url: url - data.url,
      views: views - data.views,
      downloads: downloads - data.downloads,
      feedbacks: feedBackLength - data.feedbacks
    });
  }, [whatsapp, url, views, downloads,feedBackLength]); // Use individual dependencies for clarity
  // Reusable Stats Component
  function Stats({ icon, count, title, dif }) {
    return (
      <div className="flex justify-center items-center shadow-lg relative">
        <Tooltip title={title}>
          <div className="flex bg-[#0b1f35] dark:bg-white h-7 dark:bg-opacity-5 bg-opacity-40 rounded overflow-hidden items-center justify-center">
            <div className="bg-[#081625] dark:bg-dark-primary bg-opacity-40 dark:bg-opacity-80">
              <IconButton>{icon}</IconButton>
            </div>
            <h4
              className={`text-sm font-normal lg:font-medium px-2 sm:px-3 ${
                className ? className : "text-zinc-400"
              }`}
            >
              {NumberFormatter(count)}
              <span className="text-[10px] ml-2 hidden font-normal lg:inline">
                {title}
              </span>
            </h4>
          </div>
        </Tooltip>
        {dif > 0 && (
          <div className="absolute -top-3 -right-2 w-5 h-5 flex items-center justify-center bg-green-600 rounded-full p-1">
          <p className="text-[12px] text-white">{dif}</p>
        </div>
        )}
        
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-3">
      <div className="flex gap-2 sm:gap-5 mx-auto mt-3">
        <Stats
          icon={<VisibilityIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={views}
          title="Views"
          dif={dashboardBadge.views}
        />
        <Stats
          icon={<WhatsAppIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={whatsapp}
          title="WhatsApp Shares"
          dif={dashboardBadge.whatsapp}
        />
        <Stats
          icon={<LinkIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={url}
          title="URL Shares"
          dif={dashboardBadge.url}
        />
        <Stats
          icon={<FeedbackIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={feedBackLength}
          title="Feedbacks"
          dif={dashboardBadge.feedbacks}
         
        />
        <Stats
          icon={<GetAppIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={downloads}
          title="Downloads"
          dif={dashboardBadge.downloads}
        />
      </div>
    </div>
  );
}

export default Dashboard;
