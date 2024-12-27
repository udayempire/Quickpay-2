import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Quickpay",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
