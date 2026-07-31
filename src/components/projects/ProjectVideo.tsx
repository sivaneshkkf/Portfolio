import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Maximize } from "lucide-react";

interface ProjectVideoProps {
  image: string;
  video?: string;
  name: string;
  /** Hover state owned by the parent card, so hovering anywhere on the
   * whole card (not just this panel) triggers playback on devices that
   * actually have a hover-capable pointer. */
  isCardHovering: boolean;
}

// Video preview panel: on hover-capable devices (desktop), hovering the
// card cross-fades the thumbnail to an autoplay muted video. On touch
// devices -- which have no hover -- the same preview instead plays
// automatically while the panel is scrolled into view, pausing again once
// it scrolls back out. The only overlay control is the fullscreen button.
function ProjectVideo({ image, video, name, isCardHovering }: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: none)");
    setIsTouchDevice(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const isPlaying = isCardHovering || (isTouchDevice && isInView);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;

    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isPlaying, video]);

  // Touch devices: play while in view, pause once scrolled away. Desktop
  // still relies on hover, but this also acts as a safety net there --
  // pausing playback if the card scrolls offscreen while hovered.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

  function handleFullscreen(e: React.MouseEvent) {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.().catch(() => {});
  }

  return (
    <div
      ref={containerRef}
      className="group/video relative aspect-video w-full overflow-hidden rounded-[22px] bg-black/5 dark:bg-black/20"
    >
      <img
        src={image}
        alt={`${name} preview`}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[400ms] ease-out ${
          video && isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-[400ms] ease-out ${
            isPlaying
              ? `opacity-100 ${prefersReducedMotion ? "" : "scale-[1.03]"}`
              : "opacity-0"
          }`}
        />
      )}

      {video && (
        <button
          type="button"
          onClick={handleFullscreen}
          aria-label="View preview fullscreen"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Maximize size={14} />
        </button>
      )}
    </div>
  );
}

export default ProjectVideo;
