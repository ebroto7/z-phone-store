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

import { SmartphoneCard, type SmartphoneCardProps } from '../SmartphoneCard/SmartphoneCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: SmartphoneCardProps[];
  totalResults?: number;
}

export function ProductGrid({ products, totalResults }: ProductGridProps) {
  const count = totalResults ?? products.length;

  return (
    <section className={styles.container}>
      <p className={styles.resultsCount}>{count} RESULTS</p>
      <div className={styles.grid}>
        {products.map((product) => (
          <SmartphoneCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
