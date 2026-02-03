'use client';

import { Product, ProductVariant } from '@/types';
import { StorageSelector } from '@/components/ui/StorageSelector';
import { ColorOptions } from '@/components/ui/ColorOptions';
import { AddToCartButton } from './AddToCartButton';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}

export function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
}: ProductInfoProps) {
  // El precio mostrado depende del storage seleccionado
  const displayPrice = selectedVariant?.storage.price ?? product.basePrice;

  const handleStorageChange = (capacity: string) => {
    // Buscar el StorageOption completo por capacidad
    const storage = product.storageOptions.find((s) => s.capacity === capacity);
    if (!storage) return;

    // Si no hay color seleccionado, usar el primero disponible
    const defaultColor = product.colorOptions[0];
    const currentColor = selectedVariant?.color ?? defaultColor;
    if (currentColor) {
      onVariantChange({ color: currentColor, storage });
    }
  };

  const handleColorChange = (colorName: string) => {
    // Buscar el ColorOption completo por nombre
    const color = product.colorOptions.find((c) => c.name === colorName);
    if (!color) return;

    // Si no hay storage seleccionado, usar el primero disponible
    const defaultStorage = product.storageOptions[0];
    const currentStorage = selectedVariant?.storage ?? defaultStorage;
    if (currentStorage) {
      onVariantChange({ color, storage: currentStorage });
    }
  };

  // Verificar si hay una variante válida seleccionada
  const canAddToCart = selectedVariant !== null;

  return (
    <div className={styles.info}>
      {/* Título y precio */}
      <header className={styles.header}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>From {displayPrice} EUR</p>
      </header>

      {/* Selectores */}
      <div className={styles.selectors}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>
            Storage. <span className={styles.hint}>How much space do you need?</span>
          </legend>
          <StorageSelector
            options={product.storageOptions.map((s) => s.capacity)}
            selected={selectedVariant?.storage?.capacity ?? ''}
            onChange={handleStorageChange}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>
            Color. <span className={styles.hint}>Pick your favourite.</span>
          </legend>
          <ColorOptions
            options={product.colorOptions}
            selected={selectedVariant?.color?.name ?? ''}
            onChange={handleColorChange}
          />
        </fieldset>
      </div>

      {/* Botón añadir al carrito */}
      <AddToCartButton
        disabled={!canAddToCart}
        product={product}
        variant={selectedVariant}
      />
    </div>
  );
}
