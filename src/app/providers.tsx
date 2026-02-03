'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper para todos los providers de la aplicación.
 * Necesario porque layout.tsx es Server Component.
 */
export function Providers({ children }: ProvidersProps) {
  return <CartProvider>{children}</CartProvider>;
}
