'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@/types';

// ===========================================
// TIPOS
// ===========================================

export type AddToCartData = Omit<CartItem, 'id' | 'quantity'>;

interface CartContextState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextActions {
  addItem: (data: AddToCartData) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

type CartContextType = CartContextState & CartContextActions;

// ===========================================
// CONTEXTO
// ===========================================

export const CartContext = createContext<CartContextType | undefined>(undefined);

// ===========================================
// HOOK
// ===========================================

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }

  return context;
}

// ===========================================
// PROVIDER
// ===========================================

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'cart';

function generateCartItemId(data: AddToCartData): string {
  return `${data.productId}-${data.color.name}-${data.storage.capacity}`;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // --- PERSISTENCIA ---

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      } catch {
        console.warn('Error parsing cart from localStorage');
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // --- ACCIONES ---

  const addItem = useCallback((data: AddToCartData) => {
    const id = generateCartItemId(data);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      const newItem: CartItem = { ...data, id, quantity: 1 };
      return [...currentItems, newItem];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // --- VALORES DERIVADOS ---

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.storage.price * item.quantity, 0);

  // --- VALOR DEL CONTEXTO ---

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
