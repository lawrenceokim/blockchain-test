import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swap app",
  description: "Basic blockchain token swapping app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "flex flex-col w-screen h-full overflow-x-hidden bg-gradient-to-b from-[#0b0c58] to-[#040527] text-white"
        }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
