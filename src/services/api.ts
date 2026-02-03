import type { ProductListItem, Product, GetProductsParams } from '@/types';
import { createApiError, createNetworkError } from '@/lib/errors';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';
const API_KEY = process.env.API_KEY ?? '';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      cache: 'no-store',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  } catch (error) {
    // Error de red: sin conexión, timeout, DNS, etc.
    throw createNetworkError(error instanceof Error ? error : undefined);
  }

  if (!response.ok) {
    throw createApiError(response.status);
  }

  return response.json();
}

export async function getProducts(params?: GetProductsParams): Promise<ProductListItem[]> {
  const searchParams = new URLSearchParams();

  if (params?.search) {
    searchParams.set('search', params.search);
  }
  if (params?.limit) {
    searchParams.set('limit', params.limit.toString());
  }
  if (params?.offset) {
    searchParams.set('offset', params.offset.toString());
  }

  const query = searchParams.toString();
  return fetchAPI<ProductListItem[]>(`products${query ? `?${query}` : ''}`);
}

export async function getProductById(id: string): Promise<Product> {
  return fetchAPI<Product>(`products/${id}`);
}
