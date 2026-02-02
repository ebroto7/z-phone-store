import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Bag } from './Bag';

describe('Bag', () => {
  // === HAPPY PATH ===
  it('renders inactive icon when count is 0', () => {
    render(<Bag count={0} />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/cart_Inactive.svg');
    expect(icon).toHaveAttribute('alt', 'Empty cart');
  });

  it('renders active icon when count > 0', () => {
    render(<Bag count={3} />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/cart_Active.svg');
    expect(icon).toHaveAttribute('alt', 'Cart with 3 items');
  });

  it('shows count number when items exist', () => {
    render(<Bag count={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // === EDGE CASES ===
  it('does not show count when empty', () => {
    render(<Bag count={0} />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('defaults to 0 when no count provided', () => {
    render(<Bag />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/cart_Inactive.svg');
  });

  it('handles large count numbers', () => {
    render(<Bag count={99} />);

    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
