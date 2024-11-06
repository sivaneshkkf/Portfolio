import { div } from "framer-motion/client";
import { deleteDocument, UseFetchCollection } from "../firebase/config";
import { formatTimestamp } from "../utils/Formatter";
import { useContext } from "react";
import { Theme } from "../context/HeadingContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from "@mui/material";

function FeedbackList() {
  const fetchFeedBack = UseFetchCollection("feedback");
  console.log(fetchFeedBack)
  const { theme } = useContext(Theme);

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium dark:text-white text-textHead mb-2">
        Feedbaks
      </h4>
      <div className="flex flex-col md:grid md:grid-cols-2 2xl:flex-row 2xl:flex-wrap gap-2  md:gap-4">
        {fetchFeedBack.map((feed, index) => (
          <div
            className="dark:text-white text-textHead p-2 relative border dark:border-dark-textpara rounded-lg dark:bg-dark-secondary bg-secondary"
            key={index}
          >
            <div className="flex gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  feed.feedbackName
                }&background=${
                  theme === "dark" ? "212428&color=fff" : "F9FAFB"
                }`}
                alt="avatar"
                className="rounded-full w-10 h-10"
              />

              <div className="items-center">
                <h4 className="sm:text-sm text-xs font-medium text-textHead dark:text-dark-textHead">
                  {feed.feedbackName}
                  
                </h4>
                <span className="text-[10px] text-textpara dark:text-dark-textpara">
                    {formatTimestamp(feed.createdAt)}
                </span>
                <div>
                  <p className="text-[12px] sm:text-xs font-normal text-textpara dark:text-dark-textpara">
                    {feed.message}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0"
               onClick={() => deleteDocument("feedback",feed.id)}
              >
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon sx={{ color: "#A5A7A9" }} fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;
