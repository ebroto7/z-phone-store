// === Respuesta Lista ===
export interface ProductListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

// === Respuesta Detalle ===
export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
}

export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string; // "64GB", "128GB", "256GB"
  price: number;
}

// === Variante seleccionada ===
export interface ProductVariant {
  color: ColorOption;
  storage: StorageOption;
}

// === Carrito ===
export interface CartItem {
  id: string; // ID único del item en carrito
  productId: string;
  name: string;
  brand: string;
  color: ColorOption;
  storage: StorageOption;
  imageUrl: string;
  quantity: number;
}

// === API ===
export interface GetProductsParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ApiError {
  error: string;
  message: string;
}
