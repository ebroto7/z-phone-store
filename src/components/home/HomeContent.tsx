'use client';

import { useProducts } from '@/context/ProductContext';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';

/**
 * HomeContent - Conecta el contexto con ProductGrid
 *
 * Este componente es Client porque necesita leer del contexto.
 * ProductGrid sigue siendo "tonto" (recibe props).
 */
export function HomeContent() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <p>Cargando...</p>; // TODO: Skeleton loader
  }

  return <ProductGrid products={products} />;
}
