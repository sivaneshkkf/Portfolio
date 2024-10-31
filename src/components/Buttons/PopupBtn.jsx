import { useState } from "react";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShareIcon from "@mui/icons-material/Share";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import { Helmet } from "react-helmet";

function PopupShareBtn({popupState, setPopupState}) {
  const [copySuccess, setCopySuccess] = useState(false);

  async function copyToClip() {
    await navigator.clipboard.writeText(
      "https://sivaneshkkf.github.io/Portfolio/"
    );
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }


  const shareUrl = "https://sivaneshkkf.github.io/Portfolio/";
  const message = `Check out Sivanesh's Portfolio: ${shareUrl}`;

  return (
    <motion.div className="flex relative"
    onViewportLeave={() => setPopupState(false)}
    viewport={{once:true, amount:0.2}}
    >
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
        onViewportLeave={{x:0}}
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
              <DoneIcon sx={{ color: "#ffffff" }} fontSize="small" />
            ) : (
              <ContentCopyIcon sx={{ color: "#A5A7A9" }} fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </motion.div>

      <motion.div
        className="w-9 h-9 bg-[#0b1f35] dark:bg-dark-primary rounded-full flex justify-center items-center absolute"
        onClick={() => setPopupState(!popupState)}
      >
        <Tooltip title="Share">
          <IconButton>
            <ShareIcon sx={{ color: "#ffffff" }} fontSize="small" />
          </IconButton>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
}

export default PopupShareBtn;
