"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import SoundSection from "@/components/sections/SoundSection";
import ANCSection from "@/components/sections/ANCSection";
import BatterySection from "@/components/sections/BatterySection";
import DesignSection from "@/components/sections/DesignSection";
import SpecsSection from "@/components/sections/SpecsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

// Dynamic imports for performance
const ScrollSequence = dynamic(() => import("@/components/ScrollSequence"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808]">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed scroll-scrubbed canvas background */}
      <ScrollSequence />

      {/* Navigation */}
      <Navbar />

      {/* Sections — each is min-h-screen, stacked vertically */}
      {/* The canvas is fixed behind all of them */}
      <div className="relative z-10">
        <HeroSection />
        <OverviewSection />
        <SoundSection />
        <ANCSection />
        <BatterySection />
        <DesignSection />
        <SpecsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
