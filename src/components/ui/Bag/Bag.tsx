'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Bag.module.css';

export function Bag() {
  const { totalItems } = useCart();

  // Determinar si está activo (tiene items)
  const isActive = totalItems > 0;

  // Seleccionar el SVG correcto
  const iconSrc = isActive ? '/cart_Active.svg' : '/cart_Inactive.svg';
  const iconAlt = isActive ? `Cart with ${totalItems} items` : 'Empty cart';

  return (
    <div className={styles.container}>
      {/* Icono de la bolsa */}
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={24}
        height={24}
        className={styles.icon}
      />

      {/* Número - solo visible si totalItems > 0 */}
      {isActive && (
        <span className={styles.count}>{totalItems}</span>
      )}
    </div>
  );
}
