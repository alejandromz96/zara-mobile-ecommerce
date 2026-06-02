import type {
  CartItem,
  ColorOption,
  ProductDetail,
  StorageOption,
} from "@/lib/types";
import { t } from "@/lib/i18n";

export function getProductImage(
  product: ProductDetail,
  selectedColor?: ColorOption,
) {
  return (
    selectedColor?.imageUrl ||
    product.imageUrl ||
    product.colorOptions[0]?.imageUrl
  );
}

export function getProductPrice(
  product: ProductDetail,
  selectedStorage?: StorageOption,
) {
  return selectedStorage?.price ?? product.basePrice;
}

export function canAddProductToCart(
  selectedColor?: ColorOption,
  selectedStorage?: StorageOption,
) {
  return Boolean(selectedColor && selectedStorage);
}

export function createCartItem(
  product: ProductDetail,
  selectedColor: ColorOption,
  selectedStorage: StorageOption,
): CartItem {
  return {
    productId: product.id,
    brand: product.brand,
    name: product.name,
    imageUrl: selectedColor.imageUrl,
    color: selectedColor.name,
    storage: selectedStorage.capacity,
    price: selectedStorage.price,
  };
}

export function getProductSpecs(product: ProductDetail) {
  return [
    [t("product.specs.screen"), product.specs.screen],
    [t("product.specs.resolution"), product.specs.resolution],
    [t("product.specs.processor"), product.specs.processor],
    [t("product.specs.mainCamera"), product.specs.mainCamera],
    [t("product.specs.selfieCamera"), product.specs.selfieCamera],
    [t("product.specs.battery"), product.specs.battery],
    [t("product.specs.os"), product.specs.os],
    [t("product.specs.refreshRate"), product.specs.screenRefreshRate],
  ];
}
