import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header/Header';
import { Providers } from './providers';
import './globals.css';
import styles from './layout.module.css';

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
    <html lang="es">
      <body>
        <a href="#main-content" className={styles.skipLink}>
          Saltar al contenido principal
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
