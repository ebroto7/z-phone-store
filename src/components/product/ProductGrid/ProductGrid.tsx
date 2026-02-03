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
      <p className={styles.resultsCount} role="status" aria-live="polite">
        {count} RESULTS
      </p>
      <ul className={styles.grid}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <SmartphoneCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
