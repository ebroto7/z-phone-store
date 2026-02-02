'use client';

/**
 * Color.tsx
 *
 * Componente individual de color según Figma.
 * Estructura: Recuadro con borde + padding + cuadrado de color interior.
 *
 * Variantes:
 * - Selected=False: Borde gris (#CCCCCC)
 * - Selected=True: Borde negro (#000000)
 *
 * Dimensiones del Figma:
 * - Contenedor: 24×24px
 * - Borde: 1px
 * - El cuadrado de color ocupa el interior
 */

import styles from './Color.module.css';

interface ColorProps {
  /** Código hexadecimal del color */
  hexCode: string;
  /** Nombre del color (para accesibilidad) */
  name: string;
  /** Si está seleccionado */
  isSelected?: boolean;
  /** Callback al hacer clic */
  onClick?: () => void;
}

export function Color({ hexCode, name, isSelected = false, onClick }: ColorProps) {
  return (
    <button
      type="button"
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={`Color ${name}`}
      aria-pressed={isSelected}
      title={name}
    >
      <span
        className={styles.swatch}
        style={{ backgroundColor: hexCode }}
      />
    </button>
  );
}
