import { useState, useEffect } from "react";
import useMobileDetectionAndTilt from "./useMobileDetectionAndTilt";

const TiltCard = () => {
  const { isMobile, tilt, hasPermission, requestPermission } =
    useMobileDetectionAndTilt();
  const [showReloadButton, setShowReloadButton] = useState(
    localStorage.getItem("hasReloaded") !== "true" &&
      localStorage.getItem("motionPermission") === "granted"
  );

  useEffect(() => {
    if (hasPermission && localStorage.getItem("hasReloaded") !== "true") {
      setShowReloadButton(true); // Show reload button after enabling tilt
    }
  }, [hasPermission]);

  const handleReload = () => {
    localStorage.setItem("hasReloaded", "true"); // Save that reload has happened
    setShowReloadButton(false); // Hide reload button
    window.location.reload();
  };

  return (
    <div className="grid place-content-center translate-y-[5vh]">
      <div className="flex items-center justify-center">
        {isMobile && !hasPermission && (
          <button
            onClick={requestPermission}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Enable Motion Tilt
          </button>
        )}

        {isMobile && hasPermission && showReloadButton && (
          <button
            onClick={handleReload}
            className="p-3 bg-green-500 text-white rounded-lg"
          >
            Reload Page
          </button>
        )}
      </div>
    </div>
  );
};

export default TiltCard;
