import Image from 'next/image';
import styles from './ProductImage.module.css';

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 392px, 510px"
        className={styles.image}
        priority
      />
    </div>
  );
}
