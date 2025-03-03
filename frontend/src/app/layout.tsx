import { Inter } from 'next/font/google';
import ClientLayout from './components/ClientLayout';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BetUA',
  description: 'AI-Powered Sports Betting Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#0a1930' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
