import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Maximize } from "lucide-react";

interface ProjectVideoProps {
  image: string;
  video?: string;
  name: string;
  /** Hover state owned by the parent card, so hovering anywhere on the
   * whole card (not just this panel) triggers playback. */
  isCardHovering: boolean;
}

// Video preview panel: hovering the card cross-fades the thumbnail to an
// autoplay muted video. The only overlay control is the fullscreen button;
// everything else (badges, duration, play button, status text) has been
// stripped per request, so this only works via hover -- there's no
// keyboard/touch-accessible way to trigger playback without it.
function ProjectVideo({ image, video, name, isCardHovering }: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;

    if (isCardHovering) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isCardHovering, video]);

  // Pause if the card scrolls offscreen while still playing.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 },
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
          video && isCardHovering ? "opacity-0" : "opacity-100"
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
            isCardHovering
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
