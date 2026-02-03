'use client';

import { useState, useCallback } from 'react';
import { Product, ProductVariant } from '@/types';
import { ProductImage } from '../ProductHero/ProductImage';
import { ProductInfo } from '../ProductHero/ProductInfo';
import styles from './ProductDetailClient.module.css';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant);
  }, []);

  const defaultImageUrl = product.imageUrl || product.colorOptions[0]?.imageUrl || '';
  const imageUrl = selectedVariant?.color.imageUrl ?? defaultImageUrl;

  return (
    <section className={styles.container} aria-label="Información del producto">
      <ProductImage src={imageUrl} alt={product.name} />
      <ProductInfo
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={handleVariantChange}
      />
    </section>
  );
}
