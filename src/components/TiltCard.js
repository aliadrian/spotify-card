import { useState } from "react";
import useMobileDetectionAndTilt from "./useMobileDetectionAndTilt";

const TiltCard = () => {
    const { isMobile, tilt, hasPermission } = useMobileDetectionAndTilt();
    const [permissionRequested, setPermissionRequested] = useState(false);

    const requestMotionPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === "granted") {
                    console.log("✅ Motion permission granted!");
                    setPermissionRequested(true);
                } else {
                    console.warn("⚠️ Motion permission denied.");
                }
            } catch (error) {
                console.error("❌ Error requesting motion permission:", error);
            }
        }
    };

    return (
        <div className="grid place-content-center">
            {isMobile && !hasPermission && !permissionRequested && (
                <button onClick={requestMotionPermission} className="p-3 bg-blue-500 text-white rounded-lg">
                    Enable Motion Tilt
                </button>
            )}

            <div className="w-24 h-9 mt-24 bg-gray-200 rounded-lg flex items-center justify-center"
                style={{
                    transform: `rotateX(${tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`,
                }}
            >
                Click me
            </div>
        </div>
    );
};

export default TiltCard;