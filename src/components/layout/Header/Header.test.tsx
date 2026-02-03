import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { CartProvider } from '@/context/CartContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('Header', () => {
  // === HAPPY PATH ===
  it('renders logo with link to home', () => {
    renderWithProviders(<Header />);

    const logoLink = screen.getByRole('link', { name: /mbst/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders cart link to /cart', () => {
    renderWithProviders(<Header />);

    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders logo image', () => {
    renderWithProviders(<Header />);

    const logo = screen.getByAltText('MBST - Mobile Store');
    expect(logo).toBeInTheDocument();
  });

  // === EDGE CASES ===
  it('renders as header element for accessibility', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains Bag component', () => {
    renderWithProviders(<Header />);

    // Bag renders an img with cart icon
    const cartIcon = screen.getByAltText(/cart/i);
    expect(cartIcon).toBeInTheDocument();
  });
});
