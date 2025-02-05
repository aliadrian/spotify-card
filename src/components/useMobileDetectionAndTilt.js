import { useEffect, useState } from "react";

const useMobileDetectionAndTilt = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if user is on mobile
        const checkIfMobile = () => {
            setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
        };
        checkIfMobile();

        // ✅ Request motion permissions on iOS
        const requestPermission = async () => {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                try {
                    const permission = await DeviceMotionEvent.requestPermission();
                    if (permission === "granted") {
                        console.log("✅ Motion permission granted!");
                        startListening();
                    } else {
                        console.warn("⚠️ Motion permission denied.");
                    }
                } catch (error) {
                    console.error("❌ Error requesting motion permission:", error);
                }
            } else {
                startListening(); // Android and non-iOS devices don't need permission
            }
        };

        // ✅ Start listening to motion events
        const startListening = () => {
            window.addEventListener("deviceorientation", handleMotion);
        };

        const handleMotion = (event) => {
            setTilt({
                x: event.gamma || 0, // Left/right tilt
                y: event.beta || 0, // Forward/backward tilt
            });
        };

        // Only request permission on mobile
        if (isMobile) {
            requestPermission();
        }

        return () => {
            window.removeEventListener("deviceorientation", handleMotion);
        };
    }, [isMobile]); // ✅ Added `isMobile` to dependencies

    return { isMobile, tilt };
};

export default useMobileDetectionAndTilt;