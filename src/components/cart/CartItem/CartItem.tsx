'use client';

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { name, imageUrl, color, storage, quantity } = item;
  const itemTotal = storage.price * quantity;

  const handleDecrement = () => {
    onUpdateQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    onUpdateQuantity(quantity + 1);
  };

  return (
    <article className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 262px"
          className={styles.image}
        />
      </div>

      <div className={styles.infoDeleteWrapper}>
        <div className={styles.info}>
          <div>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.specs}>
              {storage.capacity} · {color.name}
            </p>
          </div>
          <div>
            <p className={styles.price}>{itemTotal} EUR</p>

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
