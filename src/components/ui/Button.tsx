'use client';

/**
 * SDS Button Component
 * Based on Figma specifications - 32 variants total
 *
 * NOMENCLATURA: Text, [Feedback], [Breakpoint], Extra Height=[Yes/No], [State]
 *
 * Props:
 * - variant: 'primary' | 'standard' (Feedback en Figma)
 * - size: 'sm' | 'lg' (Breakpoint: XS-M = sm, L-XL = lg)
 * - extraHeight: boolean (Extra Height en Figma)
 * - disabled: boolean (State: Disabled)
 * - children: texto del botón
 * - onClick: función callback
 *
 * Estados CSS:
 * - :hover (State: Hover)
 * - :active (State: Active)
 * - :disabled (State: Disabled)
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'standard';
type ButtonSize = 'sm' | 'lg'; // sm = XS-M, lg = L-XL

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante: 'primary' (filled) o 'standard' (outlined) */
  variant?: ButtonVariant;
  /** Tamaño: 'sm' (XS-M) o 'lg' (L-XL) */
  size?: ButtonSize;
  /** Extra Height: aumenta el padding vertical */
  extraHeight?: boolean;
  /** Contenido del botón */
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'sm',
  extraHeight = false,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  // Construir clases CSS
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    extraHeight ? styles.extraHeight : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
