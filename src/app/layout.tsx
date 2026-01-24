import type { Metadata } from "next";
import { Lato, Newsreader, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: "italic",
  weight: "500",
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
    <html lang="en" className={`${lato.variable} ${newsreader.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

