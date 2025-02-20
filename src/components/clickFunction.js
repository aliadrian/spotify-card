import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useSpring } from "framer-motion";
import useMobileDetectionAndTilt from "./useMobileDetectionAndTilt";
import { useNowPlaying } from "./NowPlayingContext";

// Spring animation parameters
const spring = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

export function withClick(FrontComponent, BackComponent) {
  return function (props) {
    const { nowPlaying, setNowPlaying } = useNowPlaying();
    const [isFlipped, setIsFlipped] = useState(false);
    const [nowPlayingForBack, setNowPlayingForBack] = useState(null);
    const ref = useRef(null);
    const { isMobile, tilt } = useMobileDetectionAndTilt(); // Detect mobile + tilt

    useEffect(() => {
      // Prevent infinite loop: update only if `nowPlayingForBack` is valid and different
      if (
        nowPlayingForBack &&
        (!nowPlaying || nowPlaying.song !== nowPlayingForBack.song)
      ) {
        setNowPlaying(nowPlayingForBack);
      }
    }, [nowPlayingForBack, nowPlaying, setNowPlaying]);

    const handleClick = () => setIsFlipped((prevState) => !prevState);

    // 🖱️ Motion values for rotation
    const dx = useSpring(0, spring);
    const dy = useSpring(0, spring);

    // 🖱️ Handle Mouse Movement for Desktop Hover Effect
    const handleMouseMove = (event) => {
      if (isMobile) return; // Skip if mobile

      const element = ref.current;
      if (!element) return; // Ensure ref is attached before proceeding

      const elementRect = element.getBoundingClientRect();
      const elementWidth = elementRect.width;
      const elementHeight = elementRect.height;
      const centerX = elementRect.left + elementWidth / 2;
      const centerY = elementRect.top + elementHeight / 2;

      const mouseX = (event.clientX - centerX) / (elementWidth / 2);
      const mouseY = (event.clientY - centerY) / (elementHeight / 2);

      const maxTilt = 7; // Max tilt angle
      dx.set(mouseY * maxTilt); // Rotate around X-axis (tilt forward/backward)
      dy.set(-mouseX * maxTilt); // Rotate around Y-axis (tilt left/right)
    };

    const handleMouseLeave = () => {
      if (!isMobile) {
        dx.set(0);
        dy.set(0);
      }
    };

    // 🎯 Apply correct rotation: Desktop (Mouse Hover) vs Mobile (Device Orientation)
    useEffect(() => {
      if (isMobile) {
        dx.set(-tilt.y);
        dy.set(tilt.x);
      }
    }, [tilt, isMobile, dx, dy]);

    return (
      <motion.div
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.div
          ref={ref}
          whileHover={isMobile ? {} : { scale: 1.05 }} // Hover zoom only on desktop
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          transition={spring}
          style={{
            width: "100%",
            height: "100%",
            rotateX: dx,
            rotateY: dy,
          }}
        >
          <div
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              style={{
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: "hidden",
                position: "absolute",
              }}
            >
              <FrontComponent
                {...props}
                setNowPlayingForBack={setNowPlayingForBack}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: "hidden",
                position: "absolute",
              }}
            >
              <BackComponent
                {...props}
                nowPlaying={nowPlayingForBack}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
}
