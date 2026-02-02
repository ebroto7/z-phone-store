'use client';

import { useProducts } from '@/context/ProductContext';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';
import styles from './HomeContent.module.css';

export function HomeContent() {
  const { products, isLoading, error, searchTerm, clearSearch } = useProducts();

  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error en la búsqueda"
        message={error}
        onRetry={clearSearch}
      />
    );
  }

  if (products.length === 0) {
    if (searchTerm) {
      return (
        <ErrorMessage
          title="Sin resultados"
          message={`No se encontraron productos para "${searchTerm}"`}
          onRetry={clearSearch}
        />
      );
    }

    return (
      <ErrorMessage
        title="Sin productos"
        message="No hay productos disponibles en este momento"
      />
    );
  }

  return <ProductGrid products={products} />;
}
