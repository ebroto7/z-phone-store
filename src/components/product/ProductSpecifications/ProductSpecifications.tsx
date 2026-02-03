import { ProductSpecs } from '@/types';
import { SpecificationRow } from '@/components/ui/SpecificationRow';
import styles from './ProductSpecifications.module.css';

interface ProductSpecificationsProps {
  specs: ProductSpecs;
}

// Mapeo de claves técnicas a labels legibles
const SPEC_LABELS: Record<keyof ProductSpecs, string> = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  mainCamera: 'Main Camera',
  selfieCamera: 'Selfie Camera',
  battery: 'Battery',
  os: 'Operating System',
  screenRefreshRate: 'Screen Refresh Rate',
};

// Orden de las especificaciones
const SPEC_ORDER: (keyof ProductSpecs)[] = [
  'screen',
  'resolution',
  'processor',
  'mainCamera',
  'selfieCamera',
  'battery',
  'os',
  'screenRefreshRate',
];

export function ProductSpecifications({ specs }: ProductSpecificationsProps) {
  return (
    <section className={styles.container} aria-labelledby="specs-title">
      <h2 id="specs-title" className={styles.title}>
        Specifications
      </h2>
      <div className={styles.list}>
        {SPEC_ORDER.map((key) => (
          <SpecificationRow
            key={key}
            label={SPEC_LABELS[key]}
            value={specs[key]}
          />
        ))}
      </div>
    </section>
  );
}
