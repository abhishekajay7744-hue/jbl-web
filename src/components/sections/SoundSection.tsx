"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const bars = Array.from({ length: 64 }, (_, i) => {
    const pseudoRandom = (i * 17) % 30;
    return {
        height: 10 + Math.sin(i * 0.4) * 40 + pseudoRandom,
        delay: i * 0.03,
    };
});

const ease = [0.16, 1, 0.3, 1] as const;

export default function SoundSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="sound" ref={ref} className="section-panel relative py-40 px-6 flex flex-col items-center justify-center">
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                {/* Header Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, ease }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2 animate-pulse" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">Acoustic Signature</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight leading-[0.95] mb-8">
                        Feel Every
                        <br />
                        <span className="gradient-text">Frequency.</span>
                    </h2>
                    <p className="text-[#888] text-lg lg:text-xl max-w-2xl text-center font-light leading-relaxed mb-12">
                        Proprietary 40mm graphene drivers deliver thunderous bass, lush mids, and crystal-clear highs across the full 20Hz–20kHz spectrum.
                    </p>

                    {/* Stats Centered */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        {[
                            { label: "Deep Bass", value: "40mm" },
                            { label: "Response", value: "20–20k Hz" },
                            { label: "Soundstage", value: "360°" },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1), ease }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    {item.value}
                                </div>
                                <div className="text-xs text-[#555] font-semibold uppercase tracking-[0.2em]">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Sound Visualizer Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(20px)", scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.2, ease }}
                    className="w-full flex flex-col items-center"
                >
                    <div className="glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 w-full shadow-[0_0_50px_rgba(79,142,247,0.05)] border border-white/5 relative overflow-hidden group">

                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#4f8ef7] opacity-[0.03] blur-[100px] rounded-full pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-1000" />

                        <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10">
                            {/* Waveform */}
                            <div className="flex items-end justify-center w-full h-32 sm:h-40 gap-[1px] sm:gap-[2px] overflow-hidden mask-image-fade">
                                {bars.map((bar, i) => (
                                    <div
                                        key={i}
                                        className="w-[2px] sm:w-[3px] rounded-full bg-gradient-to-t from-[#2a5bb0] via-[#4f8ef7] to-[#e6f0ff]"
                                        style={{
                                            height: `${bar.height}%`,
                                            animation: `wave-pulse ${0.8 + ((i * 11) % 6) * 0.1}s ease-in-out infinite alternate`,
                                            animationDelay: `${bar.delay}s`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="text-center w-full">
                                <h3 className="text-white font-bold text-xl md:text-2xl mb-2">JBL Spatial Sound</h3>
                                <p className="text-[#666] text-sm md:text-base tracking-wide font-light">LDAC · Hi-Res Audio Certified Studio Quality</p>
                            </div>

                            {/* EQ bars */}
                            <div className="w-full max-w-lg space-y-4">
                                {[
                                    { label: "Sub-Bass", value: 96 },
                                    { label: "Mid-Range", value: 85 },
                                    { label: "Treble Air", value: 92 },
                                ].map((eq, i) => (
                                    <div key={eq.label} className="flex items-center gap-3 sm:gap-5">
                                        <span className="text-[#666] text-[10px] sm:text-xs font-medium uppercase tracking-widest w-16 sm:w-24 text-right">{eq.label}</span>
                                        <div className="flex-1 h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${eq.value}%` } : {}}
                                                transition={{ duration: 1.5, delay: 0.6 + (i * 0.1), ease }}
                                                className="h-full bg-gradient-to-r from-[#2a5bb0] to-[#80b3ff] rounded-full shadow-[0_0_10px_rgba(79,142,247,0.5)]"
                                            />
                                        </div>
                                        <span className="text-white font-semibold text-[10px] sm:text-xs w-8">{eq.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

