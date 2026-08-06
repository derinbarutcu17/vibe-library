import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Vibe Library | AI Coding Pattern Archive",
  description: "A curated Knowledge Library & Pattern Archive for AI coding. Explore prompt vs. code relationships through beautiful, scannable, educational content.",
  keywords: ["AI coding", "prompt engineering", "code patterns", "vibe coding", "LLM prompts"],
  authors: [{ name: "Derin" }],
  openGraph: {
    title: "The Vibe Library",
    description: "A Digital Athenaeum for AI Coding Patterns",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

// Viewport configuration for iOS safe area support
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

