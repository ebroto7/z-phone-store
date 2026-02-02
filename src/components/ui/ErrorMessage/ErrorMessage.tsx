import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Algo salió mal',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
