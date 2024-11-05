import { div } from "framer-motion/client";
import { UseFetchCollection } from "../firebase/config";
import { formatTimestamp } from "../utils/Formatter";

function FeedbackList() {
  const fetchFeedBack = UseFetchCollection("feedback");

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium dark:text-white text-textHead mb-2">
        Feedbaks
      </h4>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 2xl:flex-row 2xl:flex-wrap gap-2">
        {fetchFeedBack.map((feed, index) => (
          <div className="dark:text-white text-textHead p-2 border dark:border-dark-textpara rounded-lg dark:bg-dark-secondary bg-secondary" key={index}>
            <div>
              <img src="" alt="" />
              <h4 className="sm:text-sm text-xs font-medium mb-2 text-textHead dark:text-dark-textHead">
                {feed.feedbackName}
                <span className="text-[10px] text-textpara dark:text-dark-textpara ml-2">
                  {formatTimestamp(feed.createdAt)}
                </span>
              </h4>
            </div>
            <div>
              <p className="text-[12px] sm:text-xs font-normal text-textpara dark:text-dark-textpara">
                {feed.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;
