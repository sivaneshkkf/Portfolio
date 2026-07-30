import { useCallback, useEffect, useRef, useState } from "react";

let rippleId = 0;

// Click-position ripple effect shared by the various button components.
// `centered` places the ripple at the element's center instead of the
// click point (used by icon buttons where a corner-anchored ripple looks
// off). Pending removal timeouts are tracked and cleared on unmount so a
// button that unmounts mid-animation doesn't try to setState afterward.
export function useRipple({
  sizeMultiplier = 1.4,
  duration = 650,
  centered = false,
} = {}) {
  const [ripples, setRipples] = useState([]);
  const timeoutsRef = useRef(new Set());

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, []);

  const addRipple = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * sizeMultiplier;
      const id = ++rippleId;
      const x = centered
        ? rect.width / 2 - size / 2
        : e.clientX - rect.left - size / 2;
      const y = centered
        ? rect.height / 2 - size / 2
        : e.clientY - rect.top - size / 2;

      setRipples((prev) => [...prev, { id, x, y, size }]);

      const timeoutId = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
        timeoutsRef.current.delete(timeoutId);
      }, duration);
      timeoutsRef.current.add(timeoutId);
    },
    [sizeMultiplier, duration, centered],
  );

  return { ripples, addRipple };
}
