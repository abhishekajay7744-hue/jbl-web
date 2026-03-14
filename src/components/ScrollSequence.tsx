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
    const loadedRef = useRef(0);
    const [ready, setReady] = useState(false);

    // Context caching
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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
    }, []);

    // Render loop and Event Listeners
    useEffect(() => {
        if (!ready) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true })!;
        // Optimization: Disable image smoothing if scaling isn't extreme, or keep it standard. 
        // High quality smoothing is very expensive on every frame.
        ctx.imageSmoothingEnabled = true;
        ctxRef.current = ctx;

        let cw = window.innerWidth;
        let ch = window.innerHeight;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            cw = window.innerWidth;
            ch = window.innerHeight;
            canvas.width = cw * dpr;
            canvas.height = ch * dpr;
            canvas.style.width = `${cw}px`;
            canvas.style.height = `${ch}px`;
            ctx.scale(dpr, dpr);
            renderFrame(currentFrameRef.current);
        }
        
        resize();
        window.addEventListener("resize", resize, { passive: true });

        // Highly optimized drawing function that avoids recalculating scale if not needed
        function renderFrame(index: number) {
            const img = imagesRef.current[index];
            if (!img || !img.complete) return;
            
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // Mathematical equivalent to 'object-fit: cover' centered
            const scale = Math.max(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;
            
            // Draw
            ctx.drawImage(img, dx, dy, dw, dh);
        }

        // Use scroll event for immediate response, falling back to rAF for smooth interpolation
        let targetFrame = 0;
        
        function onScroll() {
            const scrollY = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollY / docH, 0), 1);
            targetFrame = progress * (TOTAL_FRAMES - 1);
            
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animateFrames);
            }
        }

        function animateFrames() {
            // Smooth lerp (linear interpolation)
            const diff = targetFrame - currentFrameRef.current;
            currentFrameRef.current += diff * 0.15; // Lower = smoother but slower, Higher = snappier
            
            // Snap to exact frame if close enough
            if (Math.abs(diff) < 0.05) {
                currentFrameRef.current = targetFrame;
            }

            const frameToDraw = Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1);
            renderFrame(frameToDraw);

            // Continue animating if we haven't reached the target
            if (Math.abs(diff) >= 0.05) {
                rafRef.current = requestAnimationFrame(animateFrames);
            } else {
                rafRef.current = 0; // Reset so onScroll can trigger it again
            }
        }

        // Initial draw
        renderFrame(0);
        
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
                className="fixed inset-0 w-full h-full z-0"
                style={{
                    // Removed heavy CSS filters that caused severe composite layer jank on scroll
                    willChange: "transform",
                    transform: "translateZ(0)", // Force hardware acceleration
                }}
            />
            {/* Vignette */}
            <div className="vignette" />
            {/* Dark gradient overlays for readability */}
            <div className="fixed inset-0 z-[2] pointer-events-none bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]/80" />
        </>
    );
}
