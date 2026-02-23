"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCounter(target: number, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const duration = 2500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [active, target]);
    return count;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function BatterySection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15%" });
    const hours = useCounter(40, inView);

    return (
        <section id="battery" ref={ref} className="section-panel relative py-40 px-6 flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center">

                {/* Header Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2 animate-pulse" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">Energy Core</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight leading-[0.95] mb-8">
                        Power
                        <br />
                        <span className="gradient-text">That Lasts.</span>
                    </h2>
                    <p className="text-[#888] text-lg lg:text-xl max-w-2xl text-center font-light leading-relaxed mb-6">
                        A single charge takes you through full work days, long international flights, and weekend adventures without ever needing a plug.
                    </p>
                </motion.div>

                {/* Main Visualizer Centered */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                    animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.5, delay: 0.2, ease }}
                    className="flex flex-col items-center relative w-full mb-16"
                >
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4f8ef7] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

                    {/* Circular gauge */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center mb-10 sm:mb-12">
                        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(79,142,247,0.4)]">
                            {/* Track */}
                            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                            {/* Fill */}
                            <motion.circle
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="url(#batteryGrad)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 85}
                                initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                                animate={inView ? { strokeDashoffset: 2 * Math.PI * 85 * (1 - 40 / 40) } : {}}
                                transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2a5bb0" />
                                    <stop offset="50%" stopColor="#4f8ef7" />
                                    <stop offset="100%" stopColor="#cce0ff" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="text-center flex flex-col items-center justify-center relative z-10 w-full h-full rounded-full bg-[#080808]/40 backdrop-blur-md border border-white/5">
                            <div className="text-6xl sm:text-7xl lg:text-8xl font-black gradient-text tracking-tighter drop-shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                                {hours}
                            </div>
                            <div className="text-[#a0c4ff] text-xs sm:text-sm uppercase tracking-[0.3em] mt-1 sm:mt-2 font-semibold">Hours</div>
                        </div>
                    </div>

                    {/* Stats Grid Centered Below Gauge */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl z-10">
                        {[
                            { label: "Full Playback", value: "40 hrs" },
                            { label: "ANC Active", value: "30 hrs" },
                            { label: "Fast Charge (5m)", value: "2 hrs" },
                            { label: "0 to 100%", value: "2 hrs" },
                        ].map((s, idx) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 + (idx * 0.1), ease }}
                                className="glass rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-white font-black text-lg sm:text-xl lg:text-2xl mb-1">{s.value}</span>
                                <span className="text-[#666] text-[10px] lg:text-xs uppercase tracking-widest">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
