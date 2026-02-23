"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        let animId: number;
        let ring = { x: -100, y: -100 };
        let target = { x: -100, y: -100 };

        const onMove = (e: MouseEvent) => {
            target = { x: e.clientX, y: e.clientY };
            setPos({ x: e.clientX, y: e.clientY });
        };
        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        function animate() {
            ring.x += (target.x - ring.x) * 0.12;
            ring.y += (target.y - ring.y) * 0.12;
            setRingPos({ x: ring.x, y: ring.y });
            animId = requestAnimationFrame(animate);
        }
        animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <>
            <div
                className="cursor-dot"
                style={{
                    left: pos.x - 4,
                    top: pos.y - 4,
                    transform: clicked ? "scale(2)" : "scale(1)",
                }}
            />
            <div
                className="cursor-ring"
                style={{
                    left: ringPos.x - 18,
                    top: ringPos.y - 18,
                    transform: clicked ? "scale(0.6)" : "scale(1)",
                    opacity: clicked ? 0.4 : 1,
                }}
            />
        </>
    );
}
