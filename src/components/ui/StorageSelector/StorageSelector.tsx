'use client';

import styles from './StorageSelector.module.css';

interface StorageSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export function StorageSelector({ options, selected, onChange }: StorageSelectorProps) {
  return (
    <div className={styles.container}>
      {options.map((option) => {
        const isSelected = option === selected;

        return (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            onClick={() => onChange(option)}
            aria-label={`Almacenamiento ${option}`}
            aria-pressed={isSelected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
