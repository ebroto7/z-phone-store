import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductProvider, useProducts } from './ProductContext';

const mockProducts = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: '/img1.jpg' },
  { id: '2', brand: 'Samsung', name: 'Galaxy S24', basePrice: 899, imageUrl: '/img2.jpg' },
];

const mockSearchResults = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: '/img1.jpg' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductProvider initialProducts={mockProducts}>{children}</ProductProvider>
);

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ProductContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // === HAPPY PATH ===

  it('provides initial products', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.products[0]?.brand).toBe('Apple');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.searchTerm).toBe('');
  });

  it('searchProducts updates products with API results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResults),
    });

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.searchProducts('iphone');
    });

    expect(result.current.searchTerm).toBe('iphone');
    expect(result.current.products).toHaveLength(1);
    expect(mockFetch).toHaveBeenCalledWith('/api/products?search=iphone');
  });

  it('clearSearch restores original products', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResults),
    });

    const { result } = renderHook(() => useProducts(), { wrapper });

    // Primero buscamos
    await act(async () => {
      await result.current.searchProducts('iphone');
    });

    expect(result.current.products).toHaveLength(1);

    // Luego limpiamos
    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.products).toHaveLength(2);
  });

  // === EDGE CASES ===

  it('empty search term restores original products without API call', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.searchProducts('   ');
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.products).toHaveLength(2);
  });

  it('handles API error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.searchProducts('test');
    });

    // Mantiene los productos actuales en caso de error
    expect(result.current.products).toHaveLength(2);
    expect(result.current.isLoading).toBe(false);
  });

  it('throws error when used outside Provider', () => {
    expect(() => {
      renderHook(() => useProducts());
    }).toThrow('useProducts debe usarse dentro de un ProductProvider');
  });
});
