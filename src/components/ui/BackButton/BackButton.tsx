'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BackButton.module.css';

interface BackButtonProps {
  /** Si se pasa href, usa Link. Si no, usa router.back() */
  href?: string;
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  const content = (
    <>
      <Image
        src="/Chevron_Left.svg"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
      />
      <span>Back</span>
    </>
  );

  if (href) {
    return (
      <nav className={styles.container} aria-label="Navegación">
        <Link href={href} className={styles.button}>
          {content}
        </Link>
      </nav>
    );
  }

  return (
    <nav className={styles.container} aria-label="Navegación">
      <button
        type="button"
        className={styles.button}
        onClick={() => router.back()}
      >
        {content}
      </button>
    </nav>
  );
}
