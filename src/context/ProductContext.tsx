'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ProductListItem } from '@/types';

// Tipos
interface ProductContextState {
  products: ProductListItem[];
  isLoading: boolean;
  searchTerm: string;
}

interface ProductContextActions {
  searchProducts: (term: string) => Promise<void>;
  clearSearch: () => void;
  setInitialProducts: (products: ProductListItem[]) => void;
}

type ProductContextType = ProductContextState & ProductContextActions;

// Contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Hook para consumir el contexto
export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }

  return context;
}

// Provider
interface ProductProviderProps {
  children: ReactNode;
  initialProducts?: ProductListItem[];
}

export function ProductProvider({ children, initialProducts = [] }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductListItem[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalProducts, setOriginalProducts] = useState<ProductListItem[]>(initialProducts);

  const searchProducts = useCallback(async (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setProducts(originalProducts);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(term)}`);

      if (!response.ok) {
        throw new Error('Error en búsqueda');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error buscando productos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [originalProducts]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setProducts(originalProducts);
  }, [originalProducts]);

  const setInitialProducts = useCallback((newProducts: ProductListItem[]) => {
    setProducts(newProducts);
    setOriginalProducts(newProducts);
  }, []);

  const value: ProductContextType = {
    products,
    isLoading,
    searchTerm,
    searchProducts,
    clearSearch,
    setInitialProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
