import { createRoot } from "react-dom/client";
import "./index.css";

import LoadingAnim from "./components/LoadingAnim.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import App from "./App.jsx";
import { useEffect, useState } from "react";
import { ScreenSizeContext } from "./context/ScreenSizeContext.jsx";
import { ScrollProvider } from "./utils/ScrollValues.jsx";

// Temporary on-page debug console for diagnosing a mobile rendering issue.
// Only loads when visiting the site with ?debug in the URL. Remove once resolved.
if (new URLSearchParams(window.location.search).has("debug")) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => window.eruda && window.eruda.init();
  document.head.appendChild(script);
}

// Some iOS Safari/Chrome (WebKit) builds leave IntersectionObserver entries
// stuck at their initial state after first paint -- scroll-triggered
// (whileInView) animations across the site never fire, so sections stay at
// opacity 0. Attaching Web Inspector "fixes" it because that forces a full
// layout/style recalculation, which makes WebKit re-evaluate the observers.
// We do the same thing programmatically shortly after mount and whenever
// the page is restored from the back-forward cache, so users never have to
// open dev tools for content to appear.
function kickStaleObservers() {
  // Force a synchronous reflow.
  void document.body.offsetHeight;
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("scroll"));
}

function useIOSObserverWatchdog() {
  useEffect(() => {
    const timers = [300, 1000, 2000].map((delay) =>
      setTimeout(kickStaleObservers, delay),
    );
    window.addEventListener("pageshow", kickStaleObservers);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pageshow", kickStaleObservers);
    };
  }, []);
}

function AppShell() {
  const [ScreenSize, setScreenSize] = useState(getScreenWidth());
  const [showLoader, setShowLoader] = useState(true);

  useIOSObserverWatchdog();

  useEffect(() => {
    // Brief branded splash only; it no longer gates when the real app
    // mounts, so a slow/failed transition can't leave the page blank.
    const timer = setTimeout(() => setShowLoader(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ ScreenSize, setScreenSize }}>
      <ErrorBoundary>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </ErrorBoundary>
      {showLoader && (
        <div className="fixed inset-0 z-[999]">
          <LoadingAnim />
        </div>
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

createRoot(document.getElementById("root")).render(<AppShell />);
