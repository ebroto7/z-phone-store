'use client';

import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartFooter } from '@/components/cart/CartFooter/CartFooter';
import styles from './page.module.css';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  const isEmpty = items.length === 0;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Título con contador */}
        <h1 className={styles.title}>
          CART{totalItems >= 0 && <span className={styles.titleCount}>({totalItems})</span>}
        </h1>

        {!isEmpty && (

          // Lista de items
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <CartItem
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer fijo con Total y botones */}
      <CartFooter hasItems={!isEmpty} totalPrice={totalPrice} />
    </main>
  );
}
