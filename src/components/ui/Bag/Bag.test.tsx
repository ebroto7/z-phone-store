import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Bag } from './Bag';

// Mock del hook useCart
vi.mock('@/context/CartContext', () => ({
  useCart: vi.fn(),
}));

import { useCart } from '@/context/CartContext';
const mockUseCart = vi.mocked(useCart);

describe('Bag', () => {
  // === HAPPY PATH ===
  it('renders inactive icon when cart is empty', () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Bag />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/cart_Inactive.svg');
    expect(icon).toHaveAttribute('alt', 'Empty cart');
  });

  it('renders active icon when cart has items', () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 3,
      totalPrice: 100,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Bag />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/cart_Active.svg');
    expect(icon).toHaveAttribute('alt', 'Cart with 3 items');
  });

  it('shows count number when items exist', () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 5,
      totalPrice: 100,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Bag />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // === EDGE CASES ===
  it('does not show count when empty', () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Bag />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('handles large count numbers', () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 99,
      totalPrice: 1000,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Bag />);

    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
