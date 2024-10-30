import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

function ImageBlurHash({ src, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  const [size, setSize] = useState({ width: 200, height: 250 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSize({ width: 384, height: 460 });
      } else if (window.innerWidth >= 1024) {
        // LG screens
        setSize({ width: 320, height: 390 });
      } else if (window.innerWidth >= 768) {
        // MD screens
        setSize({ width: 320, height: 390 });
      } else {
        setSize({ width: 180, height: 210 });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the correct size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={`md:max-w-80 xl:max-w-sm mx-auto md:rounded-3xl rounded-2xl shadow-2xl border-2 border-zinc-700 overflow-hidden ${imageLoaded && "hidden"}`}>
        {!imageLoaded && (
          <Blurhash
            hash="L7C?WAog0Lac?[XARktR0KofIpx]"
            width={size.width}
            height={size.height}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}
      </div>
      <div className={`${!imageLoaded && "hidden"}`}>
        {imageLoaded && <img className={className} src={src} alt="pf" />}
      </div>
    </>
  );
}

export default ImageBlurHash;
