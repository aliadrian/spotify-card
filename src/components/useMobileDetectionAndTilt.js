import { useEffect, useState } from "react";

const useMobileDetectionAndTilt = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [hasPermission, setHasPermission] = useState(
        localStorage.getItem("motion_permission") === "granted"
    );

    useEffect(() => {
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    const requestPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === "granted") {
                    console.log("✅ Motion permission granted!");
                    localStorage.setItem("motion_permission", "granted");
                    setHasPermission(true);
                } else {
                    console.warn("⚠️ Motion permission denied.");
                    localStorage.removeItem("motion_permission");
                    setHasPermission(false);
                }
            } catch (error) {
                console.error("❌ Error requesting motion permission:", error);
            }
        } else {
            localStorage.setItem("motion_permission", "granted");
            setHasPermission(true);
        }
    };

    useEffect(() => {
        if (!hasPermission) return;

        const handleMotion = (event) => {
            const rawX = event.gamma || 0;
            const rawY = event.beta || 0;
            const adjustedX = rawX;
            const adjustedY = rawY - 45;

            setTilt({ x: adjustedX, y: adjustedY });
        };

        window.addEventListener("deviceorientation", handleMotion);

        return () => {
            window.removeEventListener("deviceorientation", handleMotion);
        };
    }, [hasPermission]);

    return { isMobile, hasPermission, requestPermission };
};

export default useMobileDetectionAndTilt;