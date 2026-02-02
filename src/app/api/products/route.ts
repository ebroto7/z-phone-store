/**
 * Route Handler: /api/products
 *
 * Proxy seguro para que el cliente pueda buscar productos
 * sin exponer la API_KEY.
 *
 * GET /api/products?search=X&limit=N
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/services/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search') ?? undefined;
  const limit = searchParams.get('limit');

  try {
    const products = await getProducts({
      search,
      limit: limit ? parseInt(limit, 10) : 20,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
