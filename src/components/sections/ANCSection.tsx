"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ANCSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });
    const [ancOn, setAncOn] = useState(false);

    return (
        <section id="anc" ref={ref} className="section-panel relative py-24 md:py-32 px-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient noise background (shown when ANC is OFF) */}
            <motion.div
                animate={{ opacity: ancOn ? 0 : 0.6 }}
                transition={{ duration: 1.2, ease }}
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            >
                {Array.from({ length: 30 }).map((_, i) => {
                    // Make deterministic pseudo-random values derived from i
                    const size = 3 + (i * 17) % 8;
                    const left = (i * 23) % 100;
                    const top = (i * 37) % 100;
                    const duration = 2 + (i * 11) % 3;
                    const delay = (i * 13) % 3;

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#4f8ef7] blur-[2px]"
                            style={{
                                width: size,
                                height: size,
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            animate={{ opacity: [0.05, 0.4, 0.05], scale: [1, 2, 1] }}
                            transition={{ duration, repeat: Infinity, delay }}
                        />
                    );
                })}
            </motion.div>

            <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease }}
                    className="text-center w-full flex flex-col items-center mb-16"
                >
                    <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">Adaptive Noise Cancelling</span>
                    </div>

                    <h2 className="text-5xl sm:text-6xl lg:text-[6.5rem] font-black tracking-tight leading-[0.9] mb-8">
                        Silence the
                        <br />
                        <span className="gradient-text drop-shadow-[0_0_30px_rgba(79,142,247,0.3)]">Chaos.</span>
                    </h2>
                    <p className="text-[#888] text-lg lg:text-xl max-w-2xl text-center leading-relaxed font-light mb-16">
                        Custom-developed True Adaptive Noise Cancelling technology continuously maps your environment in real-time to eliminate up to 40dB of background frequency.
                    </p>

                    {/* Interactive ANC Control - Centered */}
                    <div className="flex flex-col items-center w-full max-w-xl">
                        {/* Status Card */}
                        <motion.div
                            animate={{
                                backgroundColor: ancOn ? "rgba(79,142,247,0.05)" : "rgba(255,255,255,0.02)",
                                borderColor: ancOn ? "rgba(79,142,247,0.3)" : "rgba(255,255,255,0.05)",
                                boxShadow: ancOn ? "0 0 50px rgba(79,142,247,0.15)" : "0 0 0px rgba(0,0,0,0)"
                            }}
                            transition={{ duration: 0.8 }}
                            className="w-full glass rounded-[2rem] p-6 sm:p-10 flex flex-col items-center relative overflow-hidden mb-12 border transition-all text-center"
                        >
                            {/* Ripple rings when ANC is on */}
                            {ancOn &&
                                [0, 0.6, 1.2].map((delay) => (
                                    <div
                                        key={delay}
                                        className="ripple-ring absolute inset-0 rounded-[2rem] border border-[#4f8ef7]/40 pointer-events-none"
                                        style={{ animationDelay: `${delay}s`, animationDuration: '2.5s' }}
                                    />
                                ))}

                            <motion.div
                                animate={{ scale: ancOn ? 1.1 : 1 }}
                                transition={{ duration: 0.5, ease }}
                                className="w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mb-6 relative z-10"
                            >
                                <span className="text-3xl">{ancOn ? "🎧" : "🔊"}</span>
                            </motion.div>

                            <h3 className="text-white font-black text-2xl lg:text-3xl tracking-tight mb-3 relative z-10">
                                {ancOn ? "Absolute Silence" : "Transparency Mode"}
                            </h3>

                            <p className="text-[#888] text-sm lg:text-base mb-6 max-w-xs relative z-10 font-light">
                                {ancOn
                                    ? "External frequencies are aggressively neutralized."
                                    : "Audio pass-through allows you to hear your surroundings clearly."}
                            </p>

                            {ancOn && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 bg-[#4f8ef7]/10 px-4 py-1.5 rounded-full border border-[#4f8ef7]/20 relative z-10"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#4f8ef7] animate-pulse shadow-[0_0_5px_#4f8ef7]" />
                                    <span className="text-[#4f8ef7] text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase">40dB Suppressed</span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Toggle Switch */}
                        <div className="flex items-center gap-4 sm:gap-8 bg-white/5 p-3 sm:p-4 rounded-full border border-white/10 backdrop-blur-md">
                            <span className={`text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${!ancOn ? "text-white drop-shadow-[0_0_10px_white]" : "text-[#555]"}`}>
                                OFF
                            </span>
                            <button
                                onClick={() => setAncOn((v) => !v)}
                                className={`relative w-24 h-12 rounded-full transition-all duration-500 ease-in-out ${ancOn ? "bg-gradient-to-r from-[#2a5bb0] to-[#4f8ef7] shadow-[0_0_20px_rgba(79,142,247,0.5)]" : "bg-white/10 hover:bg-white/20"
                                    } cursor-pointer border border-white/10`}
                                aria-label="Toggle ANC"
                            >
                                <motion.div
                                    animate={{ x: ancOn ? 50 : 4 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="absolute top-1.5 w-9 h-9 rounded-full shadow-lg flex items-center justify-center bg-white"
                                >
                                    {ancOn && <div className="w-4 h-4 rounded-full border-2 border-[#4f8ef7]" />}
                                </motion.div>
                            </button>
                            <span className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${ancOn ? "text-[#4f8ef7] drop-shadow-[0_0_10px_#4f8ef7]" : "text-[#555]"}`}>
                                ON
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
