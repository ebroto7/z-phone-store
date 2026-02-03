'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
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
  const { addItem } = useCart();
  const [announcement, setAnnouncement] = useState('');

  const handleClick = () => {
    if (!variant) return;

    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      color: variant.color,
      storage: variant.storage,
      imageUrl: variant.color.imageUrl,
    });

    // Anuncio para lectores de pantalla
    setAnnouncement(`${product.name} añadido al carrito`);
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return (
    <>
      <button
        type="button"
        className={styles.button}
        disabled={disabled}
        onClick={handleClick}
        aria-label={disabled ? 'Selecciona opciones para añadir al carrito' : `Añadir ${product.name} al carrito`}
      >
        Añadir
      </button>
      {/* Región aria-live para anunciar cambios */}
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {announcement}
      </span>
    </>
  );
}
