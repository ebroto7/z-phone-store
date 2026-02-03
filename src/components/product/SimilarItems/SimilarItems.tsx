'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import type { ProductListItem } from '@/types';
import { SmartphoneCard } from '../SmartphoneCard/SmartphoneCard';
import styles from './SimilarItems.module.css';

interface SimilarItemsProps {
  products: ProductListItem[];
}

export function SimilarItems({ products }: SimilarItemsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const progress = (scrollLeft / maxScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.container} aria-labelledby="similar-items-title">
      <h2 id="similar-items-title" className={styles.title}>
        SIMILAR ITEMS
      </h2>

      <div
        ref={carouselRef}
        className={styles.carousel}
        role="region"
        aria-label="Productos similares"
      >
        {products.map((product) => (
          <div key={product.id} className={styles.cardWrapper}>
            <SmartphoneCard {...product} />
          </div>
        ))}
      </div>

      <div className={styles.progressBar} aria-hidden="true">
        <div
          className={styles.progressIndicator}
          style={{
            left: `${scrollProgress}%`,
            transform: `translateX(-${scrollProgress}%)`
          }}
        />
      </div>
    </section>
  );
}
