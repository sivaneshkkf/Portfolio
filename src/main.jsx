import { createRoot } from "react-dom/client";
import "./index.css";

import LoadingAnim from "./components/LoadingAnim.jsx";
import React, { Suspense, useEffect, useState } from "react";
import { ScreenSizeContext } from "./context/ScreenSizeContext.jsx";
import { ScrollProvider } from "./Utils/ScrollValues.jsx";
import getUserLocation from "./utils/GetUserLocation.jsx";

const LazyComponentApp = React.lazy(() => import("./App.jsx"));

function AppWithDelay() {
  const [showSuspense, setShowSuspense] = useState(false);
  const [ScreenSize, setScreenSize] = useState(getScreenWidth());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuspense(true); // Show Suspense after delay
    }, 2000); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // location
  const { ipAddress } = getUserLocation();

  // console.log(ipAddress)

  return (
    <ScreenSizeContext.Provider value={{ ScreenSize, setScreenSize }}>
      {showSuspense ? (
        <Suspense fallback={<LoadingAnim />}>
           <ScrollProvider>
          <LazyComponentApp />
          </ScrollProvider>
        </Suspense>
      ) : (
        <LoadingAnim /> // Initial loading animation shown during delay
      )}
    </ScreenSizeContext.Provider>
  );
}

// Helper function to get screen width size category
function getScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return "xl";
  } else if (screenWidth >= 768) {
    return "lg";
  } else if (screenWidth >= 640) {
    return "md";
  } else {
    return "sm";
  }
}

createRoot(document.getElementById("root")).render(<AppWithDelay />);
