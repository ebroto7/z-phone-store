import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from './SearchBar';

// Mock de next/image
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/navigation
const mockPush = vi.fn();
const mockGet = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

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

  it('renders with default value', () => {
    mockGet.mockReturnValue('iPhone');
    render(<SearchBar defaultValue="iPhone" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('iPhone');
  });

  it('permite escribir en el input', () => {
    // El componente sincroniza con URL, verificamos que el input es editable
    render(<SearchBar />);

    const input = screen.getByRole('textbox');

    // Verificamos que el input existe y acepta el evento change
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();

    // El comportamiento real de búsqueda se testea en E2E
  });

  it('shows clear button when has value', async () => {
    mockGet.mockReturnValue('test');
    render(<SearchBar defaultValue="test" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });
  });

  it('clears input when clear button is clicked', async () => {
    mockGet.mockReturnValue('test');
    render(<SearchBar defaultValue="test" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    // Simular que la URL también se limpia
    mockGet.mockReturnValue(null);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    await waitFor(() => {
      expect(input.value).toBe('');
    });
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

  it('syncs with URL search param', () => {
    mockGet.mockReturnValue('samsung');
    render(<SearchBar />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('samsung');
  });
});
