"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Initial position off-screen
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for the trailing ring
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over clickable elements
            const target = e.target as HTMLElement;
            const isClickable = 
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') != null ||
                target.closest('button') != null ||
                target.classList.contains('clickable');

            setIsHovered(isClickable);
        };
        
        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    scale: clicked ? 0.5 : isHovered ? 0 : 1,
                    opacity: isHovered ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            <motion.div
                className="cursor-ring"
                style={{
                    x: springX,
                    y: springY,
                }}
                animate={{
                    scale: clicked ? 0.8 : isHovered ? 1.6 : 1,
                    backgroundColor: isHovered ? "rgba(79, 142, 247, 0.15)" : "transparent",
                    borderColor: isHovered ? "rgba(79, 142, 247, 0.8)" : "rgba(79, 142, 247, 0.5)",
                    backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ type: "spring", mass: 0.3, stiffness: 400, damping: 25 }}
            />
        </>
    );
}
