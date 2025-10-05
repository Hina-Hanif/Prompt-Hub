import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local"; // ✅ required for local fonts
import "./globals.css";
import type { ReactNode } from "react";


// Use Inter (Google font)
const inter = Inter({
  subsets: ["latin"],
});

// Replace Geist_Mono with a local font version (manual)
const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/geist/GeistMono-Regular.ttf", // you’ll create this folder below
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/geist/GeistMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Next.js 14 fixed font setup",
};

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}