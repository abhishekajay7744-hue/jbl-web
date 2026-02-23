"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 80;
const IMAGE_PREFIX = "/jbl-animations/Whisk_etoihtzldznzygnj1co5qtytktz1qtljr2mw0im_";

function pad(n: number) {
    return String(n).padStart(3, "0");
}

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const loadedRef = useRef(0);
    const [ready, setReady] = useState(false);

    // Preload all frames
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let loaded = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new window.Image();
            img.src = `${IMAGE_PREFIX}${pad(i)}.jpg`;
            img.onload = () => {
                loaded++;
                loadedRef.current = loaded;
                if (loaded === TOTAL_FRAMES) setReady(true);
            };
            imgs.push(img);
        }
        imagesRef.current = imgs;
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Render loop
    useEffect(() => {
        if (!ready) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: false })!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        }
        resize();
        window.addEventListener("resize", resize);

        function drawFrame(index: number, offsetX = 0, offsetY = 0) {
            const img = imagesRef.current[index];
            if (!img || !img.complete) return;
            const cw = window.innerWidth;
            const ch = window.innerHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2 + offsetX;
            const dy = (ch - dh) / 2 + offsetY;
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, dx, dy, dw, dh);
        }

        function getScrollFrame() {
            const scrollY = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollY / docH, 0), 1);
            return Math.round(progress * (TOTAL_FRAMES - 1));
        }

        let lastFrame = -1;
        let lastMx = -999;
        let lastMy = -999;
        function render() {
            const targetFrame = getScrollFrame();
            // Smooth frame approach
            const diff = targetFrame - currentFrameRef.current;
            const step = diff !== 0 ? Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.3) : 0;
            if (diff !== 0) {
                currentFrameRef.current = Math.round(currentFrameRef.current + step);
            }
            const frame = Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1);

            // Mouse parallax offset (subtle)
            const mx = (mouseRef.current.x - window.innerWidth / 2) * 0.015;
            const my = (mouseRef.current.y - window.innerHeight / 2) * 0.015;

            // Prevent continuous CPU/GPU usage when idle
            if (frame !== lastFrame || Math.abs(mx - lastMx) > 0.1 || Math.abs(my - lastMy) > 0.1) {
                drawFrame(frame, mx, my);
                lastFrame = frame;
                lastMx = mx;
                lastMy = my;
            }

            rafRef.current = requestAnimationFrame(render);
        }

        render();

        const onMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMouse, { passive: true });

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouse);
        };
    }, [ready]);

    return (
        <>
            <canvas
                ref={canvasRef}
                id="canvas-sequence"
                className="fixed inset-0 w-[102%] h-[102%] -left-[1%] -top-[1%] z-0"
                style={{
                    filter: "brightness(0.85) contrast(1.04) saturate(1.08) blur(0.7px)",
                    imageRendering: "high-quality" as any,
                    willChange: "transform, filter"
                }}
            />
            {/* Vignette */}
            <div className="vignette" />
            {/* Dark gradient overlays for readability */}
            <div className="fixed inset-0 z-[2] pointer-events-none bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]/80" />
        </>
    );
}
