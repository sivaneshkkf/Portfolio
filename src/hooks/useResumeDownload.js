import { useEffect, useState } from "react";
import axios from "axios";
import { AddDashboardDetails } from "../firebase/config";

// Downloads a resume file via axios (tracking progress), bumps the
// dashboard's download counter, and smoothly animates the displayed
// progress toward the actual download progress.
export function useResumeDownload(resumeUrl, dashboardStats, resetDelay = 3000) {
  const [progressValue, setProgressValue] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const { whatsapp = 0, url = 0, views = 0, downloads = 0 } =
    dashboardStats[0] || {};

  async function handleDownload() {
    try {
      await axios({
        url: resumeUrl,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgressValue(percentCompleted);
        },
      });

      AddDashboardDetails({
        whatsapp,
        url,
        views,
        downloads: downloads + 1,
      }).catch((e) => {
        console.error("Failed to update download count:", e);
      });

      setTimeout(() => {
        setProgressValue(0);
        setDisplayedProgress(0);
      }, resetDelay);
    } catch (error) {
      console.error("Download error:", error);
      setProgressValue(0);
      setDisplayedProgress(0);
    }
  }

  useEffect(() => {
    if (displayedProgress < progressValue) {
      const increment = setInterval(() => {
        setDisplayedProgress((prev) => {
          if (prev >= progressValue) {
            clearInterval(increment);
            return prev;
          }
          return Math.min(prev + 1, progressValue);
        });
      }, 10);

      return () => clearInterval(increment);
    }
  }, [progressValue, displayedProgress]);

  return { handleDownload, progressValue, displayedProgress };
}
