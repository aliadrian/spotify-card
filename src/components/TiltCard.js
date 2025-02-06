import { useState } from "react";
import useMobileDetectionAndTilt from "./useMobileDetectionandTilt";

const TiltCard = () => {
    const { isMobile, tilt, hasPermission, requestPermission } = useMobileDetectionAndTilt();

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="grid place-content-center translate-y-[10vh]">
            <div className="flex items-center justify-center"
                style={{
                    transform: `rotateX(${tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`,
                }}
            >
                {isMobile && !hasPermission && (
                    <button onClick={requestPermission} className="p-3 bg-blue-500 text-white rounded-lg">
                        Enable Motion Tilt
                    </button>
                )}

                {isMobile && hasPermission && (
                    <button onClick={handleReload} className="p-3 bg-green-500 text-white rounded-lg">
                        Reload Page
                    </button>
                )}
            </div>
        </div>
    );
};

export default TiltCard;