import type { ProductListItem } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';

interface HomeContentProps {
  products: ProductListItem[];
  searchTerm?: string;
}

export function HomeContent({ products, searchTerm }: HomeContentProps) {
  if (products.length === 0) {
    if (searchTerm) {
      return (
        <ErrorMessage
          title="Sin resultados"
          message={`No se encontraron productos para "${searchTerm}"`}
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
