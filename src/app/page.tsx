import { ProductProvider } from '@/context/ProductContext';
import { HomeContent } from '@/components/home/HomeContent';
import { SearchBar } from '@/components/ui/SearchBar/SearchBar';
import { getProducts } from '@/services/api';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts({ limit: 20 });

  return (
    <ProductProvider initialProducts={products}>
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
        <HomeContent />
      </main>
    </ProductProvider>
  );
}
