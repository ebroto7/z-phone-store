import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // === HAPPY PATH ===

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 300));

    expect(result.current).toBe('test');
  });

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    // Antes del delay, mantiene valor anterior
    expect(result.current).toBe('initial');

    // Después del delay, actualiza
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  it('uses default delay of 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });

  // === EDGE CASES ===

  it('cancels previous timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    );

    // Cambios rápidos
    rerender({ value: 'second' });
    act(() => vi.advanceTimersByTime(100));

    rerender({ value: 'third' });
    act(() => vi.advanceTimersByTime(100));

    rerender({ value: 'fourth' });

    // Aún no ha pasado el delay desde el último cambio
    expect(result.current).toBe('first');

    // Pasamos el delay completo
    act(() => vi.advanceTimersByTime(300));

    // Solo el último valor
    expect(result.current).toBe('fourth');
  });

  it('works with different types', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 42 } }
    );

    rerender({ value: 100 });

    act(() => vi.advanceTimersByTime(100));

    expect(result.current).toBe(100);
  });
});
