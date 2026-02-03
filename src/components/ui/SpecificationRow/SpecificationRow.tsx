import styles from './SpecificationRow.module.css';

interface SpecificationRowProps {
  label: string;
  value: string;
}

export function SpecificationRow({ label, value }: SpecificationRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
