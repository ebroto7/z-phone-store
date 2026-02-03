/**
 * Header.tsx
 *
 * Header principal de la aplicación (Server Component).
 *
 * Especificaciones del Figma:
 * - Altura: 80px
 * - Padding: 24px (top/bottom), responsive horizontal
 * - Layout: flex, space-between
 * - Fondo: #FFFFFF
 * - Sin borde
 *
 * Contenido:
 * - Logo MBST a la izquierda (link a home)
 * - Bag (carrito) a la derecha (link a /cart)
 *
 * Nota: El Bag es Client Component y gestiona su propio estado
 * conectándose al CartContext cuando esté implementado.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Bag } from '@/components/ui/Bag/Bag';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      {/* Logo - link a home */}
      <Link href="/" className={styles.logo}>
        <Image
          src="/MBST_logo.svg"
          alt="MBST - Mobile Store"
          width={77}
          height={29}
          priority
        />
      </Link>

      {/* Carrito - link a /cart */}
      <Link href="/cart" className={styles.cartLink}>
        <Bag />
      </Link>
    </header>
  );
}
