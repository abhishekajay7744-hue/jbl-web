"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const social = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
];

const links = [
    { label: "Support", href: "#" },
    { label: "Warranty", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
];

export default function Footer() {
    // Year is computed lazily on first render (client-only, no SSR mismatch)
    const [year] = useState(() =>
        typeof window !== "undefined" ? new Date().getFullYear() : null
    );
    return (
        <footer className="relative z-10 border-t border-white/5 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-4xl font-black gradient-text cursor-pointer"
                    >
                        JBL
                    </motion.div>

                    {/* Social icons */}
                    <div className="flex items-center gap-5">
                        {social.map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                whileHover={{ scale: 1.15, color: "#4f8ef7" }}
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#666] hover:text-[#4f8ef7] transition-colors"
                            >
                                <s.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                        {links.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-[#555] text-sm hover:text-[#aaa] transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                    
                    {/* Copyright Info */}
                    <p className="text-[#444] text-sm md:text-xs">
                        © {year ?? "——"} JBL Harman International. All rights reserved.
                    </p>
                </div>

                {/* Centered Designer Logo at the absolute end */}
                <div className="flex flex-col items-center justify-center pt-8 border-t border-white/[0.02] opacity-60 hover:opacity-100 transition-opacity duration-300 text-center">
                    <span className="text-[#555] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                        Designed & Developed By
                    </span>
                    {/* Fixed square size ensures a perfect rounded seal/frame */}
                    <Logo className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-[0_0_15px_rgba(79,142,247,0.3)] transition-transform duration-500 hover:scale-[1.05]" />
                </div>
            </div>
        </footer>
    );
}
