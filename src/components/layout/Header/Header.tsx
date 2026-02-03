import Link from 'next/link';
import Image from 'next/image';
import { Bag } from '@/components/ui/Bag/Bag';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/MBST_logo.svg"
          alt="MBST - Mobile Store"
          width={77}
          height={29}
          priority
        />
      </Link>

      <Link href="/cart" className={styles.cartLink}>
        <Bag />
      </Link>
    </header>
  );
}
