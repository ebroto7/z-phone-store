import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { SearchBar } from '@/components/ui/SearchBar';
import { mockPhones } from '@/data/mockPhones';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <ProductGrid products={mockPhones} />
    </main>
  );
}
