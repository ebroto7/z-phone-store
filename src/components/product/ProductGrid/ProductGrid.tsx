/**
 * ProductGrid.tsx
 * Grid responsive para mostrar productos.
 *
 * Comportamiento responsive:
 * - Mobile (<656px): 1 columna
 * - Tablet (656-976px): 2 columnas
 * - Desktop (>976px): 3+ columnas auto
 *
 * Cards:
 * - min-width: 320px
 * - max-width: 400px
 */

import { SmartphoneCard } from '../SmartphoneCard/SmartphoneCard';
import type { ProductListItem } from '@/types';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: ProductListItem[];
  totalResults?: number;
}

export function ProductGrid({ products, totalResults }: ProductGridProps) {
  const count = totalResults ?? products.length;

  return (
    <section className={styles.container}>
      <p className={styles.resultsCount}>{count} RESULTS</p>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
          <SmartphoneCard key={product.id} {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
