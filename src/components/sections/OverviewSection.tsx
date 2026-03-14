"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bluetooth, Battery, Zap, Mic, Weight, Headphones } from "lucide-react";

const features = [
    { icon: Headphones, label: "Pure Bass Sound", desc: "JBL Pro Sound with enhanced low-frequency performance that rattles the core." },
    { icon: Mic, label: "Active Noise Cancelling", desc: "Triple-mic hybrid ANC systematically eliminates ambient chaos." },
    { icon: Battery, label: "40-Hour Battery", desc: "Uninterrupted audio endurance on a single charge." },
    { icon: Zap, label: "Hyper Charge", desc: "5 minutes of charge immediately delivers 2 hours of playback." },
    { icon: Bluetooth, label: "Bluetooth 5.3", desc: "Seamless multi-device pairing with instant smart switching." },
    { icon: Weight, label: "Aerospace Frame", desc: "185g ultra-lightweight memory foam for zero listening fatigue." },
];

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease } },
};

export default function OverviewSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="overview" ref={ref} className="section-panel relative py-24 md:py-32 px-6 flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center">

                {/* Header Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease }}
                    className="text-center mb-20 flex flex-col items-center w-full"
                >
                    <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] mr-2" />
                        <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">Core Architecture</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-[0.95] mb-8">
                        Engineered for
                        <br />
                        <span className="gradient-text drop-shadow-[0_0_30px_rgba(79,142,247,0.3)]">Perfection.</span>
                    </h2>
                    <p className="text-[#888] text-lg lg:text-xl max-w-2xl text-center leading-relaxed font-light">
                        Every single component is precision-tuned. Every material decisively chosen for the ultimate balance of longevity, acoustics, and sensory comfort.
                    </p>
                </motion.div>

                {/* Feature grid Centered Bento */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.label}
                            variants={itemVariants}
                            className="glass group flex flex-col items-center text-center p-8 rounded-[2rem] border border-white/5 hover:bg-white/5 hover:border-[#4f8ef7]/30 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#4f8ef7]/0 to-[#4f8ef7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-[#4f8ef7]/10 group-hover:border-[#4f8ef7]/40 transition-colors duration-500 shadow-lg relative z-10">
                                <f.icon size={24} className="text-[#4f8ef7]" />
                            </div>
                            <h3 className="text-white font-bold text-lg lg:text-xl mb-3 relative z-10 tracking-wide">{f.label}</h3>
                            <p className="text-[#777] text-sm lg:text-base leading-relaxed font-light relative z-10">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
