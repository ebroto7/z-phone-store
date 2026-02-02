import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  // === HAPPY PATH ===
  it('renders logo with link to home', () => {
    render(<Header />);

    const logoLink = screen.getByRole('link', { name: /mbst/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders cart link to /cart', () => {
    render(<Header />);

    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders logo image', () => {
    render(<Header />);

    const logo = screen.getByAltText('MBST - Mobile Store');
    expect(logo).toBeInTheDocument();
  });

  // === EDGE CASES ===
  it('renders as header element for accessibility', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains Bag component', () => {
    render(<Header />);

    // Bag renders an img with cart icon
    const cartIcon = screen.getByAltText(/cart/i);
    expect(cartIcon).toBeInTheDocument();
  });
});
