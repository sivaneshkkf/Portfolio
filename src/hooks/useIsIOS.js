import { useState, useEffect } from "react";

function detectIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // Classic iPhone/iPod/iPad UA sniffing, plus the iPadOS 13+ quirk where
  // iPads report a desktop Mac UA -- distinguished from an actual Mac by
  // having touch support.
  const isClassicIOS = /iPad|iPhone|iPod/.test(ua);
  const isIPadOS13Plus =
    ua.includes("Macintosh") &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;
  return isClassicIOS || isIPadOS13Plus;
}

// Detects real iOS/iPadOS devices (WebKit) so components can opt out of
// `position: fixed` there -- see TheNaveBar, where fixed positioning has
// repeatedly caused WebKit rendering bugs (disappearing/frozen navbar,
// unresponsive touch) on real iPhones that don't reproduce on desktop or
// in simulators. `sticky` is used as the iOS-only fallback instead.
export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(detectIOS());
  }, []);

  return isIOS;
}
