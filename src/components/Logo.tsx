import Image from "next/image";

export default function Logo({ className = "h-12 w-12" }: { className?: string }) {
    // Wrapped in a circular profile frame with a subtle glass border
    return (
        <div className={`relative rounded-full overflow-hidden bg-[#111] border border-white/10 shadow-[0_0_20px_rgba(79,142,247,0.15)] flex items-center justify-center ${className}`}>
            <Image 
                src="/logo-profile.png" 
                alt="WebiQAI Logo" 
                fill
                className="object-cover"
                style={{ objectPosition: 'center 35%' }}
                sizes="80px"
                priority
            />
        </div>
    );
}
