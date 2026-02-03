import { notFound } from 'next/navigation';
import { getProductById } from '@/services/api';
import { isApiError } from '@/lib/errors';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { ProductDetailClient } from '@/components/product/ProductDetailClient/ProductDetailClient';
import { ProductSpecifications } from '@/components/product/ProductSpecifications/ProductSpecifications';
import { SimilarItems } from '@/components/product/SimilarItems/SimilarItems';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    if (isApiError(error) && error.code === 'NOT_FOUND') {
      notFound();
    }
    throw error;
  }

  return (
    <main className={styles.main}>
      <BackButton />
      <ProductDetailClient product={product} />
      <ProductSpecifications specs={product.specs} />
      <SimilarItems products={product.similarProducts} />
    </main>
  );
}
