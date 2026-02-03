import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Providers } from './providers';
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
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
