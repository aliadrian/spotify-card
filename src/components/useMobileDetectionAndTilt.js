import { useEffect, useState } from "react";

const useMobileDetectionAndTilt = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasPermission, setHasPermission] = useState(
    localStorage.getItem("motionPermission") === "granted"
  );

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };
    checkIfMobile();

    const startListening = () => {
      window.addEventListener("deviceorientation", handleMotion);
    };

    const handleMotion = (event) => {
      const rawX = event.gamma || 0; // Left/right tilt
      const rawY = event.beta || 0; // Forward/backward tilt

      // Offset Y to assume the user holds the phone at 45 degrees
      const adjustedX = rawX;
      const adjustedY = rawY - 45;

      setTilt({ x: adjustedX, y: adjustedY });
    };

    if (isMobile && hasPermission) {
      startListening();
    }

    return () => {
      window.removeEventListener("deviceorientation", handleMotion);
    };
  }, [isMobile, hasPermission]);

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          console.log("Motion permission granted!");
          localStorage.setItem("motionPermission", "granted");
          setHasPermission(true);
        } else {
          console.warn("⚠️ Motion permission denied.");
        }
      } catch (error) {
        console.error("Error requesting motion permission:", error);
      }
    } else {
      setHasPermission(true);
    }
  };

  return { isMobile, tilt, hasPermission, requestPermission };
};

export default useMobileDetectionAndTilt;
