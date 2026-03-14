"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 80;
const IMAGE_PREFIX = "/jbl-animations/Whisk_etoihtzldznzygnj1co5qtytktz1qtljr2mw0im_";

function pad(n: number) {
    return String(n).padStart(3, "0");
}

function getViewportSize() {
    // clientWidth/clientHeight are more reliable than innerWidth/innerHeight
    // across all modes: mobile, desktop mode on mobile, and actual desktop.
    const cw = document.documentElement.clientWidth || window.innerWidth;
    const ch = document.documentElement.clientHeight || window.innerHeight;
    return { cw, ch };
}

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);
    const [ready, setReady] = useState(false);

    const cwRef = useRef(0);
    const chRef = useRef(0);

    // Preload all frames eagerly
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let loaded = 0;
        const total = TOTAL_FRAMES;
        for (let i = 0; i < total; i++) {
            const img = new window.Image();
            img.src = `${IMAGE_PREFIX}${pad(i)}.jpg`;
            const onDone = () => {
                loaded++;
                if (loaded === total) setReady(true);
            };
            img.onload = onDone;
            img.onerror = onDone; // don't hang if one frame 404s
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    useEffect(() => {
        if (!ready) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: false })!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            const { cw, ch } = getViewportSize();

            cwRef.current = cw;
            chRef.current = ch;

            // Physical pixel buffer
            canvas.width = Math.floor(cw * dpr);
            canvas.height = Math.floor(ch * dpr);

            // CSS display size — match clientWidth exactly so no mismatch
            canvas.style.width = cw + "px";
            canvas.style.height = ch + "px";
            canvas.style.left = "0px";
            canvas.style.top = "0px";

            // IMPORTANT: Reset transform completely, then apply DPR.
            // ctx.scale() is cumulative — calling it on every resize multiplies
            // the scale each time (dpr^n after n resizes), shrinking the image to a box.
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            renderFrame(currentFrameRef.current);
        }

        function renderFrame(index: number) {
            const img = imagesRef.current[index];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const cw = cwRef.current;
            const ch = chRef.current;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // Use object-fit:cover math — fills entire canvas, centered, no letterbox
            const scale = Math.max(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;

            ctx.drawImage(img, dx, dy, dw, dh);
        }

        let targetFrame = 0;

        function onScroll() {
            const scrollY = window.scrollY;
            const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (docH <= 0) return;
            const progress = Math.min(Math.max(scrollY / docH, 0), 1);
            targetFrame = progress * (TOTAL_FRAMES - 1);

            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animateFrames);
            }
        }

        function animateFrames() {
            const diff = targetFrame - currentFrameRef.current;
            currentFrameRef.current += diff * 0.15;

            if (Math.abs(diff) < 0.05) {
                currentFrameRef.current = targetFrame;
            }

            const frameToDraw = Math.min(
                Math.max(Math.round(currentFrameRef.current), 0),
                TOTAL_FRAMES - 1
            );
            renderFrame(frameToDraw);

            if (Math.abs(diff) >= 0.05) {
                rafRef.current = requestAnimationFrame(animateFrames);
            } else {
                rafRef.current = 0;
            }
        }

        // Debounce resize so rapid mobile browser chrome changes don't thrash
        let resizeTimer: ReturnType<typeof setTimeout>;
        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 50);
        }

        // Initial render
        resize();
        renderFrame(0);

        window.addEventListener("resize", onResize, { passive: true });
        // Also listen to orientationchange for instant re-draw on rotation
        window.addEventListener("orientationchange", () => {
            setTimeout(resize, 200); // wait for browser to settle new dimensions
        });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
            clearTimeout(resizeTimer);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ready]);

    return (
        <>
            <canvas
                ref={canvasRef}
                id="canvas-sequence"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    willChange: "transform",
                    transform: "translateZ(0)",
                    display: "block",
                }}
            />
            {/* Vignette */}
            <div className="vignette" />
            {/* Dark gradient overlays for readability */}
            <div className="fixed inset-0 z-[2] pointer-events-none bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]/80" />
        </>
    );
}
