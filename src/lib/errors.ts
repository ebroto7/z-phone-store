export type ApiErrorCode =
  | 'NETWORK_ERROR'    // Sin conexión, timeout, servidor caído
  | 'AUTH_ERROR'       // 401 - API key inválida
  | 'NOT_FOUND'        // 404 - Recurso no existe
  | 'SERVER_ERROR'     // 500 - Error interno del servidor
  | 'UNKNOWN_ERROR';   // Cualquier otro error

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode;

  constructor(message: string, status: number, code: ApiErrorCode) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function createApiError(status: number, customMessage?: string): ApiError {
  switch (status) {
    case 401:
      return new ApiError(
        customMessage ?? 'Error de autenticación con la API',
        401,
        'AUTH_ERROR'
      );
    case 404:
      return new ApiError(
        customMessage ?? 'Recurso no encontrado',
        404,
        'NOT_FOUND'
      );
    case 500:
    case 502:
    case 503:
      return new ApiError(
        customMessage ?? 'Error del servidor. Inténtalo más tarde',
        status,
        'SERVER_ERROR'
      );
    default:
      return new ApiError(
        customMessage ?? 'Error desconocido',
        status,
        'UNKNOWN_ERROR'
      );
  }
}

export function createNetworkError(originalError?: Error): ApiError {
  const isTimeout = originalError?.message?.includes('timeout');

  return new ApiError(
    isTimeout
      ? 'La conexión tardó demasiado. Inténtalo de nuevo'
      : 'No se pudo conectar con el servidor',
    0,
    'NETWORK_ERROR'
  );
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
