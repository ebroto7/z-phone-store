'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
  defaultValue?: string;
}

export function SearchBar({
  placeholder = 'Search for a smartphone...',
  debounceMs = 300,
  defaultValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, debounceMs);

  // Sync with URL on back/forward navigation
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== value) {
      setValue(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';

    if (debouncedValue !== currentSearch) {
      if (debouncedValue) {
        router.push(`/?search=${encodeURIComponent(debouncedValue)}`);
      } else {
        router.push('/');
      }
    }
  }, [debouncedValue, router, searchParams]);

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
            <Image
              src="/close_Small.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={19}
            />
          </button>
        )}
      </div>
    </div>
  );
}
