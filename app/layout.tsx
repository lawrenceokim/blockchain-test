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
          "flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-br from-950 to-black text-50 p-3"
        }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
