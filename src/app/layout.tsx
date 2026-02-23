import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#080808] text-[#e8e8e8] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
