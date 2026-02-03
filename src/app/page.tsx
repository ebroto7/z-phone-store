import { HomeContent } from '@/components/home/HomeContent/HomeContent';
import { SearchBar } from '@/components/ui/SearchBar/SearchBar';
import { getProducts } from '@/services/api';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search } = await searchParams;
  const products = await getProducts({ search, limit: 20 });

  return (
    <main className={styles.main}>
      <div className={styles.searchContainer}>
        <SearchBar defaultValue={search} />
      </div>
      <HomeContent products={products} searchTerm={search} />
    </main>
  );
}
