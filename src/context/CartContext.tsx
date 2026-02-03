'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@/types';

// ===========================================
// TIPOS
// ===========================================

/**
 * Datos que recibe addItem.
 * 'id' y 'quantity' se generan automáticamente.
 */
export type AddToCartData = Omit<CartItem, 'id' | 'quantity'>;

/**
 * Estado del carrito (el "qué hay").
 */
interface CartContextState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * Acciones del carrito (el "qué puedo hacer").
 */
interface CartContextActions {
  addItem: (data: AddToCartData) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Tipo completo del contexto: Estado + Acciones.
 */
type CartContextType = CartContextState & CartContextActions;

// ===========================================
// CONTEXTO
// ===========================================

/**
 * Contexto del carrito.
 * undefined hasta que el Provider lo inicialice.
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

// ===========================================
// HOOK
// ===========================================

/**
 * Hook para consumir el CartContext.
 * Lanza error si se usa fuera del Provider.
 */
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

/**
 * Key para localStorage.
 * Centralizada para evitar typos.
 */
const CART_STORAGE_KEY = 'cart';

/**
 * Genera un ID único para el item del carrito.
 * Formato: productId-colorName-storageCapacity
 */
function generateCartItemId(data: AddToCartData): string {
  return `${data.productId}-${data.color.name}-${data.storage.capacity}`;
}

export function CartProvider({ children }: CartProviderProps) {
  // Estado: array de items en el carrito
  const [items, setItems] = useState<CartItem[]>([]);

  // Flag para saber si ya cargamos de localStorage
  const [isHydrated, setIsHydrated] = useState(false);

  // --- PERSISTENCIA ---

  // 1. Al montar: LEER de localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      } catch {
        // Si el JSON está corrupto, ignorar
        console.warn('Error parsing cart from localStorage');
      }
    }
    setIsHydrated(true);
  }, []);

  // 2. Cuando items cambia: GUARDAR en localStorage
  // Solo después de la hidratación para no sobrescribir con []
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // --- ACCIONES ---

  /**
   * Añade un producto al carrito.
   * Si ya existe (mismo id), incrementa quantity.
   * Si no existe, lo añade con quantity: 1.
   */
  const addItem = useCallback((data: AddToCartData) => {
    const id = generateCartItemId(data);

    setItems((currentItems) => {
      // ¿Ya existe este item?
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        // Sí existe → incrementar quantity
        return currentItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // No existe → añadir nuevo item
      const newItem: CartItem = {
        ...data,
        id,
        quantity: 1,
      };
      return [...currentItems, newItem];
    });
  }, []);

  /**
   * Elimina un item del carrito por su ID.
   */
  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  /**
   * Actualiza la cantidad de un item.
   * Si quantity <= 0, elimina el item.
   */
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  /**
   * Vacía todo el carrito.
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // --- VALORES DERIVADOS ---

  // Total de items (suma de quantities)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Precio total (suma de price * quantity)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.storage.price * item.quantity,
    0
  );

  // --- VALOR DEL CONTEXTO ---

  const value: CartContextType = {
    // Estado
    items,
    totalItems,
    totalPrice,
    // Acciones
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
