"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specs = [
    { label: "Driver Customization", value: "40mm Graphene Dual-Diaphragm" },
    { label: "Frequency Range", value: "20Hz – 25kHz Hi-Res Certified" },
    { label: "Bluetooth Protocol", value: "5.3 LE Audio Ready" },
    { label: "Endurance", value: "40 hours continuous playback" },
    { label: "Hyper Charge", value: "5 min duration / 2 hrs runtime" },
    { label: "Charging Interface", value: "USB-C to USB-C Direct" },
    { label: "Chassis Weight", value: "185g Aerospace Grade" },
    { label: "Multipoint", value: "2 simultaneous active connections" },
    { label: "Microphone Array", value: "3x Beamforming (Hybrid ANC)" },
    { label: "Articulation", value: "±15° Silent Swivel Mechanism" },
    { label: "Portability", value: "Fold-flat magnetic lock" },
    { label: "Protection", value: "2 Years JBL Premium Care" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function SpecsSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="specs" ref={ref} className="section-panel relative py-40 px-6 flex flex-col items-center justify-center">
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center">

                {/* Header Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease }}
                    className="text-center mb-20 flex flex-col items-center w-full"
                >
                    <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">Technical Specifications</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.95] mb-6 gradient-text drop-shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                        Numbers that
                        <br />
                        Speak.
                    </h2>
                </motion.div>

                {/* Grid layout for Specs - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 1, ease }}
                    className="glass rounded-[2rem] p-6 sm:p-8 md:p-12 w-full max-w-4xl border border-white/10 relative overflow-hidden"
                >
                    {/* Ambient glow inside specs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#4f8ef7]/[0.02] blur-[80px] pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 relative z-10 w-full">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.05 * i + 0.5, duration: 0.8, ease }}
                                className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b border-white/[0.06] pb-4 group"
                            >
                                <span className="text-[#666] text-[10px] md:text-sm font-medium tracking-widest uppercase transition-colors group-hover:text-[#888] mb-2 sm:mb-0 text-center sm:text-left">{spec.label}</span>
                                <span className="text-white text-xs sm:text-sm md:text-base font-semibold group-hover:text-[#4f8ef7] transition-colors text-center sm:text-right">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
