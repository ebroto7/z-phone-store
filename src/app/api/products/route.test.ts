/**
 * Tests para Route Handler: /api/products
 *
 * TDD Ligero:
 * - 2-3 happy path
 * - 1-2 edge cases
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

// Mock del servicio api
vi.mock('@/services/api', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '@/services/api';

const mockProducts = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: '/img1.jpg' },
  { id: '2', brand: 'Samsung', name: 'Galaxy S24', basePrice: 899, imageUrl: '/img2.jpg' },
];

function createMockRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'));
}

describe('GET /api/products', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // === HAPPY PATH ===

  it('returns products list', async () => {
    vi.mocked(getProducts).mockResolvedValueOnce(mockProducts);

    const request = createMockRequest('/api/products');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].brand).toBe('Apple');
  });

  it('passes search param to getProducts', async () => {
    vi.mocked(getProducts).mockResolvedValueOnce([mockProducts[0]!]);

    const request = createMockRequest('/api/products?search=iphone');
    await GET(request);

    expect(getProducts).toHaveBeenCalledWith({
      search: 'iphone',
      limit: 20,
    });
  });

  it('passes limit param to getProducts', async () => {
    vi.mocked(getProducts).mockResolvedValueOnce(mockProducts);

    const request = createMockRequest('/api/products?limit=5');
    await GET(request);

    expect(getProducts).toHaveBeenCalledWith({
      search: undefined,
      limit: 5,
    });
  });

  // === EDGE CASES ===

  it('uses default limit of 20 when not provided', async () => {
    vi.mocked(getProducts).mockResolvedValueOnce(mockProducts);

    const request = createMockRequest('/api/products');
    await GET(request);

    expect(getProducts).toHaveBeenCalledWith({
      search: undefined,
      limit: 20,
    });
  });

  it('returns 500 on API error', async () => {
    vi.mocked(getProducts).mockRejectedValueOnce(new Error('API down'));

    const request = createMockRequest('/api/products');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch products');
  });
});
