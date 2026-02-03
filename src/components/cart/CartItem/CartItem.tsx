'use client';

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

/**
 * CartItem Component
 *
 * Muestra un item del carrito con:
 * - Imagen del producto (color seleccionado)
 * - Info: Nombre, Especificaciones (storage · color), Precio
 * - Botón eliminar (texto rojo "Eliminar")
 *
 * Layout basado en Figma:
 * - Cart Item: horizontal, gap 40px
 * - Image wrapper: 262x324px (desktop)
 * - Info+delete: vertical, space-between, padding 40px top/bottom
 */
export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { name, imageUrl, color, storage, quantity } = item;

  // Precio total del item (precio × cantidad)
  const itemTotal = storage.price * quantity;

  const handleDecrement = () => {
    onUpdateQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    onUpdateQuantity(quantity + 1);
  };

  return (
    <article className={styles.item}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 262px"
          className={styles.image}
        />
      </div>

      {/* Info + Delete wrapper (space-between) */}
      <div className={styles.infoDeleteWrapper}>
        {/* Info section */}
        <div className={styles.info}>
          <div>

            <h3 className={styles.name}>{name}</h3>
            <p className={styles.specs}>
              {storage.capacity} · {color.name}
            </p>
          </div>
          <div>

            <p className={styles.price}>{itemTotal} EUR</p>

            {/* Selector de cantidad - estilo Zara minimalista */}
            <div className={styles.quantitySelector}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={handleDecrement}
                aria-label={`Reducir cantidad de ${name}. Cantidad actual: ${quantity}`}
              >
                −
              </button>
              <span className={styles.quantityValue} aria-hidden="true">
                {quantity}
              </span>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={handleIncrement}
                aria-label={`Aumentar cantidad de ${name}. Cantidad actual: ${quantity}`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Botón eliminar - texto rojo según Figma */}
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label={`Eliminar ${name} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
