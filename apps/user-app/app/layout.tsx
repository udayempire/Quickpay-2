import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import { Inter } from "next/font/google";
import { AppbarClient } from "../components/AppbarClient";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Quickpay",
  description: "A simple wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className} >
          <AppbarClient/>
          {children}
        </body>
      </Providers>
    </html>
  );
}
