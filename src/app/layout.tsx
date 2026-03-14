import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JBL Pro Wireless – Experience Sound Without Limits",
  description:
    "JBL's most advanced wireless headphones. Active Noise Cancelling, 40-hour battery, Pure Bass Sound. Immerse yourself in cinematic audio.",
  keywords: "JBL, wireless headphones, ANC, noise cancelling, bass, premium audio",
  openGraph: {
    title: "JBL Pro Wireless – Experience Sound Without Limits",
    description: "Immersive, cinematic audio. JBL's most advanced wireless headphones.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#080808] text-[#e8e8e8] overflow-x-hidden`}>
        <SmoothScrolling>
            {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
