import { useState, useEffect } from "react";
import useMobileDetectionAndTilt from "./useMobileDetectionAndTilt";

const TiltCard = () => {
    const { isMobile, tilt, hasPermission, requestPermission } = useMobileDetectionAndTilt();
    const [hasReloaded, setHasReloaded] = useState(
        localStorage.getItem("hasReloaded") === "true"
    );

    useEffect(() => {
        if (!hasReloaded && hasPermission) {
            localStorage.setItem("hasReloaded", "true");
            setHasReloaded(true);
        }
    }, [hasPermission]);

    const handleReload = () => {
        localStorage.setItem("hasReloaded", "true"); // Ensure state is saved before reload
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

                {isMobile && hasPermission && !hasReloaded && (
                    <button onClick={handleReload} className="p-3 bg-green-500 text-white rounded-lg">
                        Reload Page
                    </button>
                )}
            </div>
        </div>
    );
};

export default TiltCard;