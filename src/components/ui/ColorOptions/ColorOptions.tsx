'use client';

/**
 * ColorOptions.tsx
 *
 * Contenedor de opciones de color según Figma.
 * Muestra múltiples componentes Color y el nombre del color seleccionado.
 *
 * Estructura del Figma:
 * - Fila de componentes Color
 * - Espacio entre colores: 10px
 * - Debajo: nombre del color seleccionado
 *
 * Props:
 * - options: Array de colores con name y hexCode
 * - selected: Nombre del color seleccionado
 * - onChange: Callback cuando se selecciona un color
 */

import { Color } from '../Color/Color';
import styles from './ColorOptions.module.css';

interface ColorOption {
  /** Nombre del color (ej: "Negro", "Blanco") */
  name: string;
  /** Código hexadecimal del color (ej: "#000000") */
  hexCode: string;
}

interface ColorOptionsProps {
  /** Array de opciones de color */
  options: ColorOption[];
  /** Nombre del color actualmente seleccionado */
  selected: string;
  /** Función que se ejecuta al seleccionar un color */
  onChange: (colorName: string) => void;
}

export function ColorOptions({ options, selected, onChange }: ColorOptionsProps) {
  return (
    <div className={styles.container}>
      {/* Fila de colores */}
      <div className={styles.colors}>
        {options.map((option) => (
          <Color
            key={option.name}
            hexCode={option.hexCode}
            name={option.name}
            isSelected={option.name === selected}
            onClick={() => onChange(option.name)}
          />
        ))}
      </div>

      {/* Nombre del color seleccionado */}
      <span className={styles.label}>{selected}</span>
    </div>
  );
}
