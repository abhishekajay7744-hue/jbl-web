"use client";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const blurSlideUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1.2, ease } },
};

export default function HeroSection() {
    return (
        <section className="section-panel relative py-32 lg:min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-5xl mx-auto flex flex-col items-center">

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={blurSlideUp}
                    className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 inline-flex items-center shadow-2xl"
                >
                    <span className="w-2 h-2 rounded-full bg-[#4f8ef7] mr-3 animate-pulse shadow-[0_0_10px_#4f8ef7]" />
                    <span className="text-white/90 text-xs font-bold tracking-[0.25em] uppercase">Over-Ear Wireless</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 1.4, ease, delay: 0.1 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black leading-[0.95] tracking-tighter mb-10 text-center"
                >
                    <span className="text-white">Hear Every</span>
                    <br />
                    <span className="gradient-text drop-shadow-[0_0_40px_rgba(79,142,247,0.4)]">Detail.</span>
                </motion.h1>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={blurSlideUp}
                    transition={{ delay: 0.25 }}
                    className="text-[#999] text-xl md:text-2xl max-w-2xl mx-auto mb-14 leading-relaxed font-light tracking-wide"
                >
                    Pure Bass Sound · Active Noise Cancelling · 40-Hour Battery
                </motion.p>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={blurSlideUp}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-sm sm:max-w-none mx-auto"
                >
                    <motion.button
                        whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(79,142,247,0.6)" }}
                        whileTap={{ scale: 0.96 }}
                        className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#4f8ef7] to-[#1a66ff] text-white text-sm md:text-base font-bold transition-all shadow-[0_0_20px_rgba(79,142,247,0.4)] border border-white/10"
                    >
                        Buy Now – $299
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.96 }}
                        className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-sm md:text-base font-bold text-white transition-all shadow-xl"
                        onClick={() => document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        Explore Features
                    </motion.button>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 80 }}
                    transition={{ delay: 1, duration: 1.5, ease }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 overflow-hidden"
                >
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#4f8ef7] to-transparent animate-pulse" />
                </motion.div>
            </div>
        </section>
    );
}
