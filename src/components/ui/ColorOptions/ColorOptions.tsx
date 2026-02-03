'use client';

import { Color } from '../Color/Color';
import styles from './ColorOptions.module.css';

interface ColorOption {
  name: string;
  hexCode: string;
}

interface ColorOptionsProps {
  options: ColorOption[];
  selected: string;
  onChange: (colorName: string) => void;
}

export function ColorOptions({ options, selected, onChange }: ColorOptionsProps) {
  return (
    <div className={styles.container}>
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

      <span className={styles.label}>{selected}</span>
    </div>
  );
}
