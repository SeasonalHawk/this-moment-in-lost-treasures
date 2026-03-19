import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://thismomentinlosttreasures.com'),
  title: "This Moment in Lost Treasures",
  description: "Pick a date. Discover the loot. AI-powered lost treasure storytelling with comical voice narration.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'This Moment in Lost Treasures',
    description: 'Pick a date. Discover the loot. AI-powered lost treasure storytelling with comical voice narration.',
    images: [{ url: '/logo-full.png', width: 1456, height: 816 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'This Moment in Lost Treasures',
    description: 'Pick a date. Discover the loot. AI-powered lost treasure storytelling with comical voice narration.',
    images: ['/logo-full.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
