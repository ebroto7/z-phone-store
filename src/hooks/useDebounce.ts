import { useState, useEffect } from 'react';

/**
 * Hook que retrasa la actualización de un valor.
 * Útil para evitar llamadas excesivas a API mientras el usuario escribe.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
