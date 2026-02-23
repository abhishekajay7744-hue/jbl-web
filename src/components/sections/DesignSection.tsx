"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const details = [
    { label: "Matte Black Finish", desc: "Premium matte aluminium headband with minimalist aesthetics that command attention." },
    { label: "Memory Foam Cushions", desc: "Ultra-soft protein leather cups distribute pressure evenly for zero fatigue." },
    { label: "Adjustable Headband", desc: "Custom-fit steel headband with seamless, silent 20-step height adjustment mechanics." },
    { label: "185g Featherlight Frame", desc: "Aerospace-inspired engineering creates an incredibly lightweight profile." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function DesignSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="design" ref={ref} className="section-panel relative py-40 px-6 flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
                {/* Header Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease }}
                    className="text-center mb-24 flex flex-col items-center w-full"
                >
                    <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">Industrial Design</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-[0.95] mb-8">
                        Crafted for
                        <br />
                        <span className="gradient-text drop-shadow-[0_0_30px_rgba(79,142,247,0.3)]">Infinity.</span>
                    </h2>
                    <p className="text-[#888] text-lg lg:text-xl max-w-2xl text-center font-light leading-relaxed">
                        Every sleek curve and material is decisively chosen to strike the ultimate balance between brutalist endurance and pure sensory luxury.
                    </p>
                </motion.div>

                {/* Vertical Centered Bento Layout */}
                <div className="flex flex-col gap-6 w-full max-w-3xl">
                    {details.map((d, i) => (
                        <motion.div
                            key={d.label}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
                            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                            transition={{ delay: 0.1 * i, duration: 1, ease }}
                            className="glass group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 p-8 rounded-[2rem] border border-white/5 hover:bg-white/5 hover:border-[#4f8ef7]/30 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#4f8ef7]/0 via-[#4f8ef7]/5 to-[#4f8ef7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:bg-[#4f8ef7]/10 group-hover:border-[#4f8ef7]/40 transition-colors duration-500 relative z-10 shadow-lg">
                                <span className="text-[#4f8ef7] text-lg sm:text-xl font-black">{i + 1}</span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">{d.label}</h3>
                                <p className="text-[#777] text-sm md:text-base leading-relaxed font-light">{d.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Material badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ delay: 0.6, duration: 1, ease }}
                    className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-20 max-w-4xl"
                >
                    {["Aerospace Aluminium", "Protein Leather", "Carbon-infused Polymer", "Memory Foam Core"].map((m) => (
                        <span
                            key={m}
                            className="glass px-6 py-3 rounded-full text-[#999] text-xs sm:text-sm font-medium tracking-wide border border-white/5 hover:bg-[#4f8ef7]/10 hover:border-[#4f8ef7]/40 hover:text-white transition-all duration-300 shadow-md cursor-default"
                        >
                            {m}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
