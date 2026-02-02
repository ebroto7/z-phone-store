import Image from 'next/image';
import Link from 'next/link';
import type { ProductListItem } from '@/types';
import styles from './SmartphoneCard.module.css';

export function SmartphoneCard({ id, brand, name, basePrice, imageUrl }: ProductListItem) {
  const formattedPrice = `${basePrice} EUR`;

  return (
    <Link
      href={`/product/${id}`}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`${brand} ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.brandAndName}>
          <span className={styles.brand}>{brand}</span>
          <span className={styles.name}>{name}</span>
        </div>
        <span className={styles.price}>{formattedPrice}</span>
      </div>
    </Link>
  );
}
