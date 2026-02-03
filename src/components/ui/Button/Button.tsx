'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'standard';
type ButtonSize = 'sm' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  extraHeight?: boolean;
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
    <button type="button" className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
