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
import GetAppIcon from '@mui/icons-material/GetApp';

function Dashboard() {
  const dashbordDetails = UseFetchCollection("dashboard");
  const { whatsapp = 0, url = 0, views = 0, downloads = 0 } = dashbordDetails[0] || {};

  const feedBackData = UseFetchCollection("feedback");
  const feedBackLength = feedBackData.length;

  // Reusable Stats Component
  function Stats({ icon, count, title }) {
    return (
      <div className="flex justify-center items-center shadow-lg">
        <Tooltip title={title}>
          <div className="flex bg-[#0b1f35] dark:bg-white h-7 dark:bg-opacity-5 bg-opacity-40 rounded overflow-hidden items-center justify-center">
            <div className="bg-[#081625] dark:bg-dark-primary bg-opacity-40 dark:bg-opacity-80">
              <IconButton>{icon}</IconButton>
            </div>
            <h4 className="text-zinc-400 text-sm font-normal lg:font-medium px-2 sm:px-3">{NumberFormatter(count)}
            <span className="text-[10px] ml-2 hidden font-normal lg:inline">{title}</span>
            </h4>
          </div>
        </Tooltip>
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
        />
        <Stats
          icon={<WhatsAppIcon sx={{ color: "#A5A7A9", fontSize: "1rem" }} />}
          count={whatsapp}
          title="WhatsApp Shares"
        />
        <Stats
          icon={<LinkIcon sx={{ color: "#A5A7A9",fontSize: "1rem" }} />}
          count={url}
          title="URL Shares"
        />
        <Stats
          icon={<FeedbackIcon sx={{ color: "#A5A7A9",fontSize: "1rem" }}  />}
          count={feedBackLength}
          title="Feedbacks"
        />
        <Stats
          icon={<GetAppIcon sx={{ color: "#A5A7A9",fontSize: "1rem" }}  />}
          count={downloads}
          title="Downloads"
        />
      </div>
    </div>
  );
}

export default Dashboard;
