import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import localFont from "next/font/local"

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import LevaPanel from "@/components/LevaPanel";

// const inter = Inter({ subsets: ["latin"] });
export const inter = localFont({
  src: [
    {
      path: "../fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Luna E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative -z-10`}>
        <LevaPanel />
        <WixClientContextProvider>
          <Header />
          {children}
          <Footer />
        </WixClientContextProvider>
        </body>
    </html>
  );
}
