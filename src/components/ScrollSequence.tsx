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
    const rafRef = useRef<number>(0);
    const [ready, setReady] = useState(false);

    // Viewport dimensions stored as refs so renderFrame always reads the latest
    const cwRef = useRef(0);
    const chRef = useRef(0);
    const dprRef = useRef(1);

    // Preload all frames
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let loaded = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new window.Image();
            img.src = `${IMAGE_PREFIX}${pad(i)}.jpg`;
            img.onload = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES) setReady(true);
            };
            img.onerror = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES) setReady(true);
            };
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    // Render loop and Event Listeners
    useEffect(() => {
        if (!ready) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: false })!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            const cw = window.innerWidth;
            const ch = window.innerHeight;

            // Store for use in renderFrame
            cwRef.current = cw;
            chRef.current = ch;
            dprRef.current = dpr;

            // Set canvas physical pixel dimensions
            canvas.width = Math.floor(cw * dpr);
            canvas.height = Math.floor(ch * dpr);

            // Set CSS display size
            canvas.style.width = `${cw}px`;
            canvas.style.height = `${ch}px`;

            // CRITICAL FIX: Reset transform to identity before applying DPR scale.
            // Without this, every call to resize() compounded the scale (dpr^n after n resizes)
            // causing the image to be drawn at a tiny fraction of the canvas — the "square box" bug.
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

            // Perfect 'object-fit: cover' math — fills entire viewport, centered, no letterboxing
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
            const docH = document.documentElement.scrollHeight - window.innerHeight;
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

        // Initial setup
        resize();
        renderFrame(0);

        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ready]);

    return (
        <>
            <canvas
                ref={canvasRef}
                id="canvas-sequence"
                className="fixed inset-0 z-0"
                style={{
                    width: "100vw",
                    height: "100vh",
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            />
            {/* Vignette */}
            <div className="vignette" />
            {/* Dark gradient overlays for readability */}
            <div className="fixed inset-0 z-[2] pointer-events-none bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]/80" />
        </>
    );
}
