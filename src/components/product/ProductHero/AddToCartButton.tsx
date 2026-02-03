'use client';

import { Product, ProductVariant } from '@/types';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  disabled: boolean;
  product: Product;
  variant: ProductVariant | null;
}

export function AddToCartButton({
  disabled,
  product,
  variant,
}: AddToCartButtonProps) {
  const handleClick = () => {
    if (!variant) return;

    // TODO: Conectar con CartContext
    console.log('Adding to cart:', {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      color: variant.color,
      storage: variant.storage,
      imageUrl: variant.color.imageUrl,
    });
  };

  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      onClick={handleClick}
      aria-label={disabled ? 'Selecciona opciones para añadir al carrito' : `Añadir ${product.name} al carrito`}
    >
      Añadir
    </button>
  );
}
