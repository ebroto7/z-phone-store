'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  placeholder = 'Search for a smartphone...',
  debounceMs = 300,
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);
  const { searchProducts, clearSearch } = useProducts();

  // Cuando cambia el valor debounced, buscar
  useEffect(() => {
    if (debouncedValue) {
      searchProducts(debouncedValue);
    } else {
      clearSearch();
    }
  }, [debouncedValue, searchProducts, clearSearch]);

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
