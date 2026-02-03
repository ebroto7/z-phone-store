import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItem } from './CartItem';
import type { CartItem as CartItemType } from '@/types';

// Mock de next/image (usa img nativo para tests)
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockItem: CartItemType = {
  id: 'iphone-15-Negro-256GB',
  productId: 'iphone-15',
  name: 'iPhone 15',
  brand: 'Apple',
  color: {
    name: 'Negro',
    hexCode: '#000000',
    imageUrl: '/iphone-negro.jpg',
  },
  storage: {
    capacity: '256GB',
    price: 999,
  },
  imageUrl: '/iphone-negro.jpg',
  quantity: 2,
};

describe('CartItem', () => {
  const mockOnRemove = vi.fn();
  const mockOnUpdateQuantity = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // === HAPPY PATH ===

  it('renderiza la información del producto', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('256GB · Negro')).toBeInTheDocument();
  });

  it('muestra el precio total (precio × cantidad)', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    // 999 × 2 = 1998
    expect(screen.getByText('1998 EUR')).toBeInTheDocument();
  });

  it('muestra la cantidad actual', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renderiza la imagen con alt correcto', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'iPhone 15');
    expect(image).toHaveAttribute('src', '/iphone-negro.jpg');
  });

  // === INTERACCIONES ===

  it('llama onRemove al hacer clic en Eliminar', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('llama onUpdateQuantity con quantity + 1 al incrementar', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    const incrementButton = screen.getByRole('button', { name: /aumentar cantidad/i });
    fireEvent.click(incrementButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(3); // 2 + 1
  });

  it('llama onUpdateQuantity con quantity - 1 al decrementar', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    const decrementButton = screen.getByRole('button', { name: /reducir cantidad/i });
    fireEvent.click(decrementButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1); // 2 - 1
  });

  // === EDGE CASES ===

  it('muestra precio correcto con quantity = 1', () => {
    const itemWithQuantityOne = { ...mockItem, quantity: 1 };

    render(
      <CartItem
        item={itemWithQuantityOne}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    expect(screen.getByText('999 EUR')).toBeInTheDocument();
  });

  it('tiene accesibilidad correcta en botones', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    expect(
      screen.getByRole('button', { name: /eliminar iphone 15 del carrito/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reducir cantidad/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /aumentar cantidad/i })
    ).toBeInTheDocument();
  });
});
