export type ProductListItem = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type ColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export type ProductSpecs = {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
};

export type ProductDetail = ProductListItem & {
  description: string;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
};

export type CartItem = {
  productId: string;
  brand: string;
  name: string;
  imageUrl: string;
  color: string;
  storage: string;
  price: number;
};
