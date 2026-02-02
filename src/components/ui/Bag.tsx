'use client';



import Image from 'next/image';
import styles from './Bag.module.css';

interface BagProps {
  /** Número de items en el carrito */
  count?: number;
}

export function Bag({ count = 0 }: BagProps) {
  // Determinar si está activo (tiene items)
  const isActive = count > 0;

  // Seleccionar el SVG correcto
  const iconSrc = isActive ? '/cart_Active.svg' : '/cart_Inactive.svg';
  const iconAlt = isActive ? `Cart with ${count} items` : 'Empty cart';

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

      {/* Número - solo visible si count > 0 */}
      {isActive && (
        <span className={styles.count}>{count}</span>
      )}
    </div>
  );
}
