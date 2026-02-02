import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from './SearchBar';
import { ProductProvider } from '@/context/ProductContext';

// Mock fetch para evitar llamadas reales
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProducts = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: '/img.jpg' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductProvider initialProducts={mockProducts}>{children}</ProductProvider>
);

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });
  });

  // === HAPPY PATH ===
  it('renders with placeholder', () => {
    render(<SearchBar />, { wrapper });

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Buscar..." />, { wrapper });

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('updates value when typing', () => {
    render(<SearchBar />, { wrapper });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(input).toHaveValue('iPhone');
  });

  it('shows clear button when has value', () => {
    render(<SearchBar />, { wrapper });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar />, { wrapper });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(input).toHaveValue('');
  });

  // === EDGE CASES ===
  it('does not show clear button when empty', () => {
    render(<SearchBar />, { wrapper });

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('has correct accessibility label', () => {
    render(<SearchBar />, { wrapper });

    expect(screen.getByRole('textbox', { name: /search products/i })).toBeInTheDocument();
  });
});
