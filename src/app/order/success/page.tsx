import Link from 'next/link';
import styles from './page.module.css';

export default function OrderSuccessPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>¡Gracias por tu compra!</h1>
        <p className={styles.message}>
          Tu pedido ha sido procesado correctamente.
        </p>
        <Link href="/" className={styles.button}>
          Continuar comprando
        </Link>
      </div>
    </main>
  );
}
