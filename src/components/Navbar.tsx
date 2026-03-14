"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
    { label: "Overview", href: "#overview" },
    { label: "Sound", href: "#sound" },
    { label: "Noise Cancelling", href: "#anc" },
    { label: "Battery", href: "#battery" },
    { label: "Design", href: "#design" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const handleNav = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4 pointer-events-none"
        >
            <div
                className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 pointer-events-auto ${scrolled
                    ? "bg-[#080808]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80"
                    : "bg-transparent border border-transparent"
                    }`}
            >
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-black tracking-wider gradient-text cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    JBL
                </motion.div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNav(link.href)}
                            className="text-sm font-medium text-[#888] hover:text-white transition-colors duration-300 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4f8ef7] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleNav("#cta")}
                        className="btn-neon px-5 py-2 rounded-xl text-sm font-semibold text-[#4f8ef7]"
                    >
                        Buy Now
                    </motion.button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-2 mx-auto max-w-7xl glass rounded-2xl px-6 py-6 flex flex-col gap-4"
                    >
                        {links.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => handleNav(link.href)}
                                className="text-left text-base font-medium text-[#aaa] hover:text-white py-2 border-b border-white/5"
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNav("#cta")}
                            className="btn-neon mt-2 py-3 rounded-xl text-sm font-semibold text-[#4f8ef7] text-center"
                        >
                            Buy Now
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
