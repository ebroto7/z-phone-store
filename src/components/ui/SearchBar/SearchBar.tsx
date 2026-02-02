/**
 * SearchBar - Barra de búsqueda con dos estados
 *
 * Estados (según Figma):
 * - Empty: Placeholder visible
 * - Filled: Texto visible + botón X para limpiar
 *
 * Especificaciones Figma:
 * - Container: gap 12px, padding-bottom 8px, border-bottom 0.5px #000000
 * - Texto: Helvetica Neue, 300, 16px, #000000
 * - Placeholder: #AAAAAA
 * - Close button: 20×19px (solo en Filled)
 */

'use client';

import { useState, type ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  /** Placeholder del input */
  placeholder?: string;
}

export function SearchBar({
  placeholder = 'Search for a smartphone...',
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  const isFilled = value.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search products"
        />

        {isFilled && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <img
              src="/close_Small.svg"
              alt="Clear"
              width={20}
              height={19}
            />
          </button>
        )}
      </div>
    </div>
  );
}
