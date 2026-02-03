import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import type { ColorOption, StorageOption } from '@/types';

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Datos de prueba
const mockColor: ColorOption = {
  name: 'Negro',
  hexCode: '#000000',
  imageUrl: '/img-negro.jpg',
};

const mockStorage: StorageOption = {
  capacity: '256GB',
  price: 999,
};

const mockCartItemData = {
  productId: 'iphone-15',
  name: 'iPhone 15',
  brand: 'Apple',
  color: mockColor,
  storage: mockStorage,
  imageUrl: '/img-negro.jpg',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  // === ESTADO INICIAL ===

  describe('Estado inicial', () => {
    it('inicia con carrito vacío', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it('lanza error cuando se usa fuera del Provider', () => {
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart debe usarse dentro de un CartProvider');
    });
  });

  // === addItem ===

  describe('addItem', () => {
    it('añade un nuevo item con quantity 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]?.name).toBe('iPhone 15');
      expect(result.current.items[0]?.quantity).toBe(1);
    });

    it('genera ID correcto: productId-color-storage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      expect(result.current.items[0]?.id).toBe('iphone-15-Negro-256GB');
    });

    it('incrementa quantity si el item ya existe', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
        result.current.addItem(mockCartItemData);
        result.current.addItem(mockCartItemData);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]?.quantity).toBe(3);
    });

    it('añade items diferentes por separado', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const otroColor: ColorOption = {
        name: 'Blanco',
        hexCode: '#FFFFFF',
        imageUrl: '/img-blanco.jpg',
      };

      act(() => {
        result.current.addItem(mockCartItemData);
        result.current.addItem({ ...mockCartItemData, color: otroColor });
      });

      expect(result.current.items).toHaveLength(2);
    });

    it('diferencia items por color aunque mismo storage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const colorNegro: ColorOption = { name: 'Negro', hexCode: '#000', imageUrl: '/negro.jpg' };
      const colorBlanco: ColorOption = { name: 'Blanco', hexCode: '#FFF', imageUrl: '/blanco.jpg' };
      const storage256: StorageOption = { capacity: '256GB', price: 999 };

      act(() => {
        // Mismo producto, mismo storage, diferente color
        result.current.addItem({ ...mockCartItemData, color: colorNegro, storage: storage256 });
        result.current.addItem({ ...mockCartItemData, color: colorBlanco, storage: storage256 });
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0]?.id).toBe('iphone-15-Negro-256GB');
      expect(result.current.items[1]?.id).toBe('iphone-15-Blanco-256GB');
    });

    it('diferencia items por storage aunque mismo color', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const colorNegro: ColorOption = { name: 'Negro', hexCode: '#000', imageUrl: '/negro.jpg' };
      const storage128: StorageOption = { capacity: '128GB', price: 799 };
      const storage256: StorageOption = { capacity: '256GB', price: 999 };

      act(() => {
        // Mismo producto, mismo color, diferente storage
        result.current.addItem({ ...mockCartItemData, color: colorNegro, storage: storage128 });
        result.current.addItem({ ...mockCartItemData, color: colorNegro, storage: storage256 });
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0]?.id).toBe('iphone-15-Negro-128GB');
      expect(result.current.items[1]?.id).toBe('iphone-15-Negro-256GB');
    });
  });

  // === removeItem ===

  describe('removeItem', () => {
    it('elimina un item por su ID', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeItem('iphone-15-Negro-256GB');
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('no hace nada si el ID no existe', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      act(() => {
        result.current.removeItem('id-que-no-existe');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  // === updateQuantity ===

  describe('updateQuantity', () => {
    it('actualiza la cantidad de un item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      act(() => {
        result.current.updateQuantity('iphone-15-Negro-256GB', 5);
      });

      expect(result.current.items[0]?.quantity).toBe(5);
    });

    it('elimina el item si quantity es 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      act(() => {
        result.current.updateQuantity('iphone-15-Negro-256GB', 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('elimina el item si quantity es negativo', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      act(() => {
        result.current.updateQuantity('iphone-15-Negro-256GB', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  // === clearCart ===

  describe('clearCart', () => {
    it('vacía todo el carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
        result.current.addItem({
          ...mockCartItemData,
          productId: 'galaxy-s24',
          name: 'Galaxy S24',
        });
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  // === VALORES DERIVADOS ===

  describe('Valores derivados', () => {
    it('calcula totalItems sumando quantities', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
        result.current.addItem(mockCartItemData); // quantity = 2
        result.current.addItem({
          ...mockCartItemData,
          color: { name: 'Blanco', hexCode: '#FFF', imageUrl: '/w.jpg' },
        }); // nuevo item, quantity = 1
      });

      // 2 + 1 = 3
      expect(result.current.totalItems).toBe(3);
    });

    it('calcula totalPrice sumando price * quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const storage128: StorageOption = { capacity: '128GB', price: 799 };

      act(() => {
        result.current.addItem(mockCartItemData); // 999 * 1
        result.current.addItem(mockCartItemData); // 999 * 2
        result.current.addItem({
          ...mockCartItemData,
          storage: storage128,
          color: { name: 'Blanco', hexCode: '#FFF', imageUrl: '/w.jpg' },
        }); // 799 * 1
      });

      // (999 * 2) + (799 * 1) = 1998 + 799 = 2797
      expect(result.current.totalPrice).toBe(2797);
    });
  });

  // === PERSISTENCIA ===

  describe('Persistencia localStorage', () => {
    it('guarda en localStorage cuando items cambia', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
      });

      // Esperar a que el useEffect se ejecute
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cart',
        expect.stringContaining('iPhone 15')
      );
    });

    it('carga items de localStorage al montar', () => {
      const savedItems = [
        {
          id: 'iphone-15-Negro-256GB',
          productId: 'iphone-15',
          name: 'iPhone 15',
          brand: 'Apple',
          color: mockColor,
          storage: mockStorage,
          imageUrl: '/img.jpg',
          quantity: 2,
        },
      ];

      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedItems));

      const { result } = renderHook(() => useCart(), { wrapper });

      // Esperar hidratación
      expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
    });

    it('maneja JSON corrupto sin crashear', () => {
      localStorageMock.getItem.mockReturnValueOnce('{ invalid json }');

      // No debería lanzar error
      expect(() => {
        renderHook(() => useCart(), { wrapper });
      }).not.toThrow();
    });

    it('restaura items correctamente al re-montar el componente', async () => {
      // 1. Primer montaje: añadir items
      const { result, unmount } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockCartItemData);
        result.current.addItem(mockCartItemData); // quantity = 2
      });

      // Esperar que se guarde en localStorage
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Verificar estado antes de desmontar
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]?.quantity).toBe(2);

      // 2. Desmontar
      unmount();

      // 3. Re-montar (simula recarga de página)
      const { result: newResult } = renderHook(() => useCart(), { wrapper });

      // Esperar hidratación
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // 4. Verificar que los datos se restauraron
      expect(newResult.current.items).toHaveLength(1);
      expect(newResult.current.items[0]?.quantity).toBe(2);
      expect(newResult.current.items[0]?.name).toBe('iPhone 15');
      expect(newResult.current.totalItems).toBe(2);
      expect(newResult.current.totalPrice).toBe(1998); // 999 * 2
    });
  });
});
