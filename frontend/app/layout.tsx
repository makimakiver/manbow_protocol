import type { Metadata } from "next";
import { Noto_Sans_JP, Comfortaa, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { DAppKitClientProvider } from "./DAppKitClientProvider";
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-zen-old-mincho",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Manbow - Multi-Chain Lending Protocol",
  description: "Lend on one chain, borrow on another. Manbow enables seamless cross-chain lending from your SUI wallet using IKA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansJP.variable} ${comfortaa.variable} ${zenOldMincho.variable} antialiased`}
      >
        <DAppKitClientProvider>
          {children}
        </DAppKitClientProvider>
      </body>
    </html>
  );
}
