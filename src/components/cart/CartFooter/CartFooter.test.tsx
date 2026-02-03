import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartFooter } from './CartFooter';

describe('CartFooter', () => {
  // === HAPPY PATH ===

  it('siempre muestra el botón Continue Shopping', () => {
    render(<CartFooter hasItems={false} totalPrice={0} />);

    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument();
  });

  it('muestra Total y botón Pay cuando hay items', () => {
    render(<CartFooter hasItems={true} totalPrice={1998} />);

    expect(screen.getByText('TOTAL')).toBeInTheDocument();
    expect(screen.getByText('1998 EUR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument();
  });

  it('muestra el precio total formateado correctamente', () => {
    render(<CartFooter hasItems={true} totalPrice={2599} />);

    expect(screen.getByText('2599 EUR')).toBeInTheDocument();
  });

  // === ESTADO VACÍO ===

  it('NO muestra Total ni Pay cuando el carrito está vacío', () => {
    render(<CartFooter hasItems={false} totalPrice={0} />);

    expect(screen.queryByText('TOTAL')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pay/i })).not.toBeInTheDocument();
  });

  it('Continue Shopping enlaza a la home', () => {
    render(<CartFooter hasItems={false} totalPrice={0} />);

    const link = screen.getByRole('link', { name: /continue shopping/i });
    expect(link).toHaveAttribute('href', '/');
  });

  // === EDGE CASES ===

  it('muestra precio 0 cuando totalPrice es 0 pero hasItems es true', () => {
    // Edge case: carrito con items pero precio 0 (poco probable pero posible)
    render(<CartFooter hasItems={true} totalPrice={0} />);

    expect(screen.getByText('0 EUR')).toBeInTheDocument();
  });

  it('renderiza como footer semántico', () => {
    render(<CartFooter hasItems={true} totalPrice={999} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
