"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 80;
const IMAGE_PREFIX = "/jbl-animations/Whisk_etoihtzldznzygnj1co5qtytktz1qtljr2mw0im_";

function pad(n: number) {
    return String(n).padStart(3, "0");
}

function getViewportSize() {
    // window.innerWidth/innerHeight perfectly align with CSS 100vw/100vh bounds,
    // which prevents layout misalignment in "Desktop Mode" on phones
    return {
        cw: window.innerWidth,
        ch: window.innerHeight,
    };
}

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);
    const cwRef = useRef(0);
    const chRef = useRef(0);

    // Two-phase ready: show frame 0 as soon as it's loaded, then unlock full animation
    const [firstFrameReady, setFirstFrameReady] = useState(false);
    const [allFramesReady, setAllFramesReady] = useState(false);

    // --- Phase 1: Preload frame 0 immediately, rest in background ---
    useEffect(() => {
        const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
        imagesRef.current = imgs;

        // CRITICAL FIX: Only load Frame 0 FIRST so it isn't blocked by 79 other requests
        const firstImg = new window.Image();
        firstImg.src = `${IMAGE_PREFIX}${pad(0)}.jpg`;
        imgs[0] = firstImg;

        const loadRest = () => {
            setFirstFrameReady(true);
            let loaded = 1;
            for (let i = 1; i < TOTAL_FRAMES; i++) {
                const img = new window.Image();
                img.src = `${IMAGE_PREFIX}${pad(i)}.jpg`;
                imgs[i] = img;
                
                const onDone = () => {
                    loaded++;
                    if (loaded === TOTAL_FRAMES) setAllFramesReady(true);
                };
                img.onload = onDone;
                img.onerror = onDone;
            }
        };

        firstImg.onload = loadRest;
        firstImg.onerror = loadRest;
    }, []);

    // --- Phase 2: Setup canvas as soon as frame 0 is ready ---
    useEffect(() => {
        if (!firstFrameReady) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: false })!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        function resize() {
            // PERFORMANCE BUGFIX: Cap DPR to 1 on mobile to prevent rendering 
            // massive 4K canvasses in desktop mode which caused extreme lag
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const targetDpr = window.devicePixelRatio || 1;
            const dpr = isTouch ? Math.min(targetDpr, 1) : Math.min(targetDpr, 2);

            const { cw, ch } = getViewportSize();

            cwRef.current = cw;
            chRef.current = ch;

            canvas.width = Math.floor(cw * dpr);
            canvas.height = Math.floor(ch * dpr);
            canvas.style.width = cw + "px";
            canvas.style.height = ch + "px";

            // Reset transform fully before applying DPR — prevents scale compounding on resize
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            renderFrame(currentFrameRef.current);
        }

        function renderFrame(index: number) {
            const imgs = imagesRef.current;
            // Find best available frame: try requested, fall back to nearest loaded
            let img = imgs[index];
            if (!img || !img.complete || img.naturalWidth === 0) {
                // Scan backwards to find last loaded frame
                for (let i = index - 1; i >= 0; i--) {
                    if (imgs[i]?.complete && imgs[i].naturalWidth > 0) {
                        img = imgs[i];
                        break;
                    }
                }
            }
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const cw = cwRef.current;
            const ch = chRef.current;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // Determine if the screen is tall/portrait (like mobile 310x633)
            const isPortrait = ch > cw;

            if (!isPortrait) {
                // HIGH IMPACT: 1.7x zoom for cinematic immersion
                const baseScale = Math.max(cw / iw, ch / ih);
                const scale = baseScale * 1.70; 
                const dw = iw * scale;
                const dh = ih * scale;
                const dx = (cw - dw) / 2;
                const dy = (ch - dh) / 2;
                ctx.drawImage(img, dx, dy, dw, dh);
            } else {
                // DEEP CROP: 1.8x zoom for high-impact mobile experience
                const baseScale = cw / iw;
                const scale = baseScale * 1.80;
                const dw = iw * scale;
                const dh = ih * scale;
                const dx = (cw - dw) / 2;
                // Vertical shift: slight upward offset to center focus
                const dy = ((ch - dh) / 2) - (ch * 0.05);

                // Clear canvas with pure black
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, cw, ch);

                // Draw the perfectly zoomed video frame in the center
                // Draw the perfectly zoomed video frame in the center
                ctx.drawImage(img, dx, dy, dw, dh);

                // THE MAGIC: If there's still empty screen space at top/bottom,
                // grab the 1st/last visible row of pixels and stretch it seamlessly
                // Safely creating an offscreen canvas to prevent Safari iOS crashes
                if (dy > 0) {
                    const topRow = document.createElement("canvas");
                    topRow.width = cw;
                    topRow.height = 1;
                    const tctx = topRow.getContext("2d")!;
                    tctx.drawImage(canvas, 0, dy, cw, 1, 0, 0, cw, 1);
                    ctx.drawImage(topRow, 0, 0, cw, 1, 0, 0, cw, dy);
                }
                const bottomEdge = dy + dh;
                if (bottomEdge < ch) {
                    const bottomRow = document.createElement("canvas");
                    bottomRow.width = cw;
                    bottomRow.height = 1;
                    const bctx = bottomRow.getContext("2d")!;
                    bctx.drawImage(canvas, 0, bottomEdge - 1, cw, 1, 0, 0, cw, 1);
                    ctx.drawImage(bottomRow, 0, 0, cw, 1, 0, bottomEdge, cw, ch - bottomEdge);
                }
            }
        }

        // --- Scroll-driven frame update ---
        let targetFrame = 0;

        function updateFromScroll() {
            const scrollY = window.scrollY;
            const docH =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            if (docH <= 0) return;
            const progress = Math.min(Math.max(scrollY / docH, 0), 1);
            targetFrame = progress * (TOTAL_FRAMES - 1);
        }

        // Continuous RAF loop — smooth lerp towards target every frame.
        // This works for BOTH native scroll and Lenis-driven scroll.
        function continuousLoop() {
            updateFromScroll();

            const diff = targetFrame - currentFrameRef.current;
            // DRAMATICALLY FASTER: Learp increased to 0.7 for instant, 'perfectly synced' response.
            // This kills the "slow delay" feeling.
            currentFrameRef.current += diff * 0.7;

            if (Math.abs(diff) < 0.01) {
                currentFrameRef.current = targetFrame;
            }

            const frameToDraw = Math.min(
                Math.max(Math.round(currentFrameRef.current), 0),
                TOTAL_FRAMES - 1
            );
            renderFrame(frameToDraw);

            rafRef.current = requestAnimationFrame(continuousLoop);
        }

        // Debounced resize handler
        let resizeTimer: ReturnType<typeof setTimeout>;
        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 60);
        }

        function onOrientationChange() {
            setTimeout(resize, 300);
        }

        // Boot
        resize();
        rafRef.current = requestAnimationFrame(continuousLoop);

        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("orientationchange", onOrientationChange);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onOrientationChange);
            clearTimeout(resizeTimer);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [firstFrameReady]);

    // Re-render current frame whenever more frames become available (fills in gaps)
    useEffect(() => {
        if (allFramesReady) {
            // Nothing special needed — the RAF loop will pick up new frames automatically
        }
    }, [allFramesReady]);

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
                    // Background matches site so the initial flash before frame 0 isn't jarring
                    background: "#000000",
                }}
            />
            {/* Vignette */}
            <div className="vignette" />
            {/* Dark gradient overlays for readability */}
            <div className="fixed inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </>
    );
}
