import { describe, expect, it } from "vitest";

import {
  addCartItem,
  calculateCartTotal,
  parseCart,
  removeCartItem,
  serializeCart,
} from "./cart";
import type { CartItem } from "./types";

const cartItem: CartItem = {
  productId: "iphone-16",
  brand: "Apple",
  name: "iPhone 16",
  imageUrl: "/iphone-16.jpg",
  color: "Black",
  storage: "128 GB",
  price: 959,
};

const secondCartItem: CartItem = {
  productId: "pixel-9",
  brand: "Google",
  name: "Pixel 9",
  imageUrl: "/pixel-9.jpg",
  color: "Porcelain",
  storage: "256 GB",
  price: 899,
};

describe("cart helpers", () => {
  it("parses valid stored carts and falls back to an empty cart for invalid input", () => {
    expect(parseCart(JSON.stringify([cartItem]))).toEqual([cartItem]);
    expect(parseCart(null)).toEqual([]);
    expect(parseCart("{broken-json")).toEqual([]);
    expect(parseCart(JSON.stringify({ items: [cartItem] }))).toEqual([]);
  });

  it("serializes cart items using JSON", () => {
    expect(serializeCart([cartItem])).toBe(JSON.stringify([cartItem]));
  });

  it("adds and removes items without mutating the original cart", () => {
    const initialCart = [cartItem];
    const nextCart = addCartItem(initialCart, secondCartItem);

    expect(nextCart).toEqual([cartItem, secondCartItem]);
    expect(initialCart).toEqual([cartItem]);
    expect(removeCartItem(nextCart, 0)).toEqual([secondCartItem]);
  });

  it("calculates totals from item prices", () => {
    expect(calculateCartTotal([cartItem, secondCartItem])).toBe(1858);
    expect(calculateCartTotal([])).toBe(0);
  });
});
