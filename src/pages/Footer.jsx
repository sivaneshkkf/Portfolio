import { div } from "framer-motion/client";
import { FeedbackFormContext } from "../context/FeedBackFormContext";
import { useContext } from "react";

function Footer() {
    const { feedbackFormOpen, setFeedbackFormOpen } = useContext(FeedbackFormContext);
    console.log(feedbackFormOpen)
    return ( 
        <div className="flex items-center gap-1 text-textpara dark:text-dark-textpara bg-secondary dark:bg-dark-primary py-4 justify-center">
            <div className="w-4 h-4 rounded-full flex items-center justify-center border border-textpara text-[10px]">
                <p>C</p>
            </div>
            <p className="text-xs">2024. All rights reserved</p>
            <button className="px-2 py-1 rounded bg-dark-secondary text-dark-textpara text-xs ml-2 font-semibold"
            onClick={() => {
                setFeedbackFormOpen((pre) => ({
                    ...pre,
                    open:true
                }))}
            }>
                Send Feedback
            </button>
        </div>
     );
}

export default Footer;