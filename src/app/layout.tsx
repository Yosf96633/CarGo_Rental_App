import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
SessionWrapper;
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body  className=" overflow-x-hidden">
        <Navbar/>
          {children}
          <Toaster/>
          </body>
      </SessionWrapper>
    </html>
  );
}
