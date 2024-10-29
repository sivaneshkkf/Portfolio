import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";

import LoadingAnim from "./components/LoadingAnim.jsx";

import React, { Suspense, useEffect, useState } from "react";

const LazyComponentApp = React.lazy(() => import("./App.jsx"));

function AppWithDelay() {
  const [showSuspense, setShowSuspense] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuspense(true); // Show Suspense after delay
    }, 2000); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  return showSuspense ? (
    <Suspense fallback={<LoadingAnim />}>
      <LazyComponentApp />
    </Suspense>
  ) : (
    <LoadingAnim /> // Initial loading animation shown during delay
  );
}

createRoot(document.getElementById("root")).render(<AppWithDelay />);
