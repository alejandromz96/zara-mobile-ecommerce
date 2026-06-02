import { describe, expect, it } from "vitest";

import {
  canAddProductToCart,
  createCartItem,
  getProductImage,
  getProductPrice,
  getProductSpecs,
} from "./product-details";
import type { ColorOption, ProductDetail, StorageOption } from "./types";

const black: ColorOption = {
  name: "Black",
  hexCode: "#000000",
  imageUrl: "/black.jpg",
};

const blue: ColorOption = {
  name: "Blue",
  hexCode: "#1d4ed8",
  imageUrl: "/blue.jpg",
};

const storage128: StorageOption = {
  capacity: "128 GB",
  price: 959,
};

const storage256: StorageOption = {
  capacity: "256 GB",
  price: 1089,
};

const product: ProductDetail = {
  id: "iphone-16",
  brand: "Apple",
  name: "iPhone 16",
  basePrice: 899,
  imageUrl: "/default.jpg",
  description: "A phone",
  rating: 4.8,
  specs: {
    screen: "6.1 inches",
    resolution: "2556 x 1179",
    processor: "A18",
    mainCamera: "48 MP",
    selfieCamera: "12 MP",
    battery: "22 h",
    os: "iOS",
    screenRefreshRate: "60 Hz",
  },
  colorOptions: [black, blue],
  storageOptions: [storage128, storage256],
  similarProducts: [],
};

describe("product detail helpers", () => {
  it("chooses the selected color image before product and fallback images", () => {
    expect(getProductImage(product, blue)).toBe("/blue.jpg");
    expect(getProductImage(product)).toBe("/default.jpg");
    expect(getProductImage({ ...product, imageUrl: "" })).toBe("/black.jpg");
  });

  it("uses the selected storage price or the base price", () => {
    expect(getProductPrice(product, storage256)).toBe(1089);
    expect(getProductPrice(product)).toBe(899);
  });

  it("only allows adding to cart once color and storage are selected", () => {
    expect(canAddProductToCart(black, storage128)).toBe(true);
    expect(canAddProductToCart(black)).toBe(false);
    expect(canAddProductToCart(undefined, storage128)).toBe(false);
  });

  it("creates a cart item from selected product options", () => {
    expect(createCartItem(product, blue, storage256)).toEqual({
      productId: "iphone-16",
      brand: "Apple",
      name: "iPhone 16",
      imageUrl: "/blue.jpg",
      color: "Blue",
      storage: "256 GB",
      price: 1089,
    });
  });

  it("returns product specs in display order", () => {
    expect(getProductSpecs(product)).toEqual([
      ["Screen", "6.1 inches"],
      ["Resolution", "2556 x 1179"],
      ["Processor", "A18"],
      ["Main camera", "48 MP"],
      ["Selfie camera", "12 MP"],
      ["Battery", "22 h"],
      ["OS", "iOS"],
      ["Screen refresh rate", "60 Hz"],
    ]);
  });
});
