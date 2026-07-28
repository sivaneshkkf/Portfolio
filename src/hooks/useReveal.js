import { useEffect, useRef, useState } from "react";

const DEFAULT_TIMEOUT = 700;

// Drop-in, more reliable replacement for Framer Motion's whileInView/useInView.
//
// Some iOS Safari/Chrome (WebKit) builds leave IntersectionObserver entries
// stuck at their initial, non-intersecting state after a page's first paint:
// the browser simply never re-runs its "update the rendering" step for the
// observer once the page goes idle (no further scroll/resize/animation to
// prompt it), so elements that are already on-screen never get their
// callback fired -- they stay at opacity 0 forever. Opening Web Inspector
// (or eruda, or any DOM-mutating overlay) forces a real layout/paint pass,
// which is why the page "fixes itself" the moment dev tools are attached.
//
// Rather than trying to coax the browser into re-running that step (dev
// tools do it via a genuine reflow -- dispatching synthetic resize/scroll
// *events* does not, since WebKit's algorithm is tied to actual rendering
// updates, not JS-level event listeners), this hook sidesteps
// IntersectionObserver's reliability question entirely: a
// requestAnimationFrame loop polls the element's real, always-fresh
// getBoundingClientRect() each frame. It reveals the element the moment it's
// genuinely near the viewport, or after a short timeout regardless -- so
// content can never get stuck invisible no matter what the browser's
// observer implementation is doing.
export function useReveal({ amount = 0, timeout = DEFAULT_TIMEOUT } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    if (revealedRef.current) return;
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      setInView(true);
    };

    let rafId;
    const start = performance.now();
    const margin = amount > 0 ? 0 : 200;

    const poll = () => {
      if (revealedRef.current) return;
      const rect = el.getBoundingClientRect();
      const nearViewport =
        rect.top < window.innerHeight + margin && rect.bottom > -margin;
      const timedOut = performance.now() - start > timeout;

      if (nearViewport || timedOut) {
        reveal();
        return;
      }
      rafId = requestAnimationFrame(poll);
    };

    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, [amount, timeout]);

  return { ref, inView };
}
