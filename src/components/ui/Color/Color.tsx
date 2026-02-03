'use client';

import styles from './Color.module.css';

interface ColorProps {
  hexCode: string;
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function Color({ hexCode, name, isSelected = false, onClick }: ColorProps) {
  return (
    <button
      type="button"
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={`Color ${name}`}
      aria-pressed={isSelected}
      title={name}
    >
      <span className={styles.swatch} style={{ backgroundColor: hexCode }} />
    </button>
  );
}
