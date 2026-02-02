import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  // === HAPPY PATH ===
  it('renders with placeholder', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Buscar..." />);

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('updates value when typing', () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(input).toHaveValue('iPhone');
  });

  it('shows clear button when has value', () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(input).toHaveValue('');
  });

  // === EDGE CASES ===
  it('does not show clear button when empty', () => {
    render(<SearchBar />);

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('has correct accessibility label', () => {
    render(<SearchBar />);

    expect(screen.getByRole('textbox', { name: /search products/i })).toBeInTheDocument();
  });
});
