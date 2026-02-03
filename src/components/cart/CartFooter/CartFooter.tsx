'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './CartFooter.module.css';

interface CartFooterProps {
  hasItems: boolean;
  totalPrice: number;
}

export function CartFooter({ hasItems, totalPrice }: CartFooterProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  const handlePay = () => {
    clearCart();
    router.push('/order/success');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="/" className={styles.continueShoppingBtn}>
          CONTINUE SHOPPING
        </Link>

        {hasItems && (
          <div className={styles.totalAndPay}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>TOTAL</span>
              <span className={styles.totalPrice}>{totalPrice} EUR</span>
            </div>

            <button type="button" className={styles.payBtn} onClick={handlePay}>
              PAY
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
