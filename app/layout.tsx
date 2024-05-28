
import { ColorModeScript } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import Providers from "./providers";
const share_tech_mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Book of Stamp",
  description: "The Book of Stamp",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={share_tech_mono.className} >
        <ColorModeScript initialColorMode="dark" />
        <Providers>
          {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
