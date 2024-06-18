import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Share_Tech_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import Providers from './providers';
const share_tech_mono = Share_Tech_Mono({ subsets: ['latin'], weight: '400' });
const ColorModeScriptWrapper = dynamic(() => import('./ColorModeScriptWrapper'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bookofstamp.com'),
  title: 'Book of Stamp',
  description: 'The Book of Stamp',
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
    images: '/AZlogo.webp',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={share_tech_mono.className}>
        {/* <Cursor /> */}
        <ColorModeScriptWrapper />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
