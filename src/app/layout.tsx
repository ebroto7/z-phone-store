import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBST - Mobile Store',
  description: 'Z Mobile Store Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
