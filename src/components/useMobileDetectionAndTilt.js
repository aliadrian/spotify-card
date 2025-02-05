import { useState, useEffect } from "react";

const useMobileDetectionAndTilt = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const checkMobile = () => {
            const userAgentCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const touchSupportCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            setIsMobile(userAgentCheck || touchSupportCheck);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const handleOrientation = (event) => {
            const { beta, gamma } = event; // Forward/backward and left/right tilt
            const maxTilt = 30; // Limit the tilt effect

            setTilt({
                x: Math.max(-maxTilt, Math.min(maxTilt, gamma)), // Side tilting
                y: Math.max(-maxTilt, Math.min(maxTilt, beta - 90)), // Forward/backward
            });
        };

        window.addEventListener("deviceorientation", handleOrientation);

        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, [isMobile]);

    return { isMobile, tilt };
};

export default useMobileDetectionAndTilt;