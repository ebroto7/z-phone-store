'use client';

/**
 * StorageSelector.tsx
 *
 * Componente para seleccionar la capacidad de almacenamiento.
 * Muestra botones con las opciones disponibles (ej: "128 GB", "256 GB").
 *
 * Estados visuales (según Figma):
 * - Default: Solo borde negro, fondo transparente
 * - Selected: Fondo negro, texto blanco
 *
 * Props:
 * - options: Array de strings con las capacidades disponibles
 * - selected: La opción actualmente seleccionada
 * - onChange: Callback cuando el usuario selecciona una opción
 */

import styles from './StorageSelector.module.css';

// Interfaz para las props del componente
interface StorageSelectorProps {
  /** Array de opciones de almacenamiento (ej: ["128 GB", "256 GB"]) */
  options: string[];
  /** Opción actualmente seleccionada */
  selected: string;
  /** Función que se ejecuta al seleccionar una opción */
  onChange: (value: string) => void;
}

export function StorageSelector({ options, selected, onChange }: StorageSelectorProps) {
  return (
    <div className={styles.container}>
      {/* Mapeamos cada opción a un botón */}
      {options.map((option) => {
        // Determinamos si esta opción está seleccionada
        const isSelected = option === selected;

        return (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            onClick={() => onChange(option)}
            // Accesibilidad: indicamos el estado de selección
            aria-pressed={isSelected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
