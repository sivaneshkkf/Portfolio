import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

function ImageBlurHash({ src, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 250 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);  // Corrected: Set to true when image is loaded
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSize({ width: 384, height: 460 });
      } else if (window.innerWidth >= 1024) {
        setSize({ width: 320, height: 390 });
      } else if (window.innerWidth >= 768) {
        setSize({ width: 320, height: 390 });
      } else {
        setSize({ width: 180, height: 210 });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`mx-auto md:rounded-3xl rounded-2xl shadow-2xl border-2 border-zinc-700 overflow-hidden ${imageLoaded ? "hidden" : ""}`}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        {!imageLoaded && (
          <Blurhash
            hash="L7C?WAog0Lac?[XARktR0KofIpx]"
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}
      </div>
      <div className={`${!imageLoaded ? "hidden" : ""}`}>
        {imageLoaded && <img className={className} src={src} alt="pf" />}
      </div>
    </>
  );
}

export default ImageBlurHash;
