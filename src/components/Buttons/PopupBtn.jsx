import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShareIcon from "@mui/icons-material/Share";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import { Helmet } from "react-helmet";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { AddDashboardDetails, UseFetchCollection } from "../../firebase/config";

function PopupShareBtn({ popupState, setPopupState }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const dashboardDetails = UseFetchCollection("dashboard");
  const { whatsapp = 0, url = 0, views = 0 } = dashboardDetails[0] || {};

  // useRef to track if views have already been incremented
  const hasUpdatedViews = useRef(false);

  // Increment views on page load
  useEffect(() => {
    const updateViews = async () => {
      try {
        const updatedDetails = {
          whatsapp,
          url,
          views: views + 1, // Increment view count
        };

        const docRef = await AddDashboardDetails(updatedDetails);
        console.log("View count updated with ID:", docRef.id);
      } catch (error) {
        console.error("Failed to update view count:", error);
      }
    };

    // Run updateViews only once when data is first fetched
    if (dashboardDetails.length > 0 && !hasUpdatedViews.current) {
      updateViews();
      hasUpdatedViews.current = true; // Set flag to prevent further updates
    }
  }, [dashboardDetails]);

  async function copyToClip() {
    try {
      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(
        "https://sivaneshkkf.github.io/Portfolio/"
      );
      setCopySuccess(true);

      // Destructure and increment values from dashboardDetails

      const updatedDetails = {
        whatsapp: whatsapp, // Increment whatsapp count
        url: url + 1,
        views: views, // Increment url count
      };

      // Update the Firestore database with incremented values
      AddDashboardDetails(updatedDetails)
        .then((docRef) => {
          console.log("Feedback successfully submitted with ID:", docRef.id);
        })
        .catch((e) => {
          console.error("Failed to send feedback:", e);
        });

      // Reset the copy success message after 3 seconds
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  }

  function handleWhatsappShare() {
    const updatedDetails = {
      whatsapp: whatsapp + 1, // Increment whatsapp count
      url: url,
      views: views, // Increment url count
    };

    // Update the Firestore database with incremented values
    AddDashboardDetails(updatedDetails)
      .then((docRef) => {
        console.log("Feedback successfully submitted with ID:", docRef.id);
      })
      .catch((e) => {
        console.error("Failed to send feedback:", e);
      });
  }
 

  const shareUrl = "https://sivaneshkkf.github.io/Portfolio/";
  const message = `Check out Sivanesh's Portfolio: ${shareUrl}`;

  // screen size contenxt
  const { ScreenSize, setScreenSize } = useContext(ScreenSizeContext);

  return (
    <motion.div className="flex relative">
      <Helmet>
        <meta property="og:title" content="Sivanesh's Portfolio" />
        <meta property="og:description" content="Check out my portfolio!" />
        <meta
          property="og:url"
          content="https://sivaneshkkf.github.io/Portfolio/"
        />
        <meta
          property="og:image"
          content="https://github.com/sivaneshkkf.png"
        />
      </Helmet>

      <motion.div
        className="w-9 h-9 bg-[#0b1f35] dark:bg-dark-primary rounded-full flex justify-center items-center absolute"
        animate={popupState ? { x: -90 } : { x: 0 }}
        transition={{ duration: 1, type: "spring" }}
        onClick={handleWhatsappShare}
      >
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
        >
          <Tooltip title="Share Link on WhatsApp">
            <IconButton>
              <WhatsAppIcon sx={{ color: "#A5A7A9" }} fontSize="small" />
            </IconButton>
          </Tooltip>
        </a>
      </motion.div>

      <motion.div
        className="w-9 h-9 bg-[#0b1f35] dark:bg-dark-primary rounded-full flex justify-center items-center"
        animate={popupState ? { x: -45 } : { x: 0 }}
        transition={{ duration: 1, type: "spring" }}
        onClick={copyToClip}
      >
        <Tooltip title={copySuccess ? "Copied" : "Copy Link"}>
          <IconButton>
            {copySuccess ? (
              <motion.div
                animate={copySuccess ? { scale: [0, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <DoneIcon sx={{ color: "#ffffff" }} fontSize="small" />
              </motion.div>
            ) : (
              <motion.div
                animate={
                  !copySuccess ? { scale: [0, 1.2, 1.2, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.5, type: "spring" }}
              >
                <ContentCopyIcon sx={{ color: "#A5A7A9" }} fontSize="small" />
              </motion.div>
            )}
          </IconButton>
        </Tooltip>

        {ScreenSize === "sm" && copySuccess && (
          <p className="absolute p-1 text-xs text-dark-textpara border border-dark-textpara rounded font-semibold -bottom-10">
            Copied
          </p>
        )}
      </motion.div>

      <motion.div
        className="w-9 h-9 bg-[#0b1f35] dark:bg-dark-primary rounded-full flex justify-center items-center absolute"
        onClick={() => setPopupState(!popupState)}
        animate={popupState ? { rotate: -180 } : { rotate: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
      >
        <Tooltip title="Share">
          <IconButton>
            <ShareIcon
              sx={{ color: "#ffffff", "&:hover": { color: "#FF0051" } }}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
}

export default PopupShareBtn;
