'use client';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BetUA - AI-Powered Sports Betting Platform',
  description: 'Next-generation sports betting platform with AI-powered predictions',
  keywords: ['betting', 'sports', 'predictions', 'AI', 'blockchain', 'web3', 'Ukraine'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
