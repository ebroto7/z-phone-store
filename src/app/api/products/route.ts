import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/services/api';
import { isApiError } from '@/lib/errors';

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
    if (isApiError(error)) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error inesperado', code: 'UNKNOWN_ERROR' },
      { status: 500 }
    );
  }
}
