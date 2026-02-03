/**
 * SpecificationRow.tsx
 *
 * Componente para mostrar una especificación del producto.
 * Diseño según Figma: [LABEL]          [Value]
 *                     ─────────────────────────
 *
 * Estructura:
 * - Label en mayúsculas a la izquierda
 * - Valor a la derecha del label (con gap de 48px)
 * - Línea divisoria inferior de 0.5px
 *
 * Props:
 * - label: Etiqueta de la especificación (se muestra en mayúsculas)
 * - value: Valor de la especificación
 *
 * Nota: Server Component - no necesita 'use client'
 */

import styles from './SpecificationRow.module.css';

interface SpecificationRowProps {
  /** Etiqueta/nombre de la especificación (se muestra en mayúsculas vía CSS) */
  label: string;
  /** Valor de la especificación */
  value: string;
}

export function SpecificationRow({ label, value }: SpecificationRowProps) {
  return (
    <div className={styles.row}>
      {/* Label - el text-transform: uppercase se aplica en CSS */}
      <span className={styles.label}>{label}</span>

      {/* Valor */}
      <span className={styles.value}>{value}</span>
    </div>
  );
}
