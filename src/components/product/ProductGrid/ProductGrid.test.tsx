import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductGrid } from './ProductGrid';

const mockProducts = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15',
    price: 999,
    imageUrl: '/iphone.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    price: 899,
    imageUrl: '/samsung.jpg',
  },
];

describe('ProductGrid', () => {
  // === HAPPY PATH ===
  it('renders all products', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
  });

  it('shows correct results count from products length', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('2 RESULTS')).toBeInTheDocument();
  });

  it('shows totalResults when provided', () => {
    render(<ProductGrid products={mockProducts} totalResults={100} />);

    expect(screen.getByText('100 RESULTS')).toBeInTheDocument();
  });

  // === EDGE CASES ===
  it('renders empty grid with 0 results', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText('0 RESULTS')).toBeInTheDocument();
  });

  it('renders single product correctly', () => {
    render(<ProductGrid products={[mockProducts[0]]} />);

    expect(screen.getByText('1 RESULTS')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });
});
