import { useEffect, useState } from "react";

const useMobileDetectionAndTilt = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        // Detect if user is on mobile
        const checkIfMobile = () => {
            setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
        };
        checkIfMobile();

        // ✅ Function to request motion permission on iOS
        const requestPermission = async () => {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                try {
                    const permission = await DeviceMotionEvent.requestPermission();
                    if (permission === "granted") {
                        console.log("✅ Motion permission granted!");
                        setHasPermission(true);
                        startListening();
                    } else {
                        console.warn("⚠️ Motion permission denied.");
                        setHasPermission(false);
                    }
                } catch (error) {
                    console.error("❌ Error requesting motion permission:", error);
                }
            } else {
                // ✅ Android & older iOS versions don't require permission
                setHasPermission(true);
                startListening();
            }
        };

        // ✅ Start listening to motion events
        const startListening = () => {
            window.addEventListener("deviceorientation", handleMotion);
        };

        const handleMotion = (event) => {
            const rawX = event.gamma || 0; // Left/right tilt
            const rawY = event.beta || 0; // Forward/backward tilt

            // ✅ Offset Y to assume the user holds the phone at 45 degrees
            const adjustedX = rawX; // No need to adjust X much
            const adjustedY = rawY - 45; // Assuming a 45-degree natural hold

            setTilt({
                x: adjustedX,
                y: adjustedY,
            });
        };

        // ✅ Only request permission on mobile
        if (isMobile) {
            requestPermission();
        }

        return () => {
            window.removeEventListener("deviceorientation", handleMotion);
        };
    }, [isMobile]);

    return { isMobile, tilt, hasPermission };
};

export default useMobileDetectionAndTilt;