
import { ColorModeScript } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import Providers from "./providers";
const share_tech_mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Book of Stamp",
  description: "The Book of Stamp",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bookofstamp.com/',
    siteName: 'Book of Stamp',
    title: 'Book of Stamp',
    description: 'The Book of Stamp',
    images: [
      {
        url: '/AZlogo.webp',
        width: 1200,
        height: 630,
        alt: 'Book of Stamp OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bookofstamp',
    creator: '@bookofstamp',
    title: 'Book of Stamp',
    description: 'The Book of Stamp',
    images: ['/AZlogo.webp'],
  },
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
