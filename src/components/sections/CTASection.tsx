"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTASection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            id="cta"
            ref={ref}
            className="section-panel relative py-40 px-6 overflow-hidden flex flex-col items-center justify-center"
        >
            {/* Ambient Deep Cinematic Glow Orbs */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 2, ease }}
                className="absolute w-[800px] h-[800px] rounded-full bg-[#4f8ef7]/[0.05] blur-[150px] -bottom-40 left-1/2 -translate-x-1/2 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 3, delay: 0.5 }}
                className="absolute w-[500px] h-[500px] rounded-full bg-[#2a5bb0]/10 blur-[100px] top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            />

            <div className="max-w-5xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                    transition={{ duration: 1.5, ease }}
                    className="flex flex-col items-center w-full"
                >
                    <div className="px-5 py-2 rounded-full border border-[#4f8ef7]/20 bg-[#4f8ef7]/5 backdrop-blur-xl mb-8 inline-flex items-center shadow-[0_0_20px_rgba(79,142,247,0.1)]">
                        <span className="text-[#a0c4ff] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">The Pinnacle of Audio</span>
                    </div>

                    <h2 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter mb-6 sm:mb-8 drop-shadow-2xl">
                        Experience Sound
                        <br />
                        <span className="gradient-text drop-shadow-[0_0_40px_rgba(79,142,247,0.4)]">Without Limits.</span>
                    </h2>

                    <p className="text-[#999] text-xl lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                        The absolute zenith of acoustic engineering. Elevate your daily soundtrack into a breathtaking cinematic experience. Yours from $299.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-sm sm:max-w-lg mx-auto">
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(79,142,247,0.6)" }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#4f8ef7] to-[#1a66ff] text-white text-sm sm:text-base lg:text-lg font-bold transition-all shadow-[0_0_20px_rgba(79,142,247,0.4)] border border-white/20"
                        >
                            Secure Yours Today
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm sm:text-base lg:text-lg font-bold text-white transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            Find a Retailer
                        </motion.button>
                    </div>

                    {/* Trust badges - Perfectly Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8, duration: 1, ease }}
                        className="flex flex-wrap gap-6 sm:gap-10 justify-center mt-20 pt-10 border-t border-white/5 w-full max-w-3xl"
                    >
                        {["Free Overnight Shipping", "2-Year Premium Care", "30-Day Audition", "Hi-Res Audio Certified"].map((b) => (
                            <div key={b} className="flex items-center gap-3 text-[#777] hover:text-[#a0c4ff] transition-colors duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] shadow-[0_0_5px_#4f8ef7]" />
                                <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{b}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
