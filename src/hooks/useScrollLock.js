import { useEffect } from "react";

// Locks page scroll (via document.body.style.overflow) while `locked` is
// true, restoring it on unlock/unmount.
export function useScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}
