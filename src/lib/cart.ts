import type { CartItem } from "@/lib/types";

export const CART_STORAGE_KEY = "zara-mobile-cart";

export function parseCart(value: string | null): CartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(value);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function serializeCart(items: CartItem[]) {
  return JSON.stringify(items);
}

export function addCartItem(items: CartItem[], item: CartItem) {
  return [...items, item];
}

export function removeCartItem(items: CartItem[], indexToRemove: number) {
  return items.filter((_, index) => index !== indexToRemove);
}

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
