import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmartphoneCard } from './SmartphoneCard';
import type { ProductListItem } from '@/types';

const mockProduct: ProductListItem = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15 Pro',
  basePrice: 1199,
  imageUrl: '/iphone.jpg',
};

describe('SmartphoneCard', () => {
  // === HAPPY PATH ===
  it('renders brand, name and price', () => {
    render(<SmartphoneCard {...mockProduct} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('1199 EUR')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<SmartphoneCard {...mockProduct} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Apple iPhone 15 Pro');
  });

  it('links to product detail page', () => {
    render(<SmartphoneCard {...mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });

  // === EDGE CASES ===
  it('handles basePrice of 0', () => {
    render(<SmartphoneCard {...mockProduct} basePrice={0} />);

    expect(screen.getByText('0 EUR')).toBeInTheDocument();
  });

  it('handles long product names', () => {
    const longName = 'iPhone 15 Pro Max Ultra Super Edition Limited';
    render(<SmartphoneCard {...mockProduct} name={longName} />);

    expect(screen.getByText(longName)).toBeInTheDocument();
  });
});
