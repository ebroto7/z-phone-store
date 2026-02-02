'use client';

import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';
import styles from './page.module.css';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className={styles.main}>
      <ErrorMessage
        title="No se pudieron cargar los productos"
        message={error.message || 'Ha ocurrido un error inesperado'}
        onRetry={reset}
      />
    </main>
  );
}
