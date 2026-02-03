'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Bag.module.css';

export function Bag() {
  const { totalItems } = useCart();
  const isActive = totalItems > 0;
  const iconSrc = isActive ? '/cart_Active.svg' : '/cart_Inactive.svg';
  const iconAlt = isActive ? `Cart with ${totalItems} items` : 'Empty cart';

  return (
    <div className={styles.container}>
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={24}
        height={24}
        className={styles.icon}
      />

      {isActive && <span className={styles.count}>{totalItems}</span>}
    </div>
  );
}
